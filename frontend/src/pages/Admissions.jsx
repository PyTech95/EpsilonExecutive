import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Receipt } from 'lucide-react';
import PageHero from '../components/PageHero';
import { cohorts, programs } from '../mock';

export default function Admissions() {
  return (
    <div>
      <PageHero
        eyebrow="Admissions"
        title="A personal conversation. Not a funnel."
        subtitle="Every applicant speaks with an admissions lead before a seat is offered. We use that conversation to discuss fit, expectations, and whether the next cohort is the right one for you."
      />

      {/* Process */}
      <section className="bg-cream py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">The Process</p>
          <span className="gold-rule-lg" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { n: '01', t: 'Application', b: 'Tell us about your work and what you want to learn.' },
              { n: '02', t: 'Conversation', b: 'A personal call with admissions to discuss fit and expectations.' },
              { n: '03', t: 'Decision', b: 'A seat is offered based on fit, not first-come-first-served.' },
              { n: '04', t: 'Onboarding', b: 'Pre-work, cohort introductions, and access to Moodle.' },
            ].map((s, i) => (
              <div key={s.n} className={`p-8 border-t border-navy/15 ${i !== 0 ? 'md:border-l' : ''}`}>
                <p className="font-display text-gold text-[2.5rem] leading-none">{s.n}</p>
                <h3 className="font-display text-navy text-[1.3rem] mt-3">{s.t}</h3>
                <p className="font-editorial text-navy/75 leading-relaxed mt-3">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cohorts */}
      <section className="bg-bone py-24">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={18} className="text-gold" />
            <p className="eyebrow">Upcoming Cohorts</p>
          </div>
          <span className="gold-rule-lg" />
          <div className="mt-10 bg-white border border-navy/10">
            {cohorts.map((c, i) => (
              <div key={c.id} className={`flex flex-col md:flex-row md:items-center justify-between p-7 ${i !== 0 ? 'border-t border-navy/10' : ''}`}>
                <div className="flex items-center gap-8">
                  <p className="font-caps text-[0.65rem] text-gold w-24">{c.label}</p>
                  <p className="font-display text-navy text-xl">{c.date}</p>
                </div>
                <span className="font-caps text-[0.6rem] text-navy/60 mt-3 md:mt-0">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees & Investment */}
      <section className="bg-cream py-24">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-4">
            <Receipt size={18} className="text-gold" />
            <p className="eyebrow">Fees & Investment</p>
          </div>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6 max-w-3xl">
            A clear, transparent investment.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-9 hover:shadow-lg transition-shadow">
              <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">Programme Fee</p>
              <p className="font-display text-navy text-[2.4rem] mt-4">₹1,25,000</p>
              <p className="font-editorial text-navy/75 mt-4 leading-relaxed">All-inclusive of materials, sessions, and certificate</p>
            </div>
            <div className="bg-white p-9 hover:shadow-lg transition-shadow">
              <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">Early Bird (4 weeks before start)</p>
              <p className="font-display text-navy text-[2.4rem] mt-4">₹1,10,000</p>
              <p className="font-editorial text-navy/75 mt-4 leading-relaxed">Subject to seat availability</p>
            </div>
            <div className="bg-white p-9 hover:shadow-lg transition-shadow">
              <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">Group Discount (3+)</p>
              <p className="font-display text-navy text-[2.4rem] mt-4">15% off</p>
              <p className="font-editorial text-navy/75 mt-4 leading-relaxed">For corporate cohorts of three or more</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes snapshot */}
      <section className="bg-bone py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">Programmes</p>
          <span className="gold-rule-lg" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map(p => (
              <Link to={`/programs/${p.slug}`} key={p.slug}
                    className="group bg-white border border-navy/10 hover:border-gold/50 transition-colors p-7 flex justify-between items-start gap-6">
                <div>
                  <p className="font-caps text-[0.6rem] text-gold">{p.weeks} weeks · {p.levelLabel}</p>
                  <h3 className="font-display text-navy text-[1.3rem] mt-3 leading-tight">{p.subtitle}</h3>
                  <p className="font-editorial italic text-navy/70 mt-2">{p.nextCohort}</p>
                </div>
                <span className="font-display text-navy text-lg whitespace-nowrap">{p.fee}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="container-x relative text-center">
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto">
            Start your <span className="italic font-editorial text-gold normal-case">admissions conversation.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline-gold">Talk to Admissions</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
