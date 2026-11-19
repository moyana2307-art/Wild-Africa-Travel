import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { SplitHeading } from '../components/SectionHeading';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title="Page not found" description={t('notFound.text')} />
      <section className="flex min-h-screen items-center justify-center bg-forest-950 px-5 py-24 text-ivory">
        <div className="max-w-2xl text-center">
          <p className="eyebrow mb-6 text-sand-200">404</p>
          <SplitHeading as="h1" first="Page" second="not found" tone="light" size="lg" className="text-center" />
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-ivory/70 sm:text-base">{t('notFound.text')}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-editorial btn-light">
              {t('notFound.button')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link to="/destinations" className="btn-editorial btn-outline-light">
              {t('common.allDestinations')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
