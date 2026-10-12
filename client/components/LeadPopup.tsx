import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, User, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { popupLeads } from '../lib/apiClient';
import { WINTER_PACKAGES } from '../data/winterPackages';

// Lead-capture popup for the home page and the winter package (/services/:slug) pages.
// Entries are stored in the popup_leads table and shown under "Popup Leads" in the dashboard.

const OPEN_DELAY_MS = 8000;
// localStorage: token of the lead this browser submitted. While that lead exists on the
// server the popup stays hidden; once an admin deletes it, the popup shows again.
const LEAD_TOKEN_KEY = 'leadPopupToken';

const getToken = () => {
  try { return localStorage.getItem(LEAD_TOKEN_KEY); } catch { return null; }
};
const setToken = (token: string | null) => {
  try {
    if (token) localStorage.setItem(LEAD_TOKEN_KEY, token);
    else localStorage.removeItem(LEAD_TOKEN_KEY);
  } catch { /* storage blocked */ }
};

// In-memory only: closing hides the popup until the page is refreshed.
let closedThisLoad = false;
// Cached server answer for this page load, so route changes don't re-check.
let leadStillSaved: boolean | null = null;

const shouldShow = async (): Promise<boolean> => {
  if (closedThisLoad) return false;
  const token = getToken();
  if (!token) return true;
  if (leadStillSaved === null) {
    try {
      leadStillSaved = (await popupLeads.status(token)).exists;
    } catch {
      return false; // API unreachable: don't nag a customer who already submitted
    }
    if (!leadStillSaved) setToken(null);
  }
  return !leadStillSaved;
};

const LeadPopup: React.FC = () => {
  const { pathname } = useLocation();
  const pkg = WINTER_PACKAGES.find(p => pathname === `/services/${p.id}`);
  const isEligible = pathname === '/' || !!pkg;

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEligible || open) return;
    let cancelled = false;
    let t: number | undefined;
    shouldShow().then(show => {
      if (show && !cancelled) t = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    });
    return () => { cancelled = true; window.clearTimeout(t); };
  }, [isEligible, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    closedThisLoad = true;
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      const res = await popupLeads.submit({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        source_page: pkg ? `${pkg.tab} package` : 'Home page',
      });
      setStatus('done');
      setToken(res.client_token);
      leadStillSaved = true;
    } catch (err: any) {
      setStatus('idle');
      setError(err?.message || 'Could not send right now. Please try again.');
    }
  };

  if (!open || !isEligible) return null;

  const inputCls = 'w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-[#00A9D7] focus:ring-2 focus:ring-[#00A9D7]/20 transition-all';

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="lead-popup-title">
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      <div className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 p-2 rounded-full text-white/90 hover:bg-white/15 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-[#00A9D7] to-[#0B5C9E] px-6 pt-7 pb-6 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Global Connect World Travel</p>
          <p id="lead-popup-title" className="heading text-2xl font-bold leading-tight mt-2">
            {pkg ? `Plan your ${pkg.ctaName || pkg.tab} trip` : 'Get the best travel deals'}
          </p>
          <p className="text-sm text-white/85 mt-1.5">
            Share your details and our travel expert will call you back.
          </p>
        </div>

        {status === 'done' ? (
          <div className="px-6 py-10 text-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <p className="heading text-xl font-bold text-slate-900 mt-4">Thank you!</p>
            <p className="text-sm text-slate-500 mt-1.5">We have your details and will contact you shortly.</p>
            <button
              type="button"
              onClick={close}
              className="mt-6 px-8 py-3 rounded-full bg-[#00A9D7] text-white font-bold text-sm hover:bg-[#00A9D7]/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-6 space-y-3.5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input className={inputCls} required autoComplete="name" placeholder="Your name" value={form.name} onChange={set('name')} aria-label="Name" />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input className={inputCls} required type="tel" autoComplete="tel" placeholder="Phone number (with country code)" value={form.phone} onChange={set('phone')} aria-label="Phone number" pattern="[0-9+\-\s()]{7,20}" title="Enter a valid phone number" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input className={inputCls} required type="email" autoComplete="email" placeholder="Email (Gmail)" value={form.email} onChange={set('email')} aria-label="Email" />
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00A9D7] to-[#0B5C9E] text-white font-bold text-[15px] shadow-lg shadow-[#0B5C9E]/25 hover:brightness-105 disabled:opacity-60 transition-all"
            >
              {status === 'sending' ? 'Sending…' : <>Get a call back <Send className="w-4 h-4" /></>}
            </button>
            <p className="text-[12px] text-slate-400 text-center">No spam. We only use this to contact you about your trip.</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadPopup;
