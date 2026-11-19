import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading } from '../components/SectionHeading';
import { StoryCard } from '../components/Cards';
import { images, stories } from '../data/site';

export default function Stories() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Stories"
        description="Travel guides, seasonal inspiration and field notes from across Southern Africa."
        image={images.serengetiSunrise}
      />
      <PageHero
        image={images.serengetiSunrise}
        eyebrow={t('storiesPage.heroIntro')}
        start={t('storiesPage.heroTitleStart')}
        end={t('storiesPage.heroTitleEnd')}
        text={t('storiesPage.heroText')}
        crumb={t('nav.stories')}
      />

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="The journal"
            start="Field notes and"
            end="travel stories"
            text={t('storiesPage.heroText')}
          />
          <div className="mt-14 grid gap-10 border-t border-forest-900/10 pt-10 lg:grid-cols-2">
            {stories.map((story, index) => (
              <StoryCard key={story.slug} story={story} feature={index === 0} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-ivory sm:py-28">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">Inspired to travel?</p>
            <SplitHeading first="Let us shape" second="the next chapter" tone="light" size="md" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-lg text-sm leading-7 text-ivory/70">
              Tell us which stories stayed with you and we will build a journey around them.
            </p>
            <Link to="/contact" className="btn-editorial btn-light mt-8">
              {t('nav.planTrip')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
