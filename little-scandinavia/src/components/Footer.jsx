import { useState } from 'react';
import Clouds from './Clouds';
import { footerImage } from '../data/content';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.5 8.5H17V5h-2.5c-2.2 0-3.5 1.4-3.5 3.6V11H9v3.5h2V21h3.5v-6.5H17l.5-3.5h-3V9c0-.4.2-.5.5-.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="instagram-dot" cx="17" cy="7" r="1" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!valid) {
      setSubscribed(false);
      setMessage('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
    setMessage('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__photo" aria-hidden="true">
        <img src={footerImage.src} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="site-footer__shade" aria-hidden="true" />
      <Clouds offset={0} variant="clouds--footer" />

      <div className="shell site-footer__content">
        <p className="site-footer__photo-credit">
          <a href="#top">{footerImage.credit}</a>
        </p>

        <div className="site-footer__grid">
          <section className="footer-newsletter" aria-labelledby="newsletter-title" data-reveal>
            <p className="eyebrow eyebrow--light">Keep in touch</p>
            <h2 id="newsletter-title">Stories from the slow north</h2>
            <p>Seasonal notes, open days and quiet places, delivered once a month.</p>
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage('');
                }}
              />
              <button type="submit" className="button button--red">
                Subscribe
              </button>
            </form>
            <p
              className={`newsletter-message ${subscribed ? 'is-success' : ''}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          </section>

          <section className="footer-map" aria-labelledby="mini-map-title" data-reveal>
            <h2 className="sr-only" id="mini-map-title">
              Where to find the tourist office
            </h2>
            <svg viewBox="0 0 360 180" role="img" aria-labelledby="mini-map-svg-title mini-map-svg-desc">
              <title id="mini-map-svg-title">Tourist office location map</title>
              <desc id="mini-map-svg-desc">
                The tourist office in Lakstad sits between Norrsund to the north and Södervik to
                the south in Little Scandinavia.
              </desc>
              <rect className="mini-map__paper" x="0" y="0" width="360" height="180" rx="24" />
              <path className="mini-map__road" d="M60 20C110 60 100 110 180 155" />
              <path className="mini-map__road mini-map__road--thin" d="M40 130 300 45" />
              <circle className="mini-map__dot" cx="180" cy="92" r="9" />
              <circle className="mini-map__pulse" cx="180" cy="92" r="18" />
              <text className="mini-map__office" x="198" y="97">Tourist office</text>
              <circle className="mini-map__town" cx="112" cy="48" r="5" />
              <text x="124" y="52">Norrsund</text>
              <circle className="mini-map__town" cx="245" cy="140" r="5" />
              <text x="257" y="144">Södervik</text>
              <text className="mini-map__region" x="20" y="165">Little Scandinavia</text>
            </svg>
          </section>

          <section
            className="footer-contact"
            aria-labelledby="contact-title"
            data-reveal
            style={{ '--reveal-delay': '0.08s' }}
          >
            <h2 id="contact-title">Find us</h2>
            <address>
              1 Harbour Square<br />
              Lakstad, LS-210<br />
              Little Scandinavia
            </address>
            <a href="tel:+46123456789">+46 (0) 12 345 67 89</a>
            <div className="social-links" aria-label="Social media">
              <a href="#footer" aria-label="Little Scandinavia on Facebook">
                <FacebookIcon />
              </a>
              <a href="#footer" aria-label="Little Scandinavia on Instagram">
                <InstagramIcon />
              </a>
            </div>
          </section>

          <nav
            className="footer-links"
            aria-label="Useful links"
            data-reveal
            style={{ '--reveal-delay': '0.16s' }}
          >
            <h2>Good to know</h2>
            <ul>
              <li><a href="#footer">Pro area</a></li>
              <li><a href="#footer">Brochures</a></li>
              <li><a href="#map">Information offices</a></li>
              <li><a href="#map">How to get here</a></li>
            </ul>
          </nav>
        </div>

        <div className="partners" data-reveal>
          <p className="partners__notice">
            Funded by the Regional Culture Fund and the European Greenways Programme.
          </p>
          <ul className="partners__logos" aria-label="Partners and funders">
            <li><span>Northlight</span></li>
            <li><span>Region Council</span></li>
            <li><span>Slow Travel Fund</span></li>
            <li><span>Greenways Europe</span></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© 2027 Little Scandinavia Tourist Office</p>
          <p>Designed by Nord Studio</p>
          <nav aria-label="Legal">
            <a href="#footer">Legal notices</a>
            <a href="#footer">Privacy</a>
            <a href="#footer">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
