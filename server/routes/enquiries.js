const express = require('express');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');
const { sendUserEnquiryConfirmation, sendAdminEnquiryNotification } = require('../utils/mailer');

const router = express.Router();

// GET /api/enquiries  (admin only) - list all travel enquiries
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM travel_details ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/enquiries error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch enquiries.' });
  }
});

// POST /api/enquiries  - submit a booking / general enquiry (public)
router.post('/', async (req, res) => {
  const { full_name, email, phone, travel_origin, destination, travel_date, adults, children, tentative_budget, specific_requirements, message } = req.body;
  try {
    // 1. Save to database
    await db.query(
      'INSERT INTO travel_details (full_name, email, phone, travel_origin, destination, travel_date, adults, children, tentative_budget, specific_requirements, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [full_name, email, phone, travel_origin || null, destination || 'General Enquiry', travel_date || null, adults || '1 Adult', children || null, tentative_budget || null, specific_requirements || null, message || null]
    );

    // 2. Send emails (fire-and-forget — don't fail the request if email errors)
    const data = { full_name, email, phone, travel_origin, destination, travel_date, adults, children, tentative_budget, specific_requirements, message };
    sendUserEnquiryConfirmation(data)
      .then(r => console.log('✅ User email:', JSON.stringify(r)))
      .catch(e => console.error('❌ User email error:', JSON.stringify(e)));
    sendAdminEnquiryNotification(data)
      .then(r => console.log('✅ Admin email:', JSON.stringify(r)))
      .catch(e => console.error('❌ Admin email error:', JSON.stringify(e)));

    res.status(201).json({ message: 'Enquiry submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit enquiry.' });
  }
});

// DELETE /api/enquiries/:id  (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM travel_details WHERE id = ?', [req.params.id]);
    res.json({ message: 'Enquiry deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete enquiry.' });
  }
});

module.exports = router;
