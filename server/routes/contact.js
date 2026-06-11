const express = require('express');
const db = require('../db');

const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/contact  (admin only) - list all contact messages
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact_details ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/contact error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch messages.' });
  }
});

// POST /api/contact  - submit contact form (public)
router.post('/', async (req, res) => {
  const { first_name, last_name, email, phone, message } = req.body;
  if (!first_name || !email || !message) {
    return res.status(400).json({ error: 'First name, email and message are required.' });
  }
  try {
    await db.query(
      'INSERT INTO contact_details (first_name, last_name, email, phone, message) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name || '', email, phone || '', message]
    );
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// DELETE /api/contact/:id  (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM contact_details WHERE id = ?', [req.params.id]);
    res.json({ message: 'Message deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

module.exports = router;
