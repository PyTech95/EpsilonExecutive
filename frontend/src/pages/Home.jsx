import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, LogIn, FileText, Download, ArrowUpRight, BookOpen, Quote
} from 'lucide-react';
import { programs, testimonials, LOGO_URL } from '../mock';
import FacultyShowcase from '../components/FacultyShowcase';
import NetworkBackground from '../components/NetworkBackground';

function HeroStat({ value, label }) {
  return (
    <div className="border-l border-gold/40 pl-4">
      <p className="font-display text-xl md:text-2xl text-cream">{value}</p>
      <p className="font-caps text-[0.6rem] text-cream/60 mt-1">{label}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-deep text-cream min-h-[100vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2400&q=80"
            alt="AI"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,19,31,0.55), rgba(14,31,50,0.88), rgba(8,19,31,1))' }} />
        </div>
        {/* Animated spider-net network */}
        <NetworkBackground className="opacity-70" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full glow-gold pointer-events-none" />

        <div className="relative container-x pt-40 md:pt-44 pb-24">
          <p className="eyebrow mb-7 fade-up">
            <Sparkles size={12} className="inline mr-2 -mt-1 text-gold" /> The AI Era of Executive Education
          </p>
          <h1 className="font-display uppercase text-[2.6rem] sm:text-[3.6rem] md:text-[5.4rem] lg:text-[6.4rem] leading-[1.02] tracking-tight max-w-6xl fade-up">
            Turning technical fluency
          </h1>
          <h2 className="font-editorial italic text-gold text-[2.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.05] mt-2 fade-up">
            into strategic value.
          </h2>
          <p className="font-editorial text-[1.25rem] md:text-[1.55rem] leading-relaxed text-cream/85 mt-9 max-w-2xl fade-up">
            Live online cohorts for working professionals who want to translate AI, data, and modern decision systems into evidence-based action &mdash; not theatre.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4 fade-up">
            <Link to="/apply" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
            <a href="https://moodle.org/login/index.php" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              <LogIn size={16} /> Sign In to Learn
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 fade-up">
            <HeroStat value="12 weeks" label="Cohort duration" />
            <HeroStat value="Live online" label="Executive-friendly" />
            <HeroStat value="15–20 hrs" label="Per-week commitment" />
            <HeroStat value="Capstone" label="Portfolio outcome" />
          </div>
        </div>
      </section>

      {/* BENTO SNAPSHOT */}
      <section className="bg-cream py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
             style={{ background: 'radial-gradient(circle, #c2984c 0%, transparent 70%)' }} />
        <div className="container-x relative">
          <p className="eyebrow mb-4">A snapshot of Epsilon</p>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2.2rem] md:text-[3.4rem] leading-[1.05] mt-6 max-w-4xl">
            Everything you need to <span className="italic font-editorial text-gold">decide</span>, in one frame.
          </h2>

          {/* Row 1 — 3 cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {/* Brochure */}
            <button className="relative group block w-full text-left bg-navy text-cream p-7 md:p-9 overflow-hidden hover:bg-navy-deep transition-colors min-h-[230px]">
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-30"
                   style={{ background: 'radial-gradient(circle, rgba(194,152,76,0.5) 0%, transparent 70%)' }} />
              <FileText size={26} className="text-gold mb-4" />
              <p className="eyebrow mb-2">Brochure</p>
              <p className="font-display text-[1.35rem] md:text-[1.55rem] leading-tight">Download the full programme brochure.</p>
              <span className="link-gold mt-5 inline-flex"><Download size={14} /> PDF · Free</span>
            </button>

            {/* Moodle */}
            <a href="https://moodle.org/login/index.php" target="_blank" rel="noopener noreferrer"
               className="relative group block w-full bg-gold text-navy p-7 md:p-9 overflow-hidden hover:bg-[#d8b876] transition-colors min-h-[230px]">
              <LogIn size={26} className="text-navy mb-4" />
              <p className="font-caps text-[0.7rem] font-bold mb-2">Already a Student?</p>
              <p className="font-display text-[1.35rem] md:text-[1.55rem] leading-tight">Sign in to your learning environment.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-caps text-[0.7rem] font-bold">
                Sign In to Moodle <ArrowUpRight size={14} />
              </span>
            </a>

            {/* Live Online image card */}
            <Link to="/programs" className="relative group block w-full overflow-hidden min-h-[230px]">
              <img src="https://images.unsplash.com/photo-1716471453667-94383b1e4859?auto=format&fit=crop&w=1200&q=80"
                   alt="Live online cohort" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent" />
              <div className="relative p-7 md:p-9 flex flex-col justify-end h-full text-cream">
                <BookOpen size={22} className="text-gold mb-4" />
                <p className="font-caps text-[0.7rem] text-gold mb-2">Live Online</p>
                <p className="font-display text-[1.35rem] md:text-[1.55rem] leading-tight">Built for the schedule of senior professionals.</p>
              </div>
            </Link>
          </div>

          {/* Row 2 — 2 image cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="relative overflow-hidden min-h-[360px] group">
              <img src="https://images.unsplash.com/photo-1675664535418-959dd68004fd?auto=format&fit=crop&w=1600&q=80"
                   alt="Capstone" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
              <div className="relative p-8 md:p-10 flex flex-col justify-end h-full text-cream">
                <p className="eyebrow mb-2">Capstone</p>
                <p className="font-display text-[1.6rem] md:text-[2rem] leading-tight">A portfolio that proves capability</p>
              </div>
            </div>
            <div className="relative overflow-hidden min-h-[360px] group">
              <img src="https://images.unsplash.com/photo-1675664532731-c8caede9ef6b?auto=format&fit=crop&w=1600&q=80"
                   alt="Senior cohort" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
              <div className="relative p-8 md:p-10 flex flex-col justify-end h-full text-cream">
                <p className="eyebrow mb-2">Senior Cohort</p>
                <p className="font-display text-[1.6rem] md:text-[2rem] leading-tight">Working professionals · 5–15 yrs experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONLINE EXPERIENCE */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow mb-4">The Online Experience</p>
          <span className="gold-rule-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
            <h2 className="font-display text-navy text-[2rem] md:text-[3.2rem] leading-[1.05]">
              Live, intimate, <span className="italic font-editorial text-gold">and rigorous.</span>
            </h2>
            <p className="font-editorial text-navy/80 text-[1.2rem] leading-relaxed">
              Three evenings a week, you join your cohort live online &mdash; same screen, real conversation, faculty within reach. No pre-recorded sessions, no asynchronous drift.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1675664532493-ab9f3e5ed1ea?auto=format&fit=crop&w=1600&q=80" alt="Working professional learning online" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-cream">
                <p className="eyebrow mb-2">Evenings · Live</p>
                <p className="font-display text-[1.6rem] leading-tight">3 sessions a week, 6 hours total</p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-6">
              <div className="aspect-[16/9] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1716471551703-e8bb5ca9bf23?auto=format&fit=crop&w=900&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[16/9] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1654262609484-76d1a8f3b016?auto=format&fit=crop&w=900&q=80" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL BAND */}
      <section className="bg-navy-deep text-cream py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="container-x relative">
          <p className="eyebrow mb-4">In Their Words</p>
          <span className="gold-rule-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-gold/15 p-8 bg-navy/40">
                <Quote size={20} className="text-gold mb-4" />
                <p className="font-editorial italic text-[1.25rem] leading-relaxed text-cream/90">&ldquo;{t.quote}&rdquo;</p>
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

      {/* FACULTY SHOWCASE */}
      <FacultyShowcase />

      {/* PROGRAMMES */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow mb-4">More Programmes</p>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6 max-w-3xl">
            Built for senior professionals. Taught by people who do the work.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.slice(1).map((p) => (
              <div key={p.slug} className="bg-white border border-navy/10 group hover:border-gold/50 transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7">
                  <p className="font-caps text-[0.6rem] text-gold">
                    {p.weeks} weeks · {p.levelLabel}
                  </p>
                  <h3 className="font-display text-navy text-[1.35rem] leading-tight mt-3">{p.subtitle}</h3>
                  <p className="font-editorial italic text-navy/70 mt-3">{p.tagline}</p>
                  <Link to={`/programs/${p.slug}`} className="link-gold mt-6 inline-flex">
                    Explore <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative bg-navy-deep text-cream py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full glow-gold" />
        <div className="relative container-x text-center">
          <img src={LOGO_URL} alt="Epsilon" className="mx-auto mb-8 h-[120px] w-auto object-contain" />
          <p className="eyebrow">Take the next step</p>
          <h2 className="font-display uppercase text-[2rem] md:text-[3.4rem] leading-[1.05] max-w-4xl mx-auto mt-5">
            Build the judgement your <span className="italic font-editorial text-gold normal-case">next decade</span> demands.
          </h2>
          <p className="font-editorial text-cream/80 text-[1.2rem] leading-relaxed mt-7 max-w-xl mx-auto">
            Apply, talk to admissions, or sign in to your learning environment.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/apply" className="btn-gold justify-center">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline-gold justify-center">Talk to Admissions</Link>
            <a href="https://moodle.org/login/index.php" target="_blank" rel="noopener noreferrer" className="btn-outline-gold justify-center">
              <LogIn size={16} /> Sign In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
