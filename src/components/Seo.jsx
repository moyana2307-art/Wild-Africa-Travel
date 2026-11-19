import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const siteUrl = 'https://wildafricatravel.co.zw';

export default function Seo({ title, description, image = '/og-image.svg' }) {
  const { pathname } = useLocation();
  const canonical = `${siteUrl}${pathname === '/' ? '' : pathname}`;
  const fullTitle = title ? `${title} | Wild Africa Travel` : 'Wild Africa Travel | Discover Southern Africa';
  const fullDescription = description || 'Tailored Southern African journeys, Victoria Falls tours, safaris and complete travel planning from Zimbabwe.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
    </Helmet>
  );
}
