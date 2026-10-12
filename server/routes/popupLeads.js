const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create the table on startup so the live DB needs no manual migration.
// client_token is a random id kept in the visitor's browser: while their lead
// exists the popup stays hidden for them; deleting the lead shows it again.
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS popup_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        source_page VARCHAR(255),
        client_token VARCHAR(64),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_popup_leads_token (client_token)
      )
    `);
    // Tables created before client_token existed: add the column + index.
    const [cols] = await db.query(
      "SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'popup_leads' AND COLUMN_NAME = 'client_token'"
    );
    if (cols.length === 0) {
      await db.query('ALTER TABLE popup_leads ADD COLUMN client_token VARCHAR(64), ADD INDEX idx_popup_leads_token (client_token)');
    }
  } catch (err) {
    console.error('popup_leads table init error:', err.message);
  }
})();

// GET /api/popup-leads  (admin only) - list all popup leads
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM popup_leads ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/popup-leads error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch popup leads.' });
  }
});

// GET /api/popup-leads/status/:token  (public) - does this visitor's lead still exist?
// Returns only a boolean so lead details are never exposed.
router.get('/status/:token', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 FROM popup_leads WHERE client_token = ? LIMIT 1', [req.params.token]);
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    console.error('GET /api/popup-leads/status error:', err.message);
    res.status(500).json({ error: 'Failed to check lead status.' });
  }
});

// POST /api/popup-leads  - submit lead from the website popup (public)
router.post('/', async (req, res) => {
  const name = (req.body.name || '').trim();
  const phone = (req.body.phone || '').trim();
  const email = (req.body.email || '').trim();
  const source_page = (req.body.source_page || '').trim().slice(0, 255);

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Name, phone number and email are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const client_token = crypto.randomUUID();
    await db.query(
      'INSERT INTO popup_leads (name, phone, email, source_page, client_token) VALUES (?, ?, ?, ?, ?)',
      [name.slice(0, 255), phone.slice(0, 50), email.slice(0, 255), source_page || null, client_token]
    );
    res.status(201).json({ message: 'Lead submitted successfully.', client_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit lead.' });
  }
});

// DELETE /api/popup-leads/:id  (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM popup_leads WHERE id = ?', [req.params.id]);
    res.json({ message: 'Lead deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete lead.' });
  }
});

module.exports = router;
