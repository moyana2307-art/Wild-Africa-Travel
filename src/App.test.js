import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';
import Privacy from './pages/Privacy';

const { validateEnquiry, validateNewsletter, sanitizeContent } = require('../server/lib/security');

const isoAfter = (days) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

const validEnquiry = () => ({
  fullName: 'Travel Guest',
  email: 'guest@example.com',
  phone: '+263 77 123 4567',
  nationality: 'Zimbabwean',
  language: 'en',
  destination: 'victoria-falls',
  startDate: isoAfter(30),
  endDate: isoAfter(37),
  travelers: 2,
  travelType: 'safari',
  services: ['tours', 'flights'],
  message: 'Please help me plan.',
  source: '/contact'
});

test('renders the privacy page', () => {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>
    </HelmetProvider>
  );

  expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument();
});

test('server validates enquiry types, lengths and allowed values', () => {
  expect(validateEnquiry(validEnquiry()).error).toBeUndefined();
  expect(validateEnquiry({ ...validEnquiry(), travelers: true }).error).toMatch(/between 1 and 40/i);
  expect(validateEnquiry({ ...validEnquiry(), destination: 'unknown-place' }).error).toMatch(/valid destination/i);
  expect(validateEnquiry({ ...validEnquiry(), services: ['unknown'] }).error).toMatch(/valid services/i);
  expect(validateEnquiry({ ...validEnquiry(), fullName: 'a'.repeat(121) }).error).toMatch(/full name/i);
  expect(validateEnquiry({ ...validEnquiry(), role: 'admin' }).error).toMatch(/unexpected field/i);
});

test('server rejects invalid dates and newsletter payloads', () => {
  expect(validateEnquiry({ ...validEnquiry(), startDate: isoAfter(10), endDate: isoAfter(3) }).error).toMatch(/end date/i);
  expect(validateEnquiry({ ...validEnquiry(), startDate: '2020-01-01', endDate: '2020-01-08' }).error).toMatch(/past/i);
  expect(validateNewsletter({ email: 'guest@example.com', source: '/contact' }).error).toBeUndefined();
  expect(validateNewsletter({ email: 'not-an-email' }).error).toMatch(/valid email/i);
  expect(validateNewsletter({ email: 'guest@example.com', admin: true }).error).toMatch(/unexpected field/i);
});

test('content writes cannot override identifiers or unsupported fields', () => {
  expect(sanitizeContent({ title: 'A story', published: true, body: ['Paragraph'] }, 'stories').error).toBeUndefined();
  expect(sanitizeContent({ title: 'A story', id: 'forge-id' }, 'stories').error).toMatch(/unsupported field/i);
  expect(sanitizeContent({ title: 'A story', createdAt: '2000-01-01' }, 'stories').error).toMatch(/unsupported field/i);
  expect(sanitizeContent({ title: 'A story', role: 'admin' }, 'stories').error).toMatch(/unsupported field/i);
});
