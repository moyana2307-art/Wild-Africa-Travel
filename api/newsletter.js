const { validateNewsletter } = require('../server/lib/security');
const {
  crypto,
  handle,
  newsletterEmailExists,
  persistRecord,
  rateLimited,
  readBody,
  sendJson
} = require('./_lib/http');

module.exports = (req, res) =>
  handle(req, res, async () => {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return sendJson(res, 405, { ok: false, message: 'Method not allowed.' });
    }

    if (rateLimited(req, res, 'newsletter', 60 * 60 * 1000, 5)) {
      return sendJson(res, 429, { ok: false, message: 'Too many requests. Please try again later.' });
    }

    const validation = validateNewsletter(readBody(req) || {});
    if (validation.error) return sendJson(res, 400, { ok: false, message: validation.error });

    const email = validation.value.email;
    if (await newsletterEmailExists(email)) {
      return sendJson(res, 200, { ok: true, duplicate: true });
    }

    const record = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      email,
      source: validation.value.source
    };

    const result = await persistRecord('newsletter_subscriptions', record);
    if (result.error) return sendJson(res, 503, { ok: false, message: 'Subscription is temporarily unavailable.' });

    return sendJson(res, 201, { ok: true, id: record.id, storage: result.storage });
  });
