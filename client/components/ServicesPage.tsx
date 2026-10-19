import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Bookmark, Facebook, Instagram, Linkedin, MapPin, Menu, Minus, Play, Plus, Search, X, Youtube,
} from 'lucide-react';
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

// ---------- brand mark, floating header and footer (this page draws its own) ----------
const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/globalconnectworldtravel/' },
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/people/Global-Connect-World-Travel/61586916384409/' },
  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@GlobalConnectWorldTravels' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/global-connect-world-travel/' },
];

const Brand: React.FC<{ light?: boolean }> = ({ light }) => (
  <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Global Connect World Travel home">
    <svg viewBox="0 0 64 36" className="w-12 h-7" aria-hidden="true">
      <path d="M2 34 22 6l10 13 8-9 22 24h-9L40 20l-8 9L22 15 11 34z" fill={light ? '#14c8f5' : '#0b1630'} />
      <path d="M22 6 32 19l-4 5-6-9z" fill="#14c8f5" />
    </svg>
    <span className="leading-none">
      <span className={`font-display block text-[19px] font-extrabold tracking-[-0.01em] ${light ? 'text-white' : 'text-[#0b1630]'}`}>WORLD TRAVEL</span>
      <span className={`block mt-1 text-[8.5px] font-semibold tracking-[0.52em] ${light ? 'text-[#14c8f5]' : 'text-brand-dark/60'}`}>GLOBAL CONNECT</span>
    </span>
  </Link>
);

const Header: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute z-30 top-3 lg:top-5 inset-x-3 lg:inset-x-[8.8vw]">
      <div className="flex items-center gap-4 bg-white/95 backdrop-blur rounded-2xl lg:rounded-[22px] shadow-[0_10px_30px_rgba(2,40,91,0.10)] pl-5 pr-3 lg:pl-8 lg:pr-3 py-2.5">
        <Brand />
        <nav className="hidden lg:flex flex-1 justify-center gap-[2.6vw]">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} className="text-[15px] font-medium text-[#0b1630] hover:text-[#0b8fd8] transition-colors">{n.label}</Link>
          ))}
        </nav>
        <div className="ml-auto lg:ml-0 flex items-center gap-3">
          <span className="hidden lg:block w-px h-8 bg-brand-dark/15" />
          <button onClick={() => navigate('/search')} aria-label="Search tours"
            className="hidden sm:flex w-11 h-11 rounded-full bg-slate-100 items-center justify-center hover:bg-slate-200 transition-colors">
            <Search className="w-[18px] h-[18px] text-[#0b1630]" />
          </button>
          <span className="hidden lg:block w-px h-8 bg-brand-dark/15" />
          <button onClick={onBookClick} className={`${btnCyan} px-5 lg:px-6 py-2.5 lg:py-3 text-[15px]`}>
            Plan My Trip <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Menu"
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#0b1630]">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden mt-2 bg-white rounded-2xl shadow-xl p-2 flex flex-col">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-medium text-[#0b1630] hover:bg-slate-50">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
};

const PageFooter: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <footer className="bg-[#0b1d3f] text-white border-t-4 border-[#14c8f5]">
    <div className="px-5 md:px-10 lg:px-[6.4vw] pt-8 pb-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
      <div>
        <Brand light />
        <p className="mt-3 text-sm text-white/80 leading-relaxed">Thoughtfully planned journeys.<br />Unforgettable Indian escapes.</p>
        <div className="mt-4 flex gap-3">
          {SOCIALS.map(({ Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-full border border-white/70 flex items-center justify-center hover:bg-white hover:text-[#0b1d3f] transition-colors">
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold">Quick Links</p>
        <span className="block mt-2 w-6 h-0.5 bg-[#14c8f5]" />
        <ul className="mt-3 space-y-1.5 text-sm text-white/80">
          {[NAV[0], NAV[3], NAV[2], NAV[4]].map(n => <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>)}
        </ul>
      </div>
      <div>
        <p className="font-semibold">Explore India</p>
        <span className="block mt-2 w-6 h-0.5 bg-[#14c8f5]" />
        <ul className="mt-3 space-y-1.5 text-sm text-white/80">
          {[['Kashmir', 'kashmir'], ['Andaman', 'andaman'], ['Rajasthan', 'rajasthan'], ['Sikkim', 'sikkim']].map(([n, id]) => (
            <li key={id}><Link to={servicePath(id)} className="hover:text-white">{n}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold">Plan Your Journey</p>
        <span className="block mt-2 w-6 h-0.5 bg-[#14c8f5]" />
        <p className="mt-3 text-sm text-white/80">Tell us where you want to go.</p>
        <button onClick={onBookClick} className={`${btnCyan} mt-4 px-6 py-3`}>
          Enquire Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="mx-5 md:mx-10 lg:mx-[6.4vw] border-t border-white/15 py-4 flex flex-col sm:flex-row gap-3 justify-between text-xs text-white/75">
      <p>© {new Date().getFullYear()} Global Connect World Travel. All rights reserved.</p>
      <p className="flex items-center gap-4">
        <span className="hidden sm:block w-px h-4 bg-white/30" />
        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
        <span className="w-px h-4 bg-white/30" />
        <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
      </p>
    </div>
  </footer>
);

// ---------- hero (banner + destination strip, on one continuous snowy background) ----------
const Hero: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const [saved, setSaved] = useState(false);
  return (
    <section className="relative overflow-hidden w-full flex flex-col lg:min-h-[calc(44.4vw+400px)] bg-[#eaf2f9]">
      <Header onBookClick={onBookClick} />
      {/* Full-width snowy scene behind everything, with a light wash so the headline reads */}
      <div className="absolute inset-0 bg-[url('/images/services/hero-scene.webp')] bg-cover bg-no-repeat bg-[position:center_35%]" />
      <div className="absolute inset-0 bg-white/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-white/55 lg:via-white/15 lg:to-transparent" />

      {/* Original banner photo from the design. Phones: full width above the text, cropped above
          the card printed into the photo. Desktop: on the right, standing on the destination strip,
          with the live trip card sitting exactly over the printed one. */}
      <div className="relative z-[1] order-first w-full aspect-[912/400] max-lg:mt-[76px] min-h-0 overflow-hidden lg:order-none lg:absolute lg:bottom-[330px] lg:right-0 lg:w-[64vw] lg:aspect-[912/632] lg:[--woman-shift:8%_0]">
        <img src={S + 'hero-woman-wide.webp'} alt="Traveller in a white beanie and ski goggles in the snowy Himalayas" fetchPriority="high" style={{ translate: 'var(--woman-shift, 0)' }}
          className="w-full h-full object-cover object-top [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] lg:[mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_68%,rgba(0,0,0,0.55)_84%,transparent_97%)]" />

        {/* featured trip card */}
        <div className="hidden lg:flex absolute left-[36.5%] top-[65.2%] w-[60.4%] h-[32.2%] gap-4 bg-white rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(2,40,91,0.18)]">
          <img src={S + 'card-gulmarg.webp'} alt="Gondola over snowy peaks and pine trees in Gulmarg" className="h-full aspect-square rounded-xl object-cover" />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="flex items-center gap-1.5 text-xs text-brand-dark/70"><MapPin className="w-3.5 h-3.5 text-red-500 fill-red-500/20" /> Gulmarg, Kashmir</p>
            <p className="font-display mt-1 text-xl font-bold tracking-[-0.02em] text-[#0b1630]">Your Himalayan Escape</p>
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

      <div className="relative z-10 lg:flex-1 w-full mx-auto px-5 md:px-10 lg:px-[7vw] pt-8 lg:pt-[150px] pb-10 pointer-events-none [&_a]:pointer-events-auto">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand-dark/70 uppercase">
          <span className="w-10 h-px bg-brand-dark/50" /> Explore Incredible India
        </p>
        <h1 className="font-display mt-4 text-[44px] sm:text-6xl lg:text-[clamp(60px,5.5vw,112px)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#0b1630] whitespace-nowrap">
          Chase Mountains.<br />Make Memories.
        </h1>
        <p className="mt-5 text-lg md:text-xl lg:text-[clamp(20px,1.4vw,28px)] text-brand-dark/75 max-w-[34vw] max-lg:max-w-lg">
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

        <ul className="mt-10 flex flex-wrap items-center text-white text-base font-semibold"
          style={{ textShadow: '0 1px 2px rgba(2,22,48,0.95), 0 2px 12px rgba(2,22,48,0.8)' }}>
          {HIGHLIGHTS.map((h, i) => (
            <li key={h} className={`py-1 pr-6 ${i ? 'pl-6 border-l border-white/80' : ''}`}>{h}</li>
          ))}
        </ul>
      </div>

      <div className="relative z-20 w-full mx-auto px-5 md:px-10 lg:px-[3.7vw] pb-10">
        <Escapes onBookClick={onBookClick} />
      </div>
    </section>
  );
};

// ---------- destination strip ----------
const Escapes: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <div className="bg-white rounded-3xl shadow-[0_24px_60px_rgba(2,40,91,0.14)] p-4 md:p-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.6fr]">
    <div className="flex flex-col justify-center px-3 py-3 sm:col-span-2 lg:col-span-1">
      <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.15em] text-brand-dark/60 uppercase">
        <span className="w-7 h-px bg-brand-dark/40" /> Explore India
      </p>
      <h2 className="font-display mt-2 text-3xl md:text-[34px] lg:text-[clamp(28px,2.35vw,46px)] font-extrabold leading-[1] tracking-[-0.04em] text-[#0b1630]">
        Find Your<br />Next Escape.
      </h2>
      <Link to="/india-tours" className="mt-5 self-start inline-flex items-center gap-3 border border-[#0b1630] text-[#0b1630] font-semibold px-6 py-2.5 rounded-full hover:bg-[#0b1630] hover:text-white transition-colors">
        Explore India <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

    {ESCAPES.map(e => (
      <Link key={e.id} to={servicePath(e.id)} className="group relative h-[170px] lg:h-[210px] rounded-2xl overflow-hidden">
        <img src={e.img} alt={e.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute left-4 bottom-3.5 flex items-center gap-2 text-white text-lg font-semibold">
          <MapPin className="w-5 h-5 fill-white text-white [&>circle]:fill-black/40" /> {e.name}
        </span>
      </Link>
    ))}

    <div className="relative h-[170px] lg:h-[210px] rounded-2xl overflow-hidden sm:col-span-2 lg:col-span-1 bg-[#0b1630] bg-[url('/images/services/journey-card.webp')] bg-cover bg-[position:right_center]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1630] via-[#0b1630]/75 to-transparent" />
      <div className="relative h-full flex flex-col justify-center px-6 text-white">
        <p className="font-display text-[28px] font-bold leading-[1.05] tracking-[-0.03em]">A journey<br />made for you.</p>
        <p className="mt-2 text-sm text-white/85 max-w-[200px]">Expert planning. Authentic experiences. A more meaningful India.</p>
        <button onClick={onBookClick} className={`${btnCyan} mt-3 self-start px-5 py-2 text-sm`}>
          Plan My Trip <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// ---------- FAQ ----------
const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-10 py-12 md:py-14 grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-start">
      <div>
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-[#14b8e6] uppercase">
          <span className="w-10 h-0.5 bg-[#14c8f5]" /> Your Questions, Answered
        </p>
        <h2 className="font-display mt-6 text-[40px] md:text-[54px] font-extrabold leading-[1] tracking-[-0.045em] text-[#0b1630]">
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
    <Hero onBookClick={onBookClick} />
    <Faq />
    <PageFooter onBookClick={onBookClick} />
  </div>
);

export default ServicesPage;
