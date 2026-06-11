// ============================================================
// migrate-uploads-to-supabase.js  —  one-time migration.
//   1) Uploads every file in server/uploads/ to the Supabase Storage bucket
//      (same filename, upsert so re-running is safe).
//   2) Rewrites every "/uploads/<file>" reference in MySQL to the Supabase
//      public URL, across image_url / flyer_url / gallery / trending / dream.
// Usage:  node migrate-uploads-to-supabase.js
// ============================================================
const fs = require('fs');
const path = require('path');
const pool = require('./db');
const supabase = require('./supabase');

const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';
const uploadsDir = path.join(__dirname, 'uploads');

// Public URL prefix that replaces the leading "/uploads/" in the DB.
// e.g. https://<ref>.supabase.co/storage/v1/object/public/uploads/<file>
const SUPA_PREFIX = `${(process.env.SUPABASE_URL || '').replace(/\/$/, '')}/storage/v1/object/public/${BUCKET}/`;

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif',
};

// Old hosts that may prefix "/uploads/..." in the DB — stripped to relative first
// so the REPLACE below matches cleanly.
const HOSTS = [
  'http://api.globalconnectworldtravel.com', 'https://api.globalconnectworldtravel.com',
  'http://api-travel.globalconnectworldtravel.com', 'https://api-travel.globalconnectworldtravel.com',
  'http://www.globalconnectworldtravel.com', 'https://www.globalconnectworldtravel.com',
  'http://globalconnectworldtravel.com', 'https://globalconnectworldtravel.com',
  'http://localhost:4000', 'https://localhost:4000',
];
const strip = col => HOSTS.reduce((acc, h) => `REPLACE(${acc}, '${h}', '')`, col);
// Turn every leading "/uploads/" into the Supabase public URL.
const toSupa = col => `REPLACE(${col}, '/uploads/', '${SUPA_PREFIX}')`;

async function uploadAll() {
  if (!fs.existsSync(uploadsDir)) { console.log('No uploads/ dir — skipping file upload.'); return; }
  const files = fs.readdirSync(uploadsDir).filter(f => fs.statSync(path.join(uploadsDir, f)).isFile());
  console.log(`Uploading ${files.length} files to Supabase bucket "${BUCKET}"...`);
  let ok = 0, fail = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';
    const buffer = fs.readFileSync(path.join(uploadsDir, file));
    const { error } = await supabase.storage.from(BUCKET).upload(file, buffer, {
      contentType, cacheControl: '2592000', upsert: true,
    });
    if (error) { console.error(`  ✗ ${file}: ${error.message}`); fail++; }
    else { ok++; if (ok % 25 === 0) console.log(`  ...${ok} uploaded`); }
  }
  console.log(`Files uploaded: ${ok} ok, ${fail} failed.`);
}

async function rewriteDb() {
  console.log('\nRewriting DB image paths to Supabase URLs...');
  // image_url / flyer_url columns
  const cols = [
    ['tour_packages', 'image_url'], ['tour_packages', 'flyer_url'],
    ['trending_destinations', 'image_url'], ['dream_destinations', 'image_url'],
  ];
  for (const [t, c] of cols) {
    try {
      // strip any host first, then map /uploads/ -> supabase. Only touch rows
      // that still point at /uploads and aren't already on supabase (idempotent).
      const [r] = await pool.query(
        `UPDATE ${t} SET ${c} = ${toSupa(strip(c))}
         WHERE ${c} LIKE '%/uploads/%' AND ${c} NOT LIKE '%/storage/v1/object/public/%'`
      );
      console.log(`  ${t}.${c}: ${r.affectedRows} updated`);
    } catch (e) {
      if (e.code === 'ER_BAD_FIELD_ERROR') console.log(`  ${t}.${c}: column not present, skipped`);
      else throw e;
    }
  }
  // gallery JSON column (array of paths stored as text)
  const [g] = await pool.query(
    `UPDATE tour_packages SET gallery = ${toSupa(strip('gallery'))}
     WHERE gallery LIKE '%/uploads/%' AND gallery NOT LIKE '%/storage/v1/object/public/%'`
  );
  console.log(`  tour_packages.gallery: ${g.affectedRows} updated`);
}

(async () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('✗ SUPABASE_URL / SUPABASE_SERVICE_KEY missing in .env'); process.exit(1);
  }
  await uploadAll();
  await rewriteDb();
  await pool.end();
  console.log('\n✅ Done. Existing images are now served from Supabase.');
})().catch(e => { console.error(e); process.exit(1); });
