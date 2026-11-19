import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import { DestinationCard } from '../components/Cards';
import DestinationMap from '../components/DestinationMap';
import Reveal from '../components/Reveal';
import { countries, destinations, images } from '../data/site';

const categories = [
  { id: 'all', en: 'All places', sn: 'Nzvimbo dzose', zh: '全部地点' },
  { id: 'wildlife', en: 'Wildlife', sn: 'Mhuka dzesango', zh: '野生动物' },
  { id: 'water', en: 'Rivers & water', sn: 'Mvura', zh: '河流与水域' },
  { id: 'city', en: 'Cities & heritage', sn: 'Maguta & nhaka', zh: '城市与遗产' }
];

const destinationCategories = {
  'victoria-falls': ['water'],
  'hwange-national-park': ['wildlife'],
  'chobe-national-park': ['wildlife', 'water'],
  'okavango-delta': ['wildlife', 'water'],
  'cape-town': ['city'],
  'kruger-national-park': ['wildlife'],
  namibia: ['wildlife', 'city'],
  zambia: ['water', 'wildlife'],
  harare: ['city'],
  livingstone: ['water', 'city']
};

export default function Destinations() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return destinations.filter((destination) => {
      const name = t(`destinations.${destination.key}.name`, destination.name).toLowerCase();
      const countryName = destination.country.toLowerCase();
      const matchesQuery = !term || name.includes(term) || countryName.includes(term) || destination.region.toLowerCase().includes(term);
      const matchesCountry = country === 'All' || destination.country === country;
      const matchesCategory = category === 'all' || (destinationCategories[destination.slug] || []).includes(category);
      return matchesQuery && matchesCountry && matchesCategory;
    });
  }, [query, country, category, t]);

  const categoryLabel = (item) => item[i18n.language === 'zh' ? 'zh' : i18n.language === 'sn' ? 'sn' : 'en'];

  return (
    <>
      <Seo title="Destinations" description="Explore Victoria Falls, Hwange, Chobe, the Okavango Delta, Cape Town, Kruger, Namibia and Zambia." image={images.falls} />
      <PageHero
        image={images.fallsWide}
        eyebrow={t('nav.destinations')}
        start={t('home.discoverTitleStart')}
        end={t('home.discoverTitleEnd')}
        text={t('home.discoverText')}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Explore by interest"
            start="Find your"
            end="next destination"
            text="Search by name, country or the kind of experience you are looking for."
          />

          <div className="mt-12 grid gap-6 border-y border-forest-900/10 py-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search destinations</span>
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-600" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search destinations, countries or regions"
                className="field pl-11"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal size={16} className="text-forest-600" aria-hidden="true" />
              {countries.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCountry(item)}
                  className={`border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    country === item ? 'border-forest-800 bg-forest-900 text-ivory' : 'border-forest-900/15 text-charcoal/65 hover:border-forest-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={`border px-4 py-2 text-xs transition-colors ${
                  category === item.id ? 'border-forest-600 bg-sand-100 text-forest-900' : 'border-forest-900/10 text-charcoal/60 hover:border-forest-600'
                }`}
              >
                {categoryLabel(item)}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="mt-8 text-xs uppercase tracking-[0.16em] text-charcoal/50">
            {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'}
          </p>

          {filtered.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((destination, index) => (
                <DestinationCard key={destination.slug} destination={destination} className="min-h-[440px]" delay={index * 0.04} />
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-forest-900/10 bg-sand-50 p-12 text-center">
              <p className="font-display text-3xl text-forest-900">No destinations found</p>
              <p className="mt-3 text-sm text-charcoal/65">Try another search term or clear the filters.</p>
              <button type="button" className="btn-editorial btn-dark mt-6" onClick={() => { setQuery(''); setCountry('All'); setCategory('all'); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-sand-50 py-16 sm:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Destination map"
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
