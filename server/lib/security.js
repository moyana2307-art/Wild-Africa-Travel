const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const languages = new Set(['en', 'sn', 'zh']);
const travelTypes = new Set(['leisure', 'safari', 'business', 'group', 'honeymoon', 'family', 'other']);
const serviceIds = new Set(['flights', 'hotels', 'visas', 'cars', 'tours', 'tailor-made']);
const destinationSlugs = new Set([
  'victoria-falls',
  'hwange-national-park',
  'chobe-national-park',
  'okavango-delta',
  'cape-town',
  'kruger-national-park',
  'namibia',
  'zambia',
  'harare',
  'livingstone'
]);

const enquiryFields = new Set([
  'fullName',
  'email',
  'phone',
  'nationality',
  'language',
  'destination',
  'startDate',
  'endDate',
  'travelers',
  'travelType',
  'services',
  'message',
  'source'
]);

const contentFields = {
  destinations: new Set(['slug', 'name', 'country', 'region', 'description', 'intro', 'latitude', 'longitude', 'coverImage', 'featured', 'published', 'gallery', 'key', 'image', 'images']),
  journeys: new Set(['slug', 'title', 'duration', 'durationLabel', 'description', 'intro', 'coverImage', 'image', 'featured', 'published', 'stops', 'highlights', 'sortOrder']),
  services: new Set(['slug', 'key', 'title', 'lead', 'description', 'image', 'imageUrl', 'published', 'sortOrder', 'icon']),
  stories: new Set(['slug', 'key', 'title', 'category', 'excerpt', 'body', 'coverImage', 'image', 'published', 'publishedAt', 'date', 'author', 'readTime'])
};

const blockedKeys = new Set(['__proto__', 'constructor', 'prototype', 'id', 'createdAt', 'updatedAt']);

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function readString(value, min, max) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) return null;
  return trimmed;
}

function parseIsoDate(value) {
  if (typeof value !== 'string' || !isoDateRegex.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;
  return date;
}

function startOfUtcToday() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function validateEnquiry(body) {
  if (!isPlainObject(body)) return { error: 'Invalid request payload.' };

  const unknownField = Object.keys(body).find((field) => !enquiryFields.has(field));
  if (unknownField) return { error: `Unexpected field: ${unknownField}.` };

  const fullName = readString(body.fullName, 2, 120);
  if (!fullName) return { error: 'Please enter a valid full name.' };

  const email = readString(body.email, 3, 254);
  if (!email || !emailRegex.test(email)) return { error: 'Please enter a valid email address.' };

  const phone = readString(body.phone, 7, 40);
  if (!phone || !/^[+()\d\s.-]+$/.test(phone)) return { error: 'Please enter a valid phone number.' };

  const nationality = readString(body.nationality, 2, 80);
  if (!nationality) return { error: 'Please enter a valid nationality.' };

  if (typeof body.language !== 'string' || !languages.has(body.language)) {
    return { error: 'Please select a supported language.' };
  }

  if (typeof body.destination !== 'string' || !destinationSlugs.has(body.destination)) {
    return { error: 'Please select a valid destination.' };
  }

  const startDate = parseIsoDate(body.startDate);
  const endDate = parseIsoDate(body.endDate);
  if (!startDate || !endDate) return { error: 'Please enter valid travel dates.' };
  if (startDate < startOfUtcToday()) return { error: 'Travel start date cannot be in the past.' };
  if (endDate < startDate) return { error: 'Travel end date must be after the start date.' };

  if (typeof body.travelers !== 'number' && typeof body.travelers !== 'string') {
    return { error: 'Please enter between 1 and 40 travelers.' };
  }
  const travelersValue = Number(body.travelers);
  if (!Number.isInteger(travelersValue) || travelersValue < 1 || travelersValue > 40) {
    return { error: 'Please enter between 1 and 40 travelers.' };
  }

  if (typeof body.travelType !== 'string' || !travelTypes.has(body.travelType)) {
    return { error: 'Please select a valid travel type.' };
  }

  if (!Array.isArray(body.services) || body.services.length === 0 || body.services.length > serviceIds.size) {
    return { error: 'Please select at least one service.' };
  }
  if (!body.services.every((service) => typeof service === 'string' && serviceIds.has(service))) {
    return { error: 'Please select valid services.' };
  }

  let message = '';
  if (body.message !== undefined) {
    message = readString(body.message, 0, 4000);
    if (message === null) return { error: 'Please enter a shorter message.' };
  }

  let source = '';
  if (body.source !== undefined) {
    source = readString(body.source, 0, 200);
    if (source === null) return { error: 'Invalid request source.' };
  }

  return {
    value: {
      fullName,
      email: email.toLowerCase(),
      phone,
      nationality,
      language: body.language,
      destination: body.destination,
      startDate: body.startDate,
      endDate: body.endDate,
      travelers: travelersValue,
      travelType: body.travelType,
      services: [...new Set(body.services)],
      message,
      source
    }
  };
}

function validateNewsletter(body) {
  if (!isPlainObject(body)) return { error: 'Invalid request payload.' };

  const unknownField = Object.keys(body).find((field) => field !== 'email' && field !== 'source');
  if (unknownField) return { error: `Unexpected field: ${unknownField}.` };

  const email = readString(body.email, 3, 254);
  if (!email || !emailRegex.test(email)) return { error: 'Please enter a valid email address.' };

  let source = '';
  if (body.source !== undefined) {
    source = readString(body.source, 0, 200);
    if (source === null) return { error: 'Invalid request source.' };
  }

  return { value: { email: email.toLowerCase(), source } };
}

function sanitizeContentValue(value, depth, field) {
  if (depth > 4) return { error: `Field "${field}" is nested too deeply.` };

  if (value === null) return { value: null };
  if (typeof value === 'string') {
    if (value.length > 20000) return { error: `Field "${field}" is too long.` };
    return { value };
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return { error: `Field "${field}" must be a finite number.` };
    return { value };
  }
  if (typeof value === 'boolean') return { value };

  if (Array.isArray(value)) {
    if (value.length > 200) return { error: `Field "${field}" has too many items.` };
    const items = [];
    for (const item of value) {
      const result = sanitizeContentValue(item, depth + 1, field);
      if (result.error) return result;
      items.push(result.value);
    }
    return { value: items };
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value);
    if (keys.length > 100) return { error: `Field "${field}" has too many properties.` };
    const output = {};
    for (const key of keys) {
      if (blockedKeys.has(key) || !/^[A-Za-z0-9_-]{1,64}$/.test(key)) {
        return { error: `Unsupported property in "${field}".` };
      }
      const result = sanitizeContentValue(value[key], depth + 1, key);
      if (result.error) return result;
      output[key] = result.value;
    }
    return { value: output };
  }

  return { error: `Field "${field}" has an unsupported value.` };
}

function sanitizeContent(body, collection) {
  if (!isPlainObject(body)) return { error: 'Invalid request payload.' };

  const allowed = contentFields[collection];
  if (!allowed) return { error: 'Unknown collection.' };

  const output = {};
  for (const [field, value] of Object.entries(body)) {
    if (blockedKeys.has(field) || !allowed.has(field)) {
      return { error: `Unsupported field: ${field}.` };
    }

    if ((field === 'published' || field === 'featured') && typeof value !== 'boolean') {
      return { error: `Field "${field}" must be true or false.` };
    }
    if ((field === 'latitude' || field === 'longitude') && (typeof value !== 'number' || !Number.isFinite(value) || Math.abs(value) > 180)) {
      return { error: `Field "${field}" must be a valid coordinate.` };
    }
    if (field === 'sortOrder' && (!Number.isInteger(value) || value < 0 || value > 10000)) {
      return { error: 'Field "sortOrder" must be between 0 and 10000.' };
    }
    if (field === 'slug' && (typeof value !== 'string' || value.length > 120 || !slugRegex.test(value))) {
      return { error: 'Field "slug" must be a lowercase hyphenated string.' };
    }

    const result = sanitizeContentValue(value, 0, field);
    if (result.error) return result;
    output[field] = result.value;
  }

  return { value: output };
}

module.exports = {
  validateEnquiry,
  validateNewsletter,
  sanitizeContent
};
