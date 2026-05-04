import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import FacultyShowcase from '../components/FacultyShowcase';
import { leadFaculty as mockLead, guestLecturers as mockGuests } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function Faculty() {
  const ctx = useSiteContent();
  const leadFaculty = ctx?.leadFaculty?.length ? ctx.leadFaculty : mockLead;
  const guestLecturers = ctx?.guestLecturers?.length ? ctx.guestLecturers : mockGuests;
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

      {/* Guest Lecturers detailed */}
      <section className="bg-bone py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">Guest Lecturers · Full Bios</p>
          <span className="gold-rule-lg" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
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
