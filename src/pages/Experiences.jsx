import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading } from '../components/SectionHeading';
import { experiences, images } from '../data/site';

export default function Experiences() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Experiences"
        description="Wildlife safaris, adventure, culture, luxury escapes and family journeys across Southern Africa."
        image={images.chobeLion}
      />
      <PageHero
        image={images.chobeLion}
        eyebrow={t('experiencesPage.heroIntro')}
        start={t('experiencesPage.heroTitleStart')}
        end={t('experiencesPage.heroTitleEnd')}
        text={t('experiencesPage.heroText')}
        crumb={t('nav.experiences')}
      />

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial space-y-20 px-5 sm:px-8 lg:space-y-28 lg:px-10">
          {experiences.map((experience, index) => {
            const title = t(`experiences.${experience.key}.title`);
            const reversed = index % 2 === 1;
            return (
              <article
                id={experience.id}
                key={experience.id}
                className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={reversed ? 'lg:order-2' : ''}>
                  <div className="image-reveal aspect-[4/5] w-full bg-forest-900 sm:aspect-[5/4] lg:aspect-[4/5]">
                    <img src={experience.image} alt={title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={0.12} className={reversed ? 'lg:order-1' : ''}>
                  <p className="eyebrow mb-5 text-forest-600">
                    {String(index + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
                  </p>
                  <h2 className="font-body text-3xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-4xl">
                    {title}
                  </h2>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-charcoal/70 sm:text-base">
                    {t(`experiences.${experience.key}.description`)}
                  </p>
                  <Link to={`/contact?experience=${experience.id}`} className="link-editorial mt-8 text-forest-800 hover:text-forest-600">
                    {t('nav.planTrip')}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Practical note"
            start="Combine experiences with"
            end="destinations & journeys"
            text="Every experience can be paired with the destinations and journeys that suit your time, interests and pace."
            action={
              <div className="flex flex-wrap gap-3">
                <Link to="/destinations" className="btn-editorial btn-dark">
                  {t('nav.destinations')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link to="/journeys" className="btn-editorial btn-outline-dark">
                  {t('nav.journeys')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            }
          />
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-ivory sm:py-28">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">Tailor your experience</p>
            <SplitHeading first="Made around" second="the way you travel" tone="light" size="md" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-lg text-sm leading-7 text-ivory/70">
              Tell us what draws you to Africa and we will shape a journey around it.
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
