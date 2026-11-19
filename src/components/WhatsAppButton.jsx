import { MessageCircle } from 'lucide-react';
import { company } from '../data/site';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hello Wild Africa Travel, I would like to enquire about a journey.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Wild Africa Travel on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-forest-800 text-ivory shadow-[0_12px_35px_rgba(12,24,17,0.35)] transition-all duration-300 hover:scale-105 hover:bg-sand-200 hover:text-forest-950 sm:bottom-8 sm:right-8"
    >
      <MessageCircle size={21} aria-hidden="true" />
    </a>
  );
}
