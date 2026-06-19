const express = require('express');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Helper to parse JSON fields from DB
const parsePackage = (pkg) => {
  if (!pkg) return pkg;
  const jsonFields = ['highlights', 'inclusions', 'exclusions', 'gallery', 'itinerary'];
  jsonFields.forEach(field => {
    if (typeof pkg[field] === 'string') {
      try { pkg[field] = JSON.parse(pkg[field]); } catch { pkg[field] = []; }
    }
    if (pkg[field] == null) pkg[field] = [];
  });
  pkg.is_featured = Boolean(pkg.is_featured);
  return pkg;
};

// GET /api/packages  - list all packages
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tour_packages ORDER BY created_at DESC');
    res.json(rows.map(parsePackage));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch packages.' });
  }
});

// GET /api/packages/:id  - get by id or slug
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let rows;
    if (!isNaN(Number(id))) {
      [rows] = await db.query('SELECT * FROM tour_packages WHERE id = ?', [id]);
    } else {
      [rows] = await db.query('SELECT * FROM tour_packages WHERE slug = ?', [id]);
    }
    if (rows.length === 0) return res.status(404).json({ error: 'Package not found.' });
    res.json(parsePackage(rows[0]));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch package.' });
  }
});

// POST /api/packages  - create package (admin only)
router.post('/', verifyToken, async (req, res) => {
  const pkg = req.body;
  try {
    const jsonFields = ['highlights', 'inclusions', 'exclusions', 'gallery', 'itinerary'];
    jsonFields.forEach(f => {
      if (Array.isArray(pkg[f])) pkg[f] = JSON.stringify(pkg[f]);
    });

    const [result] = await db.query(
      `INSERT INTO tour_packages
        (title, slug, location, region, category, image_url, flyer_url, rating, duration, guest_capacity, tag, price, is_featured, overview, highlights, inclusions, exclusions, gallery, itinerary)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pkg.title, pkg.slug, pkg.location, pkg.region, pkg.category,
        pkg.image_url, pkg.flyer_url || null, pkg.rating, pkg.duration, pkg.guest_capacity,
        pkg.tag, pkg.price || '', pkg.is_featured ? 1 : 0, pkg.overview,
        pkg.highlights, pkg.inclusions, pkg.exclusions, pkg.gallery, pkg.itinerary
      ]
    );

    const [rows] = await db.query('SELECT * FROM tour_packages WHERE id = ?', [result.insertId]);
    res.status(201).json(parsePackage(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create package.' });
  }
});

// PUT /api/packages/:id  - update package (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const pkg = req.body;
  try {
    const jsonFields = ['highlights', 'inclusions', 'exclusions', 'gallery', 'itinerary'];
    jsonFields.forEach(f => {
      if (Array.isArray(pkg[f])) pkg[f] = JSON.stringify(pkg[f]);
    });

    await db.query(
      `UPDATE tour_packages SET
        title=?, slug=?, location=?, region=?, category=?, image_url=?, flyer_url=?, rating=?,
        duration=?, guest_capacity=?, tag=?, price=?, is_featured=?, overview=?,
        highlights=?, inclusions=?, exclusions=?, gallery=?, itinerary=?, updated_at=NOW()
       WHERE id=?`,
      [
        pkg.title, pkg.slug, pkg.location, pkg.region, pkg.category,
        pkg.image_url, pkg.flyer_url || null, pkg.rating, pkg.duration, pkg.guest_capacity,
        pkg.tag, pkg.price || '', pkg.is_featured ? 1 : 0, pkg.overview,
        pkg.highlights, pkg.inclusions, pkg.exclusions, pkg.gallery, pkg.itinerary,
        id
      ]
    );

    const [rows] = await db.query('SELECT * FROM tour_packages WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Package not found.' });
    res.json(parsePackage(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update package.' });
  }
});

// DELETE /api/packages/:id  (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tour_packages WHERE id = ?', [id]);
    res.json({ message: 'Package deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete package.' });
  }
});

module.exports = router;
