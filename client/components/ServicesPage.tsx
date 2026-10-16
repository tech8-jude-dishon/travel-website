import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, MapPin, Minus, Play, Plus } from 'lucide-react';
import { servicePath } from '../data/winterPackages';
import { getWhatsAppLink } from '../utils/whatsapp';

const W = '/images/winter/';
const S = '/images/services/';

const HIGHLIGHTS = ['Curated escapes', 'Local expertise', 'Personalised trips'];

const ESCAPES = [
  { name: 'Kashmir', id: 'kashmir', img: W + 'ksh-hero.webp', alt: 'Shikaras on a lake below snowy Kashmir peaks' },
  { name: 'Andaman', id: 'andaman', img: W + 'cta-andaman.webp', alt: 'Turquoise water and green islands in the Andamans' },
  { name: 'Rajasthan', id: 'rajasthan', img: S + 'rajasthan-jodhpur.webp', alt: 'Mehrangarh Fort above Jodhpur' },
];

const FAQS = [
  { q: 'Can I customise my travel itinerary?', a: 'Yes. Share your preferred destinations, travel dates and budget, and we can help tailor your itinerary.' },
  { q: 'What is included in a tour package?', a: 'Our packages include hotel stays, daily breakfast, return airport or railway transfers and sightseeing by private vehicle. Each package page lists its exact inclusions and exclusions.' },
  { q: 'Can you help with flights and hotel bookings?', a: 'Yes. We arrange domestic and international flights and hotel bookings, either as part of a package or on their own.' },
  { q: 'When is the best time to visit India?', a: 'It depends on where you go: October to March suits Rajasthan, Andaman and Kerala, December to February brings snow to Kashmir and Himachal, and April to June is ideal for the hills.' },
  { q: 'How do I confirm my booking?', a: 'Once you are happy with the itinerary and quote, we confirm your booking with an advance payment and send the vouchers and trip details to your email and WhatsApp.' },
  { q: 'Where can I find cancellation details?', a: 'Cancellation terms depend on the package, hotels and airlines involved. They are shared with your quote and summarised in our Terms and Conditions.' },
];

const btnCyan = 'inline-flex items-center gap-3 bg-[#14c8f5] text-brand-dark font-semibold rounded-full shadow-[0_10px_24px_rgba(20,200,245,0.35)] hover:bg-[#0fb7fb] hover:-translate-y-0.5 transition-all';

// ---------- hero ----------
const Hero: React.FC = () => {
  const [saved, setSaved] = useState(false);
  return (
    <section className="relative overflow-hidden w-full flex flex-col lg:block lg:min-h-[720px] bg-[#eaf2f9]">
      {/* Desktop: only the empty, snowy left side of this scene shows behind the headline */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-[url('/images/services/hero-snow.webp')] bg-cover bg-no-repeat bg-[position:left_center] [mask-image:linear-gradient(to_right,#000_45%,transparent)]" />
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent" />

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-5 md:px-10 pt-8 lg:pt-20 pb-56 lg:pb-64 pointer-events-none [&_a]:pointer-events-auto">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand-dark/70 uppercase">
          <span className="w-10 h-px bg-brand-dark/50" /> Explore Incredible India
        </p>
        <h1 className="font-sans! mt-4 text-[44px] sm:text-6xl lg:text-[72px] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#0b1630] max-w-3xl">
          Chase Mountains.<br />Make Memories.
        </h1>
        <p className="mt-5 text-lg md:text-xl text-brand-dark/75 max-w-lg">
          Discover breathtaking escapes, handpicked stays and unforgettable journeys across India.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link to="/india-tours" className={`${btnCyan} px-8 py-4 text-lg`}>
            Explore Tours <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/about" className="group flex items-center gap-4">
            <span className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 text-brand-dark fill-brand-dark ml-0.5" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-semibold text-brand-dark">Watch</span>
              <span className="block text-lg text-brand-dark/60">Our Story</span>
            </span>
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap items-center text-brand-dark text-base font-semibold">
          {HIGHLIGHTS.map((h, i) => (
            <li key={h} className={`py-1 pr-6 ${i ? 'pl-6 border-l border-brand-dark/30' : ''}`}>{h}</li>
          ))}
        </ul>
      </div>

      {/* Original banner photo from the design. Phones: full width above the text, cropped above
          the card printed into the photo. Desktop: on the right, fading into the snow, with the
          live trip card sitting exactly over the printed one. */}
      <div className="relative order-first w-full aspect-[792/330] min-h-0 overflow-hidden lg:order-none lg:absolute lg:top-0 lg:right-0 lg:w-[min(52vw,820px)] lg:aspect-[792/540]">
        <img src={S + 'hero-original.webp'} alt="Traveller in a white beanie and ski goggles in the snowy Himalayas" fetchPriority="high"
          className="w-full h-full object-cover object-top [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,#000_16%),linear-gradient(to_bottom,#000_90%,transparent)] lg:[mask-composite:intersect]" />

      {/* featured trip card */}
      <div className="hidden lg:flex absolute left-[21.5%] top-[59.5%] w-[69.5%] h-[37.5%] gap-4 bg-white rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(2,40,91,0.18)]">
        <img src={S + 'kashmir-gulmarg.webp'} alt="Gulmarg Gondola over snowy slopes" className="h-full aspect-square rounded-xl object-cover" />
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="flex items-center gap-1.5 text-xs text-brand-dark/70"><MapPin className="w-3.5 h-3.5 text-red-500 fill-red-500/20" /> Gulmarg, Kashmir</p>
          <p className="mt-1 text-xl font-bold text-[#0b1630]">Your Himalayan Escape</p>
          <p className="text-xs text-brand-dark/55">Snow trails • Scenic stays • Mountain adventures</p>
          <div className="mt-3 flex items-center justify-between">
            <Link to={servicePath('kashmir')} className="inline-flex items-center gap-2 bg-[#0b1630] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors">
              Explore Trip <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={() => setSaved(v => !v)} aria-pressed={saved} aria-label={saved ? 'Remove from saved trips' : 'Save this trip'}
              className="w-10 h-10 rounded-full border border-brand-dark/15 flex items-center justify-center hover:bg-slate-50">
              <Bookmark className={`w-4 h-4 text-brand-dark ${saved ? 'fill-brand-dark' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

// ---------- destination strip ----------
const Escapes: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 -mt-44 lg:-mt-40">
    <div className="bg-white rounded-3xl shadow-[0_24px_60px_rgba(2,40,91,0.14)] p-4 md:p-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.6fr]">
      <div className="flex flex-col justify-center px-3 py-3 sm:col-span-2 lg:col-span-1">
        <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.15em] text-brand-dark/60 uppercase">
          <span className="w-7 h-px bg-brand-dark/40" /> Explore India
        </p>
        <h2 className="font-sans! mt-2 text-3xl md:text-[32px] font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0b1630]">
          Find Your<br />Next Escape.
        </h2>
        <Link to="/india-tours" className="mt-5 self-start inline-flex items-center gap-3 border border-[#0b1630] text-[#0b1630] font-semibold px-6 py-2.5 rounded-full hover:bg-[#0b1630] hover:text-white transition-colors">
          Explore India <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {ESCAPES.map(e => (
        <Link key={e.id} to={servicePath(e.id)} className="group relative h-[170px] rounded-2xl overflow-hidden">
          <img src={e.img} alt={e.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute left-4 bottom-3.5 flex items-center gap-2 text-white text-lg font-semibold">
            <MapPin className="w-5 h-5 fill-white text-white [&>circle]:fill-black/40" /> {e.name}
          </span>
        </Link>
      ))}

      <div className="relative h-[170px] rounded-2xl overflow-hidden sm:col-span-2 lg:col-span-1 bg-[#0b1630] bg-[url('/images/services/journey-card.webp')] bg-cover bg-[position:right_center]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1630] via-[#0b1630]/75 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-6 text-white">
          <p className="text-2xl font-bold leading-tight">A journey<br />made for you.</p>
          <p className="mt-1.5 text-xs text-white/85 max-w-[180px]">Expert planning. Authentic experiences. A more meaningful India.</p>
          <button onClick={onBookClick} className={`${btnCyan} mt-3 self-start px-5 py-2 text-sm`}>
            Plan My Trip <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ---------- FAQ ----------
const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 md:py-20 grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-start">
      <div>
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-[#14b8e6] uppercase">
          <span className="w-10 h-0.5 bg-[#14c8f5]" /> Your Questions, Answered
        </p>
        <h2 className="font-sans! mt-6 text-[40px] md:text-[52px] font-extrabold leading-[1] tracking-[-0.03em] text-[#0b1630]">
          A little clarity.<br />A lot of adventure.
        </h2>
        <p className="mt-5 text-lg text-brand-dark/65">Everything you need to start planning your India escape.</p>
        <a href={getWhatsAppLink('Hi! I would like to plan a trip in India.')} target="_blank" rel="noopener noreferrer"
          className={`${btnCyan} mt-8 px-8 py-3.5 text-lg`}>
          Talk to Our Team <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`rounded-xl border transition-colors ${isOpen ? 'bg-[#eaf6fd] border-[#d4ecfa]' : 'bg-white border-brand-dark/10'}`}>
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-left">
                <span className="font-semibold text-[#0b1630]">{f.q}</span>
                <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isOpen ? 'border border-[#0b1630]/40' : ''}`}>
                  {isOpen ? <Minus className="w-4 h-4 text-[#0b1630]" /> : <Plus className="w-4 h-4 text-[#0b1630]" />}
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-4 -mt-1 text-sm text-brand-dark/70 leading-relaxed">
                  {f.a}
                  {i === FAQS.length - 1 && <> <Link to="/terms" className="text-[#0b8fd8] font-semibold hover:underline">Read the terms</Link>.</>}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ServicesPage: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <div className="bg-white">
    <Hero />
    <Escapes onBookClick={onBookClick} />
    <Faq />
  </div>
);

export default ServicesPage;
