export default function ThemeCard({ theme, index = 0 }) {
  return (
    <article
      className="theme-card"
      id={`theme-${theme.id}`}
      data-reveal
      style={{ '--reveal-delay': `${index * 0.08}s` }}
    >
      <div className="theme-card__image-wrap">
        <img src={theme.image} alt={theme.alt} loading="lazy" decoding="async" />
        <p className="photo-credit">
          <a href={`#theme-${theme.id}`}>{theme.credit}</a>
        </p>
      </div>
      <div className="theme-card__body">
        <h3>{theme.title}</h3>
        <p>{theme.paragraph}</p>
        <a className="button button--red" href={`#theme-${theme.id}`}>
          Learn more
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
