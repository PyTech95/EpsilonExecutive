import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { beliefs, LOGO_URL } from '../mock';

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About Epsilon"
        title="A school for the people who decide."
        subtitle="Epsilon Executive Education exists to bridge the gap between technical possibility and credible business action. We design programmes that produce work-ready capability, not just course completion."
      />

      {/* Philosophy */}
      <section className="bg-cream py-24">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow mb-4">Our Philosophy</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6">
              Turning technical fluency into <span className="italic font-editorial text-gold">strategic value.</span>
            </h2>
          </div>
          <div className="space-y-6">
            <p className="font-editorial text-navy/85 text-[1.25rem] leading-relaxed">
              Knowing about AI is not the same as deciding with it. Reading a model report is not the same as defending a recommendation to a board. Our programmes are built around that gap &mdash; the difference between knowing and deciding.
            </p>
            <p className="font-editorial text-navy/85 text-[1.25rem] leading-relaxed">
              We pair practitioner-educators with senior cohorts, hold them to a high bar of evidence, and end every programme with a portfolio-grade capstone &mdash; an artefact that proves capability, not attendance.
            </p>
          </div>
        </div>
      </section>

      {/* Beliefs — white cards */}
      <section className="bg-bone py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">What we believe</p>
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
      <section className="bg-navy-deep text-cream py-28 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold" />
        <div className="relative container-x text-center">
          <img src={LOGO_URL} alt="Epsilon" className="mx-auto mb-8 h-[100px] w-auto object-contain" />
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto">
            Build the judgement your <span className="italic font-editorial text-gold normal-case">next decade</span> demands.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/programs" className="btn-gold">Explore Programmes <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline-gold">Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
