import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Images, Clock, CalendarDays, Package, Check,
  MessageCircle, Phone, Plus, Star, Hotel, Car, ShieldCheck, Headphones, ChevronRight as Crumb,
} from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import './IndiaToursPackagePage.css';
import { WINTER_PACKAGES, EXCLUSIONS, servicePath, WinterPackage } from '../data/winterPackages';
import { WINTER_CARD_IMG, WINTER_HERO_IMG, PHOTO_CREDITS } from '../data/winterCardImages';

// /india-tours-package — Google Ads landing page for the six winter India packages
// (data/winterPackages.ts). Layout follows the proven package-listing pattern of big
// Indian travel sites (gallery hero + key facts + dense package cards), in our brand
// colours. No form: every action is WhatsApp or a call, tracked as "contact_click".

// Real customer reviews only. The section stays hidden while this list is empty.
// Shape: { name: 'Priya S.', place: 'Chennai', trip: 'Kashmir', rating: 5, text: '...', date: 'Dec 2025' }
const REVIEWS: { name: string; place: string; trip: string; rating: number; text: string; date: string }[] = [];

const BLUE = '#00A9D7';
const NAVY = '#022A61';
const CALL_NUMBER = '+971589520398';
const CALL_LABEL = '+971 58 952 0398';
const WA_TEXT = 'Hi! I would like to enquire about your India winter packages.';

const priceNumber = (p: string) => Number(p.replace(/[^\d]/g, '')) || 0;
const CHEAPEST = [...WINTER_PACKAGES].sort((a, b) => priceNumber(a.price) - priceNumber(b.price))[0];
const cardImg = (p: WinterPackage) => WINTER_CARD_IMG[p.id] || p.photo;
const nightsLabel = (n: string) => `${parseInt(n, 10) || 1}N`;

const GALLERY = [
  { src: WINTER_HERO_IMG.kashmir, alt: 'Shikara on Dal Lake, Kashmir', label: 'Kashmir' },
  { src: WINTER_HERO_IMG.andaman, alt: 'Mangrove tree on Havelock beach, Andaman', label: 'Andaman' },
  { src: WINTER_HERO_IMG.himachal, alt: 'Solang Valley under snow, Himachal', label: 'Himachal' },
  { src: WINTER_HERO_IMG.rajasthan, alt: 'Camel ride at sunset on the Sam dunes, Rajasthan', label: 'Rajasthan' },
  { src: WINTER_HERO_IMG.sikkim, alt: 'Kangchenjunga, Sikkim', label: 'Sikkim' },
  { src: WINTER_HERO_IMG.uttarakhand, alt: 'Nainital lake at dusk, Uttarakhand', label: 'Uttarakhand' },
];

const INCLUDES = ['Hotel stay', 'Daily breakfast', 'Airport transfers', 'Private sightseeing'];

// General questions, answered from what the packages actually include.
const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is included in the package price?',
    a: 'Hotel stay with daily breakfast, return airport or railway station transfers, sightseeing as per the itinerary in a private vehicle, and applicable government taxes. Sikkim also includes permit charges.',
  },
  { q: 'What is not included?', a: `${EXCLUSIONS.slice(0, -1).join(', ')}. Anything not listed under inclusions is extra.` },
  {
    q: 'Are flights or train tickets included?',
    a: 'No. Prices are land packages that start and end at the nearest airport or railway station. Share your flight or train timings and we will match the transfers to them.',
  },
  {
    q: 'Is the price per person?',
    a: 'Yes. All prices are per person on 4 persons sharing. For 2 travellers, families with kids or bigger groups, we send exact costing for your group size.',
  },
  {
    q: 'Can you change the itinerary or add more places?',
    a: 'Yes. Every package can be extended or rebuilt around your dates — for example adding Pelling to Sikkim or starting Rajasthan from Jaipur. Tell us what you would like and we will requote.',
  },
  {
    q: 'When is the best time to travel?',
    a: 'These packages are planned for winter 2026–27 (November to February). Kashmir and Himachal give you the best chance of snow, while Andaman has its calmest sea and clearest water.',
  },
  {
    q: 'How do I book?',
    a: 'Message us on WhatsApp or call us with your travel month and group size. We send hotels, dates and the full costing, and confirm once you are happy with the plan.',
  },
];

// Call / WhatsApp taps are the page's conversions. In GTM, create a Custom Event trigger
// "contact_click" and attach the Google Ads conversion tag to it.
const trackContact = (method: 'call' | 'whatsapp', item = 'general') => {
  const w = window as any;
  (w.dataLayer = w.dataLayer || []).push({ event: 'contact_click', contact_method: method, package: item, page: 'india_packages_landing' });
};

const waFor = (p?: WinterPackage) =>
  getWhatsAppLink(p ? `Hi! Please send me details for the ${p.name} winter package (${p.nights}N/${p.days}D, ₹${p.price} per person).` : WA_TEXT);

const IndiaToursPackagePage: React.FC = () => {
  const [photo, setPhoto] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Page title + description for ad quality score and link previews
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') || '';
    document.title = `India Winter Tour Packages 2026 from ₹${CHEAPEST.price} | Global Connect World Travel`;
    meta?.setAttribute('content', 'Kashmir, Himachal, Sikkim, Uttarakhand, Rajasthan and Andaman winter packages with hotels, transfers and sightseeing. Get a free custom plan on WhatsApp today.');
    return () => { document.title = prevTitle; meta?.setAttribute('content', prevDesc); };
  }, []);

  // Gallery auto-advance (pauses after a manual pick until the next tick)
  useEffect(() => {
    const t = window.setTimeout(() => setPhoto(i => (i + 1) % GALLERY.length), 5500);
    return () => window.clearTimeout(t);
  }, [photo]);

  const prev = () => setPhoto(i => (i - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setPhoto(i => (i + 1) % GALLERY.length);

  return (
    <div className="bg-white text-slate-700 overflow-x-clip pb-[76px] lg:pb-0">

      {/* Sticky mobile action bar (ad traffic is mostly mobile) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[60] bg-white border-t border-slate-200 px-3 py-2.5 grid grid-cols-2 gap-2 shadow-[0_-6px_20px_rgba(2,42,97,0.10)]">
        <a href={`tel:${CALL_NUMBER}`} onClick={() => trackContact('call')} className="h-12 rounded-lg border-2 text-[15px] font-bold flex items-center justify-center gap-2" style={{ borderColor: NAVY, color: NAVY }}>
          <Phone className="w-5 h-5" /> Call us
        </a>
        <a href={waFor()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp')} className="h-12 rounded-lg bg-[#25D366] text-white font-bold text-[15px] flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
      </div>

      {/* ───────────── HERO: gallery + key facts ───────────── */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-8 pt-5 pb-10 lg:pb-14">
        <nav className="flex items-center gap-1.5 text-[13px] text-slate-500 mb-5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#00A9D7]">Home</Link><Crumb className="w-3.5 h-3.5" />
          <Link to="/india-tours" className="hover:text-[#00A9D7]">India</Link><Crumb className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-semibold">Winter Packages</span>
        </nav>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-7 lg:gap-12 items-center">
          {/* Gallery */}
          <div className="relative h-[260px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden bg-slate-100">
            {GALLERY.map((g, i) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                fetchPriority={i === 0 ? 'high' : 'low'}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === photo ? 'opacity-100 itp-kenburns' : 'opacity-0'}`}
              />
            ))}
            <button onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center" style={{ color: NAVY }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center" style={{ color: NAVY }}>
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {GALLERY.map((g, i) => (
                <button key={g.src} onClick={() => setPhoto(i)} aria-label={`Photo ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === photo ? 'w-6 bg-white' : 'w-1.5 bg-white/60'}`} />
              ))}
            </div>
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-white/95 text-[12px] font-bold px-3 py-1.5 rounded-md" style={{ color: NAVY }}>
              <Images className="w-4 h-4" /> {GALLERY[photo].label}
            </span>
          </div>

          {/* Key facts */}
          <div>
            <h1 className="text-[32px] md:text-[42px] font-bold leading-[1.1]" style={{ color: NAVY }}>
              India Winter Tour Packages
            </h1>
            <p className="text-[16px] text-slate-500 mt-3 leading-relaxed">
              Kashmir, Himachal, Sikkim, Uttarakhand, Rajasthan and Andaman — six ready-planned winter trips with
              hotels, transfers and sightseeing.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-[14px] text-slate-600">
              <span className="inline-flex items-center gap-1.5"><Package className="w-4 h-4" style={{ color: BLUE }} /> {WINTER_PACKAGES.length} packages</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" style={{ color: BLUE }} /> 4–5 nights</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-4 h-4" style={{ color: BLUE }} /> Nov 2026 – Feb 2027</span>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-[14px] text-slate-500">
                Starts @ <span className="text-[30px] font-extrabold align-middle" style={{ color: NAVY }}>₹{CHEAPEST.price}</span> <span className="text-[13px]">/ person</span>
              </p>
              <p className="text-[12px] text-slate-400 mt-1">On 4 persons sharing · Flights not included</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <a href={waFor()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp')} className="h-[52px] rounded-lg text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition" style={{ backgroundColor: BLUE }}>
                <MessageCircle className="w-5 h-5" /> Connect With An Expert
              </a>
              <a href={`tel:${CALL_NUMBER}`} onClick={() => trackContact('call')} className="h-[52px] rounded-lg border-2 font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-slate-50 transition" style={{ borderColor: NAVY, color: NAVY }}>
                <Phone className="w-5 h-5" /> {CALL_LABEL}
              </a>
            </div>
            <p className="flex items-center gap-1.5 text-[13px] text-slate-500 mt-3">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Free custom plan on WhatsApp · No hidden cost
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── FACTS BAR ───────────── */}
      <section style={{ backgroundColor: NAVY }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 text-white">
          {[
            { k: 'Ideal duration', v: '4–5 nights' },
            { k: 'Starting price', v: `₹${CHEAPEST.price} / person` },
            { k: 'Best time', v: 'November – February' },
            { k: 'Includes', v: 'Hotel · Breakfast · Transfers' },
          ].map((f, i) => (
            <div key={f.k} className={`px-1 md:px-6 ${i ? 'md:border-l md:border-white/15' : ''}`}>
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/60 font-bold">{f.k}</p>
              <p className="text-[16px] font-bold mt-1">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── PACKAGES ───────────── */}
      <section id="packages" className="bg-[#F5F8FB]">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-12 lg:py-16">
          <p className="heading text-[26px] md:text-[32px] font-bold" style={{ color: NAVY }}>
            India <span style={{ color: BLUE }}>Winter</span> Packages
          </p>
          <p className="text-[15px] text-slate-500 mt-1.5">
            Hotels, breakfast, transfers and sightseeing included. Customise any trip for your dates and group.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {WINTER_PACKAGES.map(p => (
              <article key={p.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-[0_14px_34px_rgba(2,42,97,0.12)] transition-shadow">
                <Link to={servicePath(p.id)} className="relative block h-[210px] overflow-hidden">
                  <img loading="lazy" src={cardImg(p)} alt={p.photoAlt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded" style={{ backgroundColor: BLUE }}>
                    {p.id === CHEAPEST.id ? 'Best value' : 'Winter special'}
                  </span>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <p className="flex items-center gap-1.5 text-[13px] text-slate-500">
                    <Clock className="w-4 h-4" /> {p.days} days &amp; {p.nights} nights
                  </p>
                  <Link to={servicePath(p.id)} className="block text-[18px] font-bold leading-snug mt-1.5 hover:underline" style={{ color: NAVY }}>
                    {p.name} Winter Package
                  </Link>

                  {/* route chips: 2N Gangtok › 2N Darjeeling */}
                  <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] mt-2.5">
                    {p.stops.map((s, i) => (
                      <React.Fragment key={s.p}>
                        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                        <span><b style={{ color: BLUE }}>{nightsLabel(s.n)}</b> <span className="text-slate-600">{s.p}</span></span>
                      </React.Fragment>
                    ))}
                  </p>

                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-4 text-[13px] text-slate-600">
                    {INCLUDES.map(t => (
                      <li key={t} className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> {t}</li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between gap-3 mt-auto pt-5 border-t border-dashed border-slate-200">
                    <div>
                      <p className="text-[11px] text-slate-400">Starts from</p>
                      <p className="text-[22px] font-extrabold leading-none mt-1" style={{ color: NAVY }}>
                        ₹{p.price}<span className="text-[12px] font-medium text-slate-400"> /person</span>
                      </p>
                    </div>
                    <a
                      href={waFor(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContact('whatsapp', p.id)}
                      className="shrink-0 inline-flex items-center gap-1.5 border-2 rounded-lg px-3.5 py-2 text-[13px] font-bold hover:text-white transition-colors"
                      style={{ borderColor: BLUE, color: BLUE }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = BLUE; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = BLUE; }}
                    >
                      <MessageCircle className="w-4 h-4" /> Request callback
                    </a>
                  </div>
                  <Link to={servicePath(p.id)} className="text-[13px] font-bold mt-3 inline-flex items-center gap-1 hover:underline" style={{ color: BLUE }}>
                    View full itinerary <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── EXPERT CALLOUT ───────────── */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-8 py-10">
        <div className="rounded-2xl border border-[#00A9D7]/25 bg-[#F2F9FD] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: BLUE }}>
              <Headphones className="w-6 h-6" />
            </span>
            <div>
              <p className="heading text-[22px] font-bold" style={{ color: NAVY }}>Create your perfect winter holiday</p>
              <p className="text-[14px] text-slate-500 mt-1">Our India travel experts can tailor any itinerary for your dates, group size and budget. Free to connect.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={waFor()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp')} className="h-12 px-6 rounded-lg bg-[#25D366] text-white font-bold text-[15px] inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> WhatsApp us
            </a>
            <a href={`tel:${CALL_NUMBER}`} onClick={() => trackContact('call')} className="h-12 px-6 rounded-lg border-2 font-bold text-[15px] inline-flex items-center gap-2 bg-white" style={{ borderColor: NAVY, color: NAVY }}>
              <Phone className="w-5 h-5" /> Call now
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── WHY BOOK WITH US ───────────── */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-8 pb-12 lg:pb-16">
        <p className="heading text-[26px] md:text-[32px] font-bold" style={{ color: NAVY }}>
          Why book with <span style={{ color: BLUE }}>Global Connect</span>
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          {[
            { icon: Hotel, t: 'Handpicked hotels', s: 'Comfortable stays with daily breakfast, chosen for location and value.' },
            { icon: Car, t: 'Private transfers', s: 'Airport or station pickup and all sightseeing in a private vehicle.' },
            { icon: ShieldCheck, t: 'No hidden cost', s: 'One clear price per person, with inclusions listed upfront.' },
            { icon: Headphones, t: 'Expert support', s: 'A real travel expert on WhatsApp before and during your trip.' },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="rounded-xl border border-slate-200 p-6">
              <Icon className="w-8 h-8" style={{ color: BLUE }} strokeWidth={1.6} />
              <p className="text-[17px] font-bold mt-4" style={{ color: NAVY }}>{t}</p>
              <p className="text-[14px] text-slate-500 mt-1.5 leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── REVIEWS (shown once real reviews are added to REVIEWS) ───────────── */}
      {REVIEWS.length > 0 && (
        <section className="bg-[#F5F8FB]">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-12 lg:py-16 grid lg:grid-cols-[320px_1fr] gap-10">
            <div>
              <p className="heading text-[26px] md:text-[32px] font-bold" style={{ color: NAVY }}>Customer Reviews</p>
              <p className="text-[14px] text-slate-500 mt-2">Hear directly from travellers who went with us.</p>
            </div>
            <div className="divide-y divide-slate-200">
              {REVIEWS.map(r => (
                <div key={r.name + r.date} className="py-5 first:pt-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center" style={{ backgroundColor: BLUE }}>{r.name.charAt(0)}</span>
                      <div>
                        <p className="font-bold" style={{ color: NAVY }}>{r.name}</p>
                        <p className="text-[12px] text-slate-400">{r.place} · {r.trip} · {r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className={`w-4 h-4 ${k < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[14px] text-slate-600 mt-3 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────── FAQ ───────────── */}
      <section className="bg-[#F5F8FB]">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-12 lg:py-16">
          <p className="heading text-[26px] md:text-[32px] font-bold" style={{ color: NAVY }}>
            Frequently Asked <span style={{ color: BLUE }}>Questions</span>
          </p>
          <div className="mt-7 grid lg:grid-cols-2 gap-x-6 gap-y-3 items-start">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="bg-white rounded-xl border border-slate-200">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 text-left px-5 py-4">
                    <span className="font-bold text-[15px]" style={{ color: NAVY }}>{f.q}</span>
                    <Plus className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} style={{ color: BLUE }} />
                  </button>
                  {open && <p className="px-5 pb-5 -mt-1 text-[14px] text-slate-600 leading-relaxed">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section style={{ backgroundColor: NAVY }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-12 lg:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white">
          <div>
            <p className="heading text-[26px] md:text-[34px] font-bold">Winter dates are filling fast</p>
            <p className="text-white/70 text-[15px] mt-1.5">Send your travel month and group size — get hotels, dates and full costing today.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={waFor()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp')} className="h-[52px] px-7 rounded-lg bg-[#25D366] text-white font-bold text-[15px] inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> WhatsApp us
            </a>
            <a href={`tel:${CALL_NUMBER}`} onClick={() => trackContact('call')} className="h-[52px] px-7 rounded-lg bg-white font-bold text-[15px] inline-flex items-center gap-2" style={{ color: NAVY }}>
              <Phone className="w-5 h-5" /> {CALL_LABEL}
            </a>
          </div>
        </div>
      </section>
      {/* Photo credits (required by the CC licences) */}
      <p className="max-w-[1240px] mx-auto px-5 md:px-8 py-4 text-[11px] text-slate-400 leading-relaxed">
        Photos via Wikimedia Commons:{' '}
        {PHOTO_CREDITS.map((c, i) => (
          <React.Fragment key={c.place}>
            {i > 0 && ' · '}
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{c.place} — {c.creator}</a> ({c.license})
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default IndiaToursPackagePage;
