require('dotenv').config();

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const { validateEnquiry, validateNewsletter, sanitizeContent } = require('./lib/security');

const app = express();
const port = process.env.PORT || 5000;
const dataDir = path.join(__dirname, 'data');
const contentDir = path.join(__dirname, 'content');
const buildDir = path.join(__dirname, '..', 'build');

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(contentDir, { recursive: true });

const collections = ['destinations', 'journeys', 'services', 'stories'];
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const mailer = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    })
  : null;

if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
        'style-src': ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https://commons.wikimedia.org',
          'https://upload.wikimedia.org',
          'https://*.tile.openstreetmap.org'
        ]
      }
    }
  })
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600
  })
);
app.use(express.json({ limit: '32kb' }));

const rateLimitOptions = {
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, message: 'Too many requests. Please try again later.' }
};

const enquiryLimiter = rateLimit({
  ...rateLimitOptions,
  windowMs: 15 * 60 * 1000,
  limit: 10
});

const newsletterLimiter = rateLimit({
  ...rateLimitOptions,
  windowMs: 60 * 60 * 1000,
  limit: 5
});

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    const content = fs.readFileSync(file, 'utf8').trim();
    return content ? JSON.parse(content) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  const tempFile = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tempFile, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(tempFile, file);
}

async function persistRecord(table, record) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (url && key) {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(record)
    });
    if (!response.ok) throw new Error(`Database request failed with status ${response.status}`);
    return 'database';
  }

  const file = path.join(dataDir, `${table}.json`);
  const records = readJson(file, []);
  records.push(record);
  writeJson(file, records);
  return 'file';
}

async function sendNotification(subject, text) {
  if (!mailer || !process.env.ENQUIRY_NOTIFY_EMAIL) return false;
  await mailer.sendMail({
    from: process.env.SMTP_FROM || process.env.ENQUIRY_NOTIFY_EMAIL,
    to: process.env.ENQUIRY_NOTIFY_EMAIL,
    subject,
    text
  });
  return true;
}

function adminAuthorized(req) {
  const token = process.env.ADMIN_API_TOKEN;
  const authorization = String(req.headers.authorization || '');
  if (!token || authorization.length > 512) return false;
  const provided = authorization.replace(/^Bearer\s+/i, '');
  const a = Buffer.from(provided);
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'wild-africa-travel' }));

app.post('/api/enquiries', enquiryLimiter, async (req, res) => {
  const validation = validateEnquiry(req.body || {});
  if (validation.error) return res.status(400).json({ ok: false, message: validation.error });

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...validation.value
  };

  try {
    const storage = await persistRecord('enquiries', record);
    let notified = false;
    try {
      notified = await sendNotification(
        'New travel enquiry',
        `Destination: ${record.destination}\nDates: ${record.startDate} to ${record.endDate}\nEmail: ${record.email}\nPhone: ${record.phone}\n\n${record.message}`
      );
    } catch (notificationError) {
      console.error('Email notification failed:', notificationError.message);
    }
    return res.status(201).json({ ok: true, id: record.id, storage, notified });
  } catch (persistError) {
    console.error('Enquiry storage failed:', persistError.message);
    return res.status(500).json({ ok: false, message: 'Could not store your enquiry.' });
  }
});

app.post('/api/newsletter', newsletterLimiter, async (req, res) => {
  const validation = validateNewsletter(req.body || {});
  if (validation.error) return res.status(400).json({ ok: false, message: validation.error });

  const email = validation.value.email;
  const records = readJson(path.join(dataDir, 'newsletter_subscriptions.json'), []);
  if (records.some((record) => record.email === email)) {
    return res.status(200).json({ ok: true, duplicate: true });
  }

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    email,
    source: validation.value.source
  };

  try {
    const storage = await persistRecord('newsletter_subscriptions', record);
    return res.status(201).json({ ok: true, id: record.id, storage });
  } catch (storageError) {
    console.error('Newsletter storage failed:', storageError.message);
    return res.status(500).json({ ok: false, message: 'Could not complete your subscription.' });
  }
});

app.use('/api/content', (req, res, next) => {
  if (!process.env.ADMIN_API_TOKEN) {
    return res.status(503).json({ ok: false, message: 'Content management is awaiting administrator configuration.' });
  }
  if (!adminAuthorized(req)) {
    return res.status(401).json({ ok: false, message: 'Unauthorized.' });
  }
  next();
});

app.get('/api/content/:collection', (req, res) => {
  if (!collections.includes(req.params.collection)) return res.status(404).json({ ok: false, message: 'Unknown collection.' });
  const records = readJson(path.join(contentDir, `${req.params.collection}.json`), []);
  return res.json({ ok: true, records });
});

app.post('/api/content/:collection', (req, res) => {
  if (!collections.includes(req.params.collection)) return res.status(404).json({ ok: false, message: 'Unknown collection.' });
  const validation = sanitizeContent(req.body, req.params.collection);
  if (validation.error) return res.status(400).json({ ok: false, message: validation.error });
  const file = path.join(contentDir, `${req.params.collection}.json`);
  const records = readJson(file, []);
  const record = {
    ...validation.value,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  records.push(record);
  writeJson(file, records);
  return res.status(201).json({ ok: true, record });
});

app.put('/api/content/:collection/:id', (req, res) => {
  if (!collections.includes(req.params.collection)) return res.status(404).json({ ok: false, message: 'Unknown collection.' });
  const validation = sanitizeContent(req.body, req.params.collection);
  if (validation.error) return res.status(400).json({ ok: false, message: validation.error });
  const file = path.join(contentDir, `${req.params.collection}.json`);
  const records = readJson(file, []);
  const index = records.findIndex((record) => record.id === req.params.id);
  if (index === -1) return res.status(404).json({ ok: false, message: 'Record not found.' });
  records[index] = {
    ...records[index],
    ...validation.value,
    id: records[index].id,
    createdAt: records[index].createdAt,
    updatedAt: new Date().toISOString()
  };
  writeJson(file, records);
  return res.json({ ok: true, record: records[index] });
});

app.delete('/api/content/:collection/:id', (req, res) => {
  if (!collections.includes(req.params.collection)) return res.status(404).json({ ok: false, message: 'Unknown collection.' });
  const file = path.join(contentDir, `${req.params.collection}.json`);
  const records = readJson(file, []);
  const remaining = records.filter((record) => record.id !== req.params.id);
  if (remaining.length === records.length) return res.status(404).json({ ok: false, message: 'Record not found.' });
  writeJson(file, remaining);
  return res.json({ ok: true });
});

app.use('/api', (_req, res) => res.status(404).json({ ok: false, message: 'API route not found.' }));

if (fs.existsSync(buildDir)) {
  app.use(express.static(buildDir));
  app.get('*', (_req, res) => res.sendFile(path.join(buildDir, 'index.html')));
}

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ ok: false, message: 'Invalid JSON payload.' });
  }
  if (err.message === 'Origin not allowed by CORS') {
    return res.status(403).json({ ok: false, message: 'Origin not allowed.' });
  }

  const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 500 ? err.status : 500;
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`, err);
  return res.status(status).json({
    ok: false,
    message: status === 500 ? 'Something went wrong. Please try again later.' : err.message
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Wild Africa Travel API listening on http://localhost:${port}`);
  });
}

module.exports = { app };
