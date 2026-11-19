import { useMemo, useState } from 'react';
import { CheckCircle2, LoaderCircle, Mail, MessageCircle, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { company, destinations, services } from '../data/site';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  nationality: '',
  language: 'en',
  destination: '',
  startDate: '',
  endDate: '',
  travelers: '2',
  travelType: '',
  services: [],
  message: ''
};

export default function EnquiryForm() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const journeyParam = searchParams.get('journey') || '';
  const destinationParam = searchParams.get('destination') || '';
  const serviceParam = searchParams.get('service') || '';
  const experienceParam = searchParams.get('experience') || '';
  const initial = useMemo(
    () => ({
      ...emptyForm,
      language: i18n.language,
      destination: destinationParam || '',
      services: services.some((service) => service.id === serviceParam) ? [serviceParam] : [],
      message: journeyParam
        ? `I am interested in the journey: ${journeyParam.replace(/-/g, ' ')}.`
        : experienceParam
          ? `I am interested in the ${experienceParam.replace(/-/g, ' ')} experience.`
          : serviceParam
            ? `I would like assistance with ${serviceParam.replace(/-/g, ' ')}.`
            : ''
    }),
    [i18n.language, destinationParam, journeyParam, serviceParam, experienceParam]
  );
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const toggleService = (id) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(id) ? current.services.filter((item) => item !== id) : [...current.services, id]
    }));
  };

  const validate = () => {
    const required = ['fullName', 'email', 'phone', 'nationality', 'language', 'destination', 'startDate', 'endDate', 'travelers', 'travelType'];
    if (required.some((field) => !String(form[field]).trim())) return t('common.required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return t('common.emailInvalid');
    if (new Date(form.endDate) < new Date(form.startDate)) return 'Travel end date must be after the start date.';
    if (!form.services.length) return 'Please select at least one service.';
    return null;
  };

  const submit = async (event) => {
    event.preventDefault();
    const error = validate();
    if (error) {
      setStatus('error');
      setMessage(error);
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: window.location.pathname })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || 'Request failed');
      setStatus('success');
      setMessage(`${t('common.successTitle')} ${t('common.successText')}`);
    } catch {
      setStatus('error');
      setMessage(t('common.errorText'));
    }
  };

  const whatsappMessage = [
    'Hello Wild Africa Travel, I would like to enquire about a journey.',
    form.fullName && `Name: ${form.fullName}`,
    form.destination && `Destination: ${form.destination}`,
    form.startDate && `Start date: ${form.startDate}`,
    form.endDate && `End date: ${form.endDate}`,
    form.travelers && `Travelers: ${form.travelers}`,
    form.message && `Message: ${form.message}`
  ]
    .filter(Boolean)
    .join('\n');

  const emailHref = `mailto:${company.email}?subject=${encodeURIComponent('Travel enquiry — Wild Africa Travel')}&body=${encodeURIComponent(whatsappMessage)}`;

  if (status === 'success') {
    return (
      <div className="border border-forest-900/10 bg-sand-50 p-10 text-center" role="status">
        <CheckCircle2 size={42} className="mx-auto text-forest-600" aria-hidden="true" />
        <h3 className="mt-5 font-display text-3xl text-forest-900">{t('common.successTitle')}</h3>
        <p className="mt-3 text-sm leading-7 text-charcoal/70">{t('common.successText')}</p>
        <button type="button" className="btn-editorial btn-dark mt-7" onClick={() => { setForm(initial); setStatus('idle'); }}>
          {t('common.close')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="border border-forest-900/10 bg-white p-6 sm:p-9 lg:p-11">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="fullName">{t('contact.fullName')} *</label>
          <input id="fullName" className="field" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label className="field-label" htmlFor="email">{t('contact.email')} *</label>
          <input id="email" type="email" className="field" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
        </div>
        <div>
          <label className="field-label" htmlFor="phone">{t('contact.phone')} *</label>
          <input id="phone" type="tel" className="field" value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
        </div>
        <div>
          <label className="field-label" htmlFor="nationality">{t('contact.nationality')} *</label>
          <input id="nationality" className="field" value={form.nationality} onChange={(e) => update('nationality', e.target.value)} autoComplete="country-name" />
        </div>
        <div>
          <label className="field-label" htmlFor="language">{t('contact.language')} *</label>
          <select id="language" className="field" value={form.language} onChange={(e) => update('language', e.target.value)}>
            <option value="en">{t('contact.english')}</option>
            <option value="sn">{t('contact.shona')}</option>
            <option value="zh">{t('contact.chinese')}</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="destination">{t('contact.destination')} *</label>
          <select id="destination" className="field" value={form.destination} onChange={(e) => update('destination', e.target.value)}>
            <option value="">{t('contact.selectDestination')}</option>
            {destinations.map((destination) => (
              <option key={destination.slug} value={destination.slug}>{destination.name} — {destination.country}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="startDate">{t('contact.startDate')} *</label>
          <input id="startDate" type="date" className="field" value={form.startDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => update('startDate', e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="endDate">{t('contact.endDate')} *</label>
          <input id="endDate" type="date" className="field" value={form.endDate} min={form.startDate || new Date().toISOString().slice(0, 10)} onChange={(e) => update('endDate', e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="travelers">{t('contact.travelers')} *</label>
          <input id="travelers" type="number" min="1" max="40" className="field" value={form.travelers} onChange={(e) => update('travelers', e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="travelType">{t('contact.travelType')} *</label>
          <select id="travelType" className="field" value={form.travelType} onChange={(e) => update('travelType', e.target.value)}>
            <option value="">{t('contact.selectTravelType')}</option>
            {['leisure', 'safari', 'business', 'group', 'honeymoon', 'family', 'other'].map((type) => (
              <option key={type} value={type}>{t(`contact.${type}`)}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="field-label">{t('contact.services')} *</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {services.map((service) => (
            <label key={service.id} className={`flex cursor-pointer items-center gap-2 border px-3 py-2 text-xs transition-colors ${form.services.includes(service.id) ? 'border-forest-700 bg-forest-900 text-ivory' : 'border-forest-900/15 text-charcoal/70 hover:border-forest-600'}`}>
              <input
                type="checkbox"
                className="accent-gold-500"
                checked={form.services.includes(service.id)}
                onChange={() => toggleService(service.id)}
              />
              {t(`services.${service.key}.title`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label className="field-label" htmlFor="message">{t('contact.message')}</label>
        <textarea id="message" rows="5" className="field resize-y" value={form.message} onChange={(e) => update('message', e.target.value)} />
      </div>

      <p aria-live="polite" className={`mt-5 min-h-5 text-sm ${status === 'error' ? 'text-red-700' : 'text-forest-700'}`}>
        {message}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={status === 'loading'} className="btn-editorial btn-dark flex-1 disabled:cursor-not-allowed disabled:opacity-60">
          {status === 'loading' ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
          {status === 'loading' ? t('common.loading') : t('contact.send')}
        </button>
        <a
          href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-editorial btn-outline-dark"
        >
          <MessageCircle size={16} aria-hidden="true" />
          {t('contact.whatsapp')}
        </a>
        <a href={emailHref} className="btn-editorial btn-outline-dark">
          <Mail size={16} aria-hidden="true" />
          {t('contact.emailUs')}
        </a>
      </div>
    </form>
  );
}
