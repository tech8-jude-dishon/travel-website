const express = require('express');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/dream-destinations  — public
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM dream_destinations ORDER BY sort_order ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dream destinations.' });
  }
});

// POST /api/dream-destinations  — admin only
router.post('/', verifyToken, async (req, res) => {
  const { title = '', image_url, link = '', sort_order = 0 } = req.body;
  if (!image_url) return res.status(400).json({ error: 'image_url is required.' });
  try {
    const [result] = await db.query(
      'INSERT INTO dream_destinations (title, image_url, link, sort_order) VALUES (?, ?, ?, ?)',
      [title, image_url, link, sort_order]
    );
    res.status(201).json({ id: result.insertId, title, image_url, link, sort_order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add dream destination.' });
  }
});

// PUT /api/dream-destinations/:id  — admin only
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, image_url, link, sort_order } = req.body;
  try {
    await db.query(
      'UPDATE dream_destinations SET title = ?, image_url = ?, link = ?, sort_order = ? WHERE id = ?',
      [title, image_url, link, sort_order ?? 0, id]
    );
    res.json({ id: Number(id), title, image_url, link, sort_order: sort_order ?? 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update dream destination.' });
  }
});

// DELETE /api/dream-destinations/:id  — admin only
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM dream_destinations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete dream destination.' });
  }
});

module.exports = router;
