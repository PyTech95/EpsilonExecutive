import React, { useState } from 'react';
import { leadFaculty as mockLead, guestLecturers as mockGuests } from '../mock';
import { useSiteContent } from '../context/SiteContent';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

export default function FacultyShowcase() {
  const ctx = useSiteContent();
  const lead = (ctx?.leadFaculty?.[0]) || mockLead[0];
  const guestLecturers = (ctx?.guestLecturers?.length ? ctx.guestLecturers : mockGuests);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onOpenFaculty = (g) => {
    setSelected(g);
    setOpen(true);
  };

  return (
    <section className="relative bg-navy-deep text-cream pt-12 pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />

      <div className="container-x relative">
        {/* Lead instructor split */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr] gap-12 lg:gap-20 items-center">
          {/* Portrait with gold badge */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[440px]">
            <div className="aspect-[4/5] overflow-hidden bg-navy">
              <img
                src={lead.image}
                alt={lead.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gold badge bottom-right overlay */}
            <div className="absolute right-[-10px] bottom-[-10px] md:right-[-14px] md:bottom-[-14px] bg-gold text-navy-deep px-7 py-5 md:px-9 md:py-6 max-w-[75%]">
              <p className="font-caps text-[0.65rem] tracking-[0.22em] text-navy-deep/80 mb-1">
                {lead.badge}
              </p>
              <p className="font-display text-navy-deep text-[1.15rem] md:text-[1.35rem] leading-tight">
                {lead.name}
              </p>
            </div>
          </div>

          {/* Right content */}
          <div>
            <h3 className="font-editorial italic text-gold text-[1.6rem] md:text-[2rem] leading-tight mb-6">
              {lead.heroHeading}
            </h3>
            <p className="font-sans text-cream/90 text-[1rem] md:text-[1.08rem] leading-[1.8] max-w-2xl">
              {lead.heroBlurb}
            </p>

            {/* Credentials split */}
            <div className="mt-10 grid grid-cols-2 gap-8 max-w-xl border-t border-b border-gold/25 py-7">
              {lead.credentials.map((c) => (
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
          </div>
        </div>

        {/* Visiting Faculty & Industry Experts */}
        <div className="mt-24 md:mt-28">
          <p className="font-caps text-[0.72rem] tracking-[0.28em] text-cream/65 text-center">
            Visiting Faculty &amp; Industry Experts
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {guestLecturers.map((g) => (
              <button
                type="button"
                key={g.slug || g._id}
                onClick={() => onOpenFaculty(g)}
                data-testid={`guest-faculty-card-${g.slug || g._id}`}
                className="flex flex-col items-center text-center group focus:outline-none cursor-pointer"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-gold/20 group-hover:border-gold/60 group-focus:border-gold/80 transition-colors">
                  <img
                    src={g.image}
                    alt={g.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="font-editorial italic text-cream text-[1.1rem] md:text-[1.2rem] mt-6 leading-tight group-hover:text-gold transition-colors">
                  {g.name}
                </p>
                <p className="font-caps text-[0.62rem] tracking-[0.25em] text-cream/60 mt-3">
                  {g.expertise}
                </p>
                <span className="font-caps text-[0.55rem] tracking-[0.22em] text-gold/0 group-hover:text-gold/80 transition-colors mt-3">
                  View Bio →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal — full bio */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          data-testid="faculty-bio-modal"
          className="max-w-3xl bg-bone border border-gold/40 p-0 overflow-hidden text-navy"
        >
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
              {/* Portrait */}
              <div className="relative bg-navy-deep">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent md:bg-none" />
                <div className="md:hidden absolute bottom-4 left-5 right-5">
                  <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold">{selected.expertise}</p>
                  <p className="font-display text-cream text-[1.4rem] leading-tight mt-1">{selected.name}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="p-7 md:p-9 max-h-[80vh] overflow-y-auto">
                <DialogHeader className="text-left">
                  <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold hidden md:block">
                    {selected.expertise}
                  </p>
                  <DialogTitle className="font-display text-navy text-[1.6rem] md:text-[1.9rem] leading-tight mt-1">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="font-editorial italic text-gold text-[1rem] md:text-[1.1rem] leading-snug mt-1">
                    {selected.role}
                  </DialogDescription>
                </DialogHeader>

                <div className="w-12 h-px bg-gold/50 mt-5" />

                <p className="font-editorial text-navy/85 text-[1.02rem] md:text-[1.1rem] leading-relaxed mt-6">
                  {selected.bio}
                </p>

                {selected.tags?.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-1.5">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="font-caps text-[0.55rem] tracking-[0.22em] text-navy/70 border border-navy/20 px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
