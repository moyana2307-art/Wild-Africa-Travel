import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapLocations } from '../data/site';
import { SplitHeading } from './SectionHeading';

const createIcon = (active, type) =>
  L.divIcon({
    className: 'map-pin-wrapper',
    html: `<div class="map-pin map-pin--${type}${active ? ' map-pin--active' : ''}"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

const icons = {
  city: { active: createIcon(true, 'city'), inactive: createIcon(false, 'city') },
  nature: { active: createIcon(true, 'nature'), inactive: createIcon(false, 'nature') }
};

function MapFocus({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], 6.2, { duration: 1.2 });
  }, [location, map]);
  return null;
}

export default function DestinationMap() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(mapLocations[1].id);
  const active = mapLocations.find((location) => location.id === activeId) || mapLocations[0];

  return (
    <div className="grid overflow-hidden border border-forest-900/10 bg-white lg:grid-cols-[1.5fr_1fr]">
      <div className="relative h-[420px] bg-sand-100 sm:h-[520px] lg:h-full lg:min-h-[540px]">
        <MapContainer center={[-20.5, 25.5]} zoom={5.4} scrollWheelZoom={false} zoomControl={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFocus location={active} />
          {mapLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={icons[location.type][location.id === activeId ? 'active' : 'inactive']}
              eventHandlers={{ click: () => setActiveId(location.id) }}
              title={location.name}
              alt={location.name}
            />
          ))}
        </MapContainer>
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-[400] h-[78%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-navy-800/35" />
        <div className="pointer-events-none absolute left-4 top-4 z-[500] bg-forest-950/85 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory">
          {t('home.mapTitleStart')} {t('home.mapTitleEnd')}
        </div>
      </div>

      <div className="flex flex-col bg-forest-950 text-ivory">
        <div className="flex flex-wrap gap-2 border-b border-ivory/10 p-5">
          {mapLocations.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => setActiveId(location.id)}
              className={`border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.12em] transition-colors ${
                location.id === activeId
                  ? 'border-sand-200 bg-sand-200 text-forest-950'
                  : 'border-ivory/20 text-ivory/65 hover:border-sand-200 hover:text-sand-200'
              }`}
            >
              {location.name}
            </button>
          ))}
          <div className="flex w-full items-center gap-5 pt-2 text-[0.6rem] uppercase tracking-[0.16em] text-ivory/45">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-navy-800" /> Cities</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-forest-700" /> Nature</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex flex-1 flex-col"
          >
            <div className="image-reveal relative aspect-[16/10] w-full">
              <img src={active.image} alt={active.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="scrim-soft absolute inset-0" />
            </div>
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <p className="eyebrow mb-3 flex items-center gap-2 text-sand-200">
                <MapPin size={13} aria-hidden="true" /> {active.country}
              </p>
              <SplitHeading first={active.name} tone="light" size="sm" />
              <p className="mt-4 text-sm leading-7 text-ivory/70">{t(`destinations.${active.key}.description`)}</p>
              <Link to={`/destinations/${active.slug}`} className="link-editorial mt-7 text-sand-200 hover:text-ivory">
                {t('common.discoverMore')} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
