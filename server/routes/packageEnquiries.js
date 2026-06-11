const express = require('express');
const db = require('../db');
const { sendUserPackageEnquiryConfirmation, sendAdminPackageEnquiryNotification } = require('../utils/mailer');

const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/package-enquiries  (admin only) - list all package enquiries
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM package_enquiries ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/package-enquiries error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch package enquiries.' });
  }
});

// POST /api/package-enquiries  - submit enquiry from package detail page (public)
router.post('/', async (req, res) => {
  const { package_id, package_title, name, email, phone, travel_date, num_travelers, message } = req.body;
  try {
    // 1. Save to database
    await db.query(
      'INSERT INTO package_enquiries (package_id, package_title, name, email, phone, travel_date, num_travelers, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [package_id || null, package_title || null, name, email, phone || null, travel_date || null, num_travelers || null, message || null]
    );

    // 2. Send emails (fire-and-forget)
    const data = { package_id, package_title, name, email, phone, travel_date, num_travelers, message };
    Promise.all([
      sendUserPackageEnquiryConfirmation(data),
      sendAdminPackageEnquiryNotification(data),
    ]).catch(err => console.error('Email send error:', err.message));

    res.status(201).json({ message: 'Package enquiry submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit package enquiry.' });
  }
});

// DELETE /api/package-enquiries/:id  (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM package_enquiries WHERE id = ?', [req.params.id]);
    res.json({ message: 'Package enquiry deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete enquiry.' });
  }
});

module.exports = router;
