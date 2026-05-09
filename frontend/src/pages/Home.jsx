import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, LogIn, Download, ArrowUpRight, Quote,
  CheckCircle2, Check, FileText, Mail, Phone, MapPin
} from 'lucide-react';
import FacultyShowcase from '../components/FacultyShowcase';
import NetworkBackground from '../components/NetworkBackground';
import SectionHeader, { SectionOrnament } from '../components/SectionHeader';
import { useSiteContent } from '../context/SiteContent';
import { api as adminApi } from '../admin/api';
import { LOGO_URL as MOCK_LOGO } from '../mock';

function HeroStat({ value, label }) {
  return (
    <div className="border-l border-gold/40 pl-4">
      <p className="font-display text-xl md:text-2xl text-cream">{value}</p>
      <p className="font-caps text-[0.6rem] text-cream/60 mt-1">{label}</p>
    </div>
  );
}

/* ---------- PDF Brochure gated download ---------- */
function BrochureDownload({ programs, brochure }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: programs[0]?.title || '' });
  const [sent, setSent] = useState(false);
  const pdfUrl = brochure?.pdfUrl || 'https://customer-assets.emergentagent.com/job_logos-11/artifacts/pjvgovi6_brochure%203e%20sample.pdf';

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await adminApi.submitBrochure(form); } catch {}
    try { localStorage.setItem('epsilon_brochure_'+Date.now(), JSON.stringify(form)); } catch {}
    setSent(true);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Epsilon-Program-Brochure.pdf';
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-bone py-12 md:py-16 relative">
      <div className="container-x">
        <SectionHeader
          chapter="Chapter II"
          eyebrow={brochure?.eyebrow || 'Program Brochure'}
          title="The whole program,"
          accent="on a single PDF."
          subtitle={brochure?.description || '28-page PDF · Program overview, modules, fees, capstone, faculty and admissions.'}
        />
        <div className="mt-8 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        {/* Left: visual */}
          <div className="relative bg-navy-deep overflow-hidden min-h-[380px] flex items-center justify-center p-10">
            <img
              src="https://customer-assets.emergentagent.com/job_logos-11/artifacts/x9cwf42w_ChatGPT%20Image%20May%207%2C%202026%2C%2002_00_19%20PM.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy-deep/55" />
            <div className="absolute inset-0 starfield opacity-25" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full glow-gold" />
            <div className="relative text-center">
              <FileText size={92} className="text-gold mx-auto mb-6" />
              <p className="eyebrow mb-3">{brochure?.eyebrow || 'Program Brochure'}</p>
              <h3 className="font-display text-cream text-[1.8rem] md:text-[2.4rem] leading-[1.1] max-w-sm mx-auto">
                {(brochure?.title || 'Everything you need to decide.').split(' ').slice(0, -1).join(' ')}{' '}
                <span className="italic font-editorial text-gold">{(brochure?.title || 'decide.').split(' ').slice(-1)}</span>
              </h3>
              <p className="font-sans text-cream/75 text-sm mt-5 max-w-xs mx-auto">
                {brochure?.description || '28-page PDF · Program overview, modules, fees, capstone, faculty and admissions.'}
              </p>
            </div>
          </div>

        {/* Right: form */}
        <div className="bg-white p-8 md:p-12 border border-navy/10">
          {sent ? (
            <div className="py-10 text-center">
              <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
              <h3 className="font-display text-navy text-[1.8rem]">Download started.</h3>
              <p className="font-editorial text-navy/75 mt-3 max-w-md mx-auto">
                The brochure should have opened in a new tab. If not, use the button below.
              </p>
              <a
                href={pdfUrl}
                download="Epsilon-Program-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-7 inline-flex"
              >
                <Download size={16} /> Download Brochure
              </a>
              <button
                onClick={() => setSent(false)}
                className="block mx-auto mt-6 link-gold"
              >
                Request again
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <p className="eyebrow mb-2">Download the Brochure</p>
                <h3 className="font-display text-navy text-[1.7rem] md:text-[2.1rem] leading-tight">
                  Tell us who you are.
                </h3>
                <p className="font-editorial text-navy/70 mt-3">
                  Your copy of the program brochure will start downloading immediately.
                </p>
              </div>

              <div>
                <label className="fld-label">Full Name</label>
                <input
                  required className="fld-input" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="fld-label">Phone</label>
                  <input
                    required className="fld-input" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="fld-label">Email</label>
                  <input
                    required type="email" className="fld-input" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="fld-label">Course of Interest</label>
                <select
                  className="fld-input" value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                >
                  {programs.map((p) => (
                    <option key={p.slug} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-gold">
                <Download size={16} /> Download Brochure
              </button>
            </form>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Admissions + Contact inline ---------- */
function AdmissionsContact({ sections, contact }) {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Admissions Question', message: '' });
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await adminApi.submitContact(form); } catch {}
    try { localStorage.setItem('epsilon_contact_home_' + Date.now(), JSON.stringify(form)); } catch {}
    setSent(true);
  };

  return (
    <section className="bg-cream py-12 md:py-16 relative">
      <div className="container-x">
        <SectionHeader
          chapter="Chapter IV"
          eyebrow={sections?.admissionsEyebrow || 'Admissions'}
          title="A personal conversation."
          accent="Not a funnel."
          subtitle={sections?.admissionsSubtitle || 'Every applicant speaks with an admissions lead before a seat is offered. Start with a message — we will write back personally.'}
        />

        <div className="mt-8 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-16">
        {/* Admissions process */}
        <div>
          <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">The Process</p>
          <div className="space-y-6 max-w-md">
            {[
              { n: '01', t: 'Application', b: 'Tell us about your work and what you want to learn.' },
              { n: '02', t: 'Conversation', b: 'A personal call to discuss fit and expectations.' },
              { n: '03', t: 'Decision', b: 'A seat is offered based on fit, not first-come-first-served.' },
              { n: '04', t: 'Onboarding', b: 'Pre-work, cohort introductions, and access to Moodle.' },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 border-b border-navy/10 pb-5 last:border-0 group">
                <p className="font-display text-gold text-[1.8rem] leading-none flex-shrink-0 group-hover:scale-110 transition-transform origin-left">{s.n}</p>
                <div>
                  <h4 className="font-display text-navy text-[1.1rem] leading-tight">{s.t}</h4>
                  <p className="font-editorial text-navy/70 text-base leading-relaxed mt-1">{s.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex gap-3 items-start">
              <Mail size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-navy/85 break-all">{contact?.email || 'admissions@epsilonexec.com'}</span>
            </div>
            <div className="flex gap-3 items-start">
              <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-navy/85">{contact?.phone || '+91 · on request'}</span>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-navy/85">{contact?.address || 'Live online · India'}</span>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white p-8 md:p-12 border border-navy/10">
          {sent ? (
            <div className="py-10 text-center">
              <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
              <h3 className="font-display text-navy text-[1.8rem]">Message sent.</h3>
              <p className="font-editorial text-navy/75 mt-3">We&rsquo;ll write back personally within two working days.</p>
              <button
                onClick={() => { setSent(false); setForm({ name:'', email:'', topic:'Admissions Question', message:'' }); }}
                className="link-gold mt-8 inline-flex"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <p className="eyebrow mb-2">Talk to Admissions</p>
                <h3 className="font-display text-navy text-[1.7rem] md:text-[2.1rem] leading-tight">
                  Start a conversation.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="fld-label">Your Name</label>
                  <input required className="fld-input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
                </div>
                <div>
                  <label className="fld-label">Email</label>
                  <input required type="email" className="fld-input" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
                </div>
              </div>

              <div>
                <label className="fld-label">Topic</label>
                <select className="fld-input" value={form.topic} onChange={(e)=>setForm({...form,topic:e.target.value})}>
                  {['General Inquiry','Admissions Question','Program Fit','Corporate / Cohort Partnerships','Press & Media'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="fld-label">Message</label>
                <textarea required rows={5} className="fld-input" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} />
              </div>

              <button type="submit" className="btn-gold">Send Message <ArrowRight size={16} /></button>
            </form>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOME ---------- */
export default function Home() {
  const ctx = useSiteContent();
  const programs = ctx?.programs || [];
  const testimonials = ctx?.testimonials || [];
  const beliefs = ctx?.beliefs || [];
  const home = ctx?.home;
  const logoUrl = ctx?.logoUrl || MOCK_LOGO;
  const featured = programs.find((p) => p.featured) || programs[0];
  if (!featured) return null;

  const hero = home?.hero || {};
  const brochure = home?.brochure || {};
  const about = home?.about || {};
  const cta = home?.cta || {};
  const sections = home?.sections || {};
  const contact = home?.contact || {};
  const footer = home?.footer || {};
  const heroImage = hero.heroImage || '/generated/hero-indian-online-learner.png';

  return (
    <div>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-navy-deep text-cream lg:min-h-[100vh]">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,19,31,0.55), rgba(14,31,50,0.88), rgba(8,19,31,1))' }} />
        </div>
        <NetworkBackground className="opacity-70" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full glow-gold pointer-events-none" />

        <div className="relative container-x pt-44 sm:pt-36 md:pt-44 pb-10 md:pb-[50px]">
          <p className="eyebrow mb-5 md:mb-7 fade-up">
            <Sparkles size={12} className="inline mr-2 -mt-1 text-gold" /> {hero.eyebrow || 'The AI Era of Executive Education'}
          </p>
          <h1 className="font-display uppercase text-[2.1rem] sm:text-[2.9rem] md:text-[4.3rem] lg:text-[5.1rem] leading-[1.02] tracking-tight max-w-6xl fade-up">
            {hero.titleLine1 || 'Turning technical fluency'}
          </h1>
          <h2 className="font-editorial italic text-gold text-[2.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.05] mt-2 fade-up">
            {hero.titleLine2 || 'into strategic value.'}
          </h2>
          <p className="font-editorial text-[1.25rem] md:text-[1.55rem] leading-relaxed text-cream/85 mt-5 md:mt-9 max-w-2xl fade-up">
            {hero.subtitle || 'Live online cohorts for working professionals who want to translate AI, data, and modern decision systems into evidence-based action — not theatre.'}
          </p>
          <div className="mt-7 md:mt-12 flex flex-wrap items-center gap-4 fade-up">
            <Link to={hero.primaryCtaHref || '/apply'} className="btn-gold">
              {hero.primaryCtaText || 'Apply Now'} <ArrowRight size={16} />
            </Link>
            <a
              href={hero.secondaryCtaHref || 'https://moodle.org/login/index.php'}
              target="_blank" rel="noopener noreferrer" className="btn-outline-gold"
            >
              <LogIn size={16} /> {hero.secondaryCtaText || 'Sign In to Learn'}
            </a>
          </div>
          <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 md:pb-0 fade-up">
            {(hero.stats || []).map((s, i) => <HeroStat key={i} value={s.value} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* 2. PROGRAM SHOWCASE */}
      <section className="bg-cream pt-6 pb-12 md:py-16 relative">
        <div className="container-x">
          <SectionHeader
            chapter="Chapter I"
            eyebrow={sections.flagshipEyebrow || 'Flagship Program'}
            title={featured.subtitle || 'Professional Certificate'}
            accent="designed for the AI era."
            subtitle="Twelve weeks. Evidence-based. Defended before senior peers. An artefact that travels with you."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="relative overflow-hidden min-h-[480px] group">
              <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/85 via-navy-deep/30 to-transparent" />
              {/* Gold corner accents */}
              <span className="absolute top-5 left-5 w-8 h-8 border-t border-l border-gold/70" />
              <span className="absolute top-5 right-5 w-8 h-8 border-t border-r border-gold/70" />
              <span className="absolute bottom-5 left-5 w-8 h-8 border-b border-l border-gold/70" />
              <span className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-gold/70" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-cream">
                <p className="font-caps text-[0.65rem] text-gold mb-2">{featured.weeks} weeks · {featured.levelLabel}</p>
                <p className="font-display text-[1.6rem] md:text-[2rem] leading-tight max-w-md">{featured.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-editorial italic text-gold text-[1.3rem] md:text-[1.5rem]">{featured.tagline}</p>
              <div className="w-16 h-px bg-gold/40 my-5" />
              <h3 className="font-display text-navy text-[1.6rem] md:text-[2rem] leading-[1.15]">{featured.title}</h3>
              <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed mt-6">{featured.long}</p>

              <ul className="mt-8 space-y-3">
                {(featured.outcomes || []).slice(0, 4).map((o) => (
                  <li key={o} className="flex gap-3 items-start">
                    <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                    <span className="font-editorial text-navy/85 text-[1.1rem] leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md border-t border-b border-navy/10 py-6">
                <div><p className="font-caps text-[0.6rem] text-navy/60">Fee</p><p className="font-display text-navy text-lg mt-1">{featured.fee}</p></div>
                <div><p className="font-caps text-[0.6rem] text-navy/60">Duration</p><p className="font-display text-navy text-lg mt-1">{featured.weeks} weeks</p></div>
                <div><p className="font-caps text-[0.6rem] text-navy/60">Next Cohort</p><p className="font-display text-navy text-[0.92rem] mt-1 leading-tight">{featured.nextCohort}</p></div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/apply" className="btn-gold">Enroll Now <ArrowRight size={16} /></Link>
                <Link to={`/programs/${featured.slug}`} className="btn-outline-gold border-navy/30 text-navy hover:text-gold">
                  Full Curriculum <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BROCHURE */}
      <BrochureDownload programs={programs} brochure={brochure} />

      {/* 4. FACULTY */}
      <div className="bg-navy-deep">
        <div className="container-x pt-10 md:pt-20">
          <SectionHeader
            chapter="Chapter III"
            eyebrow="Faculty"
            title="Practitioner-educators who"
            accent="do the work."
            tone="dark"
          />
        </div>
      </div>
      <FacultyShowcase />

      {/* 5. ADMISSIONS + CONTACT */}
      <AdmissionsContact sections={sections} contact={contact} />

      {/* 6. ABOUT */}
      <section className="bg-bone py-12 md:py-16 relative">
        <div className="container-x">
          <SectionHeader
            chapter="Chapter V"
            eyebrow={about.eyebrow || 'About Epsilon'}
            title="A school for the people"
            accent="who decide."
            align="center"
          />

          <div className="mt-8 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-start max-w-5xl mx-auto">
            <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">{about.paragraph1}</p>
            <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">{about.paragraph2}</p>
          </div>
          <div className="text-center mt-10">
            <Link to="/about" className="link-gold inline-flex">Read more <ArrowUpRight size={13} /></Link>
          </div>

          <div className="mt-12 md:mt-20">
            <SectionOrnament tone="light" />
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] text-center mt-6 mb-6 md:mb-10">What we believe</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beliefs.map((b) => (
                <div key={b._id || b.n} className="bg-white p-10 lift-card border border-transparent hover:border-gold/40">
                  <p className="font-display text-gold text-[3rem] leading-none">{b.n}</p>
                  <div className="w-10 h-px bg-gold/40 mt-3 mb-5" />
                  <h3 className="font-display text-navy text-[1.4rem] leading-tight">{b.title}</h3>
                  <p className="font-editorial text-navy/75 text-base leading-relaxed mt-4">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-navy-deep text-cream py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />
        <div className="container-x relative">
          <SectionHeader
            chapter="Chapter VI"
            eyebrow={sections.testimonialsEyebrow || 'In Their Words'}
            title="The judgement shows up"
            accent="in their work."
            align="center"
            tone="dark"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((t) => (
              <div key={t._id || t.name} className="border border-gold/20 p-8 bg-navy/40 lift-card hover:border-gold/60">
                <Quote size={20} className="text-gold mb-4" />
                <p className="font-editorial italic text-[1.2rem] leading-relaxed text-cream/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-gold/40" />
                  <div>
                    <p className="font-display text-cream">{t.name}</p>
                    <p className="font-caps text-[0.6rem] text-gold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="relative bg-navy-deep text-cream py-14 md:py-20 overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 starfield opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full glow-gold" />
        <div className="relative container-x text-center">
          <img
            src="https://customer-assets.emergentagent.com/job_logos-11/artifacts/uy3e0q7m_background_removal%23TUFISU9ndjE5dUUjMSM2Y2FmMjhhNTNhMzRiYzBiNTFlMTQ3ZGQxNmEyZTRmMCM5MjAjI1RSQU5TRk9STUFUSU9OX1JFUVVFU1Q.png"
            alt="Epsilon Executive Education"
            data-testid="cta-square-logo"
            className="mx-auto mb-8 h-[150px] md:h-[180px] w-auto object-contain"
          />
          <p className="eyebrow">{cta.eyebrow || 'Take the next step'}</p>
          <h2 className="font-display uppercase text-[2rem] md:text-[3.4rem] leading-[1.05] max-w-4xl mx-auto mt-3 md:mt-5">
            {(cta.title || 'Build the judgement your next decade demands.')}
          </h2>
          <p className="font-editorial text-cream/80 text-[1.2rem] leading-relaxed mt-4 md:mt-7 max-w-xl mx-auto">
            {cta.subtitle || 'Apply, talk to admissions, or sign in to your learning environment.'}
          </p>
          <div className="mt-7 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/apply" className="btn-gold justify-center">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline-gold justify-center">Talk to Admissions</Link>
            <a href={footer.signInUrl || 'https://moodle.org/login/index.php'} target="_blank" rel="noopener noreferrer" className="btn-outline-gold justify-center">
              <LogIn size={16} /> Sign In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
