import { useEffect, useState } from 'react';
import Clouds from './Clouds';
import useParallax from '../hooks/useParallax';
import useReducedMotion from '../hooks/useReducedMotion';
import { heroSlides } from '../data/content';

const headlineWords = ['Let', 'yourself', 'be', 'carried', 'away', 'to'];

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const offset = useParallax(reducedMotion, 0.16);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, activeSlide]);

  const goToDiscover = (event) => {
    event.preventDefault();
    document.getElementById('discover')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  };

  const active = heroSlides[activeSlide];

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__slides" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className={`hero__image ${index === activeSlide ? 'is-active' : ''}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>

      <div className="hero__veil" aria-hidden="true" />
      <Clouds offset={offset} variant="clouds--hero" />

      <div
        className="hero__content shell"
        style={{ transform: `translate3d(0, ${offset * -0.12}px, 0)` }}
      >
        <div className="hero__deer-wrap">
          <img className="hero__deer" src="/images/deer.svg" alt="" aria-hidden="true" />
        </div>
        <p className="eyebrow eyebrow--light">A quiet corner of the north</p>
        <h1 id="hero-title" aria-label="Let yourself be carried away to Little Scandinavia">
          <span className="hero__headline" aria-hidden="true">
            {headlineWords.map((word, index) => (
              <span
                className="hero__word"
                style={{ '--word-index': index }}
                key={`${word}-${index}`}
              >
                {word}
              </span>
            ))}
            <em className="hero__title-em" style={{ '--word-index': headlineWords.length }}>
              Little Scandinavia
            </em>
          </span>
        </h1>
        <a className="button button--red button--large" href="#discover" onClick={goToDiscover}>
          Discover
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="hero__bottom shell">
        <a className="hero__credit" href={active.href}>
          {active.credit}
        </a>
        <div className="hero__dots" role="group" aria-label="Choose a hero photograph">
          {heroSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              className={index === activeSlide ? 'is-active' : ''}
              aria-label={`Show photograph ${index + 1}: ${slide.alt}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
