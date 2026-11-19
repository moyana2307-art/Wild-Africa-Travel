import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading, TextLink } from '../components/SectionHeading';
import { JourneyCard } from '../components/Cards';
import { countries, images, journeys } from '../data/site';

const landscapes = [
  {
    key: 'okavangoDelta',
    country: 'Botswana',
    description: 'Glide through reed-lined channels where water and wilderness meet.',
    image: images.okavangoMokoro,
    to: '/destinations/okavango-delta'
  },
  {
    key: 'namibia',
    country: 'Namibia',
    description: 'Follow the light across sculpted dunes and vast desert horizons.',
    image: images.namibiaDune,
    to: '/destinations/namibia'
  },
  {
    key: 'capeTown',
    country: 'South Africa',
    description: 'Trace a coastline of mountains, oceans and unhurried city days.',
    image: images.capeTableMountain,
    to: '/destinations/cape-town'
  },
  {
    key: 'chobeNationalPark',
    country: 'Botswana',
    description: 'Spend a day where riverfront light and wildlife gather in numbers.',
    image: images.chobeLion,
    to: '/destinations/chobe-national-park'
  }
];

export default function DiscoverAfrica() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Discover Africa"
        description="Explore the deserts, deltas, mountains, rivers and heritage places of Southern Africa."
        image={images.serengetiSunrise}
      />
      <PageHero
        image={images.serengetiSunrise}
        eyebrow={t('discover.heroIntro')}
        start={t('discover.heroTitleStart')}
        end={t('discover.heroTitleEnd')}
        text={t('discover.heroText')}
        crumb={t('nav.discover')}
      />

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.discover')}
            start={t('discover.sectionTitle')}
            text={t('discover.sectionText')}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {landscapes.map((item, index) => (
              <Reveal key={item.to} delay={index * 0.05} className="group">
                <Link to={item.to} className="relative block overflow-hidden bg-forest-900">
                  <div className="image-reveal aspect-[16/10] w-full">
                    <img src={item.image} alt={t(`destinations.${item.key}.name`)} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="scrim-soft absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-ivory sm:p-8">
                    <p className="eyebrow mb-3 text-sand-200">{item.country}</p>
                    <h3 className="font-body text-2xl font-bold uppercase leading-tight tracking-tight text-ivory sm:text-3xl">
                      {t(`destinations.${item.key}.name`)}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-ivory/75">{item.description}</p>
                    <span className="link-editorial mt-5 text-sand-200">
                      {t('common.discoverMore')}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <p className="eyebrow mb-7 text-sand-200">Regions to explore</p>
          <div className="flex flex-wrap gap-3">
            {countries.filter((country) => country !== 'All').map((country) => (
              <span key={country} className="border border-ivory/20 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory/75">
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.journeys')}
            start="Featured"
            end="journeys"
            text="Considered routes that bring together the landscapes, wildlife and hospitality of the region."
            action={<TextLink to="/journeys">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {journeys.slice(0, 3).map((journey, index) => (
              <JourneyCard key={journey.slug} journey={journey} delay={index * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-16 text-ivory sm:py-20">
        <div className="mx-auto flex max-w-editorial flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <Reveal>
            <SplitHeading first="Ready to" second="explore more" tone="light" size="md" />
            <p className="mt-4 max-w-lg text-sm leading-7 text-ivory/70">
              Browse routes that connect the region’s great landscapes at a pace that suits you.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link to="/journeys" className="btn-editorial btn-light">
              {t('common.viewAll')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
