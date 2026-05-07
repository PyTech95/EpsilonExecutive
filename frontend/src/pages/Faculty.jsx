import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { leadFaculty as mockLead, guestLecturers as mockGuests } from '../mock';
import { useSiteContent } from '../context/SiteContent';

/* ---------- Lead Faculty: image left, text right; text never overflows below image ---------- */
function LeadFacultyBlock({ lead }) {
  return (
    <section className="relative bg-navy-deep text-cream py-14 md:py-16 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-35 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />

      <div className="container-x relative">
        <p className="font-caps text-[0.62rem] tracking-[0.28em] text-gold mb-3">Lead Faculty</p>
        <span className="block w-10 h-px bg-gold/60 mb-8" />

        {/*
          The grid cells stretch to the same height; the image fills the cell,
          and the text column is internally scroll-free with a subtle inner
          scroll fallback so it never extends past the image height.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-14 items-stretch">
          {/* Portrait */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[420px] self-start">
            <div className="aspect-[4/5] overflow-hidden bg-navy">
              <img src={lead.image} alt={lead.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] md:right-[-14px] md:bottom-[-14px] bg-gold text-navy-deep px-6 py-4 max-w-[78%]">
              <p className="font-caps text-[0.6rem] tracking-[0.2em] text-navy-deep/80 mb-0.5">{lead.badge}</p>
              <p className="font-display text-navy-deep text-[1.1rem] md:text-[1.25rem] leading-tight">{lead.name}</p>
            </div>
          </div>

          {/* Content — capped to image height on desktop, with subtle inner scroll if needed */}
          <div className="lg:max-h-[600px] lg:overflow-y-auto faculty-scroll">
            <h2 className="font-display uppercase text-cream text-[1.7rem] md:text-[2.3rem] leading-[1.05]">
              {lead.name}
            </h2>
            <p className="font-editorial italic text-gold text-[1.05rem] md:text-[1.2rem] mt-2 leading-snug">
              {lead.role}
            </p>

            {/* Credentials — compact 2-col */}
            <div className="mt-6 grid grid-cols-2 gap-5 border-t border-b border-gold/25 py-5">
              {(lead.credentials || []).map((c) => (
                <div key={c.institution}>
                  <p className="font-editorial italic text-gold text-[1.1rem] md:text-[1.25rem] leading-tight">
                    {c.institution}
                  </p>
                  <p className="font-caps text-[0.55rem] tracking-[0.2em] text-cream/65 mt-1.5">
                    {c.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Bios — tightened spacing */}
            <p className="font-editorial italic text-gold/95 text-[1.1rem] md:text-[1.2rem] leading-snug mt-6">
              {lead.heroBlurb}
            </p>
            <div className="mt-4 space-y-3">
              {[lead.bio, lead.bio2, lead.bio3].filter(Boolean).map((para, i) => (
                <p key={i} className="font-sans text-cream/85 text-[0.95rem] md:text-[1rem] leading-[1.65]">
                  {para}
                </p>
              ))}
            </div>

            {/* Affiliations + tags — compact */}
            {(lead.affiliations?.length > 0 || lead.tags?.length > 0) && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {lead.affiliations?.length > 0 && (
                  <div>
                    <p className="font-caps text-[0.55rem] tracking-[0.2em] text-gold mb-2">Affiliations</p>
                    <ul className="space-y-1.5">
                      {lead.affiliations.map((a) => (
                        <li key={a} className="font-sans text-cream/80 text-[0.88rem] leading-snug flex gap-2">
                          <span className="text-gold mt-[2px]">·</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {lead.tags?.length > 0 && (
                  <div>
                    <p className="font-caps text-[0.55rem] tracking-[0.2em] text-gold mb-2">Areas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {lead.tags.map((t) => (
                        <span key={t} className="font-caps text-[0.5rem] tracking-[0.2em] text-cream/80 border border-gold/35 px-2.5 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Guest Faculty card: smaller portrait, vertical stack, consistent rhythm ---------- */
function GuestCard({ g }) {
  return (
    <article
      data-testid={`faculty-guest-card-${g.slug || g._id}`}
      className="group flex flex-col bg-white border border-navy/10 hover:border-gold/50 transition-colors"
    >
      <div className="aspect-[4/5] overflow-hidden bg-navy/5">
        <img
          src={g.image}
          alt={g.name}
          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <p className="font-caps text-[0.55rem] tracking-[0.22em] text-gold">{g.expertise}</p>
        <h3 className="font-display text-navy text-[1.2rem] md:text-[1.3rem] leading-tight mt-2">
          {g.name}
        </h3>
        <p className="font-editorial italic text-navy/70 text-[0.92rem] leading-snug mt-1.5">
          {g.role}
        </p>
        <p className="font-sans text-navy/75 text-[0.88rem] leading-relaxed mt-3">
          {g.bio}
        </p>
        {g.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {g.tags.map((t) => (
              <span key={t} className="font-caps text-[0.5rem] tracking-[0.2em] text-navy/70 border border-navy/20 px-2 py-1">
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

      {/* Lead Faculty */}
      {lead && <LeadFacultyBlock lead={lead} />}

      {/* Guest Lecturers — uniform 4-up grid, smaller portraits, no editorial flips */}
      <section className="bg-cream py-14 md:py-16">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-caps text-[0.62rem] tracking-[0.28em] text-gold">
              Visiting Faculty &amp; Industry Experts
            </p>
            <span className="block w-10 h-px bg-gold/60 mx-auto mt-3 mb-5" />
            <h2 className="font-display text-navy text-[1.7rem] md:text-[2.2rem] leading-[1.08]">
              Practitioners who bring the field <span className="italic font-editorial text-gold">into the cohort.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {guestLecturers.map((g) => (
              <GuestCard key={g.slug || g._id} g={g} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep text-cream py-14 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold" />
        <div className="container-x relative text-center">
          <h2 className="font-display uppercase text-[1.7rem] md:text-[2.4rem] leading-[1.08] max-w-3xl mx-auto">
            Learn from the people who <span className="italic font-editorial text-gold normal-case">do the work.</span>
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
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
