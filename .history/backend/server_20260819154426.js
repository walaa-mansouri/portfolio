require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { insertInquiry, listInquiries, updateStatus } = require('./db');
const { sendOwnerNotification, sendClientConfirmation } = require('./email');

const app = express();
app.use(express.json({ limit: '20kb' }));

// Only allow requests from your own site(s)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true
}));

// Basic rate limiting so the form can't be spammed / used to hammer your email
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // 10 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' }
});

const NEED_VALUES = ['new', 'redesign', 'landing', 'booking', 'multilingual', 'unsure'];
const BUDGET_VALUES = ['under500', '500-750', '750-1000', '1000plus', 'unsure', ''];
const PREFERENCE_VALUES = ['call', 'email', 'exploring'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isString(v) { return typeof v === 'string'; }

app.post('/api/inquiries', formLimiter, async (req, res) => {
  try {
    const body = req.body || {};

    // Honeypot: bots fill every field, real users never see/fill this one.
    if (body.companyWebsite) {
      // Pretend it worked so bots don't learn anything, but don't store/send.
      return res.status(200).json({ ok: true });
    }

    const name = isString(body.name) ? body.name.trim().slice(0, 200) : '';
    const email = isString(body.email) ? body.email.trim().slice(0, 200) : '';
    const business = isString(body.business) ? body.business.trim().slice(0, 200) : '';
    const need = NEED_VALUES.includes(body.need) ? body.need : '';
    const hasSite = body.hasSite === 'yes' ? 'yes' : 'no';
    const websiteUrl = hasSite === 'yes' && isString(body.websiteUrl) ? body.websiteUrl.trim().slice(0, 300) : '';
    const budget = BUDGET_VALUES.includes(body.budget) ? body.budget : '';
    const message = isString(body.message) ? body.message.trim().slice(0, 3000) : '';
    const preference = PREFERENCE_VALUES.includes(body.preference) ? body.preference : 'email';
    const lang = ['en', 'fr', 'ar'].includes(body.lang) ? body.lang : 'en';

    if (!name || !email || !business || !need || !message || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Missing or invalid required fields.' });
    }

    const inquiry = { name, email, business, need, hasSite, websiteUrl, budget, message, preference, lang };

    insertInquiry.run(inquiry);

    // Respond right away - the submission is already safely stored.
    res.status(201).json({ ok: true });

    // Send emails in the background so a slow/unreachable SMTP server never delays the user.
    Promise.allSettled([
      sendOwnerNotification(inquiry),
      sendClientConfirmation(inquiry)
    ]).then(results => {
      results.forEach(r => { if (r.status === 'rejected') console.error('Email sending failed:', r.reason); });
    });
    return;
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// --- Simple protected endpoints for a future admin dashboard ---
function requireAdminKey(req, res, next) {
  const key = req.header('x-admin-key');
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/inquiries', requireAdminKey, (req, res) => {
  res.json(listInquiries.all());
});
const id = Number.parseInt(req.params.id, 10);

if (!Number.isInteger(id)) {
  return res.status(400).json({ error: 'Invalid inquiry ID.' });
}

updateStatus.run(status, id);
app.patch('/api/inquiries/:id/status', requireAdminKey, (req, res) => {
  const validStatuses = ['new', 'contacted', 'call_booked', 'proposal_sent', 'won', 'lost'];
  const { status } = req.body || {};
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  updateStatus.run(status, req.params.id);
  res.json({ ok: true });
});

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
