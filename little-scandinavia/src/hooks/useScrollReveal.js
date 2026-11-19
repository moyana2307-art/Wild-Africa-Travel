import { useEffect } from 'react';
import useReducedMotion from './useReducedMotion';

export default function useScrollReveal() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-reveal]'));

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [reducedMotion]);
}
