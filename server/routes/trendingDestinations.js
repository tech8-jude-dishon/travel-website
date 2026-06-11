const express = require('express');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/trending-destinations  — public
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM trending_destinations ORDER BY sort_order ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trending destinations.' });
  }
});

// POST /api/trending-destinations  — admin only
router.post('/', verifyToken, async (req, res) => {
  const { image_url, name = '', sort_order = 0 } = req.body;
  if (!image_url) return res.status(400).json({ error: 'image_url is required.' });
  try {
    const [result] = await db.query(
      'INSERT INTO trending_destinations (name, image_url, sort_order) VALUES (?, ?, ?)',
      [name, image_url, sort_order]
    );
    res.status(201).json({ id: result.insertId, name, image_url, sort_order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add trending destination.' });
  }
});

// PUT /api/trending-destinations/:id  — admin only
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, image_url, sort_order } = req.body;
  try {
    await db.query(
      'UPDATE trending_destinations SET name = ?, image_url = ?, sort_order = ? WHERE id = ?',
      [name, image_url, sort_order ?? 0, id]
    );
    res.json({ id: Number(id), name, image_url, sort_order: sort_order ?? 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update trending destination.' });
  }
});

// DELETE /api/trending-destinations/:id  — admin only
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM trending_destinations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete trending destination.' });
  }
});

module.exports = router;
