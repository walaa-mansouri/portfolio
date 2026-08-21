require('dotenv').config();

const express = require('express');
const { notifyNewInquiry } = require('./email');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const {
  insertInquiry,
  listInquiries,
  updateStatus
} = require('./db');

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

/* =========================================================
   CORS
========================================================= */

// Your frontend domains
const allowedOrigins = [
  'https://walaamansouri.com',
  'https://www.walaamansouri.com',
  'https://walaa-mansouri.netlify.app',

  // Local development
  'http://localhost:3000',
  'http://localhost:5173'
];

// Also allow additional origins from Render environment variables
if (process.env.ALLOWED_ORIGINS) {
  const extraOrigins = process.env.ALLOWED_ORIGINS
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  extraOrigins.forEach(origin => {
    if (!allowedOrigins.includes(origin)) {
      allowedOrigins.push(origin);
    }
  });
}

console.log('[CORS] Allowed origins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without an Origin header
    // (health checks, Postman, server-to-server requests, etc.)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn('[CORS] Blocked origin:', origin);

    return callback(new Error('Not allowed by CORS'));
  },

  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-admin-key'
  ],

  credentials: false
};

// IMPORTANT:
// This must be before your routes.
app.use(cors(corsOptions));

/* =========================================================
   BODY PARSING
========================================================= */

app.use(express.json({
  limit: '20kb'
}));

/* =========================================================
   RATE LIMITING
========================================================= */

// Contact form limiter
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error: 'Too many requests. Please try again later.'
  }
});

// Stricter limiter for admin endpoints
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error: 'Too many requests. Please try again later.'
  }
});

/* =========================================================
   VALIDATION
========================================================= */

const NEED_VALUES = [
  'new',
  'redesign',
  'landing',
  'booking',
  'multilingual',
  'unsure'
];

const BUDGET_VALUES = [
  'under500',
  '500-750',
  '750-1000',
  '1000plus',
  'unsure',
  ''
];

const PREFERENCE_VALUES = [
  'call',
  'email',
  'exploring'
];

const LANG_VALUES = [
  'en',
  'fr',
  'ar'
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isString(value) {
  return typeof value === 'string';
}

/* =========================================================
   CONTACT FORM
========================================================= */

app.post('/api/inquiries', formLimiter, async (req, res) => {
  try {
    const body = req.body || {};

    /* -----------------------------------------------------
       HONEYPOT
    ----------------------------------------------------- */

    if (body.companyWebsite) {
      // Pretend the submission succeeded.
      // Do not store it or send emails.
      return res.status(200).json({
        ok: true
      });
    }

    /* -----------------------------------------------------
       SANITIZE + LIMIT INPUT
    ----------------------------------------------------- */

    const name = isString(body.name)
      ? body.name.trim().slice(0, 200)
      : '';

    const email = isString(body.email)
      ? body.email.trim().slice(0, 200)
      : '';

    const business = isString(body.business)
      ? body.business.trim().slice(0, 200)
      : '';

    const need = NEED_VALUES.includes(body.need)
      ? body.need
      : '';

    const hasSite = body.hasSite === 'yes'
      ? 'yes'
      : 'no';

    const websiteUrl =
      hasSite === 'yes' && isString(body.websiteUrl)
        ? body.websiteUrl.trim().slice(0, 300)
        : '';

    const budget = BUDGET_VALUES.includes(body.budget)
      ? body.budget
      : '';

    const message = isString(body.message)
      ? body.message.trim().slice(0, 3000)
      : '';

    const preference = PREFERENCE_VALUES.includes(body.preference)
      ? body.preference
      : 'email';

    const lang = LANG_VALUES.includes(body.lang)
      ? body.lang
      : 'en';

    /* -----------------------------------------------------
       REQUIRED FIELD VALIDATION
    ----------------------------------------------------- */

    if (
      !name ||
      !email ||
      !business ||
      !need ||
      !message ||
      !EMAIL_RE.test(email)
    ) {
      return res.status(400).json({
        error: 'Missing or invalid required fields.'
      });
    }

    /* -----------------------------------------------------
       WEBSITE URL VALIDATION
    ----------------------------------------------------- */

    if (websiteUrl) {
      try {
        const parsedUrl = new URL(websiteUrl);

        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          return res.status(400).json({
            error: 'Invalid website URL.'
          });
        }
      } catch {
        return res.status(400).json({
          error: 'Invalid website URL.'
        });
      }
    }

    /* -----------------------------------------------------
       BUILD INQUIRY
    ----------------------------------------------------- */

    const inquiry = {
      name,
      email,
      business,
      need,
      hasSite,
      websiteUrl,
      budget,
      message,
      preference,
      lang
    };

    /* -----------------------------------------------------
       SAVE TO DATABASE
    ----------------------------------------------------- */

    await insertInquiry(inquiry);

    /* -----------------------------------------------------
       RESPOND TO CLIENT
    ----------------------------------------------------- */

    res.status(201).json({
      ok: true
    });

    /* -----------------------------------------------------
       SEND EMAILS IN BACKGROUND
    ----------------------------------------------------- */

    notifyNewInquiry(inquiry).catch(err => {
      console.error(
        '[email] Background notification error:',
        err?.message || err
      );
    });

  } catch (err) {
    console.error('Error saving inquiry:', err);

    if (!res.headersSent) {
      return res.status(500).json({
        error: 'Server error.'
      });
    }
  }
});

/* =========================================================
   ADMIN AUTHENTICATION
========================================================= */

function requireAdminKey(req, res, next) {
  const configuredKey = process.env.ADMIN_KEY;
  const providedKey = req.header('x-admin-key');

  if (!configuredKey) {
    console.error('ADMIN_KEY is not configured.');

    return res.status(500).json({
      error: 'Server configuration error.'
    });
  }

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  next();
}

/* =========================================================
   GET ALL INQUIRIES
========================================================= */

app.get(
  '/api/inquiries',
  adminLimiter,
  requireAdminKey,
  async (req, res) => {
    try {
      const inquiries = await listInquiries();

      return res.json(inquiries);

    } catch (err) {
      console.error(
        'Error fetching inquiries:',
        err
      );

      return res.status(500).json({
        error: 'Server error.'
      });
    }
  }
);

/* =========================================================
   UPDATE INQUIRY STATUS
========================================================= */

app.patch(
  '/api/inquiries/:id/status',
  adminLimiter,
  requireAdminKey,
  async (req, res) => {
    try {
      const validStatuses = [
        'new',
        'contacted',
        'call_booked',
        'proposal_sent',
        'won',
        'lost'
      ];

      const { status } = req.body || {};

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error: 'Invalid status.'
        });
      }

      const id = Number.parseInt(
        req.params.id,
        10
      );

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          error: 'Invalid inquiry ID.'
        });
      }

      const updatedRows = await updateStatus(
        status,
        id
      );

      if (updatedRows === 0) {
        return res.status(404).json({
          error: 'Inquiry not found.'
        });
      }

      return res.json({
        ok: true
      });

    } catch (err) {
      console.error(
        'Error updating inquiry:',
        err
      );

      return res.status(500).json({
        error: 'Server error.'
      });
    }
  }
);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get('/health', (req, res) => {
  res.json({
    ok: true
  });
});

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use((err, req, res, next) => {
  console.error(
    'Unhandled server error:',
    err
  );

  if (res.headersSent) {
    return next(err);
  }

  // Handle CORS errors cleanly
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS origin not allowed.'
    });
  }

  res.status(500).json({
    error: 'Server error.'
  });
});

/* =========================================================
   START SERVER
========================================================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Backend listening on port ${PORT}`
  );
});