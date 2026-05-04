import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import FacultyShowcase from '../components/FacultyShowcase';
import { leadFaculty as mockLead } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function Faculty() {
  const ctx = useSiteContent();
  const leadFaculty = ctx?.leadFaculty?.length ? ctx.leadFaculty : mockLead;
  const lead = leadFaculty[0];

  return (
    <div>
      <PageHero
        eyebrow="Faculty"
        title="People who do the work — teaching how to do it well."
        subtitle="Our faculty are senior practitioners and educators — advisors, founders, and researchers who bring real problems into the classroom and rigorous frameworks back out."
      />

      {/* Showcase — same as home */}
      <FacultyShowcase />

      {/* Lead Faculty detailed bio */}
      <section className="bg-cream py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">Lead Faculty · Full Bio</p>
          <span className="gold-rule-lg" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <aside>
              <p className="font-display text-navy text-[1.6rem] leading-tight">{lead.name}</p>
              <p className="font-editorial italic text-gold mt-2 text-[1.05rem]">{lead.role}</p>
              <ul className="mt-6 space-y-3">
                {lead.affiliations.map((a) => (
                  <li key={a} className="font-sans text-navy/75 text-sm leading-relaxed flex gap-2">
                    <span className="text-gold mt-[2px]">·</span>{a}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {lead.tags.map((t) => (
                  <span key={t} className="font-caps text-[0.55rem] tracking-[0.22em] text-navy/70 border border-navy/20 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </aside>
            <div className="space-y-6">
              <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">{lead.bio}</p>
              <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">{lead.bio2}</p>
              {lead.bio3 && <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">{lead.bio3}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Guest Lecturers · open in modal via FacultyShowcase above */}
      <section className="bg-bone py-16">
        <div className="container-x text-center">
          <p className="eyebrow mb-3">Guest Lecturers</p>
          <h3 className="font-display text-navy text-[1.7rem] md:text-[2.1rem] leading-tight max-w-2xl mx-auto">
            Click any visiting faculty above to <span className="italic font-editorial text-gold">read their full bio.</span>
          </h3>
          <p className="font-editorial text-navy/70 text-[1.05rem] leading-relaxed mt-4 max-w-xl mx-auto">
            Practitioner-educators from law, capital, real estate, and marketing science — each bringing field-tested judgement into the classroom.
          </p>
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
