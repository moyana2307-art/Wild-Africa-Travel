import { ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading, TextLink } from '../components/SectionHeading';
import { DestinationCard } from '../components/Cards';
import { destinations, journeys } from '../data/site';

export default function JourneyDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const journey = journeys.find((item) => item.slug === slug);

  if (!journey) {
    return (
      <>
        <Seo title="Journey not found" />
        <section className="flex min-h-[70vh] items-center justify-center bg-ivory px-5 py-24">
          <div className="max-w-lg text-center">
            <p className="eyebrow mb-5 text-forest-600">404</p>
            <SplitHeading as="h1" first="Journey" second="not found" tone="dark" size="md" className="text-center" />
            <p className="mt-6 text-sm leading-7 text-charcoal/65">This journey may have moved. Browse all journeys to continue exploring.</p>
            <Link to="/journeys" className="btn-editorial btn-dark mt-8">
              {t('nav.journeys')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  const title = t(`journeys.${journey.key}.title`, '') || 'Tailored journey';
  const routeText = t(`journeys.${journey.key}.destinations`, '') || journey.category;
  const description = t(`journeys.${journey.key}.description`, '') || 'A Southern African journey shaped around your interests.';
  const heroParts = title.split(/\s+/).filter(Boolean);
  const heroStart = heroParts.shift() || title;
  const heroEnd = heroParts.join(' ');
  const stops = routeText.split('·').map((item) => item.trim()).filter(Boolean);

  let routeSteps;
  if (stops.length >= 3) {
    const remaining = stops.slice(2).join(' · ');
    routeSteps = [
      { title: stops[0], text: `Begin with ${stops[0]}.` },
      { title: stops[1], text: `Continue to ${stops[1]}.` },
      { title: remaining, text: `Explore ${remaining} as part of this tailored route.` }
    ];
  } else if (stops.length === 2) {
    routeSteps = [
      { title: stops[0], text: `Begin with ${stops[0]}.` },
      { title: stops[1], text: `Continue to ${stops[1]}.` },
      { title: 'Make it yours', text: `Tell us how you would like to shape the ${title} and we will plan the pace around you.` }
    ];
  } else {
    routeSteps = [
      { title: 'Share your plans', text: `Tell us what you would like from the ${title}.` },
      { title: 'Shape the route', text: `We will design a route around the ${title} and your interests.` },
      { title: 'Travel with support', text: 'Our team will coordinate the details before and during your journey.' }
    ];
  }

  const routeHaystack = `${routeText} ${journey.category}`.toLowerCase();
  const nameMatches = destinations.filter((item) => {
    const itemName = t(`destinations.${item.key}.name`, item.name).toLowerCase();
    return routeHaystack.includes(itemName) || routeHaystack.includes(item.slug.replace(/-/g, ' '));
  });
  const countryMatches = destinations.filter((item) => (
    !nameMatches.includes(item)
    && (routeHaystack.includes(item.country.toLowerCase()) || routeHaystack.includes(item.region.toLowerCase()))
  ));
  const relatedDestinations = (nameMatches.length || countryMatches.length ? [...nameMatches, ...countryMatches] : destinations).slice(0, 3);

  const facts = [
    { label: t('common.destinationsCovered'), value: routeText },
    { label: t('common.duration'), value: t('common.durationOnRequest', 'Duration on request') },
    { label: 'Style', value: 'Tailored route' }
  ];

  return (
    <>
      <Seo title={title} description={description} image={journey.image} />
      <PageHero
        image={journey.image}
        eyebrow={journey.category}
        start={heroStart}
        end={heroEnd}
        text={description}
        crumb={title}
      >
        <Link to={`/contact?journey=${journey.slug}`} className="btn-editorial btn-light">
          {t('common.enquire')}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <Link to="/journeys" className="btn-editorial btn-outline-light">
          {t('common.viewAll')}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="border-y border-forest-900/10 bg-sand-50">
        <div className="mx-auto grid max-w-editorial grid-cols-1 divide-y divide-forest-900/10 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
          {facts.map((fact) => (
            <div key={fact.label} className="px-3 py-8 sm:px-5">
              <p className="eyebrow mb-3 text-forest-600">{fact.label}</p>
              <p className="text-sm leading-6 text-forest-900">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.journeys')}
            start="Journey"
            end="overview"
            text="Use this route as a starting point. We can adapt the order, pace and focus to the way you want to travel."
            action={<TextLink to="/journeys">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow mb-4 text-forest-600">At a glance</p>
              <p className="font-display text-3xl leading-tight text-forest-900 sm:text-4xl">{title}</p>
            </Reveal>
            <Reveal delay={0.12} className="border-l border-forest-600/40 pl-7">
              <p className="text-base leading-8 text-charcoal/70">{description}</p>
              <p className="mt-6 text-sm leading-7 text-charcoal/60">
                {t('common.durationOnRequest', 'Duration on request')}. Share your travel dates and preferences and our team will shape the details.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="The route"
            start="Three chapters"
            end="of this journey"
            text={`A simple view of the places that give the ${title} its character.`}
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
            {routeSteps.map((step, index) => (
              <Reveal key={`${step.title}-${index}`} delay={index * 0.08} className="border-t border-forest-600/40 pt-7">
                <p className="font-display text-5xl text-forest-600">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 font-body text-xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/65">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.destinations')}
            start="Places along"
            end="the way"
            text="Discover the destinations connected to this route."
            action={<TextLink to="/destinations">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedDestinations.map((item, index) => (
              <DestinationCard key={item.slug} destination={item} className="min-h-[420px]" delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-ivory sm:py-28">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">{t('nav.planTrip')}</p>
            <SplitHeading first={t('home.outroTitleStart')} second={t('home.outroTitleEnd')} tone="light" size="md" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-lg text-sm leading-7 text-ivory/70">{t('home.outroText')}</p>
            <Link to={`/contact?journey=${journey.slug}`} className="btn-editorial btn-light mt-8">
              {t('common.enquire')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
