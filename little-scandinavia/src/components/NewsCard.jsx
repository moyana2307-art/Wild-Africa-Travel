export default function NewsCard({ item, index = 0 }) {
  return (
    <article
      className="news-card"
      data-reveal
      style={{ '--reveal-delay': `${index * 0.09}s` }}
    >
      <div className="news-card__image-wrap">
        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
        <p className="photo-credit">
          <a href={item.href}>{item.credit}</a>
        </p>
      </div>
      <div className="news-card__body">
        <p className="news-card__date">{item.date}</p>
        <h3>{item.title}</h3>
        <p className="news-card__teaser">{item.teaser}</p>
        <a className="button button--red" href={item.href}>
          More info
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
