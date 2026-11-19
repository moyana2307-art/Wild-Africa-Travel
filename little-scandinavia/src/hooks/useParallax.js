import { useEffect, useState } from 'react';

export default function useParallax(reduced, factor = 0.12) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return undefined;
    }

    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setOffset(window.scrollY * factor));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduced, factor]);

  return offset;
}
