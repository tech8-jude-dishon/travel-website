import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, CalendarDays, ChevronDown, Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Menu,
  Phone, Plane, Smile, Star, Users, X, Youtube, Globe2, Route,
} from 'lucide-react';
import { servicePath } from '../data/winterPackages';
import { enquiries } from '../lib/apiClient';
import { getWhatsAppLink } from '../utils/whatsapp';
import './Service2Page.css';

// /service2: "Find your next escape" landing page. Draws its own header and footer.

const IMG = '/images/s2/';

const NAV = [
  { label: 'Home', to: '/service2' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'Experiences', to: '/india-tours' },
  { label: 'Offers', to: '/holidays' },
  { label: 'Contact', to: '/contact' },
];

const CARDS = [
  { id: 'sikkim', title: 'Sikkim + Darjeeling', sub: 'Tea gardens & Himalayan views', days: '5–7 Days', who: 'Couple / Family', img: IMG + 'card-sikkim-hd.webp', alt: 'Darjeeling tea gardens below the Kanchenjunga range', credit: 'Souviknshm, CC BY-SA 4.0' },
  { id: 'andaman', title: 'Andaman', sub: 'Turquoise waters & island escapes', days: '4–6 Days', who: 'Family / Group', img: IMG + 'card-andaman-hd.webp', alt: 'Mangrove tree on a white sand beach with turquoise water, Havelock, Andaman Islands', credit: 'Vyacheslav Argenberg, CC BY 4.0' },
  { id: 'rajasthan', title: 'Rajasthan', sub: 'Royal heritage & desert trails', days: '5–8 Days', who: 'Couple / Family', img: IMG + 'card-rajasthan-hd.webp', alt: 'Carved sandstone palace front of Mehrangarh Fort, Jodhpur, Rajasthan', credit: 'Seal sum, CC BY-SA 4.0' },
];

const STATS = [
  { n: 5000, suffix: '+', label: 'Trips completed', Icon: Plane },
  { n: 10000, suffix: '+', label: 'Happy customers', Icon: Smile },
  { n: 12, suffix: '+', label: 'Years of experience', Icon: Award },
  { n: 50, suffix: '+', label: 'Destinations', Icon: Globe2 },
];

const REVIEWS = [
  { name: 'Priya Sharma', trip: 'Andaman', photo: '/images/gch/review-1.webp', text: 'Everything was perfectly planned — ferries, our Havelock stay and the snorkelling day. We only had to enjoy the beaches.' },
  { name: 'Rahul Mehta', trip: 'Kashmir', photo: '/images/gch/review-2.webp', text: 'The houseboat night and Gulmarg gondola were the highlights. The team checked in every day and nothing felt rushed.' },
  { name: 'Sneha Iyer', trip: 'Sikkim', photo: '/images/gch/review-3.webp', text: 'Tsomgo Lake, Gangtok and Darjeeling in one smooth itinerary. Lovely hotels, a friendly driver and honest pricing.' },
];

const FAQS: [string, string][] = [
  ['How do I book a trip with Global Connect?', 'Tell us where and when you would like to travel through the enquiry form, WhatsApp or a call. Our team shares options and helps you confirm your booking.'],
  ['Can I customise my travel package?', 'Yes. Share your destination, dates, budget and interests, and we will adjust hotels, sightseeing and pace to suit you.'],
  ['Which destinations can I explore?', 'We plan holidays across India — Sikkim, Darjeeling, Andaman, Rajasthan, Himachal, Kashmir, Uttarakhand and more — along with Dubai and international trips.'],
  ['What is included in a tour package?', 'Inclusions vary by package and usually cover stays, breakfast, transfers and sightseeing. Your itinerary lists exactly what is included before you book.'],
  ['How can I contact your travel team?', 'Call +91 89210 95973, WhatsApp +971 58 952 0398 or email booking@globalconnectworldtravel.com. You can also visit our Kannur office.'],
];

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/people/Global-Connect-World-Travel/61586916384409/', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/globalconnectworldtravel/', Icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@GlobalConnectWorldTravels', Icon: Youtube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/global-connect-world-travel/', Icon: Linkedin },
];

const SERVICES: [string, string][] = [
  ['Flight Booking', '/contact'], ['Hotel Booking', '/contact'], ['Holiday Packages', '/holidays'],
  ['Visa Assistance', '/contact'], ['Travel Insurance', '/contact'], ['Customised Tours', '/contact'],
];

const TOP_DEST: [string, string][] = [
  ['Sikkim', servicePath('sikkim')], ['Darjeeling', servicePath('sikkim')], ['Andaman', servicePath('andaman')],
  ['Rajasthan', servicePath('rajasthan')], ['Himachal', servicePath('himachal')], ['Kerala & More', '/india-tours'],
];

const PHONE = '+91 89210 95973';
const PHONE_UAE = '+971 58 952 0398';
const EMAIL = 'booking@globalconnectworldtravel.com';
const ADDRESS = '1st Floor, Tenco Complex, Pallikkunnu, Kannur, Kerala – 670004';

const reduceMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// ---------- small pieces ----------

const Logo: React.FC = () => (
  <Link to="/service2" className="s2-logo" aria-label="Global Connect World Travel — home">
    <img src="/images/gch/gcwt-logo.png" alt="Global Connect World Travel" width={180} height={56} />
  </Link>
);

const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`s2-eyebrow ${className}`}>{children}</p>
);

const Stars: React.FC = () => (
  <span className="s2-stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map(i => <Star key={i} size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}
  </span>
);

// WhatsApp logo (Simple Icons, CC0)
const WhatsAppIcon: React.FC<{ size?: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const GoogleG: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

// White airliner with soft shading for the cyan band
const BigPlane: React.FC = () => (
  <svg className="s2-bigplane" viewBox="0 0 220 200" aria-hidden="true">
    <defs>
      <linearGradient id="s2-pl-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#D5ECF9" />
      </linearGradient>
      <linearGradient id="s2-pl-wing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#BFE1F5" />
      </linearGradient>
    </defs>
    <ellipse cx="112" cy="176" rx="58" ry="7" fill="rgba(6,60,100,0.18)" />
    <g transform="rotate(-16 110 100)">
      <path d="M122 92 L84 30 Q80 25 73 26 L68 27 L94 92 Z" fill="url(#s2-pl-wing)" />
      <path d="M44 93 L26 70 Q24 67 20 68 L16 69 L30 93 Z" fill="url(#s2-pl-wing)" />
      <path d="M22 100 C22 94 32 90 46 90 L166 90 C182 90 194 94 199 100 C194 106 182 110 166 110 L46 110 C32 110 22 106 22 100 Z" fill="url(#s2-pl-body)" />
      <path d="M122 108 L84 170 Q80 175 73 174 L68 173 L94 108 Z" fill="url(#s2-pl-wing)" />
      <path d="M44 107 L26 130 Q24 133 20 132 L16 131 L30 107 Z" fill="url(#s2-pl-wing)" />
      <ellipse cx="98" cy="60" rx="11" ry="5" fill="#E4F2FB" />
      <ellipse cx="98" cy="140" rx="11" ry="5" fill="#C9E6F7" />
      <path d="M178 95 C186 96 191 98 194 100 L178 100 Z" fill="#1F7FB8" opacity="0.55" />
      <g fill="#8CC9EC">{[0, 1, 2, 3, 4, 5, 6, 7].map(i => <circle key={i} cx={70 + i * 12} cy="97" r="1.8" />)}</g>
    </g>
  </svg>
);

// adds .is-in to .s2-rv elements as they scroll into view
function useReveal(root: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = root.current;
    if (!el || reduceMotion() || !('IntersectionObserver' in window)) return;
    el.classList.add('s2-anim');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    el.querySelectorAll('.s2-rv').forEach(n => io.observe(n));
    return () => io.disconnect();
  }, [root]);
}

const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion() || !('IntersectionObserver' in window)) { setN(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1800);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return (
    <span ref={ref}>
      <span aria-hidden="true">{n.toLocaleString('en-IN')}{suffix}</span>
      <span className="s2-sr">{to.toLocaleString('en-IN')}{suffix}</span>
    </span>
  );
};

// ---------- sections ----------

const Header: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`s2-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="s2-wrap s2-header-in">
        <Logo />
        <nav className="s2-nav" aria-label="Main">
          {NAV.map((n, i) => <Link key={n.label} to={n.to} className={i === 0 ? 'is-active' : ''} aria-current={i === 0 ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <button type="button" className="s2-btn s2-btn-book" onClick={onBookClick}>Book My Trip <ArrowRight size={18} aria-hidden="true" /></button>
        <button type="button" className="s2-burger" aria-expanded={open} aria-controls="s2-mnav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}>
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <div id="s2-mnav" className={`s2-mnav${open ? ' is-open' : ''}`} hidden={!open}>
        {NAV.map((n, i) => <Link key={n.label} to={n.to} className={i === 0 ? 'is-active' : ''} onClick={() => setOpen(false)}>{n.label}</Link>)}
        <button type="button" className="s2-btn" onClick={() => { setOpen(false); onBookClick(); }}>Book My Trip <ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </header>
  );
};

// Blue hero banner: copy on the left, two framed photos on the right, and light line doodles
// (dashed trails, pin, palm, sun, planes) behind everything. Laid out on a 1851 x 849 stage.
const BannerDoodles: React.FC = () => (
  <svg className="s2-nb-doodles" viewBox="0 0 1851 849" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g className="s2-nb-dash">
      <path d="M -20 118 C 60 160, 150 206, 250 200 C 330 196, 400 168, 448 120 C 482 86, 494 42, 490 -10" />
      <ellipse cx="196" cy="128" rx="50" ry="58" />
      <path d="M 650 214 C 640 124, 726 70, 790 108 C 842 146, 832 250, 742 268 C 690 278, 656 252, 650 214" />
      <path d="M 606 -6 C 660 40, 700 70, 740 64" />
      <path d="M 760 58 C 900 8, 1060 -8, 1210 12 C 1330 28, 1420 60, 1520 52 C 1620 44, 1720 30, 1860 82" />
      <path d="M 1150 92 C 1210 52, 1290 36, 1348 40" />
      <path d="M 1851 128 C 1800 170, 1788 230, 1830 286" />
      <path d="M 40 862 C 70 826, 140 816, 188 852" />
      <path d="M 392 862 C 420 790, 520 752, 612 806" />
      <path d="M 1214 862 C 1250 770, 1330 712, 1424 696" />
      <path d="M 1322 712 C 1300 740, 1316 780, 1352 790" />
    </g>
    <g className="s2-nb-line">
      {[[55, 105, 11], [87, 133, 4], [475, 180, 7], [497, 226, 8], [858, 103, 7], [902, 127, 7], [1708, 128, 7], [1745, 98, 7], [1732, 220, 10], [468, 730, 9], [427, 770, 10], [55, 800, 9], [1441, 805, 9]].map(([cx, cy, r]) => <circle key={cx + '-' + cy} cx={cx} cy={cy} r={r} />)}
      <circle cx="938" cy="38" r="32" />
      <circle cx="1653" cy="37" r="32" />
      {/* location pin */}
      <path d="M300 22 a26 26 0 0 1 26 26 c0 21 -26 46 -26 46 s-26 -25 -26 -46 a26 26 0 0 1 26 -26 z" />
      <circle cx="300" cy="48" r="9" />
      {/* palm tree */}
      <path d="M557 184 C 555 160, 552 132, 556 102" />
      <path d="M556 102 C 540 90, 520 92, 508 106 M556 102 C 548 82, 530 74, 516 80 M556 102 C 566 80, 586 74, 600 82 M556 102 C 574 94, 594 100, 604 114 M556 102 C 552 118, 540 132, 532 142 M556 102 C 566 118, 576 130, 582 142" />
      {/* sun over waves */}
      <circle cx="882" cy="236" r="16" />
      <path d="M882 208 v-9 M862 216 l-6 -6 M902 216 l6 -6 M854 236 h-9 M910 236 h9" />
      <path d="M846 256 q9 -6 18 0 t18 0 t18 0 t18 0 M852 268 q9 -6 18 0 t18 0 t18 0 t12 0" />
      {/* planes */}
      <g className="s2-nb-plane" transform="translate(1092 18) scale(3) rotate(-40 12 12)"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></g>
      <g className="s2-nb-plane is-b" transform="translate(1432 14) scale(3) rotate(-40 12 12)"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></g>
    </g>
    <circle className="s2-nb-dot" cx="301" cy="108" r="7" />
  </svg>
);

// Two stat cards under the hero buttons. Figures come from STATS so they stay in sync with the counters further down.
const statValue = (label: string) => {
  const s = STATS.find(x => x.label === label);
  return s ? `${s.n.toLocaleString('en-IN')}${s.suffix}` : '';
};
const HERO_CARDS = [
  { tone: 'blue', Icon: Smile, label: 'Happy customers', value: statValue('Happy customers'), FootIcon: Star, foot: '4.8/5 rated on Google', footTone: 'green' },
  { tone: 'gold', Icon: Award, label: 'Years of experience', value: statValue('Years of experience'), FootIcon: Route, foot: 'Customised itineraries', footTone: 'blue' },
];

const Hero: React.FC<{ onBookClick: () => void }> = () => {
  // the photo cards drift a little with the pointer (desktop, motion allowed)
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || !window.matchMedia?.('(pointer: fine)').matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5, my = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { el.style.setProperty('--mx', mx.toFixed(3)); el.style.setProperty('--my', my.toFixed(3)); });
    };
    const leave = () => { el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0'); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="s2-hero">
      <div className="s2-nb" ref={ref}>
        <BannerDoodles />
        <div className="s2-nb-stage">
          <div className="s2-nb-copy">
            <p className="s2-nb-eyebrow s2-rv"><span className="s2-nb-eyebrow-ic" aria-hidden="true"><Plane /></span>Let’s go now</p>
            <h1 className="s2-nb-h1 s2-rv" style={{ '--rd': '80ms' } as React.CSSProperties}>
              <span>Explore India.</span>{' '}
              <span>Discover the <span className="s2-nb-hl">Beauty.
                <svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M4 20 C 60 8, 150 4, 296 14" /></svg>
              </span></span>
            </h1>
            <p className="s2-nb-p s2-rv" style={{ '--rd': '160ms' } as React.CSSProperties}>
              Handpicked holidays, beautiful destinations and local <br className="s2-nb-br" />experiences — thoughtfully planned around you.
            </p>
            <ul className="s2-nb-stats s2-rv" style={{ '--rd': '240ms' } as React.CSSProperties}>
              {HERO_CARDS.map(c => (
                <li key={c.label} className={`s2-nb-stat is-${c.tone}`}>
                  <div className="s2-nb-stat-top"><span className="s2-nb-stat-ic" aria-hidden="true"><c.Icon /></span>{c.label}</div>
                  <strong className="s2-nb-stat-val">{c.value}</strong>
                  <small className={`s2-nb-stat-foot is-${c.footTone}`}><c.FootIcon aria-hidden="true" />{c.foot}</small>
                </li>
              ))}
            </ul>
            <div className="s2-nb-ctas s2-rv" style={{ '--rd': '320ms' } as React.CSSProperties}>
              <a href={getWhatsAppLink('Hi! I would like to plan a trip in India.')} target="_blank" rel="noopener noreferrer" className="s2-nb-btn is-ghost">
                <WhatsAppIcon />Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="s2-nb-cards">
            <figure className="s2-nb-woman">
              <img src="https://res.cloudinary.com/dekhukonj/image/upload/f_auto,q_auto/v1793011186/209865c3-38d8-4d90-8d4d-4178bb3cee4e.png" alt="Smiling traveller in a pink hoodie sitting on a suitcase, holding a passport and boarding pass" width={1212} height={1514} fetchPriority="high" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

const Destinations: React.FC = () => (
  <section className="s2-dest" id="s2-destinations" aria-labelledby="s2-dest-h">
    <div className="s2-wrap">
      <div className="s2-band s2-rv">
        <svg className="s2-band-trail" viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 130 C 120 150, 200 40, 330 70 S 520 120, 600 20" />
        </svg>
        <BigPlane />
        <div className="s2-band-copy">
          <h2 id="s2-dest-h" className="s2-h2">Explore our <span>destinations.</span></h2>
          <p>Choose your next unforgettable escape.</p>
        </div>
      </div>
      <ul className="s2-cards">
        {CARDS.map((c, i) => (
          <li key={c.id} className="s2-rv" style={{ '--rd': `${i * 100}ms` } as React.CSSProperties}>
            <Link to={servicePath(c.id)} className="s2-card">
              <span className="s2-card-img">
                <img src={c.img} alt={c.alt} loading="lazy" width={1200} height={825} />
                <span className="s2-tag">India Travel</span>
                <small className="s2-card-credit">Photo: {c.credit}</small>
              </span>
              <span className="s2-card-body">
                <span className="s2-card-t">{c.title}</span>
                <span className="s2-card-s">{c.sub}</span>
                <span className="s2-card-meta">
                  <span><Clock size={16} aria-hidden="true" />{c.days}</span>
                  <span><Users size={16} aria-hidden="true" />{c.who}</span>
                </span>
                <span className="s2-btn s2-btn-sm">Book Now <ArrowRight size={16} aria-hidden="true" /></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Trust: React.FC = () => (
  <section className="s2-trust" aria-labelledby="s2-trust-h">
    <div className="s2-wrap s2-trust-in">
      <div>
        <Eyebrow className="s2-rv">Why travel with us</Eyebrow>
        <h2 id="s2-trust-h" className="s2-h2 s2-rv">Journeys that <span>build trust.</span></h2>
        <ul className="s2-stats">
          {STATS.map(({ n, suffix, label, Icon }, i) => (
            <li key={label} className="s2-stat s2-rv" style={{ '--rd': `${i * 80}ms` } as React.CSSProperties}>
              <span className="s2-stat-ic"><Icon size={22} aria-hidden="true" /></span>
              <span className="s2-stat-v"><CountUp to={n} suffix={suffix} /></span>
              <span className="s2-stat-l">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <figure className="s2-trust-photo s2-rv" style={{ '--rd': '120ms' } as React.CSSProperties}>
        <img src={IMG + 'trust-andaman.webp'} alt="Traveller in a white sun hat looking out over turquoise water and green islands in the Andamans" loading="lazy" width={966} height={821} />
      </figure>
    </div>
  </section>
);

const Reviews: React.FC = () => (
  <section className="s2-reviews" aria-labelledby="s2-rev-h">
    <div className="s2-wrap">
      <div className="s2-rev-head">
        <div>
          <Eyebrow className="s2-rv">Traveler stories</Eyebrow>
          <h2 id="s2-rev-h" className="s2-h2 s2-rv">Great journeys. <span>Even better memories.</span></h2>
        </div>
        <div className="s2-rev-side s2-rv">
          <Link to="/about" className="s2-link">View All Reviews <ArrowRight size={18} aria-hidden="true" /></Link>
          <div className="s2-rev-score">
            <span className="s2-avatars" aria-hidden="true">{REVIEWS.map(r => <img key={r.name} src={r.photo} alt="" width={36} height={36} />)}</span>
            <span><strong>4.8/5</strong> from travellers on Google</span>
          </div>
        </div>
      </div>
      <ul className="s2-rev-list">
        {REVIEWS.map((r, i) => (
          <li key={r.name} className="s2-rev s2-rv" style={{ '--rd': `${i * 100}ms` } as React.CSSProperties}>
            <Stars />
            <p>“{r.text}”</p>
            <div className="s2-rev-who">
              <img src={r.photo} alt="" width={44} height={44} loading="lazy" />
              <span><strong>{r.name}</strong><small>{r.trip} trip</small></span>
              <span className="s2-via"><GoogleG /> via Google</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Faq: React.FC = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="s2-faq" aria-labelledby="s2-faq-h">
      <div className="s2-wrap s2-faq-in">
        <figure className="s2-faq-photo s2-rv">
          <img src={IMG + 'faq-shikara-hd.webp'} alt="Painted shikara boat with curtains and cushions on Dal Lake, Srinagar" loading="lazy" width={1000} height={1100} />
          <figcaption>Shikara on Dal Lake, Srinagar</figcaption>
        </figure>
        <div>
          <Eyebrow className="s2-rv">FAQ</Eyebrow>
          <h2 id="s2-faq-h" className="s2-h2 s2-rv">Frequently asked <span>questions.</span></h2>
          <div className="s2-acc">
            {FAQS.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} className={`s2-acc-item s2-rv${isOpen ? ' is-open' : ''}`} style={{ '--rd': `${i * 60}ms` } as React.CSSProperties}>
                  <h3>
                    <button type="button" id={`s2-q${i}`} aria-expanded={isOpen} aria-controls={`s2-a${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                      {q}<ChevronDown size={20} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`s2-a${i}`} role="region" aria-labelledby={`s2-q${i}`} className="s2-acc-panel">
                    <div><p>{a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Cta: React.FC = () => {
  const [where, setWhere] = useState('');
  const [when, setWhen] = useState('');
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = ['Hi! I would like to plan a trip'];
    if (where.trim()) parts.push(`to ${where.trim()}`);
    if (when.trim()) parts.push(`(${when.trim()})`);
    window.open(getWhatsAppLink(parts.join(' ') + '.'), '_blank', 'noopener');
  };
  return (
    <section className="s2-cta" aria-labelledby="s2-cta-h">
      <div className="s2-wrap s2-cta-in">
        <div className="s2-cta-card s2-rv">
          <Eyebrow>World Travel</Eyebrow>
          <h2 id="s2-cta-h" className="s2-h2">Your next escape <span>starts here.</span></h2>
          <form className="s2-cta-form" onSubmit={send}>
            <label className="s2-field">
              <MapPin size={18} aria-hidden="true" />
              <span className="s2-sr">Destination</span>
              <input value={where} onChange={e => setWhere(e.target.value)} placeholder="Where to?" autoComplete="off" />
            </label>
            <label className="s2-field">
              <CalendarDays size={18} aria-hidden="true" />
              <span className="s2-sr">Travel dates</span>
              <input value={when} onChange={e => setWhen(e.target.value)} placeholder="Travel dates" autoComplete="off" />
            </label>
            <button type="submit" className="s2-cta-go" aria-label="Plan my trip on WhatsApp"><ArrowRight size={22} aria-hidden="true" /></button>
          </form>
          <p className="s2-cta-note">Personalised holidays, planned around you.</p>
        </div>
        <div className="s2-letsgo s2-rv" style={{ '--rd': '120ms' } as React.CSSProperties}>
          <img src={IMG + 'cta-havelock-boat.webp'} alt="Boat on turquoise water beside a green rocky island at Havelock, Andaman" loading="lazy" width={1400} height={1050} />
          <div className="s2-letsgo-copy">
            <p className="s2-letsgo-t">Let’s Go.</p>
            <ul>
              {[['Sikkim', 'sikkim'], ['Darjeeling', 'sikkim'], ['Andaman', 'andaman'], ['Rajasthan', 'rajasthan']].map(([n, id]) => <li key={n}><Link to={servicePath(id)}>{n}</Link></li>)}
              <li><Link to="/india-tours">and more…</Link></li>
            </ul>
          </div>
          <small className="s2-credit">Photo: makemysaffar.com, CC BY-SA 4.0</small>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await enquiries.submit({ full_name: 'Newsletter subscriber', email, phone: '', message: 'Newsletter subscription from the /service2 page' });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };
  const note = status === 'done' ? 'Thanks! You are on the list.' : status === 'error' ? 'Could not subscribe right now. Please try again.' : 'Travel ideas and offers, straight to your inbox.';
  return (
    <>
      <section className="s2-news-wrap" aria-labelledby="s2-news-h">
        <div className="s2-wrap">
          <div className="s2-news s2-rv">
            <img src="/images/gch/newsletter-suitcase.webp" alt="" aria-hidden="true" loading="lazy" />
            <div className="s2-news-copy">
              <h2 id="s2-news-h">Your next adventure <span>starts here.</span></h2>
              <p role="status">{note}</p>
            </div>
            <form className="s2-news-form" onSubmit={subscribe}>
              <label htmlFor="s2-news-email" className="s2-sr">Email address</label>
              <Mail size={18} aria-hidden="true" />
              <input id="s2-news-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
              <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Subscribe'}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="s2-foot">
        <div className="s2-wrap s2-foot-in">
          <div className="s2-foot-brand">
            <Logo />
            <p>Personalised holidays across India and beyond — planned around you, from first idea to safe return.</p>
            <div className="s2-social">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={18} aria-hidden="true" /></a>
              ))}
              <a href={getWhatsAppLink('Hi! I would like to plan a trip.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={18} /></a>
            </div>
          </div>
          <nav aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul>{NAV.map(n => <li key={n.label}><Link to={n.label === 'Home' ? '/' : n.to}>{n.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Our services">
            <h3>Our Services</h3>
            <ul>{SERVICES.map(([n, to]) => <li key={n}><Link to={to}>{n}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Top destinations">
            <h3>Top Destinations</h3>
            <ul>{TOP_DEST.map(([n, to]) => <li key={n}><Link to={to}>{n}</Link></li>)}</ul>
          </nav>
          <div className="s2-foot-contact">
            <h3>Contact Us</h3>
            <ul>
              <li><MapPin size={18} aria-hidden="true" /><span>{ADDRESS}</span></li>
              <li><Phone size={18} aria-hidden="true" /><span><a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a><br /><a href={`tel:${PHONE_UAE.replace(/\s/g, '')}`}>{PHONE_UAE}</a></span></li>
              <li><Mail size={18} aria-hidden="true" /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="s2-wrap s2-foot-bar">
          <span>© {new Date().getFullYear()} Global Connect World Travel. All rights reserved.</span>
          <span><Link to="/privacy">Privacy Policy</Link><i aria-hidden="true">|</i><Link to="/terms">Terms &amp; Conditions</Link></span>
        </div>
      </footer>
    </>
  );
};

const Service2Page: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  useEffect(() => {
    const prev = document.title;
    document.title = 'Find your next escape | Global Connect World Travel';
    return () => { document.title = prev; };
  }, []);
  return (
    <div className="s2" ref={root}>
      <Header onBookClick={onBookClick} />
      {/* App.tsx already wraps routes in <main> */}
      <div className="s2-main">
        <Hero onBookClick={onBookClick} />
        <Destinations />
        <Trust />
        <Reviews />
        <Faq />
        <Cta />
      </div>
      <Footer />
    </div>
  );
};

export default Service2Page;
