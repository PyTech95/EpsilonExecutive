import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';
import { api } from '../admin/api';

const EXPERIENCE = ['0–2 years', '3–5 years', '6–10 years', '11–15 years', '16+ years'];

const GOALS = [
  'Advance in current role',
  'Change careers',
  'Build a specific skill',
  'Earn a recognised credential',
  'Other',
];

const FUNCTIONS = [
  'Management / leadership',
  'Finance / accounting',
  'Marketing / sales',
  'Operations',
  'Product / project management',
  'Technology / data',
  'HR / people',
  'Education / non-profit / public sector',
  'Entrepreneur / founder',
  'Other',
];

// A small, curated list of country dial codes — most relevant for our cohort base.
const COUNTRY_CODES = [
  { code: '+91', label: 'India (+91)' },
  { code: '+1', label: 'USA / Canada (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+81', label: 'Japan (+81)' },
  { code: '+86', label: 'China (+86)' },
];

function Radios({ label, name, value, onChange, options, columns = 2 }) {
  return (
    <fieldset>
      <legend className="fld-label">{label}</legend>
      <div
        className={`mt-3 grid grid-cols-1 ${columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-2.5`}
      >
        {options.map((opt) => {
          const active = value === opt;
          return (
            <label
              key={opt}
              data-testid={`apply-${name}-${opt.replace(/\s+/g, '-').toLowerCase()}`}
              className={`relative flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                active
                  ? 'border-gold bg-gold/10 text-navy'
                  : 'border-navy/15 bg-white hover:border-gold/60 text-navy/80'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={active}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <span
                className={`w-3 h-3 rounded-full border ${active ? 'border-gold bg-gold' : 'border-navy/30'}`}
              />
              <span className="font-sans text-[0.92rem] leading-tight">{opt}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function Apply() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  const heroImage = ctx?.home?.hero?.heroImage || '/generated/hero-indian-online-learner.png';

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    programme: programs[0]?.title || '',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    country: 'India',
    state: '',
    experience: '',
    educationalGoal: '',
    currentFunction: '',
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      phone: `${form.countryCode} ${form.mobile}`.trim(),
    };
    try { await api.submitApply(payload); } catch {}
    try { localStorage.setItem('epsilon_application_' + Date.now(), JSON.stringify(payload)); } catch {}
    setSubmitting(false);
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Page hero band */}
      <section className="relative bg-navy-deep text-cream pt-[170px] md:pt-[190px] pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />
        <div className="container-x relative">
          <p className="eyebrow mb-5">Apply</p>
          <span className="gold-rule-lg" />
          <h1 className="font-display uppercase text-[2.4rem] md:text-[4rem] leading-[1.04] mt-7 max-w-4xl">
            Begin your<br />
            <span className="font-editorial italic normal-case text-gold">conversation with Epsilon.</span>
          </h1>
          <p className="font-editorial text-cream/80 text-[1.1rem] md:text-[1.25rem] leading-relaxed mt-8 max-w-2xl">
            Applications are reviewed personally by our admissions team. Tell us about you and what you want to learn — we will reach out to discuss fit, expectations, and next steps.
          </p>
        </div>
      </section>

      {/* Two-column: imagery left, form right */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-x">
          {sent ? (
            <div className="bg-white border border-navy/10 p-12 md:p-16 text-center max-w-2xl mx-auto">
              <CheckCircle2 size={56} className="text-gold mx-auto mb-5" />
              <h3 className="font-display text-navy text-[1.8rem] md:text-[2.4rem]">Application received.</h3>
              <p className="font-editorial text-navy/75 text-lg mt-4 max-w-md mx-auto">
                Thank you. A member of our admissions team will reach out within two working days to schedule a conversation.
              </p>
              <Link to="/" className="link-gold mt-10 inline-flex" data-testid="apply-success-home-link">Return home →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-12 lg:gap-16 items-start">
              {/* Left: imagery + value props (sticky on desktop) */}
              <aside className="lg:sticky lg:top-32">
                <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
                  <img
                    src={heroImage}
                    alt="Working professional studying with Epsilon"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-transparent" />
                  <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/70" />
                  <span className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/70" />
                  <span className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/70" />
                  <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/70" />
                  <div className="absolute bottom-6 left-6 right-6 text-cream">
                    <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold">Cohort 04 · Mar 2026</p>
                    <p className="font-display text-[1.4rem] md:text-[1.65rem] leading-tight mt-2 max-w-xs">
                      A personal conversation. <span className="italic font-editorial text-gold">Not a funnel.</span>
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {[
                    '12-week, live online cohort',
                    'Roughly 15–20 hours per week',
                    'Practitioner-led, capstone-anchored',
                    'Personal call before admission',
                  ].map((b) => (
                    <li key={b} className="flex gap-3 font-editorial text-navy/85 text-[1.05rem] leading-snug">
                      <span className="text-gold text-xl leading-none mt-[2px]">◆</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Right: the form */}
              <form onSubmit={onSubmit} data-testid="apply-form" className="space-y-12 bg-white p-7 md:p-10 border border-navy/10">
                {/* Programme */}
                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">Programme</p>
                  <span className="gold-rule" />
                  <label className="fld-label mt-6">Which programme are you applying for?</label>
                  <select
                    data-testid="apply-programme"
                    className="fld-input"
                    value={form.programme}
                    onChange={(e) => set('programme', e.target.value)}
                  >
                    {programs.map((p) => (
                      <option key={p.slug} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                {/* About You */}
                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">About You</p>
                  <span className="gold-rule" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <div>
                      <label className="fld-label">First Name</label>
                      <input
                        data-testid="apply-firstname" required className="fld-input"
                        value={form.firstName} onChange={(e) => set('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="fld-label">Last Name</label>
                      <input
                        data-testid="apply-lastname" required className="fld-input"
                        value={form.lastName} onChange={(e) => set('lastName', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="fld-label">Email Address</label>
                      <input
                        data-testid="apply-email" required type="email" className="fld-input"
                        value={form.email} onChange={(e) => set('email', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="fld-label">Mobile Number</label>
                      <div className="grid grid-cols-[140px_1fr] gap-3">
                        <select
                          data-testid="apply-countrycode"
                          className="fld-input"
                          value={form.countryCode}
                          onChange={(e) => set('countryCode', e.target.value)}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>{c.label}</option>
                          ))}
                        </select>
                        <input
                          data-testid="apply-mobile" required inputMode="tel" className="fld-input"
                          value={form.mobile} onChange={(e) => set('mobile', e.target.value)}
                          placeholder="98XXXXXXXX"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="fld-label">Country</label>
                      <input
                        data-testid="apply-country" required className="fld-input"
                        value={form.country} onChange={(e) => set('country', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="fld-label">State</label>
                      <input
                        data-testid="apply-state" required className="fld-input"
                        value={form.state} onChange={(e) => set('state', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <Radios
                  label="Total Work Experience"
                  name="experience"
                  options={EXPERIENCE}
                  value={form.experience}
                  onChange={(v) => set('experience', v)}
                  columns={3}
                />

                {/* Educational Goal */}
                <Radios
                  label="Educational Goal"
                  name="educationalGoal"
                  options={GOALS}
                  value={form.educationalGoal}
                  onChange={(v) => set('educationalGoal', v)}
                  columns={2}
                />

                {/* Current Function */}
                <div>
                  <label className="fld-label">Current Function</label>
                  <select
                    data-testid="apply-currentfunction"
                    required
                    className="fld-input"
                    value={form.currentFunction}
                    onChange={(e) => set('currentFunction', e.target.value)}
                  >
                    <option value="" disabled>Select your function</option>
                    {FUNCTIONS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="apply-submit-btn"
                    className="btn-navy w-full md:w-auto disabled:opacity-60"
                  >
                    {submitting ? 'Submitting…' : 'Submit Application'} <ArrowRight size={16} />
                  </button>
                  <p className="font-sans text-navy/55 text-xs mt-4">
                    By submitting, you agree to be contacted by our admissions team about programme fit and next steps.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
