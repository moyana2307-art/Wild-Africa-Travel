import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SplitHeading } from './SectionHeading';

export default function PageHero({ image, eyebrow, start, end, text, crumb, children }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-forest-950 pt-28 text-ivory sm:min-h-[78vh]">
      <motion.div
        key={image}
        initial={{ scale: reduced ? 1 : 1.08, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduced ? 0.01 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img src={image} alt="" className="h-full w-full object-cover" fetchPriority="high" />
      </motion.div>
      <div className="scrim-dark absolute inset-0" />
      <div className="relative mx-auto w-full max-w-editorial px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {crumb && (
            <div className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-ivory/60">
              <Link to="/" className="hover:text-sand-200">Home</Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-sand-200">{crumb}</span>
            </div>
          )}
          <p className="eyebrow mb-5 text-sand-200">{eyebrow}</p>
          <SplitHeading as="h1" first={start} second={end} tone="light" size="lg" />
          {text && <p className="mt-7 max-w-2xl text-sm leading-7 text-ivory/80 sm:text-base">{text}</p>}
          {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
