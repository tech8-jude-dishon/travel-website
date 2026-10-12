import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  WINTER_PACKAGES, EXCLUSIONS, inclusionsFor, servicePath,
  WinterPackage, WinterStop,
} from '../data/winterPackages';
import { enquiries } from '../lib/apiClient';
import { getWhatsAppLink } from '../utils/whatsapp';
import './WinterPackagePage.css';

// ---------- icons (24x24 stroke paths from the original landing page) ----------
const IC: Record<string, string> = {
  palm: '<path d="M13 21c0-5-.6-8.6-2-12"/><path d="M11 9C9.3 6.2 5.8 5.8 3.3 7.8"/><path d="M11 9c-.6-3.4 2-5.6 5.4-5"/><path d="M11 9c3-1.8 6.8-.8 8.6 2.2"/><path d="M11 9c-2.8.4-4.6 2.6-4.6 5.4"/><path d="M4 21h16"/>',
  cloche: '<path d="M4.5 17a7.5 7.5 0 0 1 15 0"/><path d="M3 17h18"/><path d="M12 9.5V7.5"/><path d="M10.5 7.5h3"/><path d="M8 13.5a4.5 4.5 0 0 1 2.5-2.2"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c0-4 3.4-6.2 7.5-6.2s7.5 2.2 7.5 6.2"/>',
  wa: '<path d="M3.5 20.5 5 16.2A8.6 8.6 0 1 1 8 19.1z"/><path d="M9.2 8.6c-.3 2.9 3 6.4 6.2 6.2l.8-1.4-1.8-1-1 .7a4.4 4.4 0 0 1-2.6-2.6l.7-1-1-1.8z"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14h2M14 14h2M8 17h2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-5.6 6.5-5.6s6.5 2 6.5 5.6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18 14.7c2 .6 3.5 2.3 3.5 5.3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ferry: '<path d="M2 20.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/><path d="M4.5 17 3 12.5h18L19.5 17"/><path d="M6 12.5V8.5h9.5l2.5 4"/><path d="M9 8.5V5.5h4v3"/>',
  doc: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  tick: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  cross: '<path d="M7 7l10 10M17 7 7 17"/>',
};

const INC_IC: [RegExp, string][] = [
  [/accommodation/i, '<path d="M3 19V7"/><path d="M3 14h18v5"/><path d="M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="2"/>'],
  [/transfer/i, '<path d="M5 16V9.5L7 5h10l2 4.5V16"/><path d="M3.5 16h17v2.5h-17z"/><circle cx="7.5" cy="13" r="1"/><circle cx="16.5" cy="13" r="1"/><path d="M5 9.5h14"/>'],
  [/sightseeing|itinerary/i, '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'],
  [/tax|permit/i, IC.doc],
];
const EXCL_IC: [RegExp, string][] = [
  [/air|train/i, IC.plane],
  [/lunch|dinner|meal/i, '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M17 21V3c-2 1.5-3 4-3 7h3"/>'],
  [/ticket|ropeway|safari/i, '<path d="M3 9V6.5h18V9a3 3 0 0 0 0 6v2.5H3V15a3 3 0 0 0 0-6z"/><path d="M14 7v10" stroke-dasharray="2 2"/>'],
  [/insurance/i, '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'],
  [/./, '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>'],
];
const pick = (table: [RegExp, string][], text: string, fallback = IC.shield) =>
  (table.find(([re]) => re.test(text)) || [null, fallback])[1];

/** Static, trusted icon markup only. */
const Svg: React.FC<{ d: string }> = ({ d }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: d }} />
);
const Icon: React.FC<{ k: string }> = ({ k }) => <Svg d={IC[k]} />;

const pad2 = (n: number) => String(n).padStart(2, '0');

const jump = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });

const openWhatsApp = () =>
  window.open(getWhatsAppLink('Hi! I would like to enquire about your travel packages.'), '_blank', 'noopener');

// ---------- hero + enquiry form ----------
const Hero: React.FC<{ d: WinterPackage }> = ({ d }) => {
  const [form, setForm] = useState({ name: '', phone: '', month: 'November 2026', travellers: '4 adults' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await enquiries.submit({
        full_name: form.name,
        email: '',
        phone: form.phone,
        destination: `${d.name} (Winter 2026 package)`,
        travel_date: form.month,
        adults: form.travellers,
        message: `Winter package enquiry: ${d.name}, ${d.nights}N/${d.days}D, ₹${d.price} per person`,
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const imgStyle: React.CSSProperties | undefined = d.heroPos
    ? { objectPosition: d.heroPos, transform: d.heroFx }
    : undefined;

  return (
    <div className="hero hero-x">
      <img className="photo" src={d.photo} alt={d.photoAlt} fetchPriority="high" style={imgStyle} />
      <div className="shade" />
      <svg className="swoosh" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" strokeLinecap="round">
          <path d="M0 730 C300 660 560 780 860 690 S1140 560 1200 535" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M620 0 C760 60 820 140 760 240" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <svg className="divider" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 34 C240 6 480 6 720 26 S1200 58 1440 22 L1440 60 L0 60 Z" />
      </svg>

      <div className="hero-in">
        <div>
          <p className="x-eyebrow">{d.eyebrow}</p>
          <h1>{d.headPre}<em>{d.headEm}</em><br />{d.headLine2}</h1>
          <p className="lede">{d.lede}</p>
          <ul className="x-feats">
            {d.feats.map(f => (
              <li key={f.t}><div className="x-ic"><Icon k={f.i} /></div><b>{f.t}</b><span>{f.s}</span></li>
            ))}
          </ul>
          <div className="pricebar">
            <div className="price">₹{d.price}<small>per person, 4 persons sharing</small></div>
            <div className="dur">{d.nights} nights / {d.days} days<small>Flights not included</small></div>
          </div>
        </div>

        <div className={`lead x-lead${status === 'done' ? ' done' : ''}`} id={`form-${d.id}`}>
          <div className="form-body">
            <p className="x-kick">Get your custom plan</p>
            <p className="heading wp-h2">{d.formTitle}</p>
            <p className="sub">Hotels, exact costing and dates sent to you today.</p>
            <form onSubmit={submit}>
              <div className="field"><label htmlFor={`n-${d.id}`}>Name</label>
                <div className="x-in"><Icon k="user" /><input id={`n-${d.id}`} required autoComplete="name" placeholder="Your name" value={form.name} onChange={set('name')} /></div></div>
              <div className="field"><label htmlFor={`p-${d.id}`}>WhatsApp number</label>
                <div className="x-in"><Icon k="wa" /><input id={`p-${d.id}`} type="tel" required autoComplete="tel" placeholder="With country code" value={form.phone} onChange={set('phone')} /></div></div>
              <div className="field"><label htmlFor={`m-${d.id}`}>Travel month</label>
                <div className="x-in"><Icon k="cal" />
                  <select id={`m-${d.id}`} value={form.month} onChange={set('month')}>
                    {['November 2026', 'December 2026', 'January 2027', 'February 2027', 'Not decided yet'].map(o => <option key={o}>{o}</option>)}
                  </select></div></div>
              <div className="field"><label htmlFor={`t-${d.id}`}>Travellers</label>
                <div className="x-in"><Icon k="users" />
                  <select id={`t-${d.id}`} value={form.travellers} onChange={set('travellers')}>
                    {['2 adults', '4 adults', 'Family with kids', '6 or more'].map(o => <option key={o}>{o}</option>)}
                  </select></div></div>
              <button className="x-btn" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send my enquiry'} <Icon k="arrow" />
              </button>
              {status === 'error' && (
                <p className="x-safe" style={{ color: '#E5484D' }}>Could not send right now. Please try again or WhatsApp us.</p>
              )}
              <p className="x-safe">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#0F3D3E" /><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                100% Secure &nbsp;|&nbsp; No Spam &nbsp;|&nbsp; Quick Response
              </p>
            </form>
          </div>
          <div className="thanks"><p className="heading wp-h3">Enquiry received</p><p>Our {d.name} specialist will message you on WhatsApp shortly with hotels, dates and the full costing.</p></div>
        </div>
      </div>
    </div>
  );
};

// ---------- route cards ----------
const Route: React.FC<{ d: WinterPackage }> = ({ d }) => {
  let day = 1;
  return (
    <div className="sec sec-x"><div className="wrap">
      <div className="x-rhead">
        <div>
          <p className="x-sec-kick">Your route</p>
          <p className="heading wp-h2" dangerouslySetInnerHTML={{ __html: d.routeHead }} />
          <p className="intro">{d.nights} nights split the way a local would split them, so you unpack less and see more.</p>
        </div>
        <span className="x-total"><Icon k="plane" />Starts and ends at {d.ex}</span>
      </div>
      <div className="x-cards" style={{ '--n': d.stops.length } as React.CSSProperties}>
        {d.stops.map((s, i) => {
          const nights = parseInt(s.n, 10) || 1, from = day, to = day + nights - 1;
          day += nights;
          return (
            <div className="x-cell" key={s.p}>
              <article className="x-card">
                <img src={s.img} alt={s.alt} loading="lazy" title={s.credit ? `Photo: ${s.credit} (Wikimedia Commons)` : undefined} />
                <div className="x-top"><span className="x-daychip">Day {from}{to > from ? `–${to}` : ''}</span><span className="x-big">{pad2(i + 1)}</span></div>
                <div className="x-body">
                  <span className="x-nightpill"><Icon k="moon" />{s.n}</span>
                  <p className="heading wp-h3">{s.p}</p>
                  <ul className="x-chips">{s.note.split(/,\s*/).map(t => <li key={t}><Icon k="pin" />{t}</li>)}</ul>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div></div>
  );
};

// ---------- day-by-day planner ----------
const Days: React.FC<{ d: WinterPackage }> = ({ d }) => {
  const [active, setActive] = useState(0);
  const N = d.days_list.length, last = N - 1;

  // which stop each day is spent at, from the stops' night counts
  const where: WinterStop[] = [];
  d.stops.forEach(s => { for (let k = 0; k < (parseInt(s.n, 10) || 1); k++) where.push(s); });
  const stopFor = (i: number) => where[i] || d.stops[d.stops.length - 1];

  const go = (i: number) => {
    if (i < 0 || i >= N) return;
    setActive(i);
    document.getElementById(`dt-${d.id}-${i}`)?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  };

  return (
    <div className="sec sec-days"><div className="wrap">
      <div className="x-dhead">
        <div>
          <p className="x-sec-kick">Day by day</p>
          <p className="heading wp-h2">{N} days, <em>perfectly</em> paced</p>
          <p className="intro">A working outline. Order can shift with weather and your flight timings.</p>
        </div>
      </div>
      <ul className="x-tabs" role="tablist" style={{ '--n': N } as React.CSSProperties}>
        {d.days_list.map((_, i) => (
          <li key={i}>
            <button className="x-tab" role="tab" id={`dt-${d.id}-${i}`} aria-controls={`dp-${d.id}-${i}`} aria-selected={i === active} onClick={() => go(i)}>
              <small>Day</small><b>{pad2(i + 1)}</b><span>{stopFor(i).p}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="x-prog"><i style={{ '--p': `${((active + 1) * 100) / N}%` } as React.CSSProperties} /></div>
      {d.days_list.map((x, i) => {
        const s = stopFor(i);
        const tags: React.ReactNode[] = [];
        if (i === 0) tags.push(<span key="a" className="x-dtag x-dtag-alt"><Icon k="plane" />Arrival</span>);
        else if (i === last) tags.push(<span key="d" className="x-dtag x-dtag-alt"><Icon k="plane" />Departure</span>);
        else if (/ferry/i.test(x.t)) tags.push(<span key="f" className="x-dtag x-dtag-alt"><Icon k="ferry" />Ferry day</span>);
        if (i !== last) tags.push(<span key="n" className="x-dtag"><Icon k="moon" />Night in {s.p}</span>);
        return (
          <div key={i} className={`x-panel${i === active ? ' is-on' : ''}`} role="tabpanel" id={`dp-${d.id}-${i}`} aria-labelledby={`dt-${d.id}-${i}`}>
            <div className="x-pimg"><img src={s.img} alt={s.alt} loading="lazy" /><span className="x-where"><Icon k="pin" />{s.p}</span></div>
            <div className="x-pbody">
              <div className="x-pnum"><b>{pad2(i + 1)}</b>/ {pad2(N)} days</div>
              <div className="x-dtags">{tags}</div>
              <p className="heading wp-h3">{x.t}</p>
              <p>{x.d}</p>
              <div className="x-pnav">
                <button type="button" className="x-back" onClick={() => go(i - 1)} disabled={i === 0}><Icon k="arrow" />Previous</button>
                <button type="button" onClick={() => go(i + 1)} disabled={i === last}>Next day <Icon k="arrow" /></button>
              </div>
            </div>
          </div>
        );
      })}
    </div></div>
  );
};

// ---------- pricing card ----------
const Price: React.FC<{ d: WinterPackage }> = ({ d }) => (
  <div className="sec sec-price"><div className="wrap">
    <div className="x-phead">
      <p className="x-sec-kick">What the price covers</p>
      <p className="heading wp-h2">One price, <em>no</em> surprises</p>
    </div>
    <div className="x-pk">
      <div className="x-pk-top">
        <div className="x-pk-name">
          <small>Winter 2026 package</small>
          <p className="heading wp-h3">{d.name}</p>
          <ul>
            <li><Icon k="moon" />{d.nights}N / {d.days}D</li>
            <li><Icon k="palm" />{d.stops.map(s => s.p).join(' · ')}</li>
          </ul>
        </div>
        <div className="x-pk-price"><b>₹{d.price}</b><span>per person · 4 persons sharing</span></div>
      </div>
      <div className="x-pk-body">
        <div className="x-pk-col x-pk-in">
          <p className="heading wp-h4"><i><Icon k="tick" /></i>What's Included</p>
          <ul>{inclusionsFor(d).map(t => <li key={t}><span><Svg d={pick(INC_IC, t)} /></span>{t}</li>)}</ul>
        </div>
        <div className="x-pk-col x-pk-out">
          <p className="heading wp-h4"><i><Icon k="cross" /></i>Not Included</p>
          <ul>{EXCLUSIONS.map(t => <li key={t}><span><Svg d={pick(EXCL_IC, t)} /></span>{t}</li>)}</ul>
        </div>
      </div>
      <div className="x-pk-foot">
        <p><span className="x-pk-pl"><Icon k="plane" /></span>Starts and ends at {d.exShort || d.ex}. We match transfers to your flights.</p>
        <div className="x-pk-acts">
          <button className="x-pk-btn" type="button" onClick={() => jump(`form-${d.id}`)}>Get the full plan <Icon k="arrow" /></button>
          <button className="x-pk-btn x-pk-wa" type="button" onClick={openWhatsApp}><Icon k="wa" />WhatsApp us</button>
        </div>
      </div>
    </div>
  </div></div>
);

// ---------- faq + closing cta ----------
const Faq: React.FC<{ d: WinterPackage }> = ({ d }) => (
  <div className="sec sec-faq"><div className="wrap">
    <div className="x-fhead">
      <p className="x-sec-kick">Before you book</p>
      <p className="heading wp-h2">Your questions, <em>answered</em></p>
      <p>Everything you need to know before booking {d.name}.</p>
    </div>
    <div className="x-acc">
      {d.faq.map((f, i) => (
        <details key={f.q} open={i === 0}><summary>{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>
      ))}
    </div>
  </div></div>
);

const Cta: React.FC<{ d: WinterPackage }> = ({ d }) => (
  <div className="x-cta-sec"><div className="wrap">
    <div className="x-cta">
      <div className="x-cta-ph" style={{ '--cta-pos': d.ctaPos || 'center 60%' } as React.CSSProperties}>
        <img src={d.ctaPhoto} alt={d.photoAlt} loading="lazy" />
      </div>
      <svg className="x-cta-wave" viewBox="0 0 520 400" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`ctaw-${d.id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#F3F9FD" /><stop offset=".75" stopColor="#F3F9FD" /><stop offset="1" stopColor="#F3F9FD" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 0 H300 C360 70 300 170 360 250 C400 310 470 350 520 400 H0 Z" fill={`url(#ctaw-${d.id})`} />
        <path d="M300 0 C360 70 300 170 360 250 C400 310 470 350 520 400" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" />
        <path d="M330 0 C400 80 340 180 400 260 C440 315 495 355 520 380" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="18" />
      </svg>
      <span className="x-cta-blob" aria-hidden="true" />
      <div className="x-cta-tx">
        <p className="heading wp-h2">Plan your<br /><em>{d.ctaName || d.tab}</em> trip</p>
        <p>Tell us your travel month and we'll share hotels, dates and the full costing today.</p>
        <div className="x-cta-acts">
          <button type="button" className="x-cta-main" onClick={() => jump(`form-${d.id}`)}>Get the full plan <Icon k="arrow" /></button>
          <button type="button" className="x-cta-wa" onClick={openWhatsApp}><Icon k="wa" />WhatsApp us</button>
        </div>
      </div>
    </div>
  </div></div>
);

// ---------- page ----------
const WinterPackagePage: React.FC = () => {
  const { slug } = useParams();
  const d = WINTER_PACKAGES.find(p => p.id === slug);
  if (!d) return <Navigate to={servicePath(WINTER_PACKAGES[0].id)} replace />;

  return (
    <div className="wp">
      {/* key resets form + day planner state when switching packages */}
      <section key={d.id}>
        <Hero d={d} />
        <Route d={d} />
        <Days d={d} />
        <Price d={d} />
        <Faq d={d} />
        <Cta d={d} />
      </section>
    </div>
  );
};

export default WinterPackagePage;
