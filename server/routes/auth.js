const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  try {
    // Find user
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email.trim()]);
    if (users.length === 0) return res.status(401).json({ error: 'Invalid email or password.' });

    const user = users[0];

    // Check password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });

    // Check if admin
    const [admins] = await db.query('SELECT * FROM admins WHERE id = ?', [user.id]);
    if (admins.length === 0) return res.status(403).json({ error: 'Access Denied: You are not registered as an Admin Manager.' });

    const admin = admins[0];
    if (admin.status !== 'active') return res.status(403).json({ error: 'This account is inactive. Please contact your supervisor.' });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, full_name: user.full_name },
      profile: { id: admin.id, email: admin.email, full_name: admin.full_name, role: admin.role, status: admin.status }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, full_name } = req.body;
  if (!email || !password || !full_name) return res.status(400).json({ error: 'Email, password and full name are required.' });

  try {
    const id = uuidv4();
    const password_hash = await bcrypt.hash(password, 10);

    // Upsert into users table
    await db.query(
      'INSERT INTO users (id, email, full_name, password_hash) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)',
      [id, email.trim(), full_name.trim(), password_hash]
    );

    // Get the actual user id (in case email already existed)
    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email.trim()]);
    const userId = users[0].id;

    // Upsert into admins table
    await db.query(
      'INSERT INTO admins (id, email, full_name, role, status) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)',
      [userId, email.trim(), full_name.trim(), 'admin', 'active']
    );

    // Generate JWT
    const token = jwt.sign(
      { id: userId, email: email.trim(), role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const [admins] = await db.query('SELECT * FROM admins WHERE id = ?', [userId]);

    res.json({
      token,
      user: { id: userId, email: email.trim(), full_name: full_name.trim() },
      profile: admins[0]
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'An account with this email already exists.' });
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/auth/me  (verify token and return profile)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, email, full_name FROM users WHERE id = ?', [req.user.id]);
    const [admins] = await db.query('SELECT * FROM admins WHERE id = ?', [req.user.id]);

    if (users.length === 0) return res.status(404).json({ error: 'User not found.' });
    if (admins.length === 0) return res.status(403).json({ error: 'Not an admin.' });
    if (admins[0].status !== 'active') return res.status(403).json({ error: 'Account inactive.' });

    res.json({ user: users[0], profile: admins[0] });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
