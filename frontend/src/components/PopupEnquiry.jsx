import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../admin/api';
import { useSiteContent } from '../context/SiteContent';

const STORAGE_KEY = 'epsilonPopupShown';
const DELAY_MS = 15000;

export default function PopupEnquiry() {
  const ctx = useSiteContent();
  const programs = ctx?.programs || [];
  const popup = ctx?.home?.popup || {};
  const enabled = popup.enabled !== false; // default ON

  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '' });
  const timerRef = useRef(null);

  // Set default course
  useEffect(() => {
    if (!form.course) {
      setForm((f) => ({ ...f, course: 'Professional Certificate in Applied AI & Machine Learning' }));
    }
  }, [form.course]);

  // Schedule the popup after DELAY_MS; only once per session
  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch { /* sessionStorage may be unavailable */ }

    // Skip on admin / login routes
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return;

    timerRef.current = setTimeout(() => setOpen(true), DELAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [enabled]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
  };

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await api.submitPopup({
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: form.course,
        source: 'popup',
      });
      setSent(true);
      try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    } catch (ex) {
      setErr('Could not submit. Please try again or use the Apply page.');
    } finally {
      setBusy(false);
    }
  };

  if (!enabled || !open) return null;

  return (
    <div
      data-testid="popup-enquiry-overlay"
      className="fixed inset-0 z-[100001] overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a callback"
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-deep/75 backdrop-blur-sm animate-[fadeIn_0.4s_ease]"
        onClick={close}
      />

      {/* Scrollable container — keeps modal centered on desktop, top-aligned on mobile */}
      <div className="relative min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6 py-16 sm:py-10">
        {/* Modal */}
        <div
          className="relative w-full max-w-[920px] bg-cream shadow-[0_30px_80px_rgba(0,0,0,0.5)] grid grid-cols-1 md:grid-cols-[1.05fr_1.2fr] overflow-hidden animate-[popIn_0.45s_cubic-bezier(0.16,1,0.3,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close — always visible, bigger touch target, sits above content */}
          <button
            type="button"
            onClick={close}
            data-testid="popup-enquiry-close"
            aria-label="Close"
            className="absolute top-2.5 right-2.5 z-30 w-10 h-10 inline-flex items-center justify-center bg-cream text-navy-deep border-2 border-gold shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:bg-gold hover:text-navy-deep transition-colors duration-200 rounded-full"
          >
            <X size={18} strokeWidth={2.4} />
          </button>

          {/* LEFT — editorial promo panel */}
          <div className="relative bg-navy-deep text-cream p-7 md:p-10 overflow-hidden">
            <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full glow-gold pointer-events-none" />
            <div className="relative">
              <p className="font-editorial italic text-cream/45 text-[0.9rem] tracking-widest mb-3">— Limited Seats —</p>
              <p className="eyebrow text-gold mb-2" data-cms-path="popup.eyebrow">{popup.eyebrow || 'Talk to Admissions'}</p>
              <span className="block w-12 h-px bg-gold mt-1 mb-5" />
              <h3 className="font-display text-cream text-[1.5rem] sm:text-[1.7rem] md:text-[2.1rem] lg:text-[2.4rem] leading-[1.06]" data-cms-path="popup.title">
                {popup.title || 'Get a personal call back within one working day.'}
              </h3>
              <p className="font-editorial text-cream/80 text-[1rem] sm:text-[1.05rem] leading-relaxed mt-5" data-cms-path="popup.subtitle">
                {popup.subtitle || 'Share your details and our admissions lead will reach out to discuss fit, schedule, and the right cohort for you.'}
              </p>

              <ul className="mt-6 sm:mt-7 space-y-3">
                {(popup.bullets || [
                  'No bots. A real admissions lead.',
                  'Curriculum & fee walk-through.',
                  'Cohort timing that fits your work.',
                ]).map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-gold mt-1 flex-shrink-0" />
                    <span className="font-editorial text-cream/90 text-[0.95rem] sm:text-[1rem]" data-cms-path={`popup.bullets.${i}`}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="p-6 sm:p-7 md:p-10 bg-cream relative">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center min-h-[320px] py-10">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-5">
                  <CheckCircle2 size={32} className="text-gold" />
                </div>
                <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-2">Request Received</p>
                <h4 className="font-display text-navy text-[1.6rem] md:text-[1.9rem] leading-tight max-w-sm">
                  {popup.successTitle || 'Thank you. We will be in touch.'}
                </h4>
                <p className="font-editorial text-navy/75 text-base leading-relaxed mt-3 max-w-sm">
                  {popup.successSubtitle || 'An admissions lead will reach out within one working day.'}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="btn-outline-gold mt-7"
                  data-testid="popup-enquiry-done"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-1.5">Schedule Call Back</p>
                  <h4 className="font-display text-navy text-[1.4rem] md:text-[1.6rem] leading-tight">
                    Tell us where to reach you.
                  </h4>
                </div>

                <div>
                  <label className="fld-label">Full Name</label>
                  <input
                    required
                    className="fld-input"
                    value={form.name}
                    onChange={onChange('name')}
                    data-testid="popup-input-name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="fld-label">Email</label>
                  <input
                    required
                    type="email"
                    className="fld-input"
                    value={form.email}
                    onChange={onChange('email')}
                    data-testid="popup-input-email"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="fld-label">Phone Number</label>
                  <input
                    required
                    type="tel"
                    className="fld-input"
                    value={form.phone}
                    onChange={onChange('phone')}
                    data-testid="popup-input-phone"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label className="fld-label">Course of Interest</label>
                  <select
                    className="fld-input"
                    value={form.course}
                    onChange={onChange('course')}
                    data-testid="popup-input-course"
                  >
                    <option value="Professional Certificate in Applied AI & Machine Learning">Professional Certificate in Applied AI & Machine Learning</option>
                    <option value="Advanced Program in Strategic Leadership">Advanced Program in Strategic Leadership</option>
                    <option value="Finance for Non-Finance Executives">Finance for Non-Finance Executives</option>
                    <option value="Program in Digital Transformation">Program in Digital Transformation</option>
                    <option value="Not sure yet">Not sure yet — help me choose</option>
                  </select>
                </div>

                {err && <p className="text-sm text-red-700">{err}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  data-testid="popup-submit-btn"
                  className="btn-gold w-full justify-center py-3.5 mt-2 font-caps tracking-[0.18em] text-[0.78rem]"
                >
                  {busy ? 'Submitting…' : (popup.ctaText || 'Schedule Call Back')} <ArrowRight size={15} />
                </button>

                <p className="font-editorial italic text-navy/55 text-xs text-center mt-2">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
