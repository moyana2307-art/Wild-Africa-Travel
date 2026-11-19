import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading, TextLink } from '../components/SectionHeading';
import { DestinationCard, JourneyCard } from '../components/Cards';
import { destinations, journeys } from '../data/site';

export default function DestinationDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const destination = destinations.find((item) => item.slug === slug);
  const gallery = destination?.gallery || [];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null || gallery.length === 0) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
        return;
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) => (current === null ? 0 : (current - 1 + gallery.length) % gallery.length));
        return;
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => (current === null ? 0 : (current + 1) % gallery.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, gallery.length]);

  if (!destination) {
    return (
      <>
        <Seo title="Destination not found" />
        <section className="flex min-h-[70vh] items-center justify-center bg-ivory px-5 py-24">
          <div className="max-w-lg text-center">
            <p className="eyebrow mb-5 text-forest-600">404</p>
            <SplitHeading as="h1" first="Destination" second="not found" tone="dark" size="md" className="text-center" />
            <p className="mt-6 text-sm leading-7 text-charcoal/65">This destination may have moved. Browse all destinations to continue exploring.</p>
            <Link to="/destinations" className="btn-editorial btn-dark mt-8">
              {t('common.allDestinations')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  const name = t(`destinations.${destination.key}.name`, destination.name);
  const intro = t(`destinations.${destination.key}.intro`, '') || t(`destinations.${destination.key}.description`, '');
  const description = t(`destinations.${destination.key}.description`, '') || intro;
  const travelInfo = t(`destinations.${destination.key}.travelInfo`, '') || 'Our team can advise on the practical details for this destination.';
  const translatedHighlights = t(`destinations.${destination.key}.highlights`, { returnObjects: true });
  const highlights = Array.isArray(translatedHighlights) ? translatedHighlights : [];
  const heroParts = name.split(/\s+/).filter(Boolean);
  const heroStart = heroParts.shift() || name;
  const heroEnd = heroParts.join(' ');
  const activeImage = lightboxIndex === null ? null : gallery[lightboxIndex];

  const facts = [
    { label: 'Country', value: destination.country },
    { label: 'Region', value: destination.region },
    { label: 'Best for', value: highlights.slice(0, 2).map(String).join(' · ') || 'Tailored experiences' },
    { label: 'Planning', value: t('common.durationOnRequest', 'Duration on request') }
  ];

  const matchingJourneys = journeys.filter((journey) => {
    const haystack = `${journey.slug} ${journey.category} ${t(`journeys.${journey.key}.destinations`, '')}`.toLowerCase();
    return haystack.includes(destination.slug) || haystack.includes(name.toLowerCase()) || haystack.includes(destination.country.toLowerCase());
  });
  const suggestedJourneys = (matchingJourneys.length ? matchingJourneys : journeys).slice(0, 3);

  const otherDestinations = destinations.filter((item) => item.slug !== destination.slug);
  const sameCountry = otherDestinations.filter((item) => item.country === destination.country);
  const relatedDestinations = [
    ...sameCountry,
    ...otherDestinations.filter((item) => item.country !== destination.country)
  ].slice(0, 3);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrevious = () => {
    setLightboxIndex((current) => (current === null ? 0 : (current - 1 + gallery.length) % gallery.length));
  };
  const showNext = () => {
    setLightboxIndex((current) => (current === null ? 0 : (current + 1) % gallery.length));
  };

  return (
    <>
      <Seo title={name} description={description} image={destination.image} />
      <PageHero
        image={destination.image}
        eyebrow={`${destination.country} · ${destination.region}`}
        start={heroStart}
        end={heroEnd}
        text={intro}
        crumb={name}
      >
        <Link to={`/contact?destination=${destination.slug}`} className="btn-editorial btn-light">
          {t('common.planTrip')}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <Link to="/destinations" className="btn-editorial btn-outline-light">
          {t('common.allDestinations')}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="border-y border-forest-900/10 bg-sand-50">
        <div className="mx-auto grid max-w-editorial grid-cols-2 divide-y divide-forest-900/10 px-5 sm:px-8 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-10">
          {facts.map((fact) => (
            <div key={fact.label} className="px-3 py-8 sm:px-5">
              <p className="eyebrow mb-3 text-forest-600">{fact.label}</p>
              <p className="text-sm leading-6 text-forest-900">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Destination guide"
            start="Discover"
            end={name}
            text="A closer look at the landscape, the experiences and the practical details that shape a visit."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <Reveal>
              <p className="font-display text-2xl leading-relaxed text-forest-900 sm:text-4xl">{intro}</p>
            </Reveal>
            <Reveal delay={0.12} className="border-l border-forest-600/40 pl-7">
              <p className="eyebrow mb-4 text-forest-600">Travel information</p>
              <p className="text-sm leading-7 text-charcoal/70">{travelInfo}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Gallery" start="Moments from" end={name} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open image ${index + 1} of ${gallery.length}`}
                className="group relative aspect-[4/5] overflow-hidden bg-forest-900"
              >
                <img
                  src={src}
                  alt={`${name} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-forest-950/0 transition-colors group-hover:bg-forest-950/20" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Highlights" start="Things to" end="experience" text="A starting point for the moments worth making time for." />
          <div className="mt-12 grid gap-x-12 border-t border-forest-900/10 md:grid-cols-2">
            {highlights.map((highlight, index) => (
              <Reveal key={`${highlight}-${index}`} delay={index * 0.05} className="flex gap-6 border-b border-forest-900/10 py-7">
                <span className="font-display text-3xl text-forest-600">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-base leading-7 text-forest-900">{String(highlight)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-10">
          <SectionHeading eyebrow="Where to stay" start="Accommodation" end="guidance" />
          <Reveal delay={0.12}>
            <p className="text-base leading-8 text-charcoal/70">
              We do not suggest properties before understanding your plans. After discussing your dates, budget and preferences, our team can recommend verified accommodation that suits your route.
            </p>
            <div className="mt-8">
              <TextLink to={`/contact?destination=${destination.slug}`}>Ask about accommodation</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.journeys')}
            start="Suggested"
            end="itineraries"
            text="Routes that include this destination or connect it with the wider region."
            action={<TextLink to="/journeys">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {suggestedJourneys.map((journey, index) => (
              <JourneyCard key={journey.slug} journey={journey} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.destinations')}
            start="Continue"
            end="exploring"
            text="Other places you could pair with this destination."
            action={<TextLink to="/destinations">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedDestinations.map((item, index) => (
              <DestinationCard key={item.slug} destination={item} className="min-h-[420px]" delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-ivory sm:py-28">
        <div className="mx-auto max-w-editorial px-5 text-center sm:px-8 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">{t('nav.planTrip')}</p>
            <SplitHeading first={t('home.outroTitleStart')} second={t('home.outroTitleEnd')} tone="light" size="md" />
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-ivory/70">{t('home.outroText')}</p>
            <Link to={`/contact?destination=${destination.slug}`} className="btn-editorial btn-light mt-9">
              {t('common.planTrip')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/95 px-5 py-16">
          <button type="button" aria-label="Close gallery" className="absolute inset-0 cursor-default" onClick={closeLightbox} />
          <div className="relative z-10 w-full max-w-6xl">
            <div className="mb-5 flex items-center justify-between gap-4 text-ivory">
              <p className="eyebrow text-sand-200">{name} · Gallery</p>
              <p className="text-xs tracking-[0.2em] text-ivory/60">{lightboxIndex + 1} / {gallery.length}</p>
            </div>
            <div className="relative flex items-center justify-center">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute left-0 z-20 grid h-11 w-11 place-items-center border border-ivory/40 text-ivory transition-colors hover:border-sand-200 hover:text-sand-200 sm:-left-4"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <img
                src={activeImage}
                alt={`${name} ${lightboxIndex + 1}`}
                className="max-h-[70vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-0 z-20 grid h-11 w-11 place-items-center border border-ivory/40 text-ivory transition-colors hover:border-sand-200 hover:text-sand-200 sm:-right-4"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 flex justify-center">
              <button type="button" onClick={closeLightbox} className="btn-editorial btn-outline-light">
                <X size={15} aria-hidden="true" />
                {t('common.close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
