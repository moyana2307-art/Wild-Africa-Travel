import { ArrowUpRight, BedDouble, CarFront, Compass, FileCheck2, Plane, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading } from '../components/SectionHeading';
import { images, services } from '../data/site';

const serviceIcons = {
  Plane,
  BedDouble,
  FileCheck2,
  CarFront,
  Compass,
  Route
};

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Travel Services"
        description="Flights, accommodation, visas, car hire, guided tours and tailor-made itineraries arranged by our Zimbabwe-based travel team."
        image={images.safariVehicle}
      />
      <PageHero
        image={images.safariVehicle}
        eyebrow={t('servicesPage.heroIntro')}
        start={t('servicesPage.heroTitleStart')}
        end={t('servicesPage.heroTitleEnd')}
        text={t('servicesPage.heroText')}
        crumb={t('nav.services')}
      />

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={t('nav.services')}
            start="Our"
            end="travel services"
            text="From the first flight to the final transfer, each part of your journey is arranged with care."
          />
          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Compass;
              const reversed = index % 2 === 1;
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="grid scroll-mt-24 items-center gap-10 border-t border-forest-900/10 pt-14 lg:grid-cols-2 lg:gap-16"
                >
                  <Reveal className={reversed ? 'lg:order-2' : ''}>
                    <div className="image-reveal relative aspect-[4/5] w-full bg-forest-900 sm:aspect-[5/4] lg:aspect-[4/5]">
                      <img
                        src={service.image}
                        alt={t(`services.${service.key}.title`)}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-5 top-5 bg-forest-950/85 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory">
                        {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.12} className={reversed ? 'lg:order-1' : ''}>
                    <Icon size={30} className="text-forest-600" aria-hidden="true" />
                    <p className="eyebrow mt-7 text-forest-600">{t(`services.${service.key}.lead`)}</p>
                    <h3 className="mt-4 font-body text-3xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-4xl">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-charcoal/70 sm:text-base">
                      {t(`services.${service.key}.description`)}
                    </p>
                    <Link to={`/contact?service=${service.id}`} className="btn-editorial btn-dark mt-9">
                      {t('common.enquire')}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-ivory sm:py-28">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">Plan with us</p>
            <SplitHeading first="Tell us" second="what you need" tone="light" size="md" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-lg text-sm leading-7 text-ivory/70">{t('servicesPage.ctaText')}</p>
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
