import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Check, Calendar, ChevronDown,
  Award, Send, CheckCircle2, Lightbulb, Users, Cog, Gem, 
  FileText, Target, MessageCircle, BookOpen, TrendingUp, 
  Zap, Layout, Laptop, Globe,
} from 'lucide-react';
import { programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';
import { api as adminApi } from '../admin/api';

/* small helper — render a title that may have an italic gold accent tail */
function TitleWithAccent({ title, accent, className }) {
  if (!title && !accent) return null;
  return (
    <h2 className={className}>
      {title}
      {accent && (
        <>
          {title ? ' ' : ''}
          <span className="italic font-editorial text-gold">{accent}</span>
        </>
      )}
    </h2>
  );
}

/* ---------- Module Accordion Component ---------- */
function ModuleAccordion({ module }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-navy/10 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Module Header - Clickable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-gradient-to-r from-navy-deep to-navy p-6 md:p-10 text-left hover:from-navy hover:to-navy-deep transition-all duration-300"
      >
        <div className="flex items-start gap-4 md:gap-6">
          <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-gold/40">
            <module.Icon size={36} className="text-gold" />
          </div>
          <div className="flex-1">
            <p className="font-caps text-[0.6rem] md:text-[0.65rem] tracking-[0.28em] text-gold/90 mb-2">
              Module {module.num} · {module.weeks}
            </p>
            <h3 className="font-display text-cream/60 text-[1.4rem] md:text-[2rem] leading-tight mb-2">
              {module.title}
            </h3>
            <p className="font-editorial text-cream/75 text-[0.95rem] md:text-[1.05rem] leading-relaxed">
              {module.subtitle}
            </p>
          </div>
          <ChevronDown 
            size={24} 
            className={`text-gold flex-shrink-0 mt-2 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expandable Content */}
      {expanded && (
        <div className="p-6 md:p-10 bg-white">
          {/* Learning Objectives */}
          <div className="mb-8">
            <p className="font-caps text-[0.65rem] tracking-[0.25em] text-gold mb-5 flex items-center gap-2">
              <BookOpen size={16} className="text-gold" />
              Key Learning Objectives
            </p>
            <ul className="space-y-3">
              {module.objectives.map((obj, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-sans text-navy/85 text-[0.95rem] md:text-[1rem] leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Week-by-Week Breakdown */}
          <div className="mb-8">
            <p className="font-caps text-[0.65rem] tracking-[0.25em] text-navy/60 mb-5 flex items-center gap-2">
              <Calendar size={16} className="text-navy/60" />
              Week-by-Week Breakdown
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.weekData.map((week) => (
                <div 
                  key={week.week}
                  className="group bg-gradient-to-br from-navy-deep/5 to-cream hover:from-navy-deep hover:to-navy p-5 border border-navy/10 hover:border-gold transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center">
                      <p className="font-display text-gold text-[1rem]">{String(week.week).padStart(2, '0')}</p>
                    </div>
                    <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold">
                      Week {week.week}
                    </p>
                  </div>
                  <p className="font-display text-navy group-hover:text-cream text-[1.05rem] md:text-[1.15rem] leading-tight transition-colors">
                    {week.topic}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone */}
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 border-l-4 border-gold p-6 md:p-8">
            <div className="flex gap-4 items-start">
              <Award size={26} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-caps text-[0.65rem] tracking-[0.25em] text-gold mb-3 flex items-center gap-2">
                  Module {module.num} Milestone
                </p>
                <p className="font-sans text-navy text-[1rem] md:text-[1.1rem] leading-relaxed font-medium">
                  {module.milestone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- inline contact form ---------- */
function ContactForm({ p }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '',
    topic: `Program Fit · ${p.subtitle || p.title}`,
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try { await adminApi.submitContact(form); } catch {}
    setSubmitting(false);
    setSent(true);
  };

  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
        <div>
          <p className="eyebrow">{p.contactEyebrow || 'Contact'}</p>
          <span className="gold-rule-lg" />
          <TitleWithAccent
            title={p.contactTitle || 'Have a question about'}
            accent={p.contactTitleAccent || 'this program?'}
            className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.08] mt-6"
          />
          <p className="font-editorial text-navy/80 text-[1.1rem] leading-relaxed mt-5 max-w-xl">
            {p.contactSubtitle || 'Send a short note and a member of our admissions team will write back personally within two working days.'}
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 border border-navy/10">
          {sent ? (
            <div className="py-8 text-center">
              <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
              <h3 className="font-display text-navy text-[1.7rem]">Message sent.</h3>
              <p className="font-editorial text-navy/75 mt-3">
                We&rsquo;ll write back personally within two working days.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" data-testid="program-contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="fld-label">Full Name</label>
                  <input required className="fld-input" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="fld-label">Email</label>
                  <input required type="email" className="fld-input" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="fld-label">Phone (optional)</label>
                <input className="fld-input" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="fld-label">Message</label>
                <textarea required rows={4} className="fld-input" value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" disabled={submitting} className="btn-gold w-full md:w-auto">
                {submitting ? 'Sending…' : 'Send Message'} <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  const p = programs.find((x) => x.slug === slug);
  const [openFaq, setOpenFaq] = useState(0);

  if (!p) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-editorial text-2xl text-navy">Program not found.</p>
          <Link to="/programs" className="link-gold mt-6 inline-flex">Back to programs <ArrowUpRight size={13} /></Link>
        </div>
      </div>
    );
  }

  const modules = p.modules || [];
  const faqs = p.faqs || [];
  const experienceItems = p.experienceItems || [];
  const certificateBullets = p.certificateBullets || [];
  const showOutcomes = p.showOutcomes !== false && (p.outcomes || []).length > 0;
  const showModules = p.showModules !== false && modules.length > 0;
  const showCurriculum = p.showCurriculum !== false && (p.curriculum || []).length > 0;
  const showFaq = p.showFaq !== false && faqs.length > 0;
  const showCertificate = p.certificateEnabled !== false &&
    (p.certificateDescription || certificateBullets.length > 0);
  const showExperience = p.experienceEnabled !== false && experienceItems.length > 0;
  const showContact = p.contactEnabled !== false;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-deep text-cream pt-[130px] sm:pt-[150px] md:pt-[180px] pb-10 md:pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={p.image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,19,31,0.6), rgba(8,19,31,0.95))' }} />
        </div>
        <div className="absolute inset-0 starfield opacity-30" />
        <div className="relative container-x">
          <Link to="/programs" className="link-gold mb-6 md:mb-8 inline-flex">← All Programs</Link>
          <p className="eyebrow mb-3 md:mb-4">{p.weeks} weeks · {p.levelLabel}</p>
          <h1 className="font-display text-[1.9rem] sm:text-[2.4rem] md:text-[4rem] leading-[1.05] max-w-4xl">{p.title}</h1>
          <p className="font-editorial italic text-gold text-[1.1rem] sm:text-[1.3rem] md:text-[1.6rem] mt-4 md:mt-5">{p.tagline}</p>
          <p className="font-editorial text-cream/80 text-[1.02rem] md:text-[1.2rem] leading-relaxed mt-5 md:mt-6 max-w-3xl">{p.long}</p>

          <div className="mt-7 md:mt-10 flex flex-wrap gap-3 md:gap-4">
            <Link to="/apply" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/schedule" className="btn-outline-gold">Schedule a Call</Link>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {[
              { v: p.fee, l: 'Program Fee' },
              { v: `${p.weeks} weeks`, l: 'Duration' },
              { v: p.audience, l: 'Audience' },
              { v: p.nextCohort, l: 'Next Cohort' },
            ].map((s) => (
              <div key={s.l} className="border-l border-gold/40 pl-3 md:pl-4">
                <p className="font-display text-[1rem] sm:text-lg md:text-xl text-cream leading-snug">{s.v}</p>
                <p className="font-caps text-[0.55rem] sm:text-[0.6rem] text-cream/60 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Modules (accordion-style with full brochure content) */}
      {showCurriculum && (
        <section className="bg-cream py-20 md:py-28" id="programme-modules">
          <div className="container-x">
            <p className="eyebrow mb-4">{p.curriculumEyebrow || 'Programme Modules'}</p>
            <span className="gold-rule-lg" />
            <TitleWithAccent
              title={p.curriculumTitle || '12-Week'}
              accent={p.curriculumTitleAccent || 'Learning Journey'}
              className="font-display text-navy text-[2.4rem] md:text-[3.4rem] leading-[1.02] mt-6 max-w-4xl"
            />
            <p className="font-editorial text-navy/75 text-[1.1rem] leading-relaxed mt-6 max-w-2xl">
              {p.curriculumDescription || 'Four comprehensive modules designed to transform technical knowledge into strategic business value.'}
            </p>

            <div className="mt-16 space-y-6">
              {[
                {
                  num: 1,
                  title: 'The Analytical Engine',
                  subtitle: 'Data, Prediction & Causality',
                  weeks: 'Weeks 1-4',
                  Icon: Lightbulb,
                  objectives: [
                    'Build a practical foundation in data science, statistical coding, and data manipulation',
                    'Understand how machine learning models learn and how to interpret their outputs',
                    'Move beyond correlation and think more clearly about causality, testing, and business impact'
                  ],
                  weekData: p.curriculum.filter(w => w.week >= 1 && w.week <= 4),
                  milestone: 'Produce a Model Interpretation Memo based on a real dataset and a business-facing recommendation.'
                },
                {
                  num: 2,
                  title: 'The AI Practitioner',
                  subtitle: 'Prompting, Context and Economics',
                  weeks: 'Weeks 5-6',
                  Icon: Target,
                  objectives: [
                    'Learn how prompts, retrieved information, tool use, and system instructions shape AI output',
                    'Understand how to choose models based on cost, speed, accuracy, and business need',
                    'Build evaluation criteria and simple test sets to assess output quality'
                  ],
                  weekData: p.curriculum.filter(w => w.week >= 5 && w.week <= 6),
                  milestone: 'Produce an AI System Specification covering model choice, context strategy, evaluation, and governance.'
                },
                {
                  num: 3,
                  title: 'Advanced AI Operations',
                  subtitle: 'Workflow Design, Supervision and Deployment',
                  weeks: 'Weeks 7-10',
                  Icon: Cog,
                  objectives: [
                    'Map how information moves across systems and workflows',
                    'Learn how custom agents are structured and how they use tools and knowledge',
                    'Use AI as a co-developer to build practical business applications and automations',
                    'Think through deployment, handoff, monitoring, and performance in real operating environments'
                  ],
                  weekData: p.curriculum.filter(w => w.week >= 7 && w.week <= 10),
                  milestone: 'Build and deploy a functional AI workflow prototype with complete operating documentation.'
                },
                {
                  num: 4,
                  title: 'The Strategic Voice',
                  subtitle: 'Leadership, Authority and Defence',
                  weeks: 'Weeks 11-12',
                  Icon: TrendingUp,
                  objectives: [
                    'Learn how to explain technical work clearly in business language',
                    'Strengthen your ability to defend assumptions, methods, and recommendations',
                    'Build a professional proof pack from the work completed across the programme'
                  ],
                  weekData: p.curriculum.filter(w => w.week >= 11 && w.week <= 12),
                  milestone: 'Complete the Executive Decision Dossier and present it in a live capstone review.'
                }
              ].map((module) => (
                <ModuleAccordion key={module.num} module={module} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificate */}
      {showCertificate && (
        <section className="bg-bone py-20 md:py-24">
          <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
            {/* Visual */}
            <div className="relative bg-bone min-h-[360px] aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden flex items-center justify-center order-2 lg:order-1 border border-navy/10">
              {p.certificateImage ? (
                /* Admin-uploaded certificate image — show as-is, no overlay */
                <img
                  src={p.certificateImage}
                  alt={`${p.subtitle || p.title} certificate`}
                  className="absolute inset-0 w-full h-full object-contain bg-bone"
                />
              ) : (
                /* Default decorative placeholder */
                <>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full" style={{background: 'radial-gradient(circle, rgba(201,162,39,0.18) 0%, transparent 70%)'}} />
                  <div className="relative text-center text-navy">
                    <Award size={72} className="text-gold mx-auto mb-5" />
                    <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold mb-2">Certificate</p>
                    <p className="font-display text-[1.6rem] md:text-[2rem] leading-tight max-w-xs mx-auto">
                      Professional Certificate
                    </p>
                    <p className="font-editorial italic text-gold text-[1rem] md:text-[1.1rem] mt-2">
                      {p.subtitle}
                    </p>
                  </div>
                </>
              )}
              <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/70 z-10" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/70 z-10" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/70 z-10" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/70 z-10" />
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <p className="eyebrow mb-3">{p.certificateEyebrow || 'Certificate'}</p>
              <span className="gold-rule-lg" />
              <TitleWithAccent
                title={p.certificateTitle || 'A credible artefact of'}
                accent={p.certificateTitleAccent || 'applied capability.'}
                className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.06] mt-6"
              />
              {p.certificateDescription && (
                <p className="font-editorial text-navy/85 text-[1.1rem] leading-[1.75] mt-6">
                  {p.certificateDescription}
                </p>
              )}
              {certificateBullets.length > 0 && (
                <ul className="mt-7 space-y-4">
                  {certificateBullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                      <span className="font-editorial text-navy/85 text-[1.05rem] leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {p.certificateNote && (
                <p className="font-sans text-navy/65 text-[0.92rem] leading-relaxed mt-7 border-l-2 border-gold/50 pl-4">
                  {p.certificateNote}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      {showOutcomes && (
        <section className="bg-cream py-20 md:py-24">
          <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-14">
            <div>
              <p className="eyebrow mb-4">{p.outcomesEyebrow || 'What you leave with'}</p>
              <span className="gold-rule-lg" />
              <TitleWithAccent
                title={p.outcomesTitle || 'Outcomes worth'}
                accent={p.outcomesTitleAccent || 'defending.'}
                className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6"
              />
            </div>
            <ul className="space-y-5">
              {(p.outcomes || []).map((o, i) => (
                <li key={i} className="flex gap-4 items-start border-b border-navy/10 pb-5">
                  <Check size={20} className="text-gold mt-1 flex-shrink-0" />
                  <p className="font-editorial text-navy text-[1.2rem] leading-relaxed">{o}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Modules — detailed cards (hidden by default for AI/ML; toggleable per program) */}
      {showModules && (
        <section className="bg-cream py-20 md:py-28" id="modules">
          <div className="container-x">
            <p className="eyebrow mb-4">{p.modulesEyebrow || 'Programme Modules'}</p>
            <span className="gold-rule-lg" />
            <TitleWithAccent
              title={p.modulesTitle || `12-Week`}
              accent={p.modulesTitleAccent || 'Roadmap'}
              className="font-display text-navy text-[2rem] md:text-[3.2rem] leading-[1.05] mt-6 max-w-3xl"
            />
            <p className="font-editorial text-navy/75 text-[1.1rem] leading-relaxed mt-5 max-w-2xl">
              {p.modulesDescription || 'A structured journey from data foundations to strategic AI leadership.'}
            </p>

            <div className="mt-16 space-y-12">
              {modules.map((m, idx) => (
                <div key={m.n} 
                  className="bg-white border border-navy/10 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Module Header */}
                  <div className="bg-gradient-to-r from-navy-deep to-navy p-8 md:p-10">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                        {idx === 0 && <Lightbulb size={32} className="text-gold" />}
                        {idx === 1 && <Target size={32} className="text-gold" />}
                        {idx === 2 && <Cog size={32} className="text-gold" />}
                        {idx === 3 && <TrendingUp size={32} className="text-gold" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-caps text-[0.65rem] tracking-[0.25em] text-gold/90">
                          Module {m.n} · {m.weeks || `Weeks ${idx * 3 + 1}-${idx * 3 + 4}`}
                        </p>
                        <h3 className="font-display text-cream text-[1.6rem] md:text-[2rem] leading-tight mt-3">
                          {m.title}
                        </h3>
                        {m.description && (
                          <p className="font-editorial text-cream/85 text-[1.05rem] leading-relaxed mt-4">
                            {m.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Module Content */}
                  <div className="p-8 md:p-10">
                    {/* Learning Objectives */}
                    {m.topics && m.topics.length > 0 && (
                      <div className="mb-8">
                        <p className="font-caps text-[0.65rem] tracking-[0.22em] text-gold mb-4">
                          Key Learning Objectives
                        </p>
                        <ul className="space-y-3">
                          {m.topics.map((t, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gold" />
                              <span className="font-sans text-navy/85 text-[0.95rem] leading-relaxed">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Week Breakdown */}
                    {m.weekBreakdown && m.weekBreakdown.length > 0 && (
                      <div className="mb-8">
                        <p className="font-caps text-[0.65rem] tracking-[0.22em] text-navy/60 mb-4">
                          Week-by-Week
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {m.weekBreakdown.map((week, i) => (
                            <div 
                              key={i} 
                              className="group bg-navy-deep/5 hover:bg-navy-deep hover:text-cream transition-all duration-300 p-4 border border-navy/10 hover:border-gold/50"
                            >
                              <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold mb-2">
                                Week {week.weekNumber || i + 1}
                              </p>
                              <p className="font-sans text-[0.9rem] font-medium text-navy group-hover:text-cream transition-colors">
                                {week.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Milestone */}
                    {m.milestone && (
                      <div className="bg-gold/10 border-l-4 border-gold p-6">
                        <div className="flex gap-3 items-start">
                          <Award size={20} className="text-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-caps text-[0.65rem] tracking-[0.22em] text-gold mb-2">
                              Milestone
                            </p>
                            <p className="font-sans text-navy text-[0.95rem] leading-relaxed">
                              {m.milestone}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {showExperience && (
        <section className="bg-navy-deep text-cream py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full glow-gold pointer-events-none" />
          <div className="relative container-x">
            <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold">{p.experienceEyebrow || 'The Epsilon Experience'}</p>
            <span className="block w-12 h-px bg-gold/60 mt-3" />
            <TitleWithAccent
              title={p.experienceTitle || 'What this'}
              accent={p.experienceTitleAccent || 'experience builds'}
              className="font-display text-cream text-[2rem] md:text-[3rem] leading-[1.08] mt-6 max-w-3xl"
            />
            <p className="font-editorial text-cream/75 text-[1.05rem] leading-relaxed mt-5 max-w-2xl">
              {p.experienceDescription || 'A holistic learning journey that goes beyond theory to build real professional capability.'}
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experienceItems.map((it, i) => {
                // Icon mapping based on common experience titles
                let Icon = Laptop;
                const titleLower = it.title?.toLowerCase() || '';
                if (titleLower.includes('live') || titleLower.includes('learning')) Icon = Laptop;
                else if (titleLower.includes('peer') || titleLower.includes('environment')) Icon = Users;
                else if (titleLower.includes('applied') || titleLower.includes('skill')) Icon = Cog;
                else if (titleLower.includes('capstone') || titleLower.includes('project')) Icon = Gem;
                else if (titleLower.includes('output') || titleLower.includes('deliverable')) Icon = FileText;
                else if (titleLower.includes('feedback') || titleLower.includes('expert')) Icon = MessageCircle;
                else if (titleLower.includes('judge') || titleLower.includes('growth')) Icon = TrendingUp;
                else if (i % 7 === 0) Icon = Laptop;
                else if (i % 7 === 1) Icon = Users;
                else if (i % 7 === 2) Icon = Cog;
                else if (i % 7 === 3) Icon = Gem;
                else if (i % 7 === 4) Icon = FileText;
                else if (i % 7 === 5) Icon = MessageCircle;
                else Icon = TrendingUp;

                return (
                  <div 
                    key={i} 
                    className="group bg-navy border border-gold/15 p-8 hover:border-gold/40 hover:bg-navy/80 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-20 h-20 rounded-full bg-gold/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Icon size={48} className="text-gold" />
                      </div>
                      <p className="font-display text-gold/50 text-[2.2rem] leading-none group-hover:text-gold/70 transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                    </div>
                    <h3 className="font-display text-cream text-[1.25rem] leading-tight">{it.title}</h3>
                    <p className="font-editorial text-cream/75 text-[0.95rem] leading-relaxed mt-4">{it.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {showFaq && (
        <section className="bg-bone py-20 md:py-24">
          <div className="container-x max-w-4xl">
            <p className="eyebrow mb-4">{p.faqEyebrow || 'FAQ'}</p>
            <span className="gold-rule-lg" />
            <TitleWithAccent
              title={p.faqTitle || 'Questions,'}
              accent={p.faqTitleAccent || 'answered.'}
              className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6"
            />

            <div className="mt-12 border-t border-navy/15">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className="border-b border-navy/15">
                    <button
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      className="w-full text-left flex items-start justify-between gap-6 py-6 group"
                      aria-expanded={open}
                    >
                      <span className="font-display text-navy text-[1.2rem] md:text-[1.35rem] leading-snug group-hover:text-gold transition-colors">
                        {f.q}
                      </span>
                      <ChevronDown
                        size={22}
                        className={`text-gold flex-shrink-0 mt-1 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100 pb-7' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-editorial text-navy/80 text-[1.1rem] leading-relaxed pr-12">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact form */}
      {showContact && <ContactForm p={p} />}

      {/* CTA */}
      <section className="bg-navy-deep text-cream py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="container-x relative text-center">
          <Calendar size={26} className="text-gold mx-auto mb-4" />
          <h2 className="font-display text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto">
            {p.ctaTitle || 'Next cohort:'}{' '}
            <span className="italic font-editorial text-gold">{p.ctaTitleAccent || p.nextCohort}</span>
          </h2>
          <p className="font-editorial text-cream/80 text-lg mt-5 max-w-xl mx-auto">
            {p.ctaSubtitle || 'Applications are reviewed personally. Start a conversation with admissions.'}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-gold">{p.ctaPrimaryText || 'Apply Now'} <ArrowRight size={16} /></Link>
            <Link to="/schedule" className="btn-outline-gold">{p.ctaSecondaryText || 'Schedule a Call'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
