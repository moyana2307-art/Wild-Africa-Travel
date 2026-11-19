import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';

function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`image-reveal relative ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
    </div>
  );
}

export function DestinationCard({ destination, className = '', showDescription = true, delay = 0 }) {
  const { t } = useTranslation();
  const name = t(`destinations.${destination.key}.name`, destination.name);
  const description = t(`destinations.${destination.key}.description`);

  return (
    <Reveal delay={delay} className={`group ${className}`}>
      <Link to={`/destinations/${destination.slug}`} className="block h-full">
        <div className="relative h-full overflow-hidden bg-forest-900">
          <CardImage src={destination.image} alt={`${name}, ${destination.country}`} className="h-full min-h-[300px] w-full" />
          <div className="scrim-soft absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-7">
            <p className="eyebrow mb-3 text-sand-200">{destination.country}</p>
            <h3 className="font-body text-2xl font-bold uppercase leading-tight tracking-tight text-ivory sm:text-3xl">{name}</h3>
            {showDescription && <p className="mt-3 max-w-md text-xs leading-6 text-ivory/75 sm:text-sm">{description}</p>}
            <span className="link-editorial mt-5 text-ivory group-hover:text-sand-200">
              Discover More <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function ExperienceCard({ experience, delay = 0, large = false }) {
  const { t } = useTranslation();
  const title = t(`experiences.${experience.key}.title`);

  return (
    <Reveal delay={delay} className="group h-full">
      <Link to={`/experiences#${experience.id}`} className="block h-full">
        <div className="relative h-full overflow-hidden bg-forest-900">
          <CardImage src={experience.image} alt={title} className={large ? 'aspect-[4/5] w-full' : 'aspect-[3/4] w-full'} />
          <div className="scrim-soft absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
            <h3 className="font-body text-xl font-bold uppercase leading-tight tracking-tight text-ivory sm:text-2xl">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-ivory/75 sm:text-sm">{t(`experiences.${experience.key}.description`)}</p>
            <span className="link-editorial mt-4 text-sand-200">
              Explore <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function JourneyCard({ journey, delay = 0 }) {
  const { t } = useTranslation();
  const title = t(`journeys.${journey.key}.title`);

  return (
    <Reveal delay={delay} className="group flex h-full flex-col bg-white">
      <CardImage src={journey.image} alt={title} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow mb-3 text-forest-600">{journey.category}</p>
        <h3 className="font-body text-xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-2xl">{title}</h3>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-forest-600">
          {t(`journeys.${journey.key}.destinations`)}
        </p>
        <p className="mt-4 text-sm leading-7 text-charcoal/70">{t(`journeys.${journey.key}.description`)}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-forest-900/10 pt-5">
          <Link to={`/journeys/${journey.slug}`} className="link-editorial text-forest-800 hover:text-navy-800">
            View Journey <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link to={`/contact?journey=${journey.slug}`} className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-forest-600 hover:text-forest-900">
            {t('common.enquire')}
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function StoryCard({ story, delay = 0, feature = false }) {
  const { t } = useTranslation();
  const title = t(`stories.${story.key}.title`);

  return (
    <Reveal delay={delay} className={`group ${feature ? 'lg:col-span-2' : ''}`}>
      <Link to={`/stories/${story.slug}`} className="grid h-full gap-5 sm:grid-cols-[1.1fr_1fr] sm:items-center">
        <CardImage src={story.image} alt={title} className={feature ? 'aspect-[16/10] w-full' : 'aspect-[4/3] w-full'} />
        <div>
          <p className="eyebrow mb-3 text-forest-600">{t(`stories.${story.key}.category`)}</p>
          <h3 className={`font-body font-bold uppercase leading-tight tracking-tight text-navy-900 ${feature ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{title}</h3>
          <p className="mt-3 text-sm leading-7 text-charcoal/70">{t(`stories.${story.key}.excerpt`)}</p>
          <span className="link-editorial mt-5 text-forest-800 group-hover:text-navy-800">
            {t('common.readStory')} <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
