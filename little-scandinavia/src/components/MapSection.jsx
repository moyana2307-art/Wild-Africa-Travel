import { useEffect, useState } from 'react';
import Clouds from './Clouds';
import { pointsOfInterest, villages } from '../data/content';

function PoiIcon({ type }) {
  switch (type) {
    case 'castle':
      return (
        <>
          <path d="M-10 7V-3h4v-5h4v5h4v-5h4v5h4v10Z" />
          <path d="M-3 7V1h6v6" />
        </>
      );
    case 'lakes':
      return (
        <>
          <path d="M-11-3c3-3 6-3 9 0s6 3 9 0 4-2 4-2" />
          <path d="M-11 5c3-3 6-3 9 0s6 3 9 0 4-2 4-2" />
        </>
      );
    case 'gorges':
      return (
        <>
          <path d="M-11-8-5 0-9 8" />
          <path d="M11-8 5 0 9 8" />
          <path d="M0-8v16" />
        </>
      );
    case 'mining':
      return (
        <>
          <path d="M-9 7 7-9" />
          <path d="M-8-9c3 1 5 3 6 6" />
          <path d="M9 7-7-9" />
          <path d="M8-9c-3 1-5 3-6 6" />
        </>
      );
    case 'dams':
      return (
        <>
          <path d="M-10-8v16" />
          <path d="M10-8v16" />
          <path d="M-10-8h20" />
          <path d="M-7 1c3-2 5 2 8 0s5-2 8 0" />
        </>
      );
    case 'greenway':
      return (
        <>
          <path d="M-11 7c5-10 11-13 22-14" />
          <circle cx="-8" cy="3" r="2" />
          <circle cx="2" cy="-3" r="2" />
          <circle cx="10" cy="-7" r="2" />
        </>
      );
    case 'volcanism':
      return (
        <>
          <path d="M-10 8 0-7 10 8Z" />
          <path d="M-4-10c1-3 4-3 4-6" />
          <path d="M3-10c2-2 4-2 5-5" />
        </>
      );
    case 'churches':
      return (
        <>
          <path d="M-7 8V-2h14v10Z" />
          <path d="M-10-2 0-9l10 7" />
          <path d="M-2 8V2h4v6" />
        </>
      );
    default:
      return (
        <>
          <path d="M0-10 3-3l8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z" />
        </>
      );
  }
}

export default function MapSection() {
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPoi(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSvgKey = (event, action) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    action();
  };

  return (
    <section className="map-section" id="map" aria-labelledby="map-title">
      <Clouds variant="clouds--map" />

      <div className="shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Find your way</p>
          <h2 id="map-title">Seventeen villages, one slow landscape</h2>
          <p>
            Choose a village label to explore the region, or pick one of the nine points of
            interest to see a photograph and a short story.
          </p>
        </div>

        <div className="map-layout">
          <div className="map-canvas" data-reveal>
            <svg
              className="region-map"
              viewBox="0 0 1000 620"
              role="group"
              aria-labelledby="region-map-title region-map-desc"
            >
              <title id="region-map-title">Illustrated map of Little Scandinavia</title>
              <desc id="region-map-desc">
                A stylised map showing seventeen villages and nine points of interest around lakes,
                rivers, gorges and forest tracks.
              </desc>

              <rect className="region-map__paper" x="0" y="0" width="1000" height="620" rx="38" />

              <g className="region-map__contours" aria-hidden="true">
                <path d="M30 210c120-80 230-95 340-55s210 120 330 75 230-120 275-90" />
                <path d="M20 260c130-80 245-88 355-45s220 115 345 70 225-110 270-85" />
                <path d="M40 470c120-60 230-55 335-10s215 75 335 35 210-95 260-70" />
                <path d="M50 520c120-55 235-50 340-8s220 70 340 30 205-85 250-65" />
              </g>

              <g className="region-map__water" aria-hidden="true">
                <path d="M300 150c70-35 165-30 210 10 35 30 15 75-40 90-70 20-175 12-205-25-22-27-10-55 35-75Z" />
                <path d="M560 330c80-30 180-20 210 25 25 38-25 75-95 78-75 3-145-25-145-60 0-18 12-34 30-43Z" />
                <path d="M115 390c55-25 125-20 155 12 25 27-10 60-70 68-60 8-120-15-120-45 0-14 15-28 35-35Z" />
                <path d="M430 250c35-18 85-15 105 8 15 18-8 42-45 48-35 6-78-10-78-31 0-10 8-20 18-25Z" />
              </g>

              <g className="region-map__routes" aria-hidden="true">
                <path d="M90 120 250 230 430 190 620 270 850 180" />
                <path d="M120 520 280 430 470 470 650 405 880 520" />
                <path d="M180 90 235 300 190 560" />
                <path d="M520 120 500 360 560 600" />
                <path d="M800 100 720 330 790 580" />
              </g>

              <g className="region-map__villages">
                {villages.map((village, index) => (
                  <g
                    key={village.id}
                    className={`village ${selectedVillage?.id === village.id ? 'is-active' : ''}`}
                    style={{ '--marker-index': index }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select village: ${village.name}`}
                    onClick={() => setSelectedVillage(village)}
                    onKeyDown={(event) => handleSvgKey(event, () => setSelectedVillage(village))}
                  >
                    <circle cx={village.x} cy={village.y} r="9" />
                    <circle className="village__halo" cx={village.x} cy={village.y} r="17" />
                    <text x={village.x + 16} y={village.y + 5}>
                      {village.name}
                    </text>
                  </g>
                ))}
              </g>

              <g className="region-map__pois">
                {pointsOfInterest.map((poi, index) => (
                  <g
                    key={poi.id}
                    className={`poi poi--${poi.type} ${selectedPoi?.id === poi.id ? 'is-active' : ''}`}
                    style={{ '--marker-index': index }}
                    transform={`translate(${poi.x} ${poi.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open point of interest: ${poi.title}`}
                    onClick={() => setSelectedPoi(poi)}
                    onKeyDown={(event) => handleSvgKey(event, () => setSelectedPoi(poi))}
                  >
                    <title>{poi.title}</title>
                    <circle className="poi__pulse" r="30" />
                    <circle className="poi__disc" r="22" />
                    <g className="poi__icon">
                      <PoiIcon type={poi.type} />
                    </g>
                  </g>
                ))}
              </g>
            </svg>

            <p className="map-status" aria-live="polite">
              {selectedVillage ? `Selected village: ${selectedVillage.name}` : 'Select a village label on the map'}
            </p>
          </div>

          <aside
            className={`poi-panel ${selectedPoi ? 'is-open' : ''}`}
            aria-live="polite"
            aria-hidden={!selectedPoi}
          >
            {selectedPoi ? (
              <>
                <button type="button" className="poi-panel__back" onClick={() => setSelectedPoi(null)}>
                  <span aria-hidden="true">←</span> Back
                </button>
                <div className="poi-panel__image-wrap">
                  <img src={selectedPoi.image} alt={selectedPoi.alt} loading="lazy" decoding="async" />
                  <p className="photo-credit">
                    <a href={selectedPoi.href}>{selectedPoi.credit}</a>
                  </p>
                </div>
                <div className="poi-panel__body">
                  <p className="eyebrow">Point of interest</p>
                  <h3>{selectedPoi.title}</h3>
                  <p>{selectedPoi.teaser}</p>
                  <a className="button button--red" href={selectedPoi.href}>
                    More info
                  </a>
                </div>
              </>
            ) : (
              <div className="poi-panel__empty">
                <span aria-hidden="true">✦</span>
                <p>Choose a marker to reveal a place, a photo and a short story.</p>
              </div>
            )}
          </aside>
        </div>

        <div className="map-legend" aria-label="Point of interest categories" data-reveal>
          {pointsOfInterest.map((poi) => (
            <button
              type="button"
              key={poi.id}
              className={selectedPoi?.id === poi.id ? 'is-active' : ''}
              aria-pressed={selectedPoi?.id === poi.id}
              onClick={() => setSelectedPoi(poi)}
            >
              <span className={`legend-dot legend-dot--${poi.type}`} aria-hidden="true" />
              {poi.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
