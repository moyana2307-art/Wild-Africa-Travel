const crypto = require('crypto');
const nodemailer = require('nodemailer');

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const rateBuckets = new Map();

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' data: https://fonts.gstatic.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob: https://commons.wikimedia.org https://upload.wikimedia.org https://*.tile.openstreetmap.org",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
  'upgrade-insecure-requests'
].join('; ');

let mailer;

function applyHeaders(req, res) {
  res.setHeader('Content-Security-Policy', contentSecurityPolicy);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');

  const origin = req.headers.origin;
  if (!origin) return true;
  if (!allowedOrigins.includes(origin)) return false;

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '600');
  res.setHeader('Vary', 'Origin');
  return true;
}

function handleOptions(req, res) {
  if (req.method !== 'OPTIONS') return false;
  res.statusCode = 204;
  res.end();
  return true;
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function rateLimited(req, res, key, windowMs, limit) {
  const forwarded = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown');
  const ip = forwarded.split(',')[0].trim();
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();

  if (rateBuckets.size > 10000) rateBuckets.clear();

  const bucket = rateBuckets.get(bucketKey);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (bucket.count >= limit) {
    res.setHeader('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
    return true;
  }
  bucket.count += 1;
  return false;
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      const parsed = JSON.parse(req.body);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_KEY;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json'
  };
}

function storageConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
}

async function persistRecord(table, record) {
  if (!storageConfigured()) return { error: 'Storage is not configured.' };
  const response = await fetch(`${process.env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...supabaseHeaders(), Prefer: 'return=minimal' },
    body: JSON.stringify(record)
  });
  if (!response.ok) throw new Error(`Database request failed with status ${response.status}`);
  return { storage: 'database' };
}

async function newsletterEmailExists(email) {
  if (!storageConfigured()) return false;
  const url = `${process.env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/newsletter_subscriptions?email=eq.${encodeURIComponent(email)}&select=id`;
  const response = await fetch(url, { method: 'GET', headers: supabaseHeaders() });
  if (!response.ok) throw new Error(`Database lookup failed with status ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) && rows.length > 0;
}

function getMailer() {
  if (!process.env.SMTP_HOST) return null;
  if (!mailer) {
    mailer = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    });
  }
  return mailer;
}

async function sendNotification(subject, text) {
  const transport = getMailer();
  if (!transport || !process.env.ENQUIRY_NOTIFY_EMAIL) return false;
  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.ENQUIRY_NOTIFY_EMAIL,
    to: process.env.ENQUIRY_NOTIFY_EMAIL,
    subject,
    text
  });
  return true;
}

async function handle(req, res, handler) {
  if (!applyHeaders(req, res)) return sendJson(res, 403, { ok: false, message: 'Origin not allowed.' });
  if (handleOptions(req, res)) return undefined;

  try {
    await handler(req, res);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`, error);
    if (!res.headersSent) {
      sendJson(res, 500, { ok: false, message: 'Something went wrong. Please try again later.' });
    }
  }
  return undefined;
}

module.exports = {
  crypto,
  handle,
  newsletterEmailExists,
  persistRecord,
  rateLimited,
  readBody,
  sendJson,
  sendNotification
};
