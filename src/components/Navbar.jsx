import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import i18n, { languages } from '../i18n';
import { destinations, experiences, services } from '../data/site';

const navKeys = ['home', 'discover', 'destinations', 'experiences', 'services', 'about', 'contact'];
const navPaths = {
  home: '/',
  discover: '/discover-africa',
  destinations: '/destinations',
  experiences: '/experiences',
  services: '/services',
  about: '/about',
  contact: '/contact'
};

function LanguageSwitcher({ dark = false }) {
  const { i18n: instance } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={instance.t('nav.language')}
        className={`flex items-center gap-1.5 px-2 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${dark ? 'text-ivory hover:text-sand-200' : 'text-forest-900 hover:text-forest-600'}`}
      >
        <Globe2 size={15} aria-hidden="true" />
        {languages.find((language) => language.code === instance.language)?.label || 'EN'}
        <ChevronDown size={13} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 mt-2 w-40 border border-forest-900/10 bg-ivory p-1.5 shadow-xl"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => {
                  i18n.changeLanguage(language.code);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors hover:bg-sand-100 ${instance.language === language.code ? 'bg-sand-100 font-semibold text-forest-800' : 'text-charcoal/75'}`}
              >
                {language.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MegaPanel({ menu, onNavigate, t }) {
  const featuredDestinations = destinations.filter((destination) => destination.featured).slice(0, 4);

  if (menu === 'destinations') {
    return (
      <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.4fr_1fr] lg:px-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredDestinations.map((destination) => (
            <Link key={destination.slug} to={`/destinations/${destination.slug}`} onClick={onNavigate} className="group block">
              <div className="image-reveal aspect-[4/5] overflow-hidden">
                <img src={destination.image} alt={destination.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-xs font-semibold text-forest-900 group-hover:text-forest-600">{destination.name}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-charcoal/50">{destination.country}</p>
            </Link>
          ))}
        </div>
        <div>
          <p className="eyebrow mb-4 text-forest-600">{t('nav.exploreMenu')}</p>
          <div className="grid gap-1">
            {destinations.slice(0, 6).map((destination) => (
              <Link key={destination.slug} to={`/destinations/${destination.slug}`} onClick={onNavigate} className="flex items-center justify-between border-b border-forest-900/10 py-2 text-sm text-charcoal/75 hover:text-forest-800">
                {destination.name}
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            ))}
            <Link to="/destinations" onClick={onNavigate} className="link-editorial mt-4 text-forest-800">
              {t('common.allDestinations')} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (menu === 'experiences') {
    return (
      <div className="grid gap-2 px-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        {experiences.map((experience) => (
          <Link key={experience.id} to={`/experiences#${experience.id}`} onClick={onNavigate} className="group border-l border-forest-900/15 pl-4 py-2">
            <p className="text-sm font-semibold text-forest-900 group-hover:text-forest-600">{t(`experiences.${experience.key}.title`)}</p>
            <p className="mt-1 text-xs leading-5 text-charcoal/60">{t(`experiences.${experience.key}.description`)}</p>
          </Link>
        ))}
      </div>
    );
  }

  if (menu === 'services') {
    return (
      <div className="grid gap-2 px-6 py-7 sm:grid-cols-2 lg:grid-cols-3 lg:px-12">
        {services.map((service) => (
          <Link key={service.id} to={`/services#${service.id}`} onClick={onNavigate} className="group flex items-start gap-3 border border-transparent p-3 hover:border-forest-900/10 hover:bg-sand-50">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-forest-600" />
            <span>
              <span className="block text-sm font-semibold text-forest-900 group-hover:text-forest-600">{t(`services.${service.key}.title`)}</span>
              <span className="mt-1 block text-xs text-charcoal/60">{t(`services.${service.key}.lead`)}</span>
            </span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 px-6 py-8 sm:grid-cols-3 lg:px-12">
      <Link to="/discover-africa" onClick={onNavigate} className="group">
        <p className="font-display text-2xl text-forest-900 group-hover:text-forest-600">Discover Africa</p>
        <p className="mt-2 text-sm text-charcoal/60">Landscapes, rivers and wilderness across the region.</p>
      </Link>
      <Link to="/journeys" onClick={onNavigate} className="group">
        <p className="font-display text-2xl text-forest-900 group-hover:text-forest-600">Journeys</p>
        <p className="mt-2 text-sm text-charcoal/60">Curated routes ready to be tailored to you.</p>
      </Link>
      <Link to="/stories" onClick={onNavigate} className="group">
        <p className="font-display text-2xl text-forest-900 group-hover:text-forest-600">Stories</p>
        <p className="mt-2 text-sm text-charcoal/60">Practical guides and travel inspiration.</p>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen || Boolean(openMenu);
  const menuKeys = ['destinations', 'experiences', 'services', 'discover'];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-ivory/10 text-ivory backdrop-blur-xl transition-all duration-500 ${
          solid ? 'bg-forest-950/90 shadow-[0_18px_50px_rgba(11,26,18,0.28)]' : 'bg-gradient-to-b from-forest-950/75 to-forest-950/30'
        }`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="mx-auto flex h-20 max-w-editorial items-center justify-between gap-4 px-5 sm:px-8 lg:h-24 lg:px-10">
          <Logo light />

          <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary navigation">
            {navKeys.map((key) => {
              const hasMenu = menuKeys.includes(key);
              return (
                <div key={key} className="relative" onMouseEnter={() => setOpenMenu(hasMenu ? key : null)}>
                  <Link
                    to={navPaths[key]}
                    className={`flex items-center gap-1 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      location.pathname === navPaths[key] ? 'text-sand-200' : 'text-ivory/85 hover:text-sand-200'
                    }`}
                  >
                    {t(`nav.${key}`)}
                    {hasMenu && <ChevronDown size={12} aria-hidden="true" />}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher dark />
            </div>
            <Link to="/contact" className="btn-editorial btn-outline-light hidden md:inline-flex">
              {t('nav.planTrip')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="ml-1 inline-flex h-11 w-11 items-center justify-center border border-ivory/40 text-ivory transition-colors hover:border-sand-200 hover:text-sand-200 xl:hidden"
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.menu')}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-forest-900/10 bg-ivory text-charcoal shadow-[0_24px_60px_rgba(12,24,17,0.14)] xl:block"
              onMouseEnter={() => setOpenMenu(openMenu)}
            >
              <MegaPanel menu={openMenu} onNavigate={() => setOpenMenu(null)} t={t} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-forest-950 pt-24 text-ivory xl:hidden"
          >
            <div className="mx-auto max-w-2xl px-6 pb-16">
              <div className="mb-8 flex items-center justify-between border-b border-ivory/15 pb-5">
                <span className="eyebrow text-sand-200">{t('nav.menu')}</span>
                <LanguageSwitcher dark />
              </div>
              <nav aria-label="Mobile navigation" className="divide-y divide-ivory/10">
                {navKeys.map((key, index) => {
                  const hasMenu = menuKeys.includes(key);
                  return (
                    <motion.div key={key} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="py-1">
                      <div className="flex items-center justify-between">
                        <Link to={navPaths[key]} className="flex-1 py-4 font-display text-3xl hover:text-sand-200">
                          {t(`nav.${key}`)}
                        </Link>
                        {hasMenu && (
                          <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center text-ivory/70"
                            aria-label={`${t('nav.exploreMenu')} ${t(`nav.${key}`)}`}
                            aria-expanded={mobileSection === key}
                            onClick={() => setMobileSection(mobileSection === key ? null : key)}
                          >
                            <ChevronDown size={20} className={`transition-transform ${mobileSection === key ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {mobileSection === key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-2 pb-5 pl-2 text-sm text-ivory/65">
                              {key === 'destinations' &&
                                destinations.slice(0, 6).map((destination) => (
                                  <Link key={destination.slug} to={`/destinations/${destination.slug}`} className="hover:text-sand-200">
                                    {destination.name}
                                  </Link>
                                ))}
                              {key === 'experiences' &&
                                experiences.map((experience) => (
                                  <Link key={experience.id} to={`/experiences#${experience.id}`} className="hover:text-sand-200">
                                    {t(`experiences.${experience.key}.title`)}
                                  </Link>
                                ))}
                              {key === 'services' &&
                                services.map((service) => (
                                  <Link key={service.id} to={`/services#${service.id}`} className="hover:text-sand-200">
                                    {t(`services.${service.key}.title`)}
                                  </Link>
                                ))}
                              {key === 'discover' && (
                                <>
                                  <Link to="/journeys" className="hover:text-sand-200">{t('nav.journeys')}</Link>
                                  <Link to="/stories" className="hover:text-sand-200">{t('nav.stories')}</Link>
                                </>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </nav>
              <Link to="/contact" className="btn-editorial btn-light mt-10 w-full">
                {t('nav.planTrip')}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
