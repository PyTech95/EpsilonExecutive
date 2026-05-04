import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Calendar, ChevronDown } from 'lucide-react';
import { programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';

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
          <p className="font-editorial text-2xl text-navy">Programme not found.</p>
          <Link to="/programs" className="link-gold mt-6 inline-flex">Back to programmes <ArrowUpRight size={13} /></Link>
        </div>
      </div>
    );
  }

  const modules = p.modules || [];
  const faqs = p.faqs || [];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-deep text-cream pt-[180px] pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={p.image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,19,31,0.6), rgba(8,19,31,0.95))' }} />
        </div>
        <div className="absolute inset-0 starfield opacity-30" />
        <div className="relative container-x">
          <Link to="/programs" className="link-gold mb-8 inline-flex">← All Programmes</Link>
          <p className="eyebrow mb-4">{p.weeks} weeks · {p.levelLabel}</p>
          <h1 className="font-display text-[2.4rem] md:text-[4rem] leading-[1.05] max-w-4xl">{p.title}</h1>
          <p className="font-editorial italic text-gold text-[1.3rem] md:text-[1.6rem] mt-5">{p.tagline}</p>
          <p className="font-editorial text-cream/80 text-[1.2rem] leading-relaxed mt-6 max-w-3xl">{p.long}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/apply" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/schedule" className="btn-outline-gold">Schedule a Call</Link>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: p.fee, l: 'Programme Fee' },
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

      {/* Outcomes */}
      <section className="bg-cream py-24">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow mb-4">What you leave with</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6">
              Outcomes worth <span className="italic font-editorial text-gold">defending.</span>
            </h2>
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

      {/* Modules — detailed cards */}
      {modules.length > 0 && (
        <section className="bg-bone py-24">
          <div className="container-x">
            <p className="eyebrow mb-4">Modules</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6 max-w-3xl">
              Six modules. Each <span className="italic font-editorial text-gold">defended in front of peers.</span>
            </h2>

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

      {/* Curriculum (week-by-week schedule) */}
      {p.curriculum?.length > 0 && (
        <section className="bg-cream py-24">
          <div className="container-x">
            <p className="eyebrow mb-4">Week-by-Week Schedule</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6 max-w-3xl">
              A disciplined sequence, end to end.
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

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-bone py-24">
          <div className="container-x max-w-4xl">
            <p className="eyebrow mb-4">FAQ</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6">
              Questions, <span className="italic font-editorial text-gold">answered.</span>
            </h2>

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

      {/* CTA */}
      <section className="bg-navy-deep text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="container-x relative text-center">
          <Calendar size={26} className="text-gold mx-auto mb-4" />
          <h2 className="font-display text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto">
            Next cohort: <span className="italic font-editorial text-gold">{p.nextCohort}</span>
          </h2>
          <p className="font-editorial text-cream/80 text-lg mt-5 max-w-xl mx-auto">
            Applications are reviewed personally. Start a conversation with admissions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/schedule" className="btn-outline-gold">Schedule a Call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
