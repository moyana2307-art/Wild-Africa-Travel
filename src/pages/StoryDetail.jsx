import { ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading, { SplitHeading, TextLink } from '../components/SectionHeading';
import { StoryCard } from '../components/Cards';
import { stories } from '../data/site';

export default function StoryDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const story = stories.find((item) => item.slug === slug);

  if (!story) {
    return (
      <>
        <Seo title="Story not found" />
        <section className="flex min-h-[70vh] items-center justify-center bg-ivory px-5 py-24">
          <div className="max-w-lg text-center">
            <p className="eyebrow mb-5 text-forest-600">404</p>
            <SplitHeading as="h1" first="Story" second="not found" tone="dark" size="md" className="text-center" />
            <p className="mt-6 text-sm leading-7 text-charcoal/65">This story may have moved. Browse all stories to continue reading.</p>
            <Link to="/stories" className="btn-editorial btn-dark mt-8">
              {t('nav.stories')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  const title = t(`stories.${story.key}.title`, '') || 'Travel story';
  const category = t(`stories.${story.key}.category`, '') || 'Travel story';
  const excerpt = t(`stories.${story.key}.excerpt`, '') || 'Notes from the road.';
  const body = Array.isArray(story.body) ? story.body : [];
  const firstParagraph = body[0] || '';
  const firstSentence = firstParagraph.split('. ')[0];
  const pullQuote = firstSentence ? (firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`) : '';
  const relatedStories = stories.filter((item) => item.slug !== story.slug).slice(0, 3);

  return (
    <>
      <Seo title={title} description={excerpt} image={story.image} />
      <PageHero
        image={story.image}
        eyebrow={category}
        start={title}
        end=""
        text={excerpt}
        crumb={t('nav.stories')}
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={category} start="From the" end="journal" text={excerpt} />
          <article className="mx-auto mt-14 max-w-4xl space-y-10 border-t border-forest-900/10 pt-12">
            {body.map((paragraph, index) => (
              <Reveal key={`${paragraph.slice(0, 32)}-${index}`}>
                <p className="text-lg leading-loose text-forest-900 sm:text-xl">{paragraph}</p>
                {index === 0 && pullQuote && (
                  <blockquote className="my-14 border-y border-forest-600/30 py-10 text-center">
                    <p className="font-display text-3xl italic leading-tight text-forest-900 sm:text-5xl">“{pullQuote}”</p>
                  </blockquote>
                )}
              </Reveal>
            ))}
          </article>
        </div>
      </section>

      <section className="bg-sand-50 py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="The journal"
            start="Keep"
            end="reading"
            text="More field notes and travel inspiration from across the region."
            action={<TextLink to="/stories">{t('common.viewAll')}</TextLink>}
          />
          <div className="mt-14 grid gap-10 border-t border-forest-900/10 pt-10 lg:grid-cols-3">
            {relatedStories.map((item, index) => (
              <StoryCard key={item.slug} story={item} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-ivory sm:py-28">
        <div className="mx-auto max-w-editorial px-5 text-center sm:px-8 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-5 text-sand-200">{t('nav.planTrip')}</p>
            <SplitHeading first={t('home.outroTitleStart')} second={t('home.outroTitleEnd')} tone="light" size="md" />
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-ivory/70">{t('home.outroText')}</p>
            <Link to="/contact" className="btn-editorial btn-light mt-9">
              {t('common.planTrip')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
