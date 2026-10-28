import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, Check, ChevronDown, Clock, Plane, Smile, Star, Users, Globe2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { servicePath } from '../data/winterPackages';
import { getWhatsAppLink } from '../utils/whatsapp';
import './Service2Page.css';

// /service2: "Find your next escape" landing page. The site header and footer come from App.tsx.

const IMG = '/images/s2/';

const CARDS = [
  { id: 'sikkim', title: 'Sikkim + Darjeeling', sub: 'Tea gardens & Himalayan views', days: '5–7 Days', who: 'Couple / Family', img: IMG + 'card-sikkim-v2.webp', w: 1055, h: 725, alt: 'Golden Buddha statue at Buddha Park, Ravangla, above misty forested hills in Sikkim' },
  { id: 'rajasthan', title: 'Rajasthan', sub: 'Royal heritage & desert trails', days: '5–8 Days', who: 'Couple / Family', img: IMG + 'card-rajasthan-new.webp', w: 1055, h: 725, alt: 'Travellers on a camel safari across the Thar desert dunes at sunset, Rajasthan' },
  { id: 'uttarakhand', title: 'Uttarakhand', sub: 'Hill lakes & jungle safaris', days: '5–7 Days', who: 'Family / Group', img: IMG + 'card-uttarakhand-hd.webp', w: 1164, h: 800, alt: 'Rowing boats on Naini Lake below the Nainital hills, Uttarakhand', credit: 'Praveen Singh Bisht, CC BY 2.0' },
  { id: 'kashmir', title: 'Kashmir', sub: 'Houseboats & snowy valleys', days: '4–6 Days', who: 'Couple / Family', img: IMG + 'card-kashmir-new.webp', w: 1055, h: 725, alt: 'Red gondola cable car above snowy pine forests and the Himalayas, Gulmarg, Kashmir' },
  { id: 'himachal', title: 'Himachal', sub: 'Hill stations & snow peaks', days: '5–7 Days', who: 'Family / Group', img: IMG + 'card-himachal-hd.webp', w: 1200, h: 825, alt: 'Snow-covered Himalayan peaks near Manali, Himachal Pradesh', credit: 'Aayugoyal, CC BY-SA 4.0' },
  { id: 'andaman', title: 'Andaman', sub: 'Turquoise waters & island escapes', days: '4–6 Days', who: 'Family / Group', img: IMG + 'card-andaman-v2.webp', w: 1055, h: 725, alt: 'Couple in white linen relaxing on a white sand beach beside clear turquoise water, Andaman' },
];

const STATS = [
  { n: 5000, suffix: '+', label: 'Trips completed', Icon: Plane },
  { n: 10000, suffix: '+', label: 'Happy customers', Icon: Smile },
  { n: 12, suffix: '+', label: 'Years of experience', Icon: Award },
  { n: 50, suffix: '+', label: 'Destinations', Icon: Globe2 },
];

// the same four traveller reviews as the home page
const REVIEWS = [
  { name: 'Priya Sharma', location: 'Mumbai, India', trip: 'Kerala Backwater Package', initials: 'PS', color: '#00A9D7', text: 'Absolutely breathtaking experience! The houseboat stay in Kerala was a dream come true. Everything was perfectly planned — from the transfers to the local food. GCWT made our anniversary trip truly unforgettable.' },
  { name: 'Ahmed Al Farsi', location: 'Dubai, UAE', trip: 'Rajasthan Heritage Tour', initials: 'AA', color: '#F97316', text: 'The Rajasthan heritage tour was beyond our expectations. The palace hotels were stunning, and the guided fort tours were incredibly detailed. Our family of 5 felt completely taken care of throughout the journey.' },
  { name: 'Sarah Thompson', location: 'London, UK', trip: 'Goa Coastal Adventure', initials: 'ST', color: '#8B5CF6', text: 'What a trip! The water sports in Goa were thrilling, and the beach shack lunch was the best seafood I\'ve ever had. The team was so responsive and professional. Already planning my next trip with GCWT!' },
  { name: 'Rahul Mehta', location: 'Bangalore, India', trip: 'Dubai Desert Safari', initials: 'RM', color: '#10B981', text: 'The Dubai desert safari exceeded all expectations. Dune bashing, camel rides, and a stunning BBQ dinner under the stars — it was pure magic. Seamless booking process and top-notch guides. Highly recommend!' },
];

const FAQS: [string, string][] = [
  ['How do I book a trip with Global Connect?', 'Tell us where and when you would like to travel through the enquiry form, WhatsApp or a call. Our team shares options and helps you confirm your booking.'],
  ['Can I customise my travel package?', 'Yes. Share your destination, dates, budget and interests, and we will adjust hotels, sightseeing and pace to suit you.'],
  ['Which destinations can I explore?', 'We plan holidays across India — Sikkim, Darjeeling, Andaman, Rajasthan, Himachal, Kashmir, Uttarakhand and more — along with Dubai and international trips.'],
  ['What is included in a tour package?', 'Inclusions vary by package and usually cover stays, breakfast, transfers and sightseeing. Your itinerary lists exactly what is included before you book.'],
  ['How can I contact your travel team?', 'Call +91 89210 95973, WhatsApp +971 58 952 0398 or email booking@globalconnectworldtravel.com. You can also visit our Kannur office.'],
];


const reduceMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// ---------- small pieces ----------

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

// two short points under the banner paragraph
const HERO_POINTS = ['Customised itineraries', 'Stays & transfers sorted'];

const Hero: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
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
            <button type="button" onClick={onBookClick} className="s2-nb-eyebrow s2-rv"><span className="s2-nb-eyebrow-ic" aria-hidden="true"><Plane /></span>Let’s go now</button>
            <h1 className="s2-nb-h1 s2-rv" style={{ '--rd': '80ms' } as React.CSSProperties}>
              <span>Explore India.</span>{' '}
              <span>Discover the <span className="s2-nb-hl">Beauty.
                <svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M4 20 C 60 8, 150 4, 296 14" /></svg>
              </span></span>
            </h1>
            <p className="s2-nb-p s2-rv" style={{ '--rd': '160ms' } as React.CSSProperties}>
              Handpicked holidays, beautiful destinations and local <br className="s2-nb-br" />experiences - thoughtfully planned around you.
            </p>
            <ul className="s2-nb-points s2-rv" style={{ '--rd': '200ms' } as React.CSSProperties}>
              {HERO_POINTS.map(p => <li key={p}><span aria-hidden="true"><Check /></span>{p}</li>)}
            </ul>
            <div className="s2-nb-ctas s2-rv" style={{ '--rd': '320ms' } as React.CSSProperties}>
              <a href={getWhatsAppLink('Hi! I would like to plan a trip in India.')} target="_blank" rel="noopener noreferrer" className="s2-nb-btn is-ghost">
                <WhatsAppIcon />WhatsApp Now
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

// cards per view: 3 on desktop, 2 on tablets, 1 on phones
const perView = () => {
  if (typeof window === 'undefined') return 3;
  const w = document.documentElement.clientWidth;
  return w > 960 ? 3 : w > 640 ? 2 : 1;
};

// carousel state shared by the destinations and reviews sliders
function useCarousel(n: number) {
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
  // swipe on touch screens; a swipe never counts as a click on the card under it
  const viewProps = {
    onPointerDown: (e: React.PointerEvent) => { swipe.current = { x: e.clientX, moved: false }; },
    onPointerUp: (e: React.PointerEvent) => {
      const s = swipe.current;
      if (!s) return;
      const dx = e.clientX - s.x;
      if (Math.abs(dx) > 40) { s.moved = true; go(dx < 0 ? 1 : -1); }
    },
    onClickCapture: (e: React.MouseEvent) => { if (swipe.current?.moved) { e.preventDefault(); e.stopPropagation(); } swipe.current = null; },
  };
  return { per, i, last, go, viewProps };
}

const CarouselNav: React.FC<{ what: string; i: number; last: number; go: (d: number) => void }> = ({ what, i, last, go }) => (
  <div className="s2-car-nav">
    <button type="button" className="s2-car-arrow" aria-label={`Previous ${what}`} onClick={() => go(-1)}><ChevronLeft size={22} aria-hidden="true" /></button>
    <span className="s2-car-dots" aria-hidden="true">
      {Array.from({ length: last + 1 }, (_, k) => <span key={k} className={k === i ? 'is-on' : undefined} />)}
    </span>
    <button type="button" className="s2-car-arrow" aria-label={`Next ${what}`} onClick={() => go(1)}><ChevronRight size={22} aria-hidden="true" /></button>
  </div>
);

const Destinations: React.FC = () => {
  const { per, i, last, go, viewProps } = useCarousel(CARDS.length);

  return (
    <section className="s2-dest" id="s2-destinations" aria-labelledby="s2-dest-h">
      <div className="s2-wrap">
        <div className="s2-dest-head">
          <h2 id="s2-dest-h" className="s2-h2">Explore Our <span>Destinations.</span></h2>
          <p>Choose your next unforgettable escape.</p>
        </div>
        <div className="s2-car s2-rv" role="group" aria-roledescription="carousel" aria-label="Destinations">
          <div className="s2-car-view" {...viewProps}>
            <ul className="s2-cards" style={{ '--i': i, '--per': per } as React.CSSProperties}>
              {CARDS.map((c, k) => {
                const shown = k >= i && k < i + per;
                return (
                  <li key={c.id} aria-hidden={!shown || undefined}>
                    <Link to={servicePath(c.id)} className="s2-card" draggable={false} tabIndex={shown ? undefined : -1}>
                      <span className="s2-card-img">
                        <img src={c.img} alt={c.alt} loading="lazy" draggable={false} width={c.w} height={c.h} />
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
                );
              })}
            </ul>
          </div>
          <CarouselNav what="destinations" i={i} last={last} go={go} />
          {/* the Uttarakhand and Himachal photos are CC BY / CC BY-SA, which require a credit; one small line keeps the cards clean */}
          <p className="s2-dest-credits">Destination photos via Wikimedia Commons: {CARDS.filter(c => c.credit).map(c => c.credit!.replace(/, (CC .*)$/, ' ($1)')).join(' · ')}</p>
        </div>
      </div>
    </section>
  );
};

const Trust: React.FC = () => (
  <section className="s2-trust" aria-labelledby="s2-trust-h">
    <div className="s2-wrap s2-trust-in">
      <div>
        <Eyebrow className="s2-rv">Why travel with us</Eyebrow>
        <h2 id="s2-trust-h" className="s2-h2 s2-rv">Journeys That <span>Build Trust.</span></h2>
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
      <figure className="s2-trust-photo is-art s2-rv" style={{ '--rd': '120ms' } as React.CSSProperties}>
        <img src={IMG + 'trust-pink-traveller.webp'} alt="Smiling traveller in a pink hoodie giving a thumbs up next to her blue suitcase, with travel icons behind her" loading="lazy" width={1254} height={1254} />
      </figure>
    </div>
  </section>
);

const Reviews: React.FC = () => {
  const { per, i, last, go, viewProps } = useCarousel(REVIEWS.length);
  return (
    <section className="s2-reviews" aria-labelledby="s2-rev-h">
      <div className="s2-wrap">
        <div className="s2-rev-head">
          <div>
            <Eyebrow className="s2-rv">Traveler stories</Eyebrow>
            <h2 id="s2-rev-h" className="s2-h2 s2-rv">Great Journeys. <span>Even Better Memories.</span></h2>
          </div>
          <div className="s2-rev-side s2-rv">
            <Link to="/about" className="s2-link">View All Reviews <ArrowRight size={18} aria-hidden="true" /></Link>
            <div className="s2-rev-score">
              <span className="s2-avatars" aria-hidden="true">{REVIEWS.map(r => <span key={r.name} style={{ background: r.color }}>{r.initials}</span>)}</span>
              <span><strong>4.8/5</strong> from travellers on Google</span>
            </div>
          </div>
        </div>
        <div className="s2-car is-flush s2-rv" role="group" aria-roledescription="carousel" aria-label="Traveller reviews">
          <div className="s2-car-view" {...viewProps}>
            <ul className="s2-cards s2-rev-list" style={{ '--i': i, '--per': per } as React.CSSProperties}>
              {REVIEWS.map((r, k) => (
                <li key={r.name} className="s2-rev" aria-hidden={k < i || k >= i + per || undefined}>
                  <Stars />
                  <p>“{r.text}”</p>
                  <div className="s2-rev-who">
                    <span className="s2-rev-av" style={{ background: r.color }} aria-hidden="true">{r.initials}</span>
                    <span><strong>{r.name}</strong><small>{r.location} · {r.trip}</small></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <CarouselNav what="reviews" i={i} last={last} go={go} />
        </div>
      </div>
    </section>
  );
};

const Faq: React.FC = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="s2-faq" aria-labelledby="s2-faq-h">
      <div className="s2-wrap s2-faq-in">
        <div className="s2-faq-body">
          <Eyebrow className="s2-rv">FAQ</Eyebrow>
          <h2 id="s2-faq-h" className="s2-h2 s2-rv">Frequently Asked <span>Questions.</span></h2>
          {/* fade the list in as one block: the items re-render on click, which would drop a class added from outside React */}
          <div className="s2-acc s2-rv">
            {FAQS.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} className={`s2-acc-item${isOpen ? ' is-open' : ''}`}>
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

// WhatsApp band above the site footer: photo background (traveller on a blue chair at the right), copy on the left
const Newsletter: React.FC = () => (
  <section className="s2-news-wrap" aria-labelledby="s2-news-h">
    <div className="s2-wrap s2-wrap-wide">
      <div className="s2-news s2-rv">
        <img className="s2-news-bg" src={IMG + 'band-cowboy.webp'} alt="Smiling traveller in a cowboy hat relaxing in a blue armchair, planning his trip on his phone" width={2135} height={693} loading="lazy" />
        <div className="s2-news-copy">
          <h2 id="s2-news-h">Your Next Adventure <span>Starts Here.</span></h2>
          <p>Tell us where you would like to go and our travel team will plan it with you on WhatsApp.</p>
          <a href={getWhatsAppLink('Hi! I would like to plan my next trip.')} target="_blank" rel="noopener noreferrer" className="s2-news-wa">
            <WhatsAppIcon />WhatsApp Now
          </a>
        </div>
      </div>
    </div>
  </section>
);


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
      {/* App.tsx already wraps routes in <main> */}
      <div className="s2-main">
        <Hero onBookClick={onBookClick} />
        <Destinations />
        <Trust />
        <Reviews />
        <Faq />
      </div>
      <Newsletter />
    </div>
  );
};

export default Service2Page;
