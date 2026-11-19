import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { TextLink } from '../components/SectionHeading';
import { company, images } from '../data/site';

export default function Terms() {
  const { t } = useTranslation();

  const sections = [
    {
      title: 'Website information',
      text: 'Travel information on this website is provided as guidance. Prices, availability, visa requirements and itinerary details are confirmed only after direct discussion with our travel team.'
    },
    {
      title: 'Enquiries',
      text: 'Submitting an enquiry does not create a booking contract. It simply gives our team the information needed to discuss your plans and next steps.'
    },
    {
      title: 'Bookings',
      text: 'Booking terms are confirmed directly with you before a travel arrangement is agreed. We do not treat an enquiry form submission as confirmation of a reservation.'
    },
    {
      title: 'Third-party services',
      text: 'Some travel services are provided by airlines, accommodation providers, operators or other suppliers. Their own terms may apply once an arrangement is confirmed.'
    },
    {
      title: 'Changes',
      text: 'We may update this page as our services or practical requirements change. The current version published here is the one that applies.'
    }
  ];

  return (
    <>
      <Seo title={t('legal.termsTitle')} description={t('legal.termsText')} image={images.fallsBridgeClassic} />
      <PageHero
        image={images.fallsBridgeClassic}
        eyebrow="Legal information"
        start={t('legal.termsTitle')}
        end=""
        text="The terms that apply to website information, enquiries and travel arrangements."
        crumb={t('legal.termsTitle')}
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Terms & conditions"
            start="Clear"
            end="expectations"
            text={t('legal.termsText')}
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
              <h3 className="font-body text-xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-2xl">Need clarification?</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal/70">
                Email <a href={`mailto:${company.email}`} className="font-semibold text-forest-800 underline decoration-forest-600 underline-offset-4 hover:text-forest-600">{company.email}</a>, or ask through the <TextLink to="/contact">contact page</TextLink>.
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
