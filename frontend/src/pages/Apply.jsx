import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Calendar, Clock, Globe2, Award,
  Target, Compass, Sparkles, Users, BookOpen, Briefcase,
  MessageSquare, Lightbulb, Layers, ChevronDown,
} from 'lucide-react';
import {
  programs as mockPrograms,
  leadFaculty as mockLead,
  guestLecturers as mockGuests,
} from '../mock';
import { useSiteContent } from '../context/SiteContent';
import { api } from '../admin/api';
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '../components/ui/accordion';

const EXPERIENCE = ['0–2 years', '3–5 years', '6–10 years', '11–15 years', '16+ years'];
const GOALS = [
  'Advance in current role', 'Change careers', 'Build a specific skill',
  'Earn a recognised credential', 'Other',
];
const FUNCTIONS = [
  'Management / leadership', 'Finance / accounting', 'Marketing / sales',
  'Operations', 'Product / project management', 'Technology / data',
  'HR / people', 'Education / non-profit / public sector',
  'Entrepreneur / founder', 'Other',
];
const COUNTRY_CODES = [
  { code: '+91', label: 'India (+91)' }, { code: '+1', label: 'USA / Canada (+1)' },
  { code: '+44', label: 'UK (+44)' }, { code: '+61', label: 'Australia (+61)' },
  { code: '+65', label: 'Singapore (+65)' }, { code: '+971', label: 'UAE (+971)' },
  { code: '+966', label: 'Saudi Arabia (+966)' }, { code: '+49', label: 'Germany (+49)' },
  { code: '+33', label: 'France (+33)' }, { code: '+81', label: 'Japan (+81)' },
  { code: '+86', label: 'China (+86)' },
];

const TAKEAWAY_ICONS = [Target, Sparkles, Award, BookOpen, Compass, Lightbulb];
const HIGHLIGHT_ICONS = [Layers, Users, MessageSquare, Briefcase, Target, BookOpen, Award, Compass];

/* ---------- Reusable bits ---------- */

function Radios({ label, name, value, onChange, options, columns = 2 }) {
  return (
    <fieldset>
      <legend className="fld-label">{label}</legend>
      <div className={`mt-3 grid grid-cols-1 ${columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-2.5`}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <label
              key={opt}
              data-testid={`apply-${name}-${opt.replace(/\s+/g, '-').toLowerCase()}`}
              className={`relative flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                active ? 'border-gold bg-gold/10 text-navy' : 'border-navy/15 bg-white hover:border-gold/60 text-navy/80'
              }`}
            >
              <input type="radio" name={name} value={opt} checked={active}
                onChange={(e) => onChange(e.target.value)} className="sr-only" />
              <span className={`w-3 h-3 rounded-full border ${active ? 'border-gold bg-gold' : 'border-navy/30'}`} />
              <span className="font-sans text-[0.92rem] leading-tight">{opt}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ---------- Program info strip ---------- */
function InfoStrip({ program }) {
  const items = [
    { icon: Calendar, label: 'Starting', value: program.nextCohort?.split('·')?.[1]?.trim() || program.nextCohort || '—' },
    { icon: Clock, label: 'Duration', value: `${program.weeks} weeks · ${program.audience || ''}` },
    { icon: Globe2, label: 'Format', value: 'Live online · evening cohort' },
    { icon: Award, label: 'Outcome', value: 'Defended capstone · Certificate' },
  ];
  return (
    <section className="bg-navy text-cream border-y border-gold/20">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-gold/15">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.label} className="flex gap-4 items-start py-6 px-5 first:pl-0 last:pr-0">
              <Icon size={20} className="text-gold mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold/80">{it.label}</p>
                <p className="font-display text-cream text-[1rem] md:text-[1.05rem] leading-tight mt-1.5 truncate">
                  {it.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Deadline strip (gold band) ---------- */
function DeadlineStrip({ program, label }) {
  return (
    <section className="bg-gold text-navy-deep">
      <div className="container-x flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5 sm:py-4">
        <p className="font-caps text-[0.65rem] tracking-[0.28em]">{label || 'Application Deadline'}</p>
        <p className="font-display text-[1rem] md:text-[1.15rem] leading-tight">
          {program.nextCohort || 'Cohort 04 · 15 March 2026'} ·{' '}
          <span className="font-editorial italic">applications reviewed personally</span>
        </p>
        <a href="#apply-form" className="font-caps text-[0.65rem] tracking-[0.28em] underline underline-offset-4 hover:opacity-70">
          Apply Now →
        </a>
      </div>
    </section>
  );
}

/* ---------- Program overview narrative + 2 stat panels ---------- */
function Overview({ program }) {
  return (
    <section className="bg-bone py-12 md:py-28">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14">
        <div>
          <p className="eyebrow mb-4">Program Overview</p>
          <span className="gold-rule" />
          <h2 className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.08] mt-7">
            {program.tagline}
          </h2>
          <p className="font-editorial text-navy/85 text-[1.15rem] md:text-[1.22rem] leading-[1.75] mt-7 max-w-2xl">
            {program.long || program.short}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:mt-16">
          <div className="bg-navy-deep text-cream p-7 lg:p-8">
            <p className="font-display text-gold text-[2.6rem] leading-none">{program.weeks}+</p>
            <p className="font-editorial italic text-cream/85 mt-3 leading-snug">
              Weeks of cohort-based learning, capstone-anchored.
            </p>
          </div>
          <div className="bg-white border border-navy/15 p-7 lg:p-8">
            <p className="font-display text-navy text-[2.6rem] leading-none">15–20<span className="text-[1.4rem] text-navy/60"> hrs/wk</span></p>
            <p className="font-editorial italic text-navy/75 mt-3 leading-snug">
              Executive-friendly time commitment, live evenings + self-paced practice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Key takeaways (outcomes) ---------- */
function KeyTakeaways({ program }) {
  const outcomes = program.outcomes || [];
  if (!outcomes.length) return null;
  return (
    <section className="bg-cream py-12 md:py-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Key Takeaways</p>
          <span className="gold-rule mx-auto" />
          <h2 className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.08] mt-7">
            What you walk away with.
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {outcomes.map((o, i) => {
            const Icon = TAKEAWAY_ICONS[i % TAKEAWAY_ICONS.length];
            return (
              <div key={o} className="bg-white border border-navy/10 p-7 lift-card hover:border-gold/50">
                <div className="w-11 h-11 border border-gold/40 flex items-center justify-center text-gold">
                  <Icon size={20} />
                </div>
                <p className="font-display text-navy text-[1.15rem] leading-snug mt-5">{o}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Who is this designed for ---------- */
function WhoFor({ program }) {
  const audience = [
    `Working professionals with ${program.audience || '5–15 years'} of experience`,
    'Senior individual contributors and team leads stepping into broader scope',
    'Functional leaders who own decisions touching AI, data, or modern operating systems',
    'Founders & operators raising the evidence bar in their organisations',
  ];
  return (
    <section className="bg-bone py-12 md:py-24">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        <div>
          <p className="eyebrow">Who is this designed for?</p>
          <span className="gold-rule" />
          <h2 className="font-display text-navy text-[1.9rem] md:text-[2.4rem] leading-[1.08] mt-6">
            Built for the people who <span className="italic font-editorial text-gold">decide.</span>
          </h2>
        </div>
        <ul className="space-y-4">
          {audience.map((a) => (
            <li key={a} className="flex gap-4 border-b border-navy/10 pb-4 last:border-0 last:pb-0">
              <span className="font-caps text-[0.65rem] tracking-[0.22em] text-gold mt-[5px] flex-shrink-0">◆</span>
              <span className="font-editorial text-navy/85 text-[1.1rem] leading-[1.7]">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Program highlights (modules) ---------- */
function Highlights({ program }) {
  const modules = program.modules || [];
  // Synthesise highlight tiles from modules + extras so we always show 8.
  const highlights = [
    ...modules.map((m, i) => ({
      icon: HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length],
      title: m.title, body: m.description,
    })),
    { icon: Users, title: 'Cohort & peer learning', body: 'Senior peers with shared seriousness — your network for the next decade.' },
    { icon: Award, title: 'Capstone defence', body: 'A defended portfolio artefact — not a participation certificate.' },
    { icon: MessageSquare, title: '1:1 admissions call', body: 'Every applicant speaks with an admissions lead before a seat is offered.' },
    { icon: Briefcase, title: 'Practitioner faculty', body: 'Educators who have built and shipped — not consultants reading slides.' },
  ].slice(0, 8);

  return (
    <section className="bg-navy-deep text-cream py-12 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full glow-gold pointer-events-none" />
      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold">Program Highlights</p>
          <span className="block w-12 h-px bg-gold/60 mx-auto mt-4" />
          <h2 className="font-display uppercase text-cream text-[2rem] md:text-[2.6rem] leading-[1.08] mt-7">
            Eight pillars of the <span className="italic font-editorial normal-case text-gold">Epsilon method.</span>
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.title} className="bg-navy-deep p-7 hover:bg-navy transition-colors">
                <Icon size={22} className="text-gold" />
                <h3 className="font-display text-cream text-[1.1rem] leading-tight mt-5">{h.title}</h3>
                <p className="font-sans text-cream/75 text-[0.92rem] leading-relaxed mt-3">{h.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Faculty teaser ---------- */
function FacultyTeaser({ lead, guests }) {
  return (
    <section className="bg-cream py-12 md:py-24">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="eyebrow">Meet the Faculty</p>
            <span className="gold-rule" />
            <h2 className="font-display text-navy text-[1.9rem] md:text-[2.4rem] leading-tight mt-6 max-w-xl">
              Practitioner-educators who <span className="italic font-editorial text-gold">do the work.</span>
            </h2>
          </div>
          <Link to="/faculty" className="link-gold">All faculty →</Link>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
          {/* Lead */}
          {lead && (
            <Link to="/faculty" className="group block bg-white border border-navy/10 hover:border-gold/60 transition-colors lift-card">
              <div className="aspect-[4/5] overflow-hidden bg-navy-deep">
                <img src={lead.image} alt={lead.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-6">
                <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold">{lead.badge || 'Lead Faculty'}</p>
                <h3 className="font-display text-navy text-[1.4rem] leading-tight mt-2">{lead.name}</h3>
                <p className="font-editorial italic text-navy/75 text-[1rem] leading-snug mt-1">{lead.role}</p>
              </div>
            </Link>
          )}

          {/* Guests */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {guests.slice(0, 4).map((g) => (
              <Link key={g.slug || g._id} to="/faculty" className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-navy/5 border border-navy/10 group-hover:border-gold/60 transition-colors">
                  <img src={g.image} alt={g.name} className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <p className="font-display text-navy text-[1rem] leading-tight mt-4">{g.name}</p>
                <p className="font-caps text-[0.55rem] tracking-[0.22em] text-gold mt-2">{g.expertise}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ accordion ---------- */
function FAQs({ program }) {
  const faqs = program.faqs || [];
  if (!faqs.length) return null;
  return (
    <section className="bg-bone py-12 md:py-28">
      <div className="container-x max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">Frequently Asked</p>
          <span className="gold-rule mx-auto" />
          <h2 className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.08] mt-7">
            Answers before you ask.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 divide-y divide-navy/10 border-y border-navy/10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-0">
              <AccordionTrigger className="font-display text-navy text-[1.05rem] md:text-[1.15rem] leading-tight py-5 hover:no-underline hover:text-gold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="font-editorial text-navy/80 text-[1.05rem] leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ====================== APPLY PAGE ====================== */
export default function Apply() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : [];
  const leadFaculty = ctx?.leadFaculty?.length ? ctx.leadFaculty : [];
  const guestLecturers = ctx?.guestLecturers?.length ? ctx.guestLecturers : [];
  const heroImage = ctx?.home?.siteImages?.applyHero || ctx?.home?.hero?.heroImage || '/generated/hero-indian-online-learner.png';
  const ap = ctx?.home?.apply || {};
  const apHero = ap.hero || {};

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    program: programs[0]?.title || '',
    firstName: '', lastName: '', email: '', countryCode: '+91',
    mobile: '', country: 'India', state: '', experience: '',
    educationalGoal: '', currentFunction: '',
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Currently-selected program drives all the rich sections.
  const selectedProgram = useMemo(
    () => programs.find((p) => p.title === form.program) || programs.find((p) => p.featured) || programs[0],
    [programs, form.program],
  );

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

  if (!selectedProgram) return null;

  return (
    <div>
      {/* ---------- 1. Page hero ---------- */}
      <section className="relative bg-navy-deep text-cream pt-[130px] sm:pt-[150px] md:pt-[190px] pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />
        <div className="container-x relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-10 items-end">
          <div>
            <p className="eyebrow mb-4 md:mb-5">Apply · {selectedProgram.subtitle}</p>
            <span className="gold-rule-lg" />
            <h1 className="font-display uppercase text-[1.9rem] sm:text-[2.4rem] md:text-[4rem] leading-[1.05] mt-6 md:mt-7 max-w-4xl">
              {apHero.titleLine1 || 'Begin your'}<br />
              <span className="font-editorial italic normal-case text-gold">{apHero.titleItalic || 'conversation with Epsilon.'}</span>
            </h1>
            <p className="font-editorial text-cream/80 text-[1.02rem] md:text-[1.25rem] leading-relaxed mt-6 md:mt-8 max-w-2xl">
              {apHero.subtitle || 'Applications are reviewed personally by our admissions team. Tell us about you and what you want to learn — we will reach out to discuss fit, expectations, and next steps.'}
            </p>
          </div>
          <a href="#apply-form" className="hidden lg:inline-flex items-center gap-2 font-caps text-[0.65rem] tracking-[0.28em] text-gold border border-gold/40 px-6 py-4 hover:bg-gold/10 transition-colors self-start mt-2">
            Skip to Application <ChevronDown size={14} />
          </a>
        </div>
      </section>

      {/* ---------- 2. Program info strip ---------- */}
      <InfoStrip program={selectedProgram} />

      {/* ---------- 3. Deadline gold band ---------- */}
      <DeadlineStrip program={selectedProgram} label={ap.deadlineLabel} />

      {/* ---------- 4. Program Overview ---------- */}
      <Overview program={selectedProgram} />

      {/* ---------- 5. Key Takeaways ---------- */}
      <KeyTakeaways program={selectedProgram} />

      {/* ---------- 6. Who is this designed for ---------- */}
      <WhoFor program={selectedProgram} />

      {/* ---------- 7. Program Highlights ---------- */}
      <Highlights program={selectedProgram} />

      {/* ---------- 8. Faculty teaser ---------- */}
      <FacultyTeaser lead={leadFaculty[0]} guests={guestLecturers} />

      {/* ---------- 9. THE FORM (kept as-is) ---------- */}
      <section id="apply-form" className="bg-cream py-10 md:py-24 scroll-mt-32">
        <div className="container-x">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="eyebrow">{ap.formEyebrow || 'Apply'}</p>
            <span className="gold-rule mx-auto" />
            <h2 className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.08] mt-7">
              {ap.formTitle || 'Start your application.'}
            </h2>
            <p className="font-editorial text-navy/75 text-[1.1rem] leading-relaxed mt-4">
              {ap.formSubtitle || 'A short form — about ninety seconds. We read every submission personally.'}
            </p>
          </div>

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
                  <img src={heroImage} alt="Working professional studying with Epsilon" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-transparent" />
                  <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/70" />
                  <span className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/70" />
                  <span className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/70" />
                  <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/70" />
                  <div className="absolute bottom-6 left-6 right-6 text-cream">
                    <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold">{selectedProgram.nextCohort}</p>
                    <p className="font-display text-[1.4rem] md:text-[1.65rem] leading-tight mt-2 max-w-xs">
                      A personal conversation. <span className="italic font-editorial text-gold">Not a funnel.</span>
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {[
                    `${selectedProgram.weeks}-week, live online cohort`,
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
                {/* Program */}
                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">Program</p>
                  <span className="gold-rule" />
                  <label className="fld-label mt-6">Which program are you applying for?</label>
                  <select data-testid="apply-program" className="fld-input"
                    value={form.program} onChange={(e) => set('program', e.target.value)}>
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
                      <input data-testid="apply-firstname" required className="fld-input"
                        value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
                    </div>
                    <div>
                      <label className="fld-label">Last Name</label>
                      <input data-testid="apply-lastname" required className="fld-input"
                        value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="fld-label">Email Address</label>
                      <input data-testid="apply-email" required type="email" className="fld-input"
                        value={form.email} onChange={(e) => set('email', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="fld-label">Mobile Number</label>
                      <div className="grid grid-cols-[140px_1fr] gap-3">
                        <select data-testid="apply-countrycode" className="fld-input"
                          value={form.countryCode} onChange={(e) => set('countryCode', e.target.value)}>
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>{c.label}</option>
                          ))}
                        </select>
                        <input data-testid="apply-mobile" required inputMode="tel" className="fld-input"
                          value={form.mobile} onChange={(e) => set('mobile', e.target.value)}
                          placeholder="98XXXXXXXX" />
                      </div>
                    </div>
                    <div>
                      <label className="fld-label">Country</label>
                      <input data-testid="apply-country" required className="fld-input"
                        value={form.country} onChange={(e) => set('country', e.target.value)} />
                    </div>
                    <div>
                      <label className="fld-label">State</label>
                      <input data-testid="apply-state" required className="fld-input"
                        value={form.state} onChange={(e) => set('state', e.target.value)} />
                    </div>
                  </div>
                </div>

                <Radios label="Total Work Experience" name="experience" options={EXPERIENCE}
                  value={form.experience} onChange={(v) => set('experience', v)} columns={3} />

                <Radios label="Educational Goal" name="educationalGoal" options={GOALS}
                  value={form.educationalGoal} onChange={(v) => set('educationalGoal', v)} columns={2} />

                <div>
                  <label className="fld-label">Current Function</label>
                  <select data-testid="apply-currentfunction" required className="fld-input"
                    value={form.currentFunction} onChange={(e) => set('currentFunction', e.target.value)}>
                    <option value="" disabled>Select your function</option>
                    {FUNCTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={submitting} data-testid="apply-submit-btn"
                    className="btn-navy w-full md:w-auto disabled:opacity-60">
                    {submitting ? 'Submitting…' : 'Submit Application'} <ArrowRight size={16} />
                  </button>
                  <p className="font-sans text-navy/55 text-xs mt-4">
                    By submitting, you agree to be contacted by our admissions team about program fit and next steps.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ---------- 10. FAQ ---------- */}
      <FAQs program={selectedProgram} />

      {/* ---------- 11. Final CTA ---------- */}
      <section className="bg-navy-deep text-cream py-12 md:py-24 relative overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 starfield opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full glow-gold pointer-events-none" />
        <div className="relative container-x text-center">
          <p className="eyebrow">{ap.finalCtaEyebrow || 'Take the next step'}</p>
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto mt-5">
            Build the judgement your <span className="italic font-editorial text-gold normal-case">next decade demands.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#apply-form" className="btn-gold" data-testid="apply-final-cta">
              Apply Now <ArrowRight size={16} />
            </a>
            <Link to="/contact" className="btn-outline-gold">Talk to Admissions</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
