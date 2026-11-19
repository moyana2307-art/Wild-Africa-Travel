import Clouds from './components/Clouds';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import NewsCard from './components/NewsCard';
import ScrollProgress from './components/ScrollProgress';
import ThemeCard from './components/ThemeCard';
import { highlights, heroSlides, themes } from './data/content';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();
  const discoverImage = heroSlides[1];

  return (
    <>
      <ScrollProgress />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />

      <main id="main">
        <Hero />

        <section className="discover-section" id="discover" aria-labelledby="discover-title">
          <div className="shell discover-section__grid">
            <div className="discover-section__copy" data-reveal>
              <p className="eyebrow">Slow travel</p>
              <h2 id="discover-title">A place that asks you to slow down</h2>
              <p>
                Little Scandinavia is a mosaic of lake villages, pine forests and open fells. There
                is no single way through it: follow a blue trail in the morning, a quiet road after
                lunch and the sound of water in the evening.
              </p>
              <p>
                The region is easy to reach and hard to hurry. Stay a little longer than you
                planned — the best views tend to arrive when you stop.
              </p>
              <div className="discover-section__actions" id="stay">
                <a className="button button--red" href="#map">
                  Find your stay
                  <span aria-hidden="true">→</span>
                </a>
                <a className="text-link" href="#highlights">
                  See what is on
                </a>
              </div>
            </div>

            <figure
              className="discover-section__figure"
              data-reveal
              style={{ '--reveal-delay': '0.12s' }}
            >
              <img src={discoverImage.image} alt={discoverImage.alt} loading="lazy" decoding="async" />
              <figcaption className="photo-credit">
                <a href={discoverImage.href}>{discoverImage.credit}</a>
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="sky-break" aria-hidden="true">
          <Clouds variant="clouds--break" />
          <p>The sky does the rest.</p>
        </div>

        <MapSection />

        <section className="highlights-section" id="highlights" aria-labelledby="highlights-title">
          <div className="shell">
            <div className="section-heading section-heading--center" data-reveal>
              <p className="eyebrow">What is on</p>
              <h2 id="highlights-title">Highlights</h2>
              <p>Three reasons to put a date in the diary and come back.</p>
            </div>
            <div className="card-grid">
              {highlights.map((item, index) => (
                <NewsCard item={item} index={index} key={item.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="themes-section" id="themes" aria-labelledby="themes-title">
          <span className="anchor" id="activities" aria-hidden="true" />
          <div className="shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Follow a theme</p>
              <h2 id="themes-title">Explore Little Scandinavia</h2>
              <p>
                Seven small stories about the things that make this landscape feel both wild and
                familiar.
              </p>
            </div>
            <div className="theme-rail">
              {themes.map((theme, index) => (
                <ThemeCard theme={theme} index={index} key={theme.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="closing-cta" aria-labelledby="closing-title">
          <div className="shell closing-cta__inner" data-reveal>
            <p className="eyebrow eyebrow--light">Your turn</p>
            <h2 id="closing-title">Make room for the unexpected.</h2>
            <p>Pick a village, follow a trail and let the day take its time.</p>
            <a className="button button--red button--large" href="#map">
              Start exploring
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
