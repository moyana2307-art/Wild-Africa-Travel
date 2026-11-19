import { Link } from 'react-router-dom';

export default function Logo({ light = false, compact = false }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="Wild Africa Travel home">
      <img
        src="/logo.jpeg"
        alt=""
        aria-hidden="true"
        className="h-10 w-10 shrink-0 rounded-xl object-cover transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"
      />
      <span className="leading-none">
        <span className={`block font-display text-xl tracking-wide sm:text-2xl ${light ? 'text-ivory' : 'text-forest-900'}`}>Wild Africa</span>
        {!compact && <span className={`mt-1 block text-[0.55rem] font-semibold uppercase tracking-[0.35em] ${light ? 'text-ivory/65' : 'text-forest-600'}`}>Travel</span>}
      </span>
    </Link>
  );
}
