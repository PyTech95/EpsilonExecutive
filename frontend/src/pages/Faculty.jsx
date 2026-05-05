import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { leadFaculty as mockLead, guestLecturers as mockGuests } from '../mock';
import { useSiteContent } from '../context/SiteContent';

function LeadFacultyBlock({ lead }) {
  return (
    <section className="relative bg-navy-deep text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full glow-gold pointer-events-none" />

      <div className="container-x relative">
        <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold mb-3">Lead Faculty</p>
        <span className="block w-12 h-px bg-gold/60 mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,460px)_1fr] gap-14 lg:gap-20 items-start">
          {/* Portrait + badge */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[460px]">
            <div className="aspect-[4/5] overflow-hidden bg-navy">
              <img src={lead.image} alt={lead.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-[-12px] bottom-[-12px] md:right-[-16px] md:bottom-[-16px] bg-gold text-navy-deep px-7 py-5 md:px-9 md:py-6 max-w-[78%]">
              <p className="font-caps text-[0.65rem] tracking-[0.22em] text-navy-deep/80 mb-1">{lead.badge}</p>
              <p className="font-display text-navy-deep text-[1.2rem] md:text-[1.4rem] leading-tight">{lead.name}</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-display uppercase text-cream text-[2rem] md:text-[2.8rem] leading-[1.05]">
              {lead.name}
            </h2>
            <p className="font-editorial italic text-gold text-[1.2rem] md:text-[1.45rem] mt-3 leading-snug">
              {lead.role}
            </p>

            {/* Credentials */}
            <div className="mt-10 grid grid-cols-2 gap-8 max-w-xl border-t border-b border-gold/25 py-7">
              {(lead.credentials || []).map((c) => (
                <div key={c.institution}>
                  <p className="font-editorial italic text-gold text-[1.3rem] md:text-[1.5rem] leading-tight">
                    {c.institution}
                  </p>
                  <p className="font-caps text-[0.62rem] tracking-[0.22em] text-cream/65 mt-2">
                    {c.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Bios */}
            <div className="mt-10 space-y-6 max-w-3xl">
              <p className="font-editorial italic text-cream text-[1.35rem] md:text-[1.55rem] leading-snug text-gold/95">
                {lead.heroBlurb}
              </p>
              {[lead.bio, lead.bio2, lead.bio3].filter(Boolean).map((para, i) => (
                <p key={i} className="font-sans text-cream/85 text-[1rem] md:text-[1.05rem] leading-[1.8]">
                  {para}
                </p>
              ))}
            </div>

            {/* Affiliations + tags */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
              {lead.affiliations?.length > 0 && (
                <div>
                  <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold mb-4">Affiliations</p>
                  <ul className="space-y-2">
                    {lead.affiliations.map((a) => (
                      <li key={a} className="font-sans text-cream/80 text-[0.95rem] leading-relaxed flex gap-2">
                        <span className="text-gold mt-[3px]">·</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {lead.tags?.length > 0 && (
                <div>
                  <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold mb-4">Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {lead.tags.map((t) => (
                      <span key={t} className="font-caps text-[0.55rem] tracking-[0.22em] text-cream/80 border border-gold/35 px-3 py-1.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuestRow({ g, index }) {
  const reverse = index % 2 === 1;
  return (
    <article
      data-testid={`faculty-guest-row-${g.slug || g._id}`}
      className={`grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-12 lg:gap-16 items-start ${
        reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Portrait */}
      <div className="relative mx-auto lg:mx-0 w-full max-w-[420px]">
        <div className="aspect-[4/5] overflow-hidden bg-navy/10 border border-navy/10">
          <img
            src={g.image}
            alt={g.name}
            className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
          />
        </div>
        {/* Gold corner accents */}
        <span className="absolute top-3 left-3 w-7 h-7 border-t border-l border-gold/70" />
        <span className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-gold/70" />
      </div>

      {/* Content */}
      <div className="pt-2">
        <p className="font-caps text-[0.62rem] tracking-[0.28em] text-gold">{g.expertise}</p>
        <span className="block w-10 h-px bg-gold/60 mt-3 mb-5" />

        <h3 className="font-display text-navy text-[1.9rem] md:text-[2.4rem] leading-[1.05]">
          {g.name}
        </h3>
        <p className="font-editorial italic text-gold text-[1.05rem] md:text-[1.2rem] leading-snug mt-3">
          {g.role}
        </p>

        <p className="font-editorial text-navy/85 text-[1.1rem] md:text-[1.18rem] leading-[1.75] mt-7 max-w-2xl">
          {g.bio}
        </p>

        {g.tags?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {g.tags.map((t) => (
              <span key={t} className="font-caps text-[0.55rem] tracking-[0.22em] text-navy/75 border border-navy/25 px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

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

      {/* Lead Faculty — full editorial spread */}
      {lead && <LeadFacultyBlock lead={lead} />}

      {/* Guest Lecturers — alternating editorial rows */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold">Visiting Faculty &amp; Industry Experts</p>
            <span className="block w-12 h-px bg-gold/60 mx-auto mt-4 mb-7" />
            <h2 className="font-display text-navy text-[2.1rem] md:text-[2.8rem] leading-[1.08]">
              Practitioners who bring the field <span className="italic font-editorial text-gold">into the cohort.</span>
            </h2>
          </div>

          <div className="space-y-24 md:space-y-32 max-w-6xl mx-auto">
            {guestLecturers.map((g, i) => (
              <GuestRow key={g.slug || g._id} g={g} index={i} />
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
            <Link to="/programs" className="btn-gold" data-testid="faculty-cta-explore-programs">
              Explore Programs <ArrowRight size={16} />
            </Link>
            <Link to="/apply" className="btn-outline-gold" data-testid="faculty-cta-apply">
              Apply Now <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
