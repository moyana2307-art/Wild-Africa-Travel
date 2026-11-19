import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { TextLink } from '../components/SectionHeading';
import { company, images } from '../data/site';

export default function Privacy() {
  const { t } = useTranslation();

  const sections = [
    {
      title: 'Information we collect',
      text: 'When you send an enquiry, we collect the details you choose to provide, such as your name, email address, phone number, nationality, travel dates, interests, number of travellers and any message you send.'
    },
    {
      title: 'How it is used',
      text: 'We use these details to reply to you, understand your travel plans, prepare a tailored itinerary and coordinate the travel services you request.'
    },
    {
      title: 'Storage',
      text: 'Enquiries are stored securely by our travel team in the records we use to manage travel requests.'
    },
    {
      title: 'Retention',
      text: 'We keep your details only as long as needed to manage your request and any related travel arrangements.'
    },
    {
      title: 'Your choices',
      text: 'You can ask us to correct, update or remove your details, or tell us how you would prefer to be contacted.'
    }
  ];

  return (
    <>
      <Seo title={t('legal.privacyTitle')} description={t('legal.privacyText')} image={images.serengetiSunrise} />
      <PageHero
        image={images.serengetiSunrise}
        eyebrow="Legal information"
        start={t('legal.privacyTitle')}
        end=""
        text="A clear explanation of how we handle the information you share with us."
        crumb={t('legal.privacyTitle')}
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Your information"
            start="Handled with"
            end="care"
            text={t('legal.privacyText')}
          />
          <div className="mt-14 grid gap-x-12 border-t border-forest-900/10 md:grid-cols-2">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.05} className="border-b border-forest-900/10 py-8">
                <p className="eyebrow mb-3 text-forest-600">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-body text-xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-2xl">{section.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-charcoal/70">{section.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-12 grid gap-6 border border-forest-900/10 bg-white p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow mb-3 text-forest-600">Contact</p>
              <h3 className="font-body text-xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-2xl">Questions about your information?</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal/70">
                Email <a href={`mailto:${company.email}`} className="font-semibold text-forest-800 underline decoration-forest-600 underline-offset-4 hover:text-forest-600">{company.email}</a>, or send an enquiry through the <TextLink to="/contact">contact page</TextLink>.
              </p>
            </div>
            <a href={`mailto:${company.email}`} className="btn-editorial btn-dark">
              {t('contact.emailUs')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
