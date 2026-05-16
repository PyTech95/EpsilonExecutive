import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Box, Megaphone, Briefcase, LineChart, Database, Users,
  Radio, ClipboardList, MessageSquare, Award,
} from 'lucide-react';
import PageHero from '../components/PageHero';
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

      {/* Why Epsilon Exists */}
      <section data-cms-section="about-why" className="bg-bone py-16 md:py-24">
        <div className="container-x">
          <p className="eyebrow mb-4" data-cms-path="about.why.eyebrow">{why.eyebrow || 'Why we exist'}</p>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6 max-w-3xl" data-cms-path="about.why.title">
            {why.title || 'Why Epsilon Exists'}
          </h2>

          <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl">
            <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed" data-cms-path="about.why.paragraph1">
              {why.paragraph1 || 'AI education has split into two weak extremes. At one end are superficial courses that teach tools without judgement. At the other are highly theoretical graduate programs that do not prepare professionals to defend decisions inside real organisations.'}
            </p>
            <div className="space-y-5">
              <p className="font-editorial italic text-gold text-[1.3rem] leading-relaxed" data-cms-path="about.why.paragraph2">
                {why.paragraph2 || 'Epsilon was built for that gap.'}
              </p>
              <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed" data-cms-path="about.why.paragraph3">
                {why.paragraph3 || 'Here, professionals learn to read AI systems critically, design disciplined workflows, and explain recommendations to the people who approve budgets, manage risk, and set strategy.'}
              </p>
              <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed" data-cms-path="about.why.paragraph4">
                {why.paragraph4 || 'Our focus is practical, but never shallow. Every course is built around a well-rounded AI education that helps professionals think clearly, work with confidence, and make AI useful inside real organisations.'}
              </p>
            </div>
          </div>

          <div className="mt-14 md:mt-20">
            <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed max-w-4xl" data-cms-path="about.why.audiencesIntro">
              {why.audiencesIntro || 'Our learners come from many career paths:'}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {audiences.map((aud, i) => {
                const Icon = AUDIENCE_ICONS[aud.icon] || Box;
                return (
                  <div
                    key={i}
                    className="group flex items-start gap-4 bg-white border border-navy/10 p-5 hover:border-gold/60 transition-colors"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 border border-gold/40 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <p
                      className="font-caps text-[0.72rem] text-navy/85 tracking-[0.12em] leading-snug pt-1.5"
                      data-cms-path={`about.why.audiences.${i}.label`}
                    >
                      {aud.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="font-editorial text-navy/85 text-[1.15rem] leading-relaxed max-w-4xl mt-10" data-cms-path="about.why.closing">
              {why.closing || 'and many others whose work now requires stronger technical judgement. And they come to Epsilon to understand AI clearly enough to lead teams, challenge assumptions, improve workflows, and make better decisions.'}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section data-cms-section="about-philosophy" className="bg-cream py-24">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep order-2 lg:order-1">
            <img
              src={ctx?.home?.siteImages?.aboutPhilosophy || "/generated/online-class-female-professional.png"}
              alt="Senior professional studying with Epsilon"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/30 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 w-9 h-9 border-t border-l border-gold/70" />
            <span className="absolute top-4 right-4 w-9 h-9 border-t border-r border-gold/70" />
            <span className="absolute bottom-4 left-4 w-9 h-9 border-b border-l border-gold/70" />
            <span className="absolute bottom-4 right-4 w-9 h-9 border-b border-r border-gold/70" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-4" data-cms-path="about.philosophy.eyebrow">{phil.eyebrow || 'Our Philosophy'}</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6" data-cms-path="about.philosophy.title">
              {phil.title || 'Turning technical fluency into'}{' '}
              <span className="italic font-editorial theme-hero-accent" data-cms-path="about.philosophy.titleItalic">{phil.titleItalic || 'strategic value.'}</span>
            </h2>
            <div className="space-y-6 mt-8">
              <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed" data-cms-path="about.philosophy.paragraph1">
                {phil.paragraph1 || 'Knowing about AI is not the same as deciding with it. Reading a model report is not the same as defending a recommendation to a board. Our programs are built around that gap — the difference between knowing and deciding.'}
              </p>
              <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed" data-cms-path="about.philosophy.paragraph2">
                {phil.paragraph2 || 'We pair practitioner-educators with senior cohorts, hold them to a high bar of evidence, and end every program with a portfolio-grade capstone — an artefact that proves capability, not attendance.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we teach */}
      <section data-cms-section="about-teach" className="bg-cream py-16 md:py-24 border-t border-navy/5">
        <div className="container-x">
          <p className="eyebrow mb-4" data-cms-path="about.teach.eyebrow">{teach.eyebrow || 'How we teach'}</p>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6 max-w-3xl" data-cms-path="about.teach.title">
            {teach.title || 'How learning works at Epsilon.'}
          </h2>
          <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed mt-8 max-w-3xl" data-cms-path="about.teach.intro">
            {teach.intro || 'Our programs are live, cohort-based and assignment-driven. Learners work through concepts, apply them to practical AI and machine learning problems, receive feedback and defend their final work before faculty and senior peers.'}
          </p>

          <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {teachingBlocks.map((b, i) => {
              const Icon = TEACHING_ICONS[b.icon] || Radio;
              return (
                <div
                  key={i}
                  className="relative bg-white p-7 border border-navy/10 hover:border-gold/60 transition-colors lift-card"
                >
                  <span className="absolute top-0 left-0 w-12 h-px bg-gold/60" />
                  <span className="inline-flex items-center justify-center w-11 h-11 border border-gold/40 text-gold mb-5">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <p className="font-caps text-[0.62rem] text-gold tracking-[0.2em] mb-2">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-navy text-[1.25rem] leading-tight" data-cms-path={`about.teach.blocks.${i}.title`}>
                    {b.title}
                  </h3>
                  <p className="font-editorial text-navy/75 text-base leading-relaxed mt-3" data-cms-path={`about.teach.blocks.${i}.body`}>
                    {b.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beliefs — white cards */}
      <section data-cms-section="about-beliefs" className="bg-bone py-12 md:py-24">
        <div className="container-x">
          <p className="eyebrow mb-4" data-cms-path="about.beliefsEyebrow">{a.beliefsEyebrow || 'What we believe'}</p>
          <span className="gold-rule-lg" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {beliefs.map((b) => (
              <div key={b.n} className="bg-white p-10 hover:shadow-lg transition-shadow">
                <p className="font-display text-gold text-[2.5rem] leading-none" data-cms-path={`beliefs.${b._id || b.n}.n`}>{b.n}</p>
                <h3 className="font-display text-navy text-[1.5rem] leading-tight mt-6" data-cms-path={`beliefs.${b._id || b.n}.title`}>{b.title}</h3>
                <p className="font-editorial text-navy/75 text-lg leading-relaxed mt-5" data-cms-path={`beliefs.${b._id || b.n}.body`}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-cms-section="about-cta" className="bg-navy-deep text-cream py-14 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold" />
        <div className="relative container-x text-center">
          <img src={ctx?.logoUrl || LOGO_URL} alt="Epsilon" className="mx-auto mb-8 h-[85px] w-auto object-contain" />
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto" data-cms-path="about.cta.title">
            {cta.title || 'Build the judgement your'}{' '}
            <span className="italic font-editorial text-gold normal-case" data-cms-path="about.cta.titleItalic">{cta.titleItalic || 'next decade'}</span>{' '}
            {cta.titleSuffix || 'demands.'}
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to={cta.primaryHref || '/programs'} className="btn-gold">{cta.primaryText || 'Explore Programs'} <ArrowRight size={16} /></Link>
            <Link to={cta.secondaryHref || '/contact'} className="btn-outline-gold">{cta.secondaryText || 'Talk to Us'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
