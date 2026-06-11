const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM        = process.env.EMAIL_FROM;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Startup check — print to server console so you can verify env is loaded
console.log('[mailer] FROM:', FROM);
console.log('[mailer] ADMIN_EMAIL:', ADMIN_EMAIL);

// ── Shared HTML wrapper ──────────────────────────────────────────
const wrapHtml = (body) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:#1B2534;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#C9A84C;font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Global Connect World Travel</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Dream Destinas Tours & Travels</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f5f7fa;padding:24px 40px;text-align:center;border-top:1px solid #e8ecf0;">
              <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">1st Floor, Tenco Complex, Pallikkunnu, Kannur, Kerala – 670004</p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                📞 +91 89210 95973 &nbsp;|&nbsp; ✉ booking@globalconnectworldtravel.com
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#cbd5e1;">© ${new Date().getFullYear()} Global Connect World Travel. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ── Detail row helper ────────────────────────────────────────────
const row = (label, value) =>
  value
    ? `<tr>
        <td style="padding:6px 0;">
          <span style="display:inline-block;background:#f1f5f9;border-radius:8px;padding:6px 14px;font-size:13px;color:#475569;">
            <strong style="color:#1B2534;">${label}:</strong>&nbsp;${value}
          </span>
        </td>
       </tr>`
    : '';

// ════════════════════════════════════════════════════════════════
// 1. General Enquiry — confirmation to USER
// ════════════════════════════════════════════════════════════════
const sendUserEnquiryConfirmation = async ({ full_name, email, phone, destination, travel_date, adults }) => {
  const html = wrapHtml(`
    <h2 style="margin:0 0 8px;color:#1B2534;font-size:20px;">Hi ${full_name || 'there'}, we received your enquiry! 👋</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
      Thank you for reaching out to <strong>Global Connect World Travel</strong>.
      Our travel consultant will contact you within <strong>24 hours</strong> to discuss your dream journey.
    </p>

    <div style="background:#fefce8;border-left:4px solid #C9A84C;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">Your Enquiry Summary</p>
      <table cellpadding="0" cellspacing="0">
        ${row('Destination', destination || 'General Enquiry')}
        ${row('Travel Date', travel_date)}
        ${row('Travellers', adults)}
        ${row('Phone', phone)}
        ${row('Email', email)}
      </table>
    </div>

    <p style="margin:0 0 8px;color:#64748b;font-size:14px;">While you wait, feel free to explore our curated packages at:</p>
    <p style="margin:0;"><a href="https://globalconnectworldtravel.com" style="color:#C9A84C;font-weight:700;text-decoration:none;">🌐 globalconnectworldtravel.com</a></p>

    <hr style="border:none;border-top:1px solid #e8ecf0;margin:32px 0;" />
    <p style="margin:0;font-size:13px;color:#94a3b8;">
      If you did not submit this enquiry, please ignore this email.
    </p>
  `);

  return resend.emails.send({
    from: FROM,
    to: [email],
    subject: `✈ We received your travel enquiry — Global Connect`,
    html,
  });
};

// ════════════════════════════════════════════════════════════════
// 2. General Enquiry — notification to ADMIN
// ════════════════════════════════════════════════════════════════
const sendAdminEnquiryNotification = async ({ full_name, email, phone, destination, travel_date, adults, children, message }) => {
  const html = wrapHtml(`
    <h2 style="margin:0 0 8px;color:#1B2534;font-size:20px;">🔔 New Travel Enquiry Received</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;">A new booking enquiry has been submitted on the website.</p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:1px;">Lead Details</p>
      <table cellpadding="0" cellspacing="0" width="100%">
        ${row('Name', full_name)}
        ${row('Email', `<a href="mailto:${email}" style="color:#C9A84C;">${email}</a>`)}
        ${row('Phone', phone)}
        ${row('Destination', destination || 'General Enquiry')}
        ${row('Travel Date', travel_date)}
        ${row('Adults', adults)}
        ${row('Children', children)}
        ${message ? `<tr><td style="padding:6px 0;"><strong style="color:#1B2534;font-size:13px;">Message:</strong><br/><p style="margin:4px 0 0;color:#475569;font-size:13px;">${message}</p></td></tr>` : ''}
      </table>
    </div>

    <a href="mailto:${email}" style="display:inline-block;background:#1B2534;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:700;letter-spacing:0.5px;">
      Reply to ${full_name || 'Customer'}
    </a>
  `);

  return resend.emails.send({
    from: FROM,
    to: [ADMIN_EMAIL],
    subject: `🧳 New Enquiry: ${full_name || 'Unknown'} → ${destination || 'General'}`,
    html,
  });
};

// ════════════════════════════════════════════════════════════════
// 3. Package Enquiry — confirmation to USER
// ════════════════════════════════════════════════════════════════
const sendUserPackageEnquiryConfirmation = async ({ name, email, phone, package_title, travel_date, num_travelers }) => {
  const html = wrapHtml(`
    <h2 style="margin:0 0 8px;color:#1B2534;font-size:20px;">Hi ${name || 'there'}, your package enquiry is confirmed! 🎉</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
      Thank you for your interest in <strong>${package_title || 'our tour package'}</strong>.
      Our specialist will reach out within <strong>24 hours</strong> with a personalised itinerary and pricing.
    </p>

    <div style="background:#fefce8;border-left:4px solid #C9A84C;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">Enquiry Details</p>
      <table cellpadding="0" cellspacing="0">
        ${row('Package', package_title)}
        ${row('Travel Date', travel_date)}
        ${row('Travellers', num_travelers)}
        ${row('Phone', phone)}
        ${row('Email', email)}
      </table>
    </div>

    <p style="margin:0;font-size:13px;color:#64748b;">
      📞 You can also reach us directly at <strong>+91 89210 95973</strong> or <strong>+971 58 952 0398</strong>
    </p>
  `);

  return resend.emails.send({
    from: FROM,
    to: [email],
    subject: `✈ Package Enquiry Confirmed — ${package_title || 'Tour Package'}`,
    html,
  });
};

// ════════════════════════════════════════════════════════════════
// 4. Package Enquiry — notification to ADMIN
// ════════════════════════════════════════════════════════════════
const sendAdminPackageEnquiryNotification = async ({ name, email, phone, package_title, package_id, travel_date, num_travelers, message }) => {
  const html = wrapHtml(`
    <h2 style="margin:0 0 8px;color:#1B2534;font-size:20px;">🎯 New Package Enquiry</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;">A customer has submitted an enquiry for a specific tour package.</p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:1px;">Package & Lead Details</p>
      <table cellpadding="0" cellspacing="0" width="100%">
        ${row('Package', package_title)}
        ${row('Package ID', package_id)}
        ${row('Customer Name', name)}
        ${row('Email', `<a href="mailto:${email}" style="color:#C9A84C;">${email}</a>`)}
        ${row('Phone', phone)}
        ${row('Travel Date', travel_date)}
        ${row('No. of Travellers', num_travelers)}
        ${message ? `<tr><td style="padding:6px 0;"><strong style="color:#1B2534;font-size:13px;">Message:</strong><br/><p style="margin:4px 0 0;color:#475569;font-size:13px;">${message}</p></td></tr>` : ''}
      </table>
    </div>

    <a href="mailto:${email}" style="display:inline-block;background:#1B2534;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:700;letter-spacing:0.5px;">
      Reply to ${name || 'Customer'}
    </a>
  `);

  return resend.emails.send({
    from: FROM,
    to: [ADMIN_EMAIL],
    subject: `🎯 Package Enquiry: ${name || 'Unknown'} → ${package_title || 'Package'}`,
    html,
  });
};

module.exports = {
  sendUserEnquiryConfirmation,
  sendAdminEnquiryNotification,
  sendUserPackageEnquiryConfirmation,
  sendAdminPackageEnquiryNotification,
};
