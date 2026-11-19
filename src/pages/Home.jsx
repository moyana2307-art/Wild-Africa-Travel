import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  BookOpenCheck,
  CarFront,
  Compass,
  FileCheck2,
  Headset,
  Plane,
  Route,
  UserRoundCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import SectionHeading, { SplitHeading, TextLink } from '../components/SectionHeading';
import { DestinationCard, ExperienceCard, JourneyCard, StoryCard } from '../components/Cards';
import DestinationMap from '../components/DestinationMap';
import NewsletterForm from '../components/NewsletterForm';
import { destinations, experiences, heroSlides, images, journeys, stories, whyUs } from '../data/site';

const whyIcons = {
  UserRoundCheck,
  BookOpenCheck,
  Plane,
  BedDouble,
  FileCheck2,
  Headset,
  Route,
  CarFront,
  Compass
};

const featuredPlaces = destinations.filter((destination) => destination.featured).slice(0, 5);

const destinationGrid = [
  'md:col-span-7 md:row-span-2 min-h-[430px] lg:min-h-[560px]',
  'md:col-span-5 min-h-[270px]',
  'md:col-span-5 min-h-[270px]',
  'md:col-span-4 min-h-[380px]',
  'md:col-span-4 min-h-[380px]',
  'md:col-span-4 min-h-[380px]',
  'md:col-span-6 min-h-[360px]',
  'md:col-span-6 min-h-[360px]'
];

export default function Home() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [activePlace, setActivePlace] = useState(0);
  const current = heroSlides[slide];

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((index) => (index + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (direction) => {
    setSlide((index) => (index + direction + heroSlides.length) % heroSlides.length);
  };

  const movePlace = (direction) => {
    setActivePlace((index) => (index + direction + featuredPlaces.length) % featuredPlaces.length);
  };

  const scrollToDiscover = () => {
    document.getElementById('discover')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <Seo description="Tailored Southern African journeys, Victoria Falls tours, safaris and complete travel planning from Zimbabwe." image={images.fallsWide} />
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest-950 text-ivory" aria-label="Hero">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
            transition={{ duration: reduced ? 0.01 : 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img src={current.image} alt={`${current.name}, ${current.country}`} className="h-full w-full object-cover" fetchPriority={slide === 0 ? 'high' : 'auto'} />
          </motion.div>
        </AnimatePresence>
        <div className="scrim-dark absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] top-1/2 hidden h-[44rem] w-[44rem] -translate-y-1/2 items-center justify-center rounded-full border border-ivory/15 bg-sand-200/5 lg:flex">
          <div className="h-[30rem] w-[30rem] rounded-full border border-ivory/10 bg-forest-950/60" />
          <div className="absolute h-[11rem] w-[11rem] rounded-full bg-forest-950/85" />
        </div>

        <div className="relative mx-auto w-full max-w-editorial px-5 pb-32 pt-28 sm:px-8 lg:px-10 lg:pb-36">
          <div className="max-w-4xl">
            <motion.p
              key={`intro-${current.id}`}
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="eyebrow mb-7 flex items-center gap-4 text-sand-200"
            >
              <span className="h-px w-12 bg-sand-200" />
              {t('home.heroIntro')}
            </motion.p>
            <motion.div
              key={`title-${current.id}`}
              initial={{ opacity: 0, y: reduced ? 0 : 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <SplitHeading as="h1" first={t('home.heroTitleStart')} second={t('home.heroTitleEnd')} tone="light" size="lg" />
            </motion.div>
            <motion.p
              key={`text-${current.id}`}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-8 max-w-2xl text-sm leading-7 text-ivory/80 sm:text-base"
            >
              {t('home.heroText')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/destinations" className="btn-editorial btn-light">
                {t('home.heroPrimary')}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn-editorial btn-outline-light">
                {t('home.heroSecondary')}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-ivory/15 bg-forest-950/35 backdrop-blur-sm">
          <div className="mx-auto flex max-w-editorial flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-sand-200" />
              <span className="eyebrow text-ivory/60">{t('home.slideLabel')}</span>
              <Link to={`/destinations/${current.slug}`} className="text-sm text-ivory hover:text-sand-200">
                {current.name} <span className="text-ivory/50">· {current.country}</span>
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2" role="group" aria-label="Hero slides">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSlide(index)}
                    aria-label={`${t('home.slideLabel')}: ${item.name}`}
                    aria-current={index === slide}
                    className={`h-px transition-all duration-500 ${index === slide ? 'w-10 bg-sand-200' : 'w-5 bg-ivory/40 hover:bg-ivory'}`}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => goToSlide(-1)} aria-label={t('home.previousSlide')} className="flex h-8 w-8 items-center justify-center text-ivory/70 hover:text-sand-200">
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => goToSlide(1)} aria-label={t('home.nextSlide')} className="flex h-8 w-8 items-center justify-center text-ivory/70 hover:text-sand-200">
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
              <button type="button" onClick={scrollToDiscover} className="hidden items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/60 hover:text-sand-200 sm:flex">
                {t('common.scroll')}
                <ArrowDown size={14} className="animate-scroll-pulse" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-950 py-20 text-ivory sm:py-28" aria-label={t('nav.discover')}>
        <img src={images.fallsWide} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="scrim-dark absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/10" />
        <div className="relative mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            light
            eyebrow="01 / Explore"
            start={t('discover.heroTitleStart')}
            end={t('discover.heroTitleEnd')}
            text={t('discover.heroText')}
          />
          <div className="relative mt-14 flex h-[24rem] items-center justify-center sm:h-[30rem]">
            {featuredPlaces.map((destination, index) => {
              const offset = index - activePlace;
              const distance = Math.abs(offset);
              const isActive = offset === 0;

              return (
                <button
                  key={destination.slug}
                  type="button"
                  onClick={() => setActivePlace(index)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={destination.name}
                  className="absolute w-[58%] max-w-[20rem] text-left sm:w-[34%]"
                  style={{
                    transform: `translateX(${offset * 52}%) scale(${isActive ? 1 : 0.82})`,
                    opacity: distance > 1 ? 0 : isActive ? 1 : 0.4,
                    zIndex: 30 - distance,
                    pointerEvents: distance > 1 ? 'none' : 'auto'
                  }}
                >
                  <div className="relative overflow-hidden bg-forest-900 shadow-[0_30px_80px_rgba(11,26,18,0.45)]">
                    <img src={destination.image} alt={destination.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                    <div className="scrim-soft absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="eyebrow mb-2 text-sand-200">{destination.country}</p>
                      <p className="font-body text-lg font-bold uppercase leading-tight text-ivory">{destination.name}</p>
                      {isActive && (
                        <p className="mt-3 line-clamp-2 text-xs leading-6 text-ivory/75">
                          {t(`destinations.${destination.key}.description`)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex items-center justify-center gap-5">
            <button type="button" onClick={() => movePlace(-1)} aria-label={t('home.previousSlide')} className="flex h-10 w-10 items-center justify-center border border-ivory/25 text-ivory/80 hover:border-sand-200 hover:text-sand-200">
              <ArrowLeft size={17} aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2" role="group" aria-label="Featured destinations">
              {featuredPlaces.map((destination, index) => (
                <button
                  key={destination.slug}
                  type="button"
                  onClick={() => setActivePlace(index)}
                  aria-label={destination.name}
                  aria-current={index === activePlace}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === activePlace ? 'w-7 bg-sand-200' : 'w-1.5 bg-ivory/35 hover:bg-ivory/70'}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => movePlace(1)} aria-label={t('home.nextSlide')} className="flex h-10 w-10 items-center justify-center border border-ivory/25 text-ivory/80 hover:border-sand-200 hover:text-sand-200">
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section id="discover" className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="02 / Destinations"
            start={t('home.discoverTitleStart')}
            end={t('home.discoverTitleEnd')}
            text={t('home.discoverText')}
            action={<TextLink to="/destinations">{t('common.allDestinations')}</TextLink>}
          />
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
            {destinations.filter((destination) => destination.featured).map((destination, index) => (
              <DestinationCard key={destination.slug} destination={destination} className={destinationGrid[index]} delay={index * 0.04} />
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="relative overflow-hidden bg-forest-950 py-20 text-ivory sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full border border-ivory/5" />
        <div className="pointer-events-none absolute -right-24 top-16 h-[26rem] w-[26rem] rounded-full border border-ivory/5" />
        <div className="relative mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            light
            eyebrow="03 / Experiences"
            start={t('home.experiencesTitleStart')}
            end={t('home.experiencesTitleEnd')}
            text={t('home.experiencesText')}
            action={<TextLink light to="/experiences">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ExperienceCard experience={experiences[0]} large />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {experiences.slice(1).map((experience, index) => (
                <ExperienceCard key={experience.id} experience={experience} delay={index * 0.04} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="04 / Curated routes"
            start={t('home.journeysTitleStart')}
            end={t('home.journeysTitleEnd')}
            text={t('home.journeysText')}
            action={<TextLink to="/journeys">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {journeys.map((journey, index) => (
              <JourneyCard key={journey.slug} journey={journey} delay={index * 0.05} />
            ))}
            <Reveal delay={0.25} className="relative flex min-h-[260px] flex-col justify-end bg-forest-900 p-8 text-ivory">
              <div aria-hidden="true" className="absolute inset-y-6 -left-4 right-4 bg-navy-900/80" />
              <img src={images.okavangoMokoro} alt="" loading="lazy" className="absolute -top-8 right-6 h-28 w-28 object-cover shadow-[0_24px_60px_rgba(11,26,18,0.45)]" />
              <div className="relative z-10">
                <p className="eyebrow mb-3 text-sand-200">Plan with us</p>
                <SplitHeading first={t('home.outroTitleStart')} second={t('home.outroTitleEnd')} tone="light" size="sm" />
                <p className="mt-4 text-sm leading-7 text-ivory/70">{t('home.outroText')}</p>
                <Link to="/contact" className="link-editorial mt-6 text-sand-200">
                  {t('nav.planTrip')} <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="05 / Destination map"
            start={t('home.mapTitleStart')}
            end={t('home.mapTitleEnd')}
            text={t('home.mapText')}
          />
          <Reveal className="mt-14">
            <DestinationMap />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="06 / Travel journal"
            start={t('home.storiesTitleStart')}
            end={t('home.storiesTitleEnd')}
            text={t('home.storiesText')}
            action={<TextLink to="/stories">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-10 border-t border-forest-900/10 pt-10 lg:grid-cols-2">
            {stories.slice(0, 3).map((story, index) => (
              <StoryCard key={story.slug} story={story} feature={index === 0} delay={index * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-ivory sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            light
            eyebrow="07 / Why travel with us"
            start={t('home.whyTitleStart')}
            end={t('home.whyTitleEnd')}
            text={t('home.whyText')}
            action={<TextLink light to="/about">{t('common.learnMore')}</TextLink>}
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, index) => {
              const Icon = whyIcons[item.icon] || Compass;
              return (
                <Reveal key={item.key} delay={index * 0.04} className="group bg-forest-900 p-8 transition-colors duration-500 hover:bg-forest-800">
                  <Icon size={22} className="text-sand-200" aria-hidden="true" />
                  <h3 className="mt-7 font-display text-2xl text-ivory">{t(`home.whyTitles.${item.key}`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-ivory/65">{t(`home.whyItems.${item.key}`)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 opacity-35">
          <img src={images.serengetiSunset} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="scrim-dark absolute inset-0" />
        <div className="relative mx-auto grid max-w-editorial gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">08 / Newsletter</p>
            <SplitHeading first={t('home.newsletterTitleStart')} second={t('home.newsletterTitleEnd')} tone="light" size="md" />
            <p className="mt-6 max-w-lg text-sm leading-7 text-ivory/70">{t('home.newsletterText')}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <NewsletterForm dark />
          </Reveal>
        </div>
      </section>
    </>
  );
}
