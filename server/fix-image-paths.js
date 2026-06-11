// ============================================================
// fix-image-paths.js  —  run after any DB import.
//   1) Relativizes every "<host>/uploads/..." URL to just "/uploads/..."
//      (image_url, flyer_url, gallery) so the DB is domain-portable.
//   2) Points dream_destinations at the local optimized -opt.webp images
//      (matched by title, so it survives id re-numbering).
// Usage:  node fix-image-paths.js     (or: npm run fix-images)
// ============================================================
const fs = require('fs');
const path = require('path');
const pool = require('./db');

const uploadsDir = path.join(__dirname, 'uploads');

const HOSTS = [
  'http://api.globalconnectworldtravel.com', 'https://api.globalconnectworldtravel.com',
  'http://www.globalconnectworldtravel.com', 'https://www.globalconnectworldtravel.com',
  'http://globalconnectworldtravel.com', 'https://globalconnectworldtravel.com',
  'http://localhost:4000', 'https://localhost:4000',
];
const strip = col => HOSTS.reduce((acc, h) => `REPLACE(${acc}, '${h}', '')`, col);

// dream title -> local optimized file (these -opt.webp live in /uploads)
const DREAM = {
  'KAMBODIA': '1774339164256-423729505-opt.webp',
  'SINGAPORE': '1774347198426-987096975-opt.webp',
  'VIETNAM': '1774347190853-422936653-opt.webp',
  'BAlI': '1774346439638-639765579-opt.webp',
  'THAILAND': '1774346837896-305213612-opt.webp',
  'MALAYSIA': '1774346904693-629577196-opt.webp',
  'Hongkong': '1774346940298-19103637-opt.webp',
  'SRILANKA': '1774347273520-670821575-opt.webp',
  'LAOS': '1774347287839-620192503-opt.webp',
  'MALDIVES': '1774347341393-193979146-opt.webp',
  'NEPAL': '1774347362983-365347975-opt.webp',
  'BHUTAN': '1774347383325-258251569-opt.webp',
  'ARMENIA': '1774347503900-765080026-opt.webp',
  'EUROPE': '1774347558653-526298841-opt.webp',
  'USA': '1774347613437-56367551-opt.webp',
  'KENYA': '1774347790304-616967775-opt.webp',
  'SEYCHELLES': '1774347971558-857574302-opt.webp',
  'AUSTRALIA': '1774348161554-760551366-opt.webp',
  'NEWZELAND': '1774350029742-85896198-opt.webp',
  'SOUTH AMERICA': '1774348052628-374034213-opt.webp',
  'SOUTH AFERICA': '1774347741854-363081792-opt.webp',
  'Georgia,Azerbaijan': '1774347408992-936999433-opt.webp',
  'SULTANATE OF OMAN': '1774350114163-861786013-opt.webp',
  'DUBAI TOURS': '1774341079333-1145745-opt.webp',
  'INDIA TOURS': '1773812977541-649501536-opt.webp',
  // MAURITIUS: no local image available.
};

// trending name -> local optimized file (verified). Goa & Yacht have no local
// image yet, so they are left pointing at production.
const TRENDING = {
  'Maldives': '1774347341393-193979146-opt.webp',
  'Malaysia': '1774346904693-629577196-opt.webp',
  'Delhi': '1773812977541-649501536-opt.webp',
  'Himachal': '1773809580886-277814919-opt.webp',
};

(async () => {
  // 1) Relativize
  for (const [t, c] of [['tour_packages','image_url'],['tour_packages','flyer_url'],['trending_destinations','image_url'],['dream_destinations','image_url']]) {
    const [r] = await pool.query(`UPDATE ${t} SET ${c} = ${strip(c)} WHERE ${c} LIKE '%//%/uploads/%'`);
    console.log(`relativized ${t}.${c}: ${r.affectedRows}`);
  }
  const [g] = await pool.query(`UPDATE tour_packages SET gallery = ${strip('gallery')} WHERE gallery LIKE '%//%/uploads/%'`);
  console.log(`relativized tour_packages.gallery: ${g.affectedRows}`);

  // 2) Dream -> local optimized images (by title; only if the file is on disk)
  let mapped = 0, missingFile = 0;
  for (const [title, file] of Object.entries(DREAM)) {
    if (!fs.existsSync(path.join(uploadsDir, file))) { console.log(`  ! opt file missing: ${file}`); missingFile++; continue; }
    const [r] = await pool.query('UPDATE dream_destinations SET image_url = ? WHERE title = ?', [`/uploads/${file}`, title]);
    if (r.affectedRows) mapped++;
  }
  console.log(`dream mapped to local optimized images: ${mapped} (${missingFile} opt files missing on disk)`);
  console.log('Note: MAURITIUS has no local image and is left as-is.');

  // 3) Trending -> local optimized images (by name)
  let tmapped = 0;
  for (const [name, file] of Object.entries(TRENDING)) {
    if (!fs.existsSync(path.join(uploadsDir, file))) { console.log(`  ! trending opt file missing: ${file}`); continue; }
    const [r] = await pool.query('UPDATE trending_destinations SET image_url = ? WHERE name = ?', [`/uploads/${file}`, name]);
    if (r.affectedRows) tmapped++;
  }
  console.log(`trending mapped to local optimized images: ${tmapped}  (Goa & Yacht have no local image yet)`);

  await pool.end();
  console.log('\nDone. DB image paths fixed.');
})().catch(e => { console.error(e); process.exit(1); });
