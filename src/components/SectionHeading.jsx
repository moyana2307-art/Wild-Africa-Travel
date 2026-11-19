import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const headingSizes = {
  sm: {
    first: 'text-2xl sm:text-3xl',
    second: 'text-xl sm:text-2xl'
  },
  md: {
    first: 'text-3xl sm:text-5xl lg:text-6xl',
    second: 'text-2xl sm:text-4xl lg:text-5xl'
  },
  lg: {
    first: 'text-4xl sm:text-6xl lg:text-[5.5rem]',
    second: 'text-2xl sm:text-4xl lg:text-5xl'
  }
};

export function SplitHeading({ first, second, as: Tag = 'h2', tone = 'dark', secondTone, size = 'md', className = '' }) {
  const firstTone = tone === 'light' ? 'text-sand-200' : tone === 'navy' ? 'text-navy-900' : 'text-forest-900';
  const accentTone = secondTone || (tone === 'light' ? 'text-ivory' : 'text-navy-800');
  const scale = headingSizes[size] || headingSizes.md;

  return (
    <Tag className={`split-heading text-balance ${className}`}>
      <span className={`${scale.first} ${firstTone}`}>{first}</span>
      {second && <span className={`${scale.second} ${accentTone}`}>{second}</span>}
    </Tag>
  );
}

export default function SectionHeading({ eyebrow, start, end, text, light = false, align = 'left', action }) {
  const textColor = light ? 'text-ivory/70' : 'text-charcoal/70';

  return (
    <div className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${align === 'center' ? 'text-center md:flex-col md:items-center' : ''}`}>
      <Reveal className="max-w-3xl">
        {eyebrow && (
          <div className={`mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
            <span className="h-px w-10 bg-sand-300" />
            <span className={`eyebrow ${light ? 'text-sand-200' : 'text-forest-600'}`}>{eyebrow}</span>
          </div>
        )}
        <SplitHeading first={start} second={end} tone={light ? 'light' : 'dark'} size="md" />
        {text && <p className={`mt-6 max-w-2xl text-sm leading-7 sm:text-base ${align === 'center' ? 'mx-auto' : ''} ${textColor}`}>{text}</p>}
      </Reveal>
      {action && <Reveal delay={0.15} className="shrink-0">{action}</Reveal>}
    </div>
  );
}

export function TextLink({ to, children, light = false }) {
  return (
    <Link to={to} className={`link-editorial ${light ? 'text-ivory hover:text-sand-200' : 'text-forest-800 hover:text-navy-800'}`}>
      {children}
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}
