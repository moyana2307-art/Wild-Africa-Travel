const clouds = [
  { src: '/images/cloud_1.svg', className: 'cloud cloud--one' },
  { src: '/images/cloud_2.svg', className: 'cloud cloud--two' },
  { src: '/images/cloud_3.svg', className: 'cloud cloud--three' }
];

export default function Clouds({ offset = 0, variant = '' }) {
  return (
    <div className={`clouds ${variant}`} aria-hidden="true">
      {clouds.map((cloud, index) => (
        <div
          key={cloud.src}
          className="cloud__track"
          style={{ transform: `translate3d(0, ${offset * (0.05 + index * 0.025)}px, 0)` }}
        >
          <img className={cloud.className} src={cloud.src} alt="" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}
