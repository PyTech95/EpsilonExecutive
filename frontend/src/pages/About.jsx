import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { beliefs as mockBeliefs, LOGO_URL } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function About() {
  const ctx = useSiteContent();
  const a = ctx?.home?.about || {};
  const hero = a.hero || {};
  const phil = a.philosophy || {};
  const cta = a.cta || {};
  const beliefs = ctx?.beliefs?.length ? ctx.beliefs : mockBeliefs;

  return (
    <div>
      <PageHero
        eyebrow={hero.eyebrow || 'About Epsilon'}
        title={hero.title || 'A school for the people who decide.'}
        subtitle={hero.subtitle || 'Epsilon Executive Education exists to bridge the gap between technical possibility and credible business action. We design programs that produce work-ready capability, not just course completion.'}
      />

      {/* Philosophy */}
      <section className="bg-cream py-24">
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
            <p className="eyebrow mb-4">{phil.eyebrow || 'Our Philosophy'}</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6">
              {phil.title || 'Turning technical fluency into'}{' '}
              <span className="italic font-editorial text-gold">{phil.titleItalic || 'strategic value.'}</span>
            </h2>
            <div className="space-y-6 mt-8">
              <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">
                {phil.paragraph1 || 'Knowing about AI is not the same as deciding with it. Reading a model report is not the same as defending a recommendation to a board. Our programs are built around that gap — the difference between knowing and deciding.'}
              </p>
              <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">
                {phil.paragraph2 || 'We pair practitioner-educators with senior cohorts, hold them to a high bar of evidence, and end every program with a portfolio-grade capstone — an artefact that proves capability, not attendance.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs — white cards */}
      <section className="bg-bone py-12 md:py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">{a.beliefsEyebrow || 'What we believe'}</p>
          <span className="gold-rule-lg" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {beliefs.map((b) => (
              <div key={b.n} className="bg-white p-10 hover:shadow-lg transition-shadow">
                <p className="font-display text-gold text-[2.5rem] leading-none">{b.n}</p>
                <h3 className="font-display text-navy text-[1.5rem] leading-tight mt-6">{b.title}</h3>
                <p className="font-editorial text-navy/75 text-lg leading-relaxed mt-5">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep text-cream py-14 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold" />
        <div className="relative container-x text-center">
          <img src={ctx?.logoUrl || LOGO_URL} alt="Epsilon" className="mx-auto mb-8 h-[85px] w-auto object-contain" />
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto">
            {cta.title || 'Build the judgement your'}{' '}
            <span className="italic font-editorial text-gold normal-case">{cta.titleItalic || 'next decade'}</span>{' '}
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
