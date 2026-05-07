import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Check, Calendar, ChevronDown,
  Award, Send, CheckCircle2,
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
      <section className="relative bg-navy-deep text-cream pt-[180px] pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={p.image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,19,31,0.6), rgba(8,19,31,0.95))' }} />
        </div>
        <div className="absolute inset-0 starfield opacity-30" />
        <div className="relative container-x">
          <Link to="/programs" className="link-gold mb-8 inline-flex">← All Programs</Link>
          <p className="eyebrow mb-4">{p.weeks} weeks · {p.levelLabel}</p>
          <h1 className="font-display text-[2.4rem] md:text-[4rem] leading-[1.05] max-w-4xl">{p.title}</h1>
          <p className="font-editorial italic text-gold text-[1.3rem] md:text-[1.6rem] mt-5">{p.tagline}</p>
          <p className="font-editorial text-cream/80 text-[1.2rem] leading-relaxed mt-6 max-w-3xl">{p.long}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/apply" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/schedule" className="btn-outline-gold">Schedule a Call</Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: p.fee, l: 'Program Fee' },
              { v: `${p.weeks} weeks`, l: 'Duration' },
              { v: p.audience, l: 'Audience' },
              { v: p.nextCohort, l: 'Next Cohort' },
            ].map((s) => (
              <div key={s.l} className="border-l border-gold/40 pl-4">
                <p className="font-display text-xl text-cream">{s.v}</p>
                <p className="font-caps text-[0.6rem] text-cream/60 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum (week-by-week schedule) — directly under hero */}
      {showCurriculum && (
        <section className="bg-cream py-20 md:py-24">
          <div className="container-x">
            <p className="eyebrow mb-4">{p.curriculumEyebrow || 'Week-by-Week Schedule'}</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6 max-w-3xl">
              {p.curriculumTitle || 'A disciplined sequence, end to end.'}
            </h2>

            <div className="mt-12 grid gap-0 border-t border-navy/15">
              {p.curriculum.map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 py-7 border-b border-navy/15 hover:bg-bone transition-colors px-2">
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em]">Week {row.week}</p>
                  <p className="font-display text-navy text-[1.3rem] leading-tight">{row.topic}</p>
                </div>
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
            <div className="relative bg-navy-deep min-h-[360px] aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden flex items-center justify-center p-8 order-2 lg:order-1">
              {p.certificateImage ? (
                /* Admin-uploaded certificate image — show as-is, no overlay */
                <img
                  src={p.certificateImage}
                  alt={`${p.subtitle || p.title} certificate`}
                  className="absolute inset-0 w-full h-full object-contain bg-navy-deep"
                />
              ) : (
                /* Default decorative placeholder */
                <>
                  <div className="absolute inset-0 starfield opacity-30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full glow-gold" />
                  <div className="relative text-center text-cream">
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
              <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/70 z-10" />
              <span className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/70 z-10" />
              <span className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/70 z-10" />
              <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/70 z-10" />
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
        <section className="bg-bone py-20 md:py-24">
          <div className="container-x">
            <p className="eyebrow mb-4">{p.modulesEyebrow || 'Modules'}</p>
            <span className="gold-rule-lg" />
            <TitleWithAccent
              title={p.modulesTitle || `${modules.length} modules. Each`}
              accent={p.modulesTitleAccent || 'defended in front of peers.'}
              className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6 max-w-3xl"
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((m) => (
                <div key={m.n} className="bg-white p-8 lift-card border border-transparent hover:border-gold/40">
                  <div className="flex items-center gap-4 mb-4">
                    <p className="font-display text-gold text-[2.4rem] leading-none">{m.n}</p>
                    <div className="w-12 h-px bg-gold/40" />
                  </div>
                  <h3 className="font-display text-navy text-[1.45rem] leading-tight">{m.title}</h3>
                  <p className="font-editorial text-navy/75 leading-relaxed mt-4">{m.description}</p>
                  {m.topics && m.topics.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {m.topics.map((t) => (
                        <li key={t} className="flex gap-2 items-start font-sans text-navy/80 text-sm">
                          <span className="text-gold mt-[7px] w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {showExperience && (
        <section className="bg-navy-deep text-cream py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full glow-gold pointer-events-none" />
          <div className="relative container-x">
            <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold">{p.experienceEyebrow || 'The Epsilon Experience'}</p>
            <span className="block w-12 h-px bg-gold/60 mt-3" />
            <TitleWithAccent
              title={p.experienceTitle || 'Explore the'}
              accent={p.experienceTitleAccent || 'experience.'}
              className="font-display uppercase text-cream text-[2rem] md:text-[2.6rem] leading-[1.08] mt-6 max-w-3xl"
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/15">
              {experienceItems.map((it, i) => (
                <div key={i} className="bg-navy-deep p-8 hover:bg-navy transition-colors">
                  <p className="font-display text-gold text-[1.6rem] leading-none">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-cream text-[1.3rem] leading-tight mt-4">{it.title}</h3>
                  <p className="font-editorial text-cream/80 text-[1rem] leading-relaxed mt-4">{it.body}</p>
                </div>
              ))}
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
