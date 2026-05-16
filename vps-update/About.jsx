import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Box, Megaphone, Briefcase, LineChart, Database, Users,
  Radio, ClipboardList, MessageSquare, Award, Quote,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { SectionOrnament } from '../components/SectionHeader';
import { beliefs as mockBeliefs, LOGO_URL } from '../mock';
import { useSiteContent } from '../context/SiteContent';

const DEFAULT_AUDIENCES = [
  { icon: 'box', label: 'Associate Product Managers & Junior Product Professionals' },
  { icon: 'megaphone', label: 'Marketing, Sales & Growth Professionals' },
  { icon: 'briefcase', label: 'Business Analysts & Operations Professionals' },
  { icon: 'lineChart', label: 'Research Associates & Financial Analysts' },
  { icon: 'database', label: 'Data Analysts, Reporting Analysts & BI Analysts' },
  { icon: 'users', label: 'Team Leads & Senior Individual Contributors' },
];

const AUDIENCE_ICONS = {
  box: Box, megaphone: Megaphone, briefcase: Briefcase,
  lineChart: LineChart, database: Database, users: Users,
};

const DEFAULT_TEACHING = [
  { title: 'Live instruction', body: 'Classes are taught live online, not delivered as a passive video library.', icon: 'radio' },
  { title: 'Applied assignments', body: 'Learners practise model evaluation, AI workflow design and structured technical communication.', icon: 'clipboard' },
  { title: 'Faculty feedback', body: 'Work is reviewed against evidence, clarity, feasibility and professional relevance.', icon: 'message' },
  { title: 'Capstone defence', body: 'Every program ends with a portfolio of work that can be shown to employers, clients or internal stakeholders.', icon: 'award' },
];

const TEACHING_ICONS = {
  radio: Radio, clipboard: ClipboardList, message: MessageSquare, award: Award,
};

export default function About() {
  const ctx = useSiteContent();
  const a = ctx?.home?.about || {};
  const hero = a.hero || {};
  const phil = a.philosophy || {};
  const cta = a.cta || {};
  const why = a.why || {};
  const teach = a.teach || {};
  const audiences = (why.audiences && why.audiences.length > 0) ? why.audiences : DEFAULT_AUDIENCES;
  const teachingBlocks = (teach.blocks && teach.blocks.length > 0) ? teach.blocks : DEFAULT_TEACHING;
  const beliefs = ctx?.beliefs?.length ? ctx.beliefs : mockBeliefs;

  return (
    <div>
      <PageHero
        eyebrow={hero.eyebrow || 'About Epsilon'}
        title={hero.title || 'A school for the people who decide.'}
        subtitle={hero.subtitle || 'Epsilon Executive Education exists to bridge the gap between technical possibility and credible business action. We design programs that produce work-ready capability, not just course completion.'}
        pathPrefix="about.hero"
      />

      {/* ============================================================ */}
      {/* WHY EPSILON EXISTS                                            */}
      {/* ============================================================ */}
      <section data-cms-section="about-why" className="bg-bone pt-12 md:pt-16 pb-20 md:pb-28 relative overflow-hidden">
        {/* Subtle background ornament */}
        <div aria-hidden="true" className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-gold/[0.04] blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-px h-24 bg-gradient-to-b from-transparent to-gold/40 pointer-events-none" />

        <div className="container-x relative">
          {/* Editorial chapter mark */}
          <p className="font-editorial italic text-navy/35 text-[0.95rem] tracking-widest leading-tight mb-3">
            — Chapter I —
          </p>
          <p className="eyebrow mb-3" data-cms-path="about.why.eyebrow">{why.eyebrow || 'Why we exist'}</p>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2.2rem] md:text-[3.4rem] lg:text-[3.8rem] leading-[1.02] mt-6 max-w-3xl" data-cms-path="about.why.title">
            {why.title || 'Why Epsilon Exists'}
          </h2>

          {/* Lead paragraph */}
          <p className="font-editorial text-navy/85 text-[1.2rem] md:text-[1.32rem] leading-relaxed mt-10 max-w-3xl" data-cms-path="about.why.paragraph1">
            {why.paragraph1 || 'AI education has split into two weak extremes. At one end are superficial courses that teach tools without judgement. At the other are highly theoretical graduate programs that do not prepare professionals to defend decisions inside real organisations.'}
          </p>

          {/* Pull quote — the editorial moment */}
          <figure className="mt-14 md:mt-16 max-w-4xl relative">
            <Quote size={36} className="text-gold/40 mb-4" />
            <blockquote
              className="font-display italic text-navy text-[1.8rem] md:text-[2.6rem] lg:text-[3rem] leading-[1.1] tracking-tight relative pl-6 md:pl-8 border-l-2 border-gold"
              data-cms-path="about.why.paragraph2"
            >
              <span className="text-gold">&ldquo;</span>{why.paragraph2 || 'Epsilon was built for that gap.'}<span className="text-gold">&rdquo;</span>
            </blockquote>
          </figure>

          {/* Two-column follow-up */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-6xl">
            <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed" data-cms-path="about.why.paragraph3">
              {why.paragraph3 || 'Here, professionals learn to read AI systems critically, design disciplined workflows, and explain recommendations to the people who approve budgets, manage risk, and set strategy.'}
            </p>
            <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed" data-cms-path="about.why.paragraph4">
              {why.paragraph4 || 'Our focus is practical, but never shallow. Every course is built around a well-rounded AI education that helps professionals think clearly, work with confidence, and make AI useful inside real organisations.'}
            </p>
          </div>

          {/* Audiences */}
          <div className="mt-20 md:mt-28">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="font-caps text-[0.62rem] text-gold tracking-[0.22em] mb-3">Who We Teach</p>
                <p className="font-editorial text-navy text-[1.4rem] md:text-[1.7rem] leading-snug max-w-2xl" data-cms-path="about.why.audiencesIntro">
                  {why.audiencesIntro || 'Our learners come from many career paths.'}
                </p>
              </div>
              <div className="flex items-center gap-3 text-navy/45">
                <span className="block h-px w-16 bg-navy/15" />
                <span className="font-caps text-[0.6rem] tracking-[0.2em]">{audiences.length.toString().padStart(2, '0')} groups</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {audiences.map((aud, i) => {
                const Icon = AUDIENCE_ICONS[aud.icon] || Box;
                const num = String(i + 1).padStart(2, '0');
                return (
                  <div
                    key={i}
                    className="group relative bg-white border border-navy/10 p-6 md:p-7 hover:border-gold transition-colors duration-300 overflow-hidden"
                  >
                    {/* Gold top accent */}
                    <span className="absolute top-0 left-0 h-px w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                    {/* Corner ornaments */}
                    <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold/0 group-hover:border-gold/60 transition-colors duration-300" />

                    <div className="flex items-center gap-4 mb-5">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 border border-gold/40 text-gold group-hover:bg-gold group-hover:text-navy-deep group-hover:border-gold transition-all duration-300">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-gold/70 text-[1.4rem] leading-none group-hover:text-gold transition-colors">{num}</span>
                    </div>

                    <p
                      className="font-caps text-[0.72rem] text-navy/90 tracking-[0.14em] leading-snug min-h-[3rem]"
                      data-cms-path={`about.why.audiences.${i}.label`}
                    >
                      {aud.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="font-editorial italic text-navy/70 text-[1.15rem] leading-relaxed max-w-4xl mt-14" data-cms-path="about.why.closing">
              {why.closing || 'and many others whose work now requires stronger technical judgement. And they come to Epsilon to understand AI clearly enough to lead teams, challenge assumptions, improve workflows, and make better decisions.'}
            </p>
          </div>
        </div>
      </section>

      {/* Editorial divider */}
      <div className="bg-cream">
        <div className="container-x py-6">
          <SectionOrnament tone="light" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* PHILOSOPHY                                                    */}
      {/* ============================================================ */}
      <section data-cms-section="about-philosophy" className="bg-cream pb-20 md:pb-28">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20 items-center">
          {/* Image with framing */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
              <img
                src={ctx?.home?.siteImages?.aboutPhilosophy || "/generated/online-class-female-professional.png"}
                alt="Senior professional studying with Epsilon"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/35 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-4 left-4 w-10 h-10 border-t border-l border-gold/70" />
              <span className="absolute top-4 right-4 w-10 h-10 border-t border-r border-gold/70" />
              <span className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-gold/70" />
              <span className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-gold/70" />
            </div>
            {/* Caption stripe */}
            <div className="absolute -bottom-5 left-6 right-6 md:left-10 md:right-10 bg-navy-deep text-cream py-3 px-5 border-t-2 border-gold flex items-center justify-between">
              <span className="font-caps text-[0.6rem] text-gold tracking-[0.22em]">A Personal Education</span>
              <span className="font-editorial italic text-cream/75 text-sm">Reviewed by a person, not an algorithm.</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="font-editorial italic text-navy/35 text-[0.95rem] tracking-widest leading-tight mb-3">
              — Chapter II —
            </p>
            <p className="eyebrow mb-3" data-cms-path="about.philosophy.eyebrow">{phil.eyebrow || 'Our Philosophy'}</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[3rem] lg:text-[3.4rem] leading-[1.05] mt-6" data-cms-path="about.philosophy.title">
              {phil.title || 'Turning technical fluency into'}{' '}
              <span className="italic font-editorial theme-hero-accent" data-cms-path="about.philosophy.titleItalic">{phil.titleItalic || 'strategic value.'}</span>
            </h2>
            <div className="space-y-7 mt-10">
              <p className="font-editorial text-navy/85 text-[1.2rem] md:text-[1.28rem] leading-relaxed" data-cms-path="about.philosophy.paragraph1">
                {phil.paragraph1 || 'Knowing about AI is not the same as deciding with it. Reading a model report is not the same as defending a recommendation to a board. Our programs are built around that gap — the difference between knowing and deciding.'}
              </p>
              <p className="font-editorial text-navy/85 text-[1.2rem] md:text-[1.28rem] leading-relaxed" data-cms-path="about.philosophy.paragraph2">
                {phil.paragraph2 || 'We pair practitioner-educators with senior cohorts, hold them to a high bar of evidence, and end every program with a portfolio-grade capstone — an artefact that proves capability, not attendance.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW WE TEACH — editorial stepper                             */}
      {/* ============================================================ */}
      <section data-cms-section="about-teach" className="bg-navy-deep text-cream pt-14 md:pt-20 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full glow-gold opacity-60 pointer-events-none" />
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container-x relative">
          <p className="font-editorial italic text-cream/40 text-[0.95rem] tracking-widest leading-tight mb-3">
            — Chapter III —
          </p>
          <p className="eyebrow mb-3" data-cms-path="about.teach.eyebrow">{teach.eyebrow || 'How we teach'}</p>
          <span className="gold-rule-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-end mt-6">
            <h2 className="font-display text-cream text-[2rem] md:text-[3rem] lg:text-[3.6rem] leading-[1.04]" data-cms-path="about.teach.title">
              {teach.title || 'How learning works at Epsilon.'}
            </h2>
            <p className="font-editorial text-cream/80 text-[1.15rem] md:text-[1.28rem] leading-relaxed" data-cms-path="about.teach.intro">
              {teach.intro || 'Our programs are live, cohort-based and assignment-driven. Learners work through concepts, apply them to practical AI and machine learning problems, receive feedback and defend their final work before faculty and senior peers.'}
            </p>
          </div>

          {/* Stepper rail */}
          <div className="mt-16 md:mt-24 relative">
            <div aria-hidden="true" className="hidden lg:block absolute top-[60px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
              {teachingBlocks.map((b, i) => {
                const Icon = TEACHING_ICONS[b.icon] || Radio;
                const num = String(i + 1).padStart(2, '0');
                return (
                  <div
                    key={i}
                    className="group relative flex flex-col"
                  >
                    {/* Number + Icon orbit */}
                    <div className="relative h-[120px] flex items-center justify-start mb-4">
                      <span className="absolute left-0 top-0 font-display text-gold/15 text-[5rem] leading-none select-none group-hover:text-gold/25 transition-colors duration-500">
                        {num}
                      </span>
                      <span className="relative inline-flex items-center justify-center w-16 h-16 border border-gold/50 bg-navy-deep text-gold group-hover:bg-gold group-hover:text-navy-deep group-hover:border-gold transition-all duration-500 mt-6 ml-8">
                        <Icon size={26} strokeWidth={1.4} />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="border-t border-cream/10 pt-6 group-hover:border-gold/60 transition-colors duration-300">
                      <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em] mb-3">Step {num}</p>
                      <h3 className="font-display text-cream text-[1.4rem] md:text-[1.55rem] leading-tight" data-cms-path={`about.teach.blocks.${i}.title`}>
                        {b.title}
                      </h3>
                      <p className="font-editorial text-cream/75 text-[1.05rem] leading-relaxed mt-3" data-cms-path={`about.teach.blocks.${i}.body`}>
                        {b.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* ============================================================ */}
      {/* BELIEFS                                                       */}
      {/* ============================================================ */}
      <section data-cms-section="about-beliefs" className="bg-bone pt-14 md:pt-20 pb-20 md:pb-28">
        <div className="container-x">
          <p className="font-editorial italic text-navy/35 text-[0.95rem] tracking-widest leading-tight mb-3">
            — Chapter IV —
          </p>
          <p className="eyebrow mb-3" data-cms-path="about.beliefsEyebrow">{a.beliefsEyebrow || 'What we believe'}</p>
          <span className="gold-rule-lg" />
          <h3 className="font-display text-navy text-[1.6rem] md:text-[2.2rem] leading-[1.1] mt-6 max-w-2xl">
            The three principles that shape everything we build.
          </h3>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {beliefs.map((b) => (
              <div
                key={b.n}
                className="group relative bg-white p-10 lift-card border border-transparent hover:border-gold/50 transition-all duration-300"
              >
                {/* Gold corner accents */}
                <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/70 transition-colors duration-300" />
                <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/0 group-hover:border-gold/70 transition-colors duration-300" />
                <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/0 group-hover:border-gold/70 transition-colors duration-300" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/0 group-hover:border-gold/70 transition-colors duration-300" />

                <p className="font-display text-gold text-[3rem] md:text-[3.4rem] leading-none group-hover:scale-110 transition-transform duration-500 origin-left" data-cms-path={`beliefs.${b._id || b.n}.n`}>
                  {b.n}
                </p>
                <span className="block w-10 h-px bg-gold/50 mt-4 mb-6 group-hover:w-20 transition-all duration-500" />
                <h3 className="font-display text-navy text-[1.5rem] leading-tight" data-cms-path={`beliefs.${b._id || b.n}.title`}>{b.title}</h3>
                <p className="font-editorial text-navy/75 text-[1.05rem] leading-relaxed mt-4" data-cms-path={`beliefs.${b._id || b.n}.body`}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA                                                           */}
      {/* ============================================================ */}
      <section data-cms-section="about-cta" className="bg-navy-deep text-cream pt-14 md:pt-20 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gold/50" />

        <div className="relative container-x text-center">
          <img src={ctx?.logoUrl || LOGO_URL} alt="Epsilon" className="mx-auto mb-8 h-[85px] w-auto object-contain opacity-90" />
          <p className="font-editorial italic text-gold/80 text-[0.95rem] tracking-widest mb-4">— Begin —</p>
          <h2 className="font-display uppercase text-[2rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.02] max-w-4xl mx-auto" data-cms-path="about.cta.title">
            {cta.title || 'Build the judgement your'}{' '}
            <span className="italic font-editorial text-gold normal-case" data-cms-path="about.cta.titleItalic">{cta.titleItalic || 'next decade'}</span>{' '}
            {cta.titleSuffix || 'demands.'}
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to={cta.primaryHref || '/programs'} className="btn-gold">{cta.primaryText || 'Explore Programs'} <ArrowRight size={16} /></Link>
            <Link to={cta.secondaryHref || '/contact'} className="btn-outline-gold">{cta.secondaryText || 'Talk to Us'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
