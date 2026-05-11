import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Receipt } from 'lucide-react';
import PageHero from '../components/PageHero';
import { cohorts as mockCohorts, programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';

const DEFAULT_STEPS = [
  { n: '01', title: 'Application', body: 'Tell us about your work and what you want to learn.' },
  { n: '02', title: 'Conversation', body: 'A personal call with admissions to discuss fit and expectations.' },
  { n: '03', title: 'Decision', body: 'A seat is offered based on fit, not first-come-first-served.' },
  { n: '04', title: 'Onboarding', body: 'Pre-work, cohort introductions, and access to Moodle.' },
];
const DEFAULT_FEES = [
  { label: 'Program Fee', amount: '₹1,25,000', note: 'All-inclusive of materials, sessions, and certificate' },
  { label: 'Early Bird (4 weeks before start)', amount: '₹1,10,000', note: 'Subject to seat availability' },
  { label: 'Group Discount (3+)', amount: '15% off', note: 'For corporate cohorts of three or more' },
];

export default function Admissions() {
  const ctx = useSiteContent();
  const cohorts = ctx?.cohorts?.length ? ctx.cohorts : mockCohorts;
  const programs = ctx?.programs?.length ? ctx.programs : [];
  const adm = ctx?.home?.admissions || {};
  const hero = adm.hero || {};
  const cap = adm.imageCaption || {};
  const cta = adm.cta || {};
  const steps = adm.steps?.length ? adm.steps : DEFAULT_STEPS;
  const fees = adm.fees?.length ? adm.fees : DEFAULT_FEES;
  return (
    <div>
      <PageHero
        eyebrow={hero.eyebrow || 'Admissions'}
        title={hero.title || 'A personal conversation. Not a funnel.'}
        subtitle={hero.subtitle || 'Every applicant speaks with an admissions lead before a seat is offered. We use that conversation to discuss fit, expectations, and whether the next cohort is the right one for you.'}
      />

      {/* Process */}
      <section className="bg-cream py-12 md:py-24">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
              <img
                src={ctx?.home?.siteImages?.admissionsProcess || "/generated/online-class-male-student.png"}
                alt="An admissions conversation, online"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent" />
              <span className="absolute top-4 left-4 w-9 h-9 border-t border-l border-gold/70" />
              <span className="absolute top-4 right-4 w-9 h-9 border-t border-r border-gold/70" />
              <span className="absolute bottom-4 left-4 w-9 h-9 border-b border-l border-gold/70" />
              <span className="absolute bottom-4 right-4 w-9 h-9 border-b border-r border-gold/70" />
              <div className="absolute bottom-6 left-6 right-6 text-cream">
                <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold">{cap.line1 || 'A 25-min conversation'}</p>
                <p className="font-display text-[1.3rem] leading-tight mt-2">{cap.line2 || 'Reviewed by a person, not an algorithm.'}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">{adm.processEyebrow || 'The Process'}</p>
            <span className="gold-rule-lg" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-0">
              {steps.map((s, i) => (
                <div key={s.n + i} className={`p-7 border-t border-navy/15 ${i % 2 !== 0 ? 'md:border-l' : ''} ${i >= 2 ? 'md:border-t' : ''}`}>
                  <p className="font-display text-gold text-[2.2rem] leading-none">{s.n}</p>
                  <h3 className="font-display text-navy text-[1.25rem] mt-3">{s.title || s.t}</h3>
                  <p className="font-editorial text-navy/75 leading-relaxed mt-3">{s.body || s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cohorts */}
      <section className="bg-bone py-12 md:py-24">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={18} className="text-gold" />
            <p className="eyebrow">{adm.cohortsEyebrow || 'Upcoming Cohorts'}</p>
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
      <section className="bg-cream py-12 md:py-24">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-4">
            <Receipt size={18} className="text-gold" />
            <p className="eyebrow">{adm.feesEyebrow || 'Fees & Investment'}</p>
          </div>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6 max-w-3xl">
            {adm.feesTitle || 'A clear, transparent investment.'}
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {fees.map((f, i) => (
              <div key={i} className="bg-white p-9 hover:shadow-lg transition-shadow">
                <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">{f.label}</p>
                <p className="font-display text-navy text-[2.4rem] mt-4">{f.amount}</p>
                <p className="font-editorial text-navy/75 mt-4 leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs snapshot */}
      <section className="bg-bone py-12 md:py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">{adm.programsEyebrow || 'Programs'}</p>
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

      <section className="bg-navy-deep text-cream py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="container-x relative text-center">
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto">
            {cta.title || 'Start your'} <span className="italic font-editorial text-gold normal-case">{cta.titleItalic || 'admissions conversation.'}</span>
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
