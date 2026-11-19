import { ArrowUpRight, BedDouble, BookOpenCheck, FileCheck2, Headset, Plane, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading, TextLink } from '../components/SectionHeading';
import { images, whyUs } from '../data/site';

const whyIcons = {
  personal: UserRoundCheck,
  expertise: BookOpenCheck,
  flights: Plane,
  hotels: BedDouble,
  visas: FileCheck2,
  support: Headset
};

const valueKeys = ['authenticity', 'reliability', 'care', 'expertise'];

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="About Us"
        description="Meet Wild Africa Travel, a Zimbabwe-based team creating thoughtful journeys across Southern Africa."
        image={images.greatZimbabweWalls}
      />
      <PageHero
        image={images.greatZimbabweWalls}
        eyebrow={t('about.heroIntro')}
        start={t('about.heroTitleStart')}
        end={t('about.heroTitleEnd')}
        text={t('about.heroText')}
        crumb={t('nav.about')}
      />

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Who we are"
            start={t('about.introTitle')}
            text={t('about.introText')}
          />
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-editorial gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-10">
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <div className="image-reveal aspect-[3/4] w-full bg-forest-900">
              <img src={images.greatZimbabwe} alt="Great Zimbabwe" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="image-reveal mt-10 aspect-[3/4] w-full bg-forest-900 sm:mt-16">
              <img src={images.karibaSunset} alt="Sunset over Lake Kariba" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="space-y-12">
            <Reveal>
              <p className="eyebrow mb-4 text-forest-600">01 / Our story</p>
              <h2 className="font-body text-2xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-3xl">{t('about.historyTitle')}</h2>
              <blockquote className="mt-5 border-l-2 border-forest-600 pl-6 font-display text-2xl leading-snug text-forest-800 sm:text-3xl">
                {t('about.historyText')}
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mb-4 text-forest-600">02 / What we believe</p>
              <h2 className="font-body text-2xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-3xl">{t('about.missionTitle')}</h2>
              <blockquote className="mt-5 border-l-2 border-forest-600 pl-6 font-display text-2xl leading-snug text-forest-800 sm:text-3xl">
                {t('about.missionText')}
              </blockquote>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="eyebrow mb-4 text-forest-600">03 / Where we are going</p>
              <h2 className="font-body text-2xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-3xl">Our Vision</h2>
              <blockquote className="mt-5 border-l-2 border-forest-600 pl-6 font-display text-2xl leading-snug text-forest-800 sm:text-3xl">
                {t('about.visionText', 'To be a trusted gateway to the region for travellers around the world.')}
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Our principles"
            start={t('about.valuesTitle')}
            text="These are the commitments that shape the way we plan and host every journey."
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-forest-900/10 bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((key, index) => (
              <Reveal key={key} delay={index * 0.05} className="bg-white p-8">
                <span className="font-display text-4xl text-forest-600">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-7 text-sm leading-7 text-charcoal/70">{t(`about.values.${key}`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-ivory sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            light
            eyebrow={t('about.whyTitle')}
            start={t('home.whyTitleStart')}
            end={t('home.whyTitleEnd')}
            text={t('home.whyText')}
            action={<TextLink light to="/services">{t('common.learnMore')}</TextLink>}
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, index) => {
              const Icon = whyIcons[item.key] || UserRoundCheck;
              return (
                <Reveal key={item.key} delay={index * 0.04} className="bg-forest-900 p-8 transition-colors duration-500 hover:bg-forest-800">
                  <Icon size={22} className="text-sand-200" aria-hidden="true" />
                  <h3 className="mt-7 font-display text-2xl text-ivory">{t(`home.whyTitles.${item.key}`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-ivory/65">{t(`home.whyItems.${item.key}`)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-ivory sm:py-28">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">Work with us</p>
            <SplitHeading first="Let us" second="plan your journey" tone="light" size="md" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-lg text-sm leading-7 text-ivory/70">{t('about.ctaText')}</p>
            <Link to="/contact" className="btn-editorial btn-light mt-8">
              {t('nav.contact')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
