const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const { verifyToken } = require('../middleware/auth');
const supabase = require('../supabase');

const router = express.Router();

// Storage bucket name in Supabase (must exist & be public). Override via .env.
const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';

// Keep the upload in memory — we optimize it and stream it straight to Supabase
// Storage, so nothing ever touches local disk.
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
    cb(ok ? null : new Error('Only image files are allowed.'), ok);
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Resize big uploads down to web size (max 1920px) and re-compress, keeping the
// same format. Returns { buffer, contentType }. GIFs are passed through untouched
// to preserve animation. If anything fails, the original buffer is used.
async function optimize(buffer, ext) {
  try {
    if (ext === '.gif') return { buffer, contentType: 'image/gif' };
    const img = sharp(buffer, { failOn: 'none' })
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true });
    if (ext === '.png') return { buffer: await img.png({ compressionLevel: 9, quality: 82 }).toBuffer(), contentType: 'image/png' };
    if (ext === '.webp') return { buffer: await img.webp({ quality: 82 }).toBuffer(), contentType: 'image/webp' };
    return { buffer: await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer(), contentType: 'image/jpeg' };
  } catch (e) {
    console.error('Image optimize skipped:', e.message);
    return { buffer, contentType: 'application/octet-stream' };
  }
}

// POST /api/upload  (admin only)
// Uploads the image to Supabase Storage and returns its public URL. Only this
// URL is stored in MySQL — the image bytes live in Supabase, not on this server.
router.post('/', verifyToken, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  try {
    const ext = path.extname(req.file.originalname).toLowerCase();
    const { buffer, contentType } = await optimize(req.file.buffer, ext);

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, {
        contentType,
        cacheControl: '2592000', // 30 days
        upsert: false,
      });
    if (error) throw error;

    // Full public URL (e.g. https://<ref>.supabase.co/storage/v1/object/public/uploads/<file>).
    // resolveImageUrl() on the frontend returns full http(s) URLs as-is.
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    res.json({ publicUrl: data.publicUrl });
  } catch (e) {
    console.error('Supabase upload failed:', e.message);
    res.status(500).json({ error: 'Upload failed. Check Supabase settings.' });
  }
});

module.exports = router;
