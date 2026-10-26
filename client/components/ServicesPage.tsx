import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { servicePath } from '../data/winterPackages';
import { enquiries } from '../lib/apiClient';
import { getWhatsAppLink } from '../utils/whatsapp';
import './ServicesPage.css';

// Ported from the "GC World Travel — Home Page" design (Main.dc.html). At 1200px and wider the
// page is the design's 1440px artboard, zoomed to the screen width; below that it stacks.
const G = '/images/gch/';
const DESIGN_WIDTH = 1440;
const DESKTOP_MIN = 1200;

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'Experiences', to: '/india-tours' },
  { label: 'Offers', to: '/holidays' },
  { label: 'Contact', to: '/contact' },
];

const POPULAR = ['Santorini', 'Bali', 'Kyoto', 'Swiss Alps', 'Maldives'];

const DESTINATIONS = [
  { id: 'sikkim', title: 'Sikkim + Darjeeling', sub: 'Tea gardens & Himalayan views', img: G + 'dest-sikkim.webp' },
  { id: 'andaman', title: 'Andaman', sub: 'Turquoise waters & island escapes', img: G + 'dest-andaman.webp' },
  { id: 'rajasthan', title: 'Rajasthan', sub: 'Royal heritage & desert trails', img: G + 'dest-rajasthan.webp' },
  { id: 'uttarakhand', title: 'Uttarakhand', sub: 'Mountain air & peaceful valleys', img: G + 'dest-uttarakhand.webp' },
  { id: 'kashmir', title: 'Kashmir', sub: 'Alpine meadows & scenic escapes', img: G + 'dest-kashmir.webp' },
  { id: 'himachal', title: 'Himachal', sub: 'Pine forests & mountain adventures', img: G + 'dest-himachal.webp' },
];

// Sample reviews, exactly as labelled in the design: replace with real Google reviews before launch.
// x = each card's left edge (design px); REVIEW_STEP = the even distance between card tops.
const REVIEW_STEP = 190;
const REVIEWS = [
  { x: 690, photo: G + 'review-1.webp', text: 'Our Andaman holiday was thoughtfully planned and full of beautiful moments.' },
  { x: 790, photo: G + 'review-2.webp', text: 'A smooth Kashmir getaway, with friendly support at every step.' },
  { x: 730, photo: G + 'review-3.webp', text: 'From booking to our return, the Sikkim trip felt effortless.' },
];

const FAQS: [string, string][] = [
  ['How do I book a trip with World Travel?', 'Tell us where and when you would like to travel through the enquiry form, WhatsApp or a call. Our team will share options and help you confirm your booking.'],
  ['Can I customise my travel package?', 'Share your preferred destination, travel dates and interests. Our team can help you explore suitable itinerary options.'],
  ['Which destinations can I explore?', 'We plan holidays across India, including Andaman, Kashmir, Himachal, Uttarakhand, Rajasthan and Sikkim + Darjeeling, and more.'],
  ['What is included in a tour package?', 'Inclusions vary by package and usually cover stays, transfers and sightseeing. Your itinerary lists exactly what is included before you book.'],
  ['How can I contact your travel team?', 'Reach us through the contact form, WhatsApp or phone. You will find our details on the Contact page.'],
];

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/people/Global-Connect-World-Travel/61586916384409/' },
  { label: 'Instagram', href: 'https://www.instagram.com/globalconnectworldtravel/' },
  { label: 'X', href: 'https://x.com/GlobalT6016' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/global-connect-world-travel/' },
];

const PHONE = '+91 89210 95973';
const EMAIL = 'booking@globalconnectworldtravel.com';

// 13 x 13 tiles; the wave runs out from the centre
const TILES = Array.from({ length: 169 }, (_, k) => {
  const r = Math.floor(k / 13), c = k % 13;
  return (Math.sqrt((r - 6) ** 2 + (c - 6) ** 2) * 0.22).toFixed(2);
});

// ---------- small shared pieces ----------
const ArrowUpRight: React.FC<{ size?: number; color?: string; w?: number }> = ({ size = 14, color = '#FFFFFF', w = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
);
const Chevron: React.FC<{ size?: number; color?: string; dir?: 'left' | 'right' }> = ({ size = 18, color = '#FFFFFF', dir = 'right' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" aria-hidden="true"><path d={dir === 'right' ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} /></svg>
);
const Star: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#F4B400" /></svg>
);
const Cloud: React.FC<{ className: string }> = ({ className }) => (
  <svg aria-hidden="true" viewBox="0 0 230 110" className={className}>
    <path d="M40 100 C10 100 0 76 14 60 C22 50 36 48 46 52 C50 28 76 14 100 22 C112 6 146 4 162 24 C186 18 210 34 210 58 C226 64 230 100 196 100 Z" fill="#FFFFFF" />
    <path d="M46 100 C30 98 22 86 28 76 C60 84 140 86 210 76 C214 92 206 100 196 100 Z" fill="var(--cloudShade)" />
  </svg>
);
const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <img src={G + 'gcwt-logo.png'} alt="Global Connect World Travel" className={className} />
);

const STYLE_ICONS: { label: string; to: string; d: React.ReactNode }[] = [
  { label: 'Beaches', to: servicePath('andaman'), d: <><path d="M3 19c2 0 2-1.5 4.5-1.5S9.5 19 12 19s2-1.5 4.5-1.5S19 19 21 19" /><path d="M12 15V5m0 0c-3 0-5 2-6 4m6-4c3 0 5 2 6 4m-6-4c-1.5 1-2.5 3-2.5 5m2.5-5c1.5 1 2.5 3 2.5 5" /></> },
  { label: 'Mountains', to: servicePath('himachal'), d: <><path d="M2 20L9 7l4 7 2.5-4L22 20z" /><path d="M7.2 10.4L9 12l1.6-1.6" /></> },
  { label: 'City breaks', to: '/india-tours', d: <><path d="M3 21V10h5v11M8 21V4h7v17M15 21V8h6v13M2 21h20" /><path d="M11 8h1M11 12h1M11 16h1" /></> },
  { label: 'Heritage', to: servicePath('rajasthan'), d: <><path d="M3 21h18M5 21V11h14v10M4 11l8-7 8 7" /><path d="M9 21v-5h6v5" /></> },
  { label: 'Cruises', to: '/packages', d: <><path d="M3 15l2 5h14l2-5z" /><path d="M6 15V9h12v6M9 9V5h6v4" /></> },
  { label: 'Honeymoon', to: servicePath('kashmir'), d: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" /> },
];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

// ---------- HERO ----------
const Hero: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="gh-hero">
      {/* 3D tile grid behind the copy */}
      <div className="gh-grid-wrap" aria-hidden="true">
        <div className="gh-grid">
          {TILES.map((d, k) => <span key={k} className="gh-tile" style={{ animationDelay: `${d}s` }} />)}
        </div>
      </div>

      {/* NAV */}
      <header className="gh-nav">
        <Link to="/" className="gh-nav-logo"><Logo /></Link>
        <nav className="gh-nav-links" aria-label="Main">
          {NAV.map(n => <Link key={n.to} to={n.to}>{n.label}</Link>)}
        </nav>
        <div className="gh-nav-right">
          <Link to="/admin" className="gh-nav-login">Login</Link>
          <button type="button" onClick={onBookClick} className="gh-nav-go">Let’s travel<ArrowUpRight /></button>
          <button type="button" className="gh-nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(v => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav className="gh-nav-mobile" aria-label="Main">
            {NAV.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>)}
            <Link to="/admin" onClick={() => setOpen(false)}>Login</Link>
            <button type="button" onClick={() => { setOpen(false); onBookClick(); }} className="gh-nav-go">Let’s travel<ArrowUpRight /></button>
          </nav>
        )}
      </header>

      {/* LEFT COPY */}
      <div className="gh-copy">
        <span className="gh-eyebrow">EXPLORE · DREAM · DISCOVER</span>
        <h1 className="gh-h1"><span>Find your</span><span className="gh-accent">next escape.</span></h1>
        <p className="gh-lede">Handpicked stays, curated holidays and local experiences — planned end to end, so all you pack is curiosity.</p>
        <div className="gh-popular">
          <div>{POPULAR.map(p => <Link key={p} to="/packages">{p}</Link>)}</div>
        </div>
        <div className="gh-ctas">
          <button type="button" onClick={onBookClick} className="gh-btn-dark">Plan my trip<ArrowUpRight size={15} /></button>
          <button type="button" onClick={() => scrollTo('gh-destinations')} className="gh-btn-glass">View packages
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </button>
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="gh-visual">
        <div className="gh-flight" aria-hidden="true">
          <svg width="560" height="210" viewBox="0 0 560 210" fill="none"><circle cx="14" cy="168" r="5" fill="var(--warm)" /></svg>
          <span className="gh-pulse"><span /></span>
        </div>
        <div className="gh-arch" aria-hidden="true" />
        <div className="gh-arch-dash" aria-hidden="true" />
        <div className="gh-traveller">
          <img src={G + 'hero-traveller.webp'} alt="Smiling young woman traveller in a blue shirt with a backpack" fetchPriority="high" />
        </div>
        <Link to="/packages" className="gh-nextstop gh-float" style={{ animationDelay: '-2.5s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
          <span className="gh-nextstop-txt"><span>Next stop</span><span>Santorini, Greece</span></span>
          <span className="gh-nextstop-go"><ArrowUpRight size={14} w={2.4} /></span>
        </Link>
        <div className="gh-orb gh-orb-a gh-float" style={{ animationDelay: '-2s' }} aria-hidden="true" />
        <div className="gh-orb gh-orb-warm gh-orb-b gh-float" style={{ animationDelay: '-4s' }} aria-hidden="true" />
        <svg aria-hidden="true" viewBox="0 0 190 190" className="gh-ring gh-float" style={{ animationDelay: '-5s' }}>
          <defs><radialGradient id="ghRing" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.45" stopColor="var(--ringMid)" /><stop offset="1" stopColor="var(--ringEdge)" /></radialGradient></defs>
          <path fillRule="evenodd" d="M95 10 a85 85 0 1 1 0 170 a85 85 0 1 1 0 -170 Z M95 62 a33 33 0 1 0 0 66 a33 33 0 1 0 0 -66 Z" fill="url(#ghRing)" opacity="0.95" />
          <path d="M50 42 C70 26 100 22 122 30" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.85" />
        </svg>
        <Cloud className="gh-cloud gh-cloud-a gh-drift" />
        <Cloud className="gh-cloud gh-cloud-b gh-drift gh-delay6" />
        <div className="gh-offer gh-float" style={{ animationDelay: '-1s' }}>
          <span>EARLY BIRD</span>
          <span>Deals on your first holiday</span>
        </div>
        <div className="gh-besttime gh-float" style={{ animationDelay: '-3s' }}>
          <span className="gh-besttime-k"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>Best time to visit</span>
          <span className="gh-besttime-v">April – October</span>
          <span className="gh-besttime-s">Warm days, calm seas</span>
        </div>
      </div>

      {/* CATEGORY GLASS BAR */}
      <div className="gh-styles">
        <span className="gh-styles-label"><span>BROWSE BY</span><span>Travel style</span></span>
        <div className="gh-styles-grid">
          {STYLE_ICONS.map(s => (
            <Link key={s.label} to={s.to}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">{s.d}</svg>
              {s.label}
            </Link>
          ))}
        </div>
        <Link to="/india-tours" className="gh-styles-all" aria-label="Explore all travel styles"><ArrowUpRight size={20} /></Link>
      </div>
      <div className="gh-indicator" aria-hidden="true"><span /><span /><span /></div>
    </section>
  );
};

// ---------- DESTINATIONS ----------
// cards per view: 3 on the desktop artboard, 2 on tablets, 1 on phones
const perView = () => {
  if (typeof window === 'undefined') return 3;
  const w = document.documentElement.clientWidth;
  return w >= DESKTOP_MIN ? 3 : w >= 700 ? 2 : 1;
};

const Destinations: React.FC = () => {
  const n = DESTINATIONS.length;
  const [per, setPer] = useState(perView);
  const [index, setIndex] = useState(0);
  const last = Math.max(0, n - per);
  const i = Math.min(index, last);
  const swipe = useRef<{ x: number; moved: boolean } | null>(null);

  useEffect(() => {
    const on = () => setPer(perView());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  // one card per click; wraps round at either end
  const go = (d: number) => setIndex(i + d > last ? 0 : i + d < 0 ? last : i + d);

  return (
    <section id="gh-destinations" className="gh-dest" aria-labelledby="gh-dest-title">
      <div className="gh-wash gh-dest-wash-a" aria-hidden="true" />
      <div className="gh-wash gh-dest-wash-b" aria-hidden="true" />
      <div className="gh-orb gh-dest-orb-a gh-float" style={{ animationDelay: '-2s' }} aria-hidden="true" />
      <div className="gh-orb gh-orb-warm gh-dest-orb-b gh-float" style={{ animationDelay: '-4s' }} aria-hidden="true" />

      <div className="gh-dest-head">
        <span className="gh-chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M2 13l20-8-6 15-4-6-6-1z" /></svg>DESTINATIONS</span>
        <h2 id="gh-dest-title" className="gh-h2">Explore our <span className="gh-accent">destinations.</span></h2>
        <p>Choose your next unforgettable escape.</p>
      </div>

      <div className="gh-carousel" role="group" aria-roledescription="carousel" aria-label="Destinations">
        <div className="gh-carousel-view"
          onPointerDown={e => { swipe.current = { x: e.clientX, moved: false }; }}
          onPointerUp={e => {
            const s = swipe.current;
            if (!s) return;
            const dx = e.clientX - s.x;
            if (Math.abs(dx) > 40) { s.moved = true; go(dx < 0 ? 1 : -1); }
          }}
          onClickCapture={e => { if (swipe.current?.moved) { e.preventDefault(); e.stopPropagation(); } swipe.current = null; }}>
          <div className="gh-carousel-track" style={{ '--i': i, '--per': per } as React.CSSProperties}>
            {DESTINATIONS.map((c, k) => {
              const shown = k >= i && k < i + per;
              return (
                <Link key={c.id} to={servicePath(c.id)} className="gh-card gh-lift" draggable={false}
                  aria-hidden={!shown || undefined} tabIndex={shown ? undefined : -1}
                  aria-label={`${c.title}: ${c.sub}. Explore package`}>
                  <span className="gh-card-top" aria-hidden="true">
                    <svg width="346" height="170" viewBox="0 0 346 170" fill="none"><path d="M200 0 C230 60 300 80 346 70" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" /><path d="M240 0 C262 44 310 56 346 50" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" /><circle cx="320" cy="30" r="46" fill="rgba(255,255,255,0.08)" /></svg>
                  </span>
                  <span className="gh-card-curve" aria-hidden="true" />
                  <span className="gh-card-brand">WORLD TRAVEL</span>
                  <img src={c.img} alt="" loading="lazy" draggable={false} className="gh-card-img" />
                  <span className="gh-card-body">
                    <span className="gh-card-title">{c.title}</span>
                    <span className="gh-card-sub">{c.sub}</span>
                    <span className="gh-btn-accent gh-nudge">Explore package</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="gh-carousel-nav">
          <button type="button" className="gh-arrow gh-arrow-prev" aria-label="Previous destinations" onClick={() => go(-1)}><Chevron size={20} color="var(--accent)" dir="left" /></button>
          <span className="gh-carousel-dots" aria-hidden="true">
            {Array.from({ length: last + 1 }, (_, k) => <span key={k} className={k === i ? 'is-on' : undefined} />)}
          </span>
          <button type="button" className="gh-arrow gh-arrow-next" aria-label="Next destinations" onClick={() => go(1)}><Chevron size={20} /></button>
        </div>
      </div>
    </section>
  );
};

// ---------- TRUST / STATS ----------
const STATS = [
  { value: 5000, label: 'TRIPS COMPLETED', icon: (
    <svg width="50" height="54" viewBox="0 0 50 54" aria-hidden="true"><defs><linearGradient id="ghS1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--ballMid)" /><stop offset="1" stopColor="var(--accent)" /></linearGradient></defs><rect x="18" y="2" width="14" height="10" rx="3" fill="none" stroke="var(--ink)" strokeWidth="3" /><rect x="8" y="10" width="34" height="36" rx="7" fill="url(#ghS1)" /><path d="M17 15v26M25 15v26M33 15v26" stroke="rgba(255,255,255,0.45)" strokeWidth="2" /><rect x="10" y="12" width="8" height="30" rx="4" fill="rgba(255,255,255,0.25)" /><circle cx="14" cy="49" r="3" fill="var(--ink)" /><circle cx="36" cy="49" r="3" fill="var(--ink)" /></svg>
  ) },
  { value: 10000, label: 'HAPPY CUSTOMERS', icon: (
    <svg width="56" height="46" viewBox="0 0 56 46" aria-hidden="true"><defs><linearGradient id="ghS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--ballMid)" /><stop offset="1" stopColor="var(--accent)" /></linearGradient></defs><circle cx="17" cy="11" r="9" fill="url(#ghS2)" /><circle cx="39" cy="11" r="9" fill="url(#ghS2)" /><path d="M2 42c0-11 7-18 15-18s15 7 15 18z" fill="url(#ghS2)" /><path d="M24 42c0-11 7-18 15-18s15 7 15 18z" fill="url(#ghS2)" /><path d="M20 34c3-3 6-4 8-4s5 1 8 4l-4 4c-2 2-6 2-8 0z" fill="#FFFFFF" opacity="0.9" /><circle cx="14" cy="8" r="3" fill="rgba(255,255,255,0.5)" /><circle cx="36" cy="8" r="3" fill="rgba(255,255,255,0.5)" /></svg>
  ) },
  { value: 12, label: 'YEARS OF EXPERIENCE', icon: (
    <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true"><defs><linearGradient id="ghS3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--ballMid)" /><stop offset="1" stopColor="var(--accent)" /></linearGradient></defs><rect x="3" y="8" width="42" height="38" rx="7" fill="#FFFFFF" stroke="var(--line)" strokeWidth="1.5" /><path d="M3 15a7 7 0 017-7h28a7 7 0 017 7v4H3z" fill="url(#ghS3)" /><rect x="12" y="3" width="4" height="10" rx="2" fill="var(--ink)" /><rect x="32" y="3" width="4" height="10" rx="2" fill="var(--ink)" /><g fill="var(--orbMid)"><rect x="9" y="24" width="6" height="5" rx="1.5" /><rect x="18" y="24" width="6" height="5" rx="1.5" /><rect x="27" y="24" width="6" height="5" rx="1.5" /><rect x="9" y="32" width="6" height="5" rx="1.5" /><rect x="18" y="32" width="6" height="5" rx="1.5" /></g><circle cx="40" cy="40" r="10" fill="url(#ghS3)" stroke="#FFFFFF" strokeWidth="2" /><path d="M40 34.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#FFFFFF" /></svg>
  ) },
  { value: 50, label: 'DESTINATIONS', icon: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><defs><radialGradient id="ghS4" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="var(--ballMid)" /><stop offset="0.6" stopColor="var(--accent)" /><stop offset="1" stopColor="var(--ballDeep)" /></radialGradient></defs><circle cx="24" cy="30" r="20" fill="url(#ghS4)" /><path d="M12 22c4-3 8-2 10 1s0 6 3 8 1 6-3 7c-4 0-8-4-9-8s-3-5-1-8zM30 16c4 0 8 3 9 7-2 1-5 0-6 2s-3 3-5 1 0-4-1-6 1-4 3-4z" fill="rgba(255,255,255,0.55)" /><path d="M42 4a8 8 0 00-8 8c0 6 8 13 8 13s8-7 8-13a8 8 0 00-8-8z" fill="var(--accent)" stroke="#FFFFFF" strokeWidth="2" /><circle cx="42" cy="12" r="3" fill="#FFFFFF" /></svg>
  ) },
];

// Counts from 0 up to `to` the first time it scrolls into view (final value at once for reduced motion)
const CountUp: React.FC<{ to: number; suffix?: string; className?: string; duration?: number }> = ({ to, suffix = '', className, duration = 1800 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { setN(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); // ease-out
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{n.toLocaleString('en-IN')}{suffix}</span>
      <span className="gh-sr">{to.toLocaleString('en-IN')}{suffix}</span>
    </span>
  );
};

const Trust: React.FC = () => (
  <section className="gh-trust" aria-labelledby="gh-trust-title">
    <svg aria-hidden="true" className="gh-trust-planes" width="1440" height="760" viewBox="0 0 1440 760" fill="none">
      <path d="M120 420 L520 190 L920 420 L520 650 Z" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
      <path d="M420 300 L820 70 L1220 300 L820 530 Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d="M-80 560 L320 330 L720 560 L320 790 Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    </svg>
    <div className="gh-trust-glow" aria-hidden="true" />

    <div className="gh-trust-head">
      <span className="gh-eyebrow">WHY TRAVEL WITH US</span>
      <h2 id="gh-trust-title" className="gh-h2">Journeys that <span className="gh-accent">build trust.</span></h2>
      <p>Creating unforgettable travel experiences, one journey at a time.</p>
    </div>
    <span className="gh-group gh-group-a">OUR JOURNEY</span>
    <span className="gh-group gh-group-b">OUR REACH</span>
    <div className="gh-stats">
      {STATS.map(s => (
        <div key={s.label} className="gh-stat gh-lift">
          <span className="gh-stat-ic">{s.icon}</span>
          <CountUp className="gh-stat-v" to={s.value} suffix="+" />
          <span className="gh-stat-l">{s.label}</span>
        </div>
      ))}
    </div>
    <span className="gh-note gh-trust-note">Sample figures for design preview — replace with your real numbers.</span>

    {/* isometric 3D glass platform */}
    <svg role="img" aria-label="Stacked glass platform illustration with a travel tile and a floating globe" className="gh-iso gh-float" width="1440" height="760" viewBox="0 0 1440 760">
      <defs>
        <linearGradient id="ghIsoL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--wash1)" /><stop offset="1" stopColor="var(--wash2)" /></linearGradient>
        <linearGradient id="ghIsoR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="var(--wash1)" /></linearGradient>
        <linearGradient id="ghTileT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--ballMid)" /><stop offset="1" stopColor="var(--accent)" /></linearGradient>
        <radialGradient id="ghGlobe" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.2" stopColor="var(--ballMid)" /><stop offset="0.7" stopColor="var(--accent)" /><stop offset="1" stopColor="var(--ballDeep)" /></radialGradient>
      </defs>
      <polygon points="995.1,462.5 1190.0,575.0 1190.0,605.0 995.1,492.5" fill="url(#ghIsoL)" />
      <polygon points="1384.8,462.5 1190.0,575.0 1190.0,605.0 1384.8,492.5" fill="url(#ghIsoR)" />
      <polygon points="1190.0,350.0 1384.8,462.5 1190.0,575.0 995.1,462.5" fill="#FFFFFF" stroke="var(--line)" strokeWidth="1" />
      <polygon points="1034.1,440.0 1190.0,530.0 1190.0,552.5 1034.1,462.5" fill="url(#ghIsoL)" />
      <polygon points="1345.9,440.0 1190.0,530.0 1190.0,552.5 1345.9,462.5" fill="url(#ghIsoR)" />
      <polygon points="1190.0,350.0 1345.9,440.0 1190.0,530.0 1034.1,440.0" fill="var(--ground)" stroke="#FFFFFF" strokeWidth="1.5" />
      <polygon points="1092.6,323.8 1183.5,376.2 1183.5,481.2 1092.6,428.8" fill="rgba(255,255,255,0.5)" stroke="#FFFFFF" strokeWidth="1.5" />
      <polygon points="1274.4,323.8 1183.5,376.2 1183.5,481.2 1274.4,428.8" fill="rgba(255,255,255,0.32)" stroke="#FFFFFF" strokeWidth="1.5" />
      <polygon points="1183.5,271.2 1274.4,323.8 1183.5,376.2 1092.6,323.8" fill="rgba(255,255,255,0.65)" stroke="#FFFFFF" strokeWidth="1.5" />
      <polygon points="1164.0,468.5 1209.5,494.8 1209.5,511.2 1164.0,485.0" fill="var(--ballDeep)" />
      <polygon points="1261.4,464.8 1209.5,494.8 1209.5,511.2 1261.4,481.2" fill="var(--accent)" />
      <polygon points="1216.0,438.5 1261.4,464.8 1209.5,494.8 1164.0,468.5" fill="url(#ghTileT)" />
      <path transform="matrix(0.65,0.375,-0.65,0.375,1212.7,466.6)" d="M-26 -2 L26 -20 L10 24 L2 6 Z" fill="#FFFFFF" />
      <polygon points="1144.5,301.2 1183.5,323.8 1183.5,346.2 1144.5,323.8" fill="url(#ghIsoL)" />
      <polygon points="1222.5,301.2 1183.5,323.8 1183.5,346.2 1222.5,323.8" fill="url(#ghIsoR)" />
      <polygon points="1183.5,278.8 1222.5,301.2 1183.5,323.8 1144.5,301.2" fill="#FFFFFF" stroke="var(--line)" strokeWidth="1" />
      <ellipse cx="1183.5" cy="292" rx="26" ry="9" fill="var(--sh18)" />
      <g className="gh-orbit"><ellipse cx="1183.5" cy="241" rx="62" ry="20" fill="none" stroke="var(--trail)" strokeWidth="2" transform="rotate(-18 1183.5 241)" /><circle cx="1242" cy="222" r="6" fill="var(--warm)" /></g>
      <circle cx="1183.5" cy="241" r="34" fill="url(#ghGlobe)" />
      <path d="M1166 232c5-4 10-3 12 1s0 7 4 9 1 7-4 8c-5 0-9-4-10-9s-4-5-2-9zM1189 222c5 0 9 3 10 8-3 1-6 0-7 2s-4 4-6 1 0-5-1-7 1-4 4-4z" fill="rgba(255,255,255,0.5)" />
    </svg>
  </section>
);

// ---------- REVIEWS ----------
const Reviews: React.FC = () => (
  <section className="gh-rev" aria-labelledby="gh-rev-title">
    <div className="gh-rev-c1" aria-hidden="true" />
    <div className="gh-rev-c2" aria-hidden="true" />
    <div className="gh-rev-c3" aria-hidden="true" />

    <div className="gh-rev-copy">
      <span className="gh-chip gh-chip-soft"><Star size={16} />Traveller stories</span>
      <h2 id="gh-rev-title" className="gh-rev-h2"><span>Great journeys.</span><span>Even better</span><span className="gh-accent">memories.</span></h2>
      <p>See what travellers love about exploring with World Travel.</p>
      <Link to="/about" className="gh-btn-accent gh-btn-lg">Explore reviews
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </Link>
      <div className="gh-rev-faces">
        <div aria-hidden="true">{REVIEWS.map(r => <img key={r.photo} src={r.photo} alt="" loading="lazy" />)}</div>
        <span>Reviews from travellers on Google</span>
      </div>
    </div>

    {/* One moving track with the cards at a fixed, even spacing; the second set repeats the first
        so the loop is seamless, and the spacing can never drift. */}
    <div className="gh-rev-cards">
      <div className="gh-rev-track">
        {[...REVIEWS, ...REVIEWS].map((r, i) => (
          <article key={i} className="gh-review" aria-hidden={i >= REVIEWS.length || undefined}
            style={{ '--rx': `${r.x}px`, '--rt': `${20 + i * REVIEW_STEP}px` } as React.CSSProperties}>
            <img src={r.photo} alt="" loading="lazy" />
            <span className="gh-review-body">
              <span className="gh-review-top">
                <span className="gh-review-who"><span>Customer name</span><span>SAMPLE REVIEW</span></span>
                <span role="img" aria-label="5 out of 5 stars" className="gh-review-stars"><Star /><Star /><Star /><Star /><Star /></span>
              </span>
              <span className="gh-review-text">{r.text}</span>
              <span className="gh-review-via">via Google</span>
            </span>
          </article>
        ))}
      </div>
    </div>
    <span className="gh-note gh-rev-note">Sample reviews for design preview — replace with your real Google reviews before launch.</span>
  </section>
);

// ---------- FAQ ----------
const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState(1);
  return (
    <section className="gh-faq" aria-labelledby="gh-faq-title">
      <div className="gh-orb gh-faq-orb gh-float" style={{ animationDelay: '-2s' }} aria-hidden="true" />
      <Cloud className="gh-cloud gh-faq-cloud gh-drift" />

      <div className="gh-faq-card">
        <div className="gh-faq-glow" aria-hidden="true" />
        <div className="gh-faq-person">
          <img src={G + 'faq-traveller.webp'} alt="Smiling young woman traveller in a light blue shirt holding sunglasses, with a backpack" loading="lazy" />
        </div>
      </div>

      <div className="gh-faq-title">
        <span className="gh-faq-kick"><span />FAQ</span>
        <h2 id="gh-faq-title" className="gh-faq-h2"><span>Frequently asked</span><span className="gh-accent">questions.</span></h2>
      </div>

      <div className="gh-faq-help gh-float" style={{ animationDelay: '-1.5s' }}>
        <span>Still have a question?</span>
        <span>Our travel team is here to help you plan your next journey.</span>
        <Link to="/contact" className="gh-btn-accent gh-btn-pill gh-nudge">Contact us<span><ArrowUpRight size={14} w={2.4} /></span></Link>
      </div>

      <div className="gh-faq-list">
        {FAQS.map(([q, a], i) => {
          const open = i === openIdx;
          return (
            <div key={q} className={`gh-faq-item${open ? ' is-open' : ''}`}>
              <button type="button" className="gh-faq-q" aria-expanded={open} onClick={() => setOpenIdx(open ? -1 : i)}>
                <span className="gh-faq-num">0{i + 1}</span>
                <span className="gh-faq-text">{q}</span>
                <span aria-hidden="true" className="gh-faq-ic">
                  {open
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4"><path d="M5 12h14" /></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>}
                </span>
              </button>
              {open && <p>{a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ---------- CALL TO ACTION ----------
const Cta: React.FC = () => {
  const [dest, setDest] = useState('');
  const [dates, setDates] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = ['Hi! I would like to plan a trip'];
    if (dest.trim()) parts.push(`to ${dest.trim()}`);
    if (dates.trim()) parts.push(`(${dates.trim()})`);
    window.open(getWhatsAppLink(parts.join(' ') + '.'), '_blank', 'noopener');
  };
  return (
    <section className="gh-cta" aria-labelledby="gh-cta-title">
      <div className="gh-cta-glass" aria-hidden="true" />
      <div className="gh-orb gh-cta-orb-a gh-roamA" aria-hidden="true" />
      <div className="gh-cta-orb-b gh-roamB" aria-hidden="true" />
      <div className="gh-orb gh-orb-warm gh-cta-orb-c gh-roamC" aria-hidden="true" />
      <Cloud className="gh-cloud gh-cta-cloud-a gh-drift" />
      <Cloud className="gh-cloud gh-cta-cloud-b gh-drift gh-delay5" />

      <form className="gh-plan" onSubmit={submit}>
        <div className="gh-plan-top"><span>World Travel</span><Link to="/india-tours">Explore India</Link></div>
        <h2 id="gh-cta-title" className="gh-plan-h2"><span>Your next escape</span><span className="gh-accent">starts here.</span></h2>
        <label className="gh-pill">
          <span className="gh-pill-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.9" aria-hidden="true"><path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg></span>
          <span className="gh-sr">Destination</span>
          <input type="text" value={dest} onChange={e => setDest(e.target.value)} placeholder="Choose your destination" />
        </label>
        <label className="gh-pill">
          <span className="gh-pill-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.9" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg></span>
          <span className="gh-sr">Travel dates</span>
          <input type="text" value={dates} onChange={e => setDates(e.target.value)} placeholder="Tell us your travel dates" />
        </label>
        <div className="gh-plan-foot">
          <span>Personalised holidays, planned around you.</span>
          <button type="submit" className="gh-plan-go gh-nudge" aria-label="Plan my trip"><Chevron size={20} /></button>
        </div>
      </form>

      <Link to="/india-tours" className="gh-made">
        <span>Made for</span>
        <span>your kind of travel</span>
        <span className="gh-made-go">Discover<Chevron size={18} /></span>
      </Link>

      <div className="gh-letsgo">
        <div className="gh-letsgo-half" aria-hidden="true" />
        <div className="gh-letsgo-panel">
          <div className="gh-letsgo-blob gh-roamD" aria-hidden="true" />
          <span className="gh-letsgo-a">Let’s</span>
          <span className="gh-letsgo-b">Go.</span>
          <span className="gh-letsgo-list"><span>Andaman</span><span>Kashmir</span><span>Sikkim &amp; more</span></span>
          <Logo className="gh-letsgo-logo" />
        </div>
        <span className="gh-letsgo-tag">Beautiful places.<br />Unforgettable journeys.</span>
        <a href={getWhatsAppLink('Hi! I would like to plan a trip in India.')} target="_blank" rel="noopener noreferrer" className="gh-letsgo-wa gh-nudge">
          WhatsApp us<span><Chevron size={18} /></span>
        </a>
      </div>
    </section>
  );
};

// ---------- FOOTER ----------
const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await enquiries.submit({ full_name: 'Newsletter subscriber', email, phone: '', message: 'Newsletter subscription from the services page' });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };
  const note = status === 'done' ? 'Thanks! You are on the list.' : status === 'error' ? 'Could not subscribe right now. Please try again.' : 'Travel ideas, delivered to your inbox.';
  return (
    <footer className="gh-foot">
      <div className="gh-foot-base" aria-hidden="true" />
      <div className="gh-news">
        <img src={G + 'newsletter-suitcase.webp'} alt="Blue suitcase with a plane, sparkles and soft clouds" loading="lazy" />
        <div className="gh-news-copy">
          <h2>Your next adventure starts here.</h2>
          <p>Get travel inspiration and exciting destination updates.</p>
          <form className="gh-news-form" onSubmit={subscribe}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
            <label htmlFor="gh-foot-news" className="gh-sr">Email address</label>
            <input id="gh-foot-news" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
            <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Subscribe'}</button>
          </form>
          <span role="status">{note}</span>
        </div>
      </div>

      <div className="gh-foot-brand">
        <Logo />
        <span>Beautiful journeys. Lasting memories.</span>
        <span className="gh-foot-social">{SOCIALS.map(s => <a key={s.label} className="gh-flink" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</span>
      </div>
      <nav aria-label="Company" className="gh-foot-col gh-foot-c1">
        <span>Company</span>
        <Link className="gh-flink" to="/about">About us</Link><Link className="gh-flink" to="/about">Our story</Link><Link className="gh-flink" to="/blog">Travel blog</Link><Link className="gh-flink" to="/contact">Contact us</Link>
      </nav>
      <nav aria-label="Support" className="gh-foot-col gh-foot-c2">
        <span>Support</span>
        <button type="button" className="gh-flink" onClick={() => document.querySelector('.gh-faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQs</button>
        <Link className="gh-flink" to="/contact">Booking help</Link><Link className="gh-flink" to="/terms">Cancellation policy</Link><Link className="gh-flink" to="/terms">Travel guidelines</Link>
      </nav>
      <nav aria-label="Destinations" className="gh-foot-col gh-foot-c3">
        <span>Destinations</span>
        {[['Andaman', 'andaman'], ['Kashmir', 'kashmir'], ['Sikkim', 'sikkim'], ['Rajasthan', 'rajasthan']].map(([n, id]) => <Link key={id} className="gh-flink" to={servicePath(id)}>{n}</Link>)}
      </nav>
      <div className="gh-foot-col gh-foot-c4">
        <span>Contact us</span>
        <a className="gh-flink gh-foot-ic" href={`tel:${PHONE.replace(/\s/g, '')}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.8a11 11 0 005.7 5.7L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" /></svg>{PHONE}</a>
        <a className="gh-flink gh-foot-ic" href={`mailto:${EMAIL}`}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3" fill="var(--accent)" /><path d="M3 7l9 6 9-6" fill="none" stroke="#FFFFFF" strokeWidth="1.8" /></svg><span>{EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}</span></a>
        <span className="gh-foot-ic"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s-8-7-8-13a8 8 0 0116 0c0 6-8 13-8 13z" fill="var(--accent)" /><circle cx="12" cy="9" r="3" fill="#FFFFFF" /></svg>India</span>
      </div>
      <div className="gh-foot-rule" aria-hidden="true" />
      <div className="gh-foot-bar">
        <span>© {new Date().getFullYear()} Global Connect World Travel. All rights reserved.</span>
        <span><Link className="gh-flink" to="/privacy">Privacy policy</Link><Link className="gh-flink" to="/terms">Terms &amp; conditions</Link><Link className="gh-flink" to="/destinations">Sitemap</Link></span>
      </div>
    </footer>
  );
};

// ---------- page ----------
const useDesignZoom = () => {
  const calc = () => {
    if (typeof window === 'undefined') return 1;
    const w = document.documentElement.clientWidth;
    return w >= DESKTOP_MIN ? w / DESIGN_WIDTH : 1;
  };
  const [zoom, setZoom] = useState(calc);
  useLayoutEffect(() => setZoom(calc()), []);
  useEffect(() => {
    const on = () => setZoom(calc());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return zoom;
};

const ServicesPage: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const zoom = useDesignZoom();
  return (
    <div className="gh" style={{ '--gh-z': zoom } as React.CSSProperties}>
      <div className="gh-stage">
        <div className="gh-washes" aria-hidden="true"><span /><span /><span /></div>
        <Hero onBookClick={onBookClick} />
        <Destinations />
        <Trust />
        <Reviews />
        <Faq />
        <Cta />
        <Footer />
      </div>
    </div>
  );
};

export default ServicesPage;
