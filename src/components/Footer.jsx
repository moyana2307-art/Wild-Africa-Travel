import { Facebook, Instagram, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import NewsletterForm from './NewsletterForm';
import { company, destinations, services } from '../data/site';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-forest-950 text-ivory">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 border-b border-ivory/10 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-7 max-w-sm text-sm leading-7 text-ivory/60">{t('footer.intro')}</p>
            <div className="mt-8 space-y-3 text-sm text-ivory/70">
              <a href={`mailto:${company.email}`} className="flex items-start gap-3 hover:text-sand-200">
                <Mail size={16} className="mt-1 shrink-0 text-sand-200" aria-hidden="true" />
                {company.email}
              </a>
              {company.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-start gap-3 hover:text-sand-200">
                  <Phone size={16} className="mt-1 shrink-0 text-sand-200" aria-hidden="true" />
                  {phone}
                </a>
              ))}
              <p className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-sand-200" aria-hidden="true" />
                <span>{company.offices[0]}</span>
              </p>
            </div>
            <div className="mt-7 flex gap-3">
              {company.social.map((social) => {
                const Icon = social.name === 'Facebook' ? Facebook : Instagram;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-sand-200 hover:text-sand-200"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-6 text-sand-200">{t('footer.explore')}</h3>
            <ul className="space-y-3 text-sm text-ivory/65">
              <li><Link to="/discover-africa" className="hover:text-sand-200">{t('nav.discover')}</Link></li>
              <li><Link to="/destinations" className="hover:text-sand-200">{t('nav.destinations')}</Link></li>
              <li><Link to="/experiences" className="hover:text-sand-200">{t('nav.experiences')}</Link></li>
              <li><Link to="/journeys" className="hover:text-sand-200">{t('nav.journeys')}</Link></li>
              <li><Link to="/stories" className="hover:text-sand-200">{t('nav.stories')}</Link></li>
              {destinations.slice(0, 4).map((destination) => (
                <li key={destination.slug}>
                  <Link to={`/destinations/${destination.slug}`} className="hover:text-sand-200">{destination.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-6 text-sand-200">{t('footer.services')}</h3>
            <ul className="space-y-3 text-sm text-ivory/65">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/services#${service.id}`} className="hover:text-sand-200">{t(`services.${service.key}.title`)}</Link>
                </li>
              ))}
              <li><Link to="/about" className="hover:text-sand-200">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-sand-200">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-6 text-sand-200">{t('footer.newsletter')}</h3>
            <p className="mb-6 text-sm leading-7 text-ivory/60">{t('footer.newsletterText')}</p>
            <NewsletterForm dark />
            <Link to="/contact" className="link-editorial mt-6 text-ivory hover:text-sand-200">
              {t('nav.planTrip')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Wild Africa Travel. {t('footer.rights')}</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="hover:text-sand-200">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-sand-200">{t('footer.terms')}</Link>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-sand-200">WhatsApp</a>
          </div>
          <p>{t('footer.photoCredit')}</p>
        </div>
      </div>
    </footer>
  );
}
