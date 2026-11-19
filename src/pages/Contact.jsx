import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading } from '../components/SectionHeading';
import DestinationMap from '../components/DestinationMap';
import EnquiryForm from '../components/EnquiryForm';
import { company, images } from '../data/site';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Wild Africa Travel in Harare to plan flights, safaris and tailor-made journeys across Southern Africa."
        image={images.karibaSunset}
      />
      <PageHero
        image={images.karibaSunset}
        eyebrow={t('contact.heroIntro')}
        start={t('contact.heroTitleStart')}
        end={t('contact.heroTitleEnd')}
        text={t('contact.heroText')}
        crumb={t('nav.contact')}
      />

      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-editorial gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-forest-600">Contact & enquiries</p>
              <SplitHeading first="Speak to" second="our travel team" tone="dark" size="md" />
              <p className="mt-6 max-w-lg text-sm leading-7 text-charcoal/70">
                Whether your plans are settled or just taking shape, we would be glad to hear from you.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.05} className="border border-forest-900/10 bg-white p-7">
                <Mail size={22} className="text-forest-600" aria-hidden="true" />
                <p className="eyebrow mt-6 text-forest-600">{t('contact.emailUs')}</p>
                <a href={`mailto:${company.email}`} className="mt-3 block break-all text-sm text-forest-900 hover:text-forest-600">
                  {company.email}
                </a>
              </Reveal>
              <Reveal delay={0.1} className="border border-forest-900/10 bg-white p-7">
                <Phone size={22} className="text-forest-600" aria-hidden="true" />
                <p className="eyebrow mt-6 text-forest-600">{t('contact.callUs')}</p>
                <div className="mt-3 space-y-2">
                  {company.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="block text-sm text-forest-900 hover:text-forest-600">
                      {phone}
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15} className="border border-forest-900/10 bg-white p-7">
                <MessageCircle size={22} className="text-forest-600" aria-hidden="true" />
                <p className="eyebrow mt-6 text-forest-600">{t('contact.whatsapp')}</p>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial mt-3 text-forest-800 hover:text-forest-600"
                >
                  Chat with us
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </Reveal>
              <Reveal delay={0.2} className="border border-forest-900/10 bg-white p-7">
                <ArrowUpRight size={22} className="text-forest-600" aria-hidden="true" />
                <p className="eyebrow mt-6 text-forest-600">{t('footer.social')}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {company.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-editorial text-forest-800 hover:text-forest-600"
                    >
                      {item.name}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {company.offices.map((office, index) => (
                <Reveal key={office} delay={0.1 + index * 0.05} className="bg-forest-900 p-7 text-ivory">
                  <MapPin size={20} className="text-sand-200" aria-hidden="true" />
                  <p className="eyebrow mt-6 text-sand-200">
                    {index === 0 ? t('contact.locationHarare') : t('contact.locationSecond')}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ivory/75">{office}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="enquiry" className="scroll-mt-24">
            <Reveal>
              <p className="eyebrow mb-5 text-forest-600">Enquiries</p>
              <SplitHeading first="Travel" second="enquiry" tone="dark" size="md" />
              <p className="mt-6 max-w-xl text-sm leading-7 text-charcoal/70">{t('contact.formText')}</p>
            </Reveal>
            <Reveal delay={0.12} className="mt-9">
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Where we travel"
            start={t('home.mapTitleStart')}
            end={t('home.mapTitleEnd')}
            text={t('home.mapText')}
          />
          <Reveal className="mt-12">
            <DestinationMap />
          </Reveal>
        </div>
      </section>
    </>
  );
}
