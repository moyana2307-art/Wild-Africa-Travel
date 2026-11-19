import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading, TextLink } from '../components/SectionHeading';
import { JourneyCard } from '../components/Cards';
import { images, journeys } from '../data/site';

export default function Journeys() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Journeys"
        description="Curated Southern African journeys, from Victoria Falls and Hwange to the Okavango Delta, Namibia and Cape Town."
        image={images.okavangoMokoro}
      />
      <PageHero
        image={images.okavangoMokoro}
        eyebrow={t('journeysPage.heroIntro')}
        start={t('journeysPage.heroTitleStart')}
        end={t('journeysPage.heroTitleEnd')}
        text={t('journeysPage.heroText')}
        crumb={t('nav.journeys')}
      />

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.journeys')}
            start="Curated routes"
            end="for every traveller"
            text="Use these journeys as a starting point, then let us adapt them to your dates, interests and pace."
            action={<TextLink to="/contact">{t('nav.planTrip')}</TextLink>}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {journeys.map((journey, index) => (
              <JourneyCard key={journey.slug} journey={journey} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-ivory sm:py-28">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">A little guidance</p>
            <SplitHeading first="Not sure" second="where to begin?" tone="light" size="md" />
            <p className="mt-6 max-w-xl text-sm leading-7 text-ivory/70">
              Share your ideas with us. We will help you choose the right places, the right pace and the route that connects them.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-editorial btn-light">
              {t('nav.planTrip')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link to="/destinations" className="btn-editorial btn-outline-light">
              {t('nav.destinations')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
