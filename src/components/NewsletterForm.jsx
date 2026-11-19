import { useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NewsletterForm({ dark = false }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('error');
      setMessage(t('home.newsletterError'));
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: window.location.pathname })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || 'Request failed');
      setStatus('success');
      setMessage(t('home.newsletterSuccess'));
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(t('home.newsletterServerError'));
    }
  };

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`newsletter-${dark ? 'footer' : 'section'}`}>{t('home.newsletterPlaceholder')}</label>
        <input
          id={`newsletter-${dark ? 'footer' : 'section'}`}
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder={t('home.newsletterPlaceholder')}
          className={`field flex-1 ${dark ? 'border-ivory/25 bg-ivory/5 text-ivory placeholder:text-ivory/45 focus:border-sand-200 focus:bg-ivory/10' : ''}`}
          aria-invalid={status === 'error'}
        />
        <button type="submit" disabled={status === 'loading'} className={`btn-editorial ${dark ? 'btn-light' : 'btn-dark'} disabled:cursor-not-allowed disabled:opacity-60`}>
          {status === 'loading' ? <LoaderCircle size={15} className="animate-spin" aria-hidden="true" /> : <Check size={15} aria-hidden="true" />}
          {t('home.newsletterButton')}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
      <p aria-live="polite" className={`mt-3 min-h-5 text-xs ${status === 'success' ? 'text-sand-200' : status === 'error' ? 'text-red-300' : dark ? 'text-ivory/45' : 'text-charcoal/50'}`}>
        {message}
      </p>
    </form>
  );
}
