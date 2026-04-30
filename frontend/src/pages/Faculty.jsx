import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import { leadFaculty, guestLecturers } from '../mock';

export default function Faculty() {
  const lead = leadFaculty[0];

  return (
    <div>
      <PageHero
        eyebrow="Faculty"
        title="People who do the work — teaching how to do it well."
        subtitle="Our faculty are senior practitioners and educators — advisors, founders, and researchers who bring real problems into the classroom and rigorous frameworks back out."
      />

      {/* Lead Faculty */}
      <section className="bg-cream py-24">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={16} className="text-gold" />
            <p className="eyebrow">Lead Faculty</p>
          </div>
          <span className="gold-rule-lg" />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
            <div className="bg-white border border-navy/10 overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={lead.image} alt={lead.name} className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="p-7">
                <h3 className="font-display text-navy text-[1.6rem] leading-tight">{lead.name}</h3>
                <p className="font-editorial italic text-gold mt-2 text-[1.05rem]">{lead.role}</p>
                <ul className="mt-5 space-y-2">
                  {lead.affiliations.map((a) => (
                    <li key={a} className="font-sans text-navy/75 text-sm leading-relaxed flex gap-2">
                      <span className="text-gold mt-[2px]">·</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] max-w-2xl">
                Economist, data scientist, and <span className="italic font-editorial text-gold">educator.</span>
              </h2>
              <div className="mt-8 space-y-6">
                <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">{lead.bio}</p>
                <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">{lead.bio2}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {lead.tags.map((t) => (
                  <span key={t} className="font-caps text-[0.6rem] tracking-[0.22em] text-navy/70 border border-navy/20 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Lecturers */}
      <section className="bg-bone py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">Guest Lecturers</p>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6 max-w-3xl">
            Practitioners from finance, law, capital, and applied research.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {guestLecturers.map((f) => (
              <article key={f.slug} className="bg-white border border-navy/10 group hover:border-gold/50 transition-colors flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-[200px] md:flex-shrink-0 aspect-[4/5] md:aspect-auto overflow-hidden">
                  <img src={f.image} alt={f.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="p-7 flex-1">
                  <h3 className="font-display text-navy text-[1.35rem] leading-tight">{f.name}</h3>
                  <p className="font-editorial italic text-gold mt-1.5 text-[0.98rem] leading-snug">{f.role}</p>
                  <p className="font-sans text-navy/75 text-[0.92rem] leading-relaxed mt-4">{f.bio}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {f.tags.map((t) => (
                      <span key={t} className="font-caps text-[0.55rem] tracking-[0.22em] text-navy/70 border border-navy/20 px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold" />
        <div className="container-x relative text-center">
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto">
            Learn from the people who <span className="italic font-editorial text-gold normal-case">do the work.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/programs" className="btn-gold">Explore Programmes <ArrowRight size={16} /></Link>
            <Link to="/apply" className="btn-outline-gold">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
