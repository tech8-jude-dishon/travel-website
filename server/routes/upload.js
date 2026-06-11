const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer storage — saves to server/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
  cb(ok ? null : new Error('Only image files are allowed.'), ok);
};

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Resize big uploads down to web size (max 1920px) and re-compress in place,
// keeping the same filename/format. Prevents 20–30 MB originals from bloating
// the page. If anything fails, the original file is kept untouched.
async function optimizeInPlace(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const input = fs.readFileSync(filePath); // libvips file open is flaky on Windows
    let img = sharp(input, { failOn: 'none' })
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true });
    if (ext === '.png') img = img.png({ compressionLevel: 9, quality: 82 });
    else if (ext === '.webp') img = img.webp({ quality: 82 });
    else img = img.jpeg({ quality: 82, mozjpeg: true });
    const out = await img.toBuffer();
    if (out.length < input.length) fs.writeFileSync(filePath, out);
  } catch (e) {
    console.error('Image optimize skipped:', e.message);
  }
}

// POST /api/upload  (admin only)
router.post('/', verifyToken, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  // Compress before responding so the DB never points at a huge original.
  await optimizeInPlace(req.file.path);

  // Return a RELATIVE path only — the frontend's resolveImageUrl() prepends the
  // API origin. Storing just /uploads/<file> keeps the DB portable across
  // localhost / staging / production (no hardcoded domain).
  const publicUrl = `/uploads/${req.file.filename}`;
  res.json({ publicUrl });
});

module.exports = router;
