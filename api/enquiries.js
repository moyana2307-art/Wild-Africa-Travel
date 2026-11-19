const { validateEnquiry } = require('../server/lib/security');
const { crypto, handle, persistRecord, rateLimited, readBody, sendJson, sendNotification } = require('./_lib/http');

module.exports = (req, res) =>
  handle(req, res, async () => {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return sendJson(res, 405, { ok: false, message: 'Method not allowed.' });
    }

    if (rateLimited(req, res, 'enquiries', 15 * 60 * 1000, 10)) {
      return sendJson(res, 429, { ok: false, message: 'Too many requests. Please try again later.' });
    }

    const validation = validateEnquiry(readBody(req) || {});
    if (validation.error) return sendJson(res, 400, { ok: false, message: validation.error });

    const record = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...validation.value
    };

    const result = await persistRecord('enquiries', record);
    if (result.error) return sendJson(res, 503, { ok: false, message: 'Enquiries are temporarily unavailable.' });

    let notified = false;
    try {
      notified = await sendNotification(
        'New travel enquiry',
        `Destination: ${record.destination}\nDates: ${record.startDate} to ${record.endDate}\nEmail: ${record.email}\nPhone: ${record.phone}\n\n${record.message}`
      );
    } catch (notificationError) {
      console.error('Email notification failed:', notificationError.message);
    }

    return sendJson(res, 201, { ok: true, id: record.id, storage: result.storage, notified });
  });
