import React from 'react';
import {
  GraduationCap, Cpu, Rocket, Globe2, Video, Briefcase,
  Award, Users, Sparkles, ShieldCheck, BookOpen, Lightbulb,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';

const ICONS = {
  cpu: Cpu, graduation: GraduationCap, rocket: Rocket, globe: Globe2,
  video: Video, briefcase: Briefcase, award: Award, users: Users,
  sparkles: Sparkles, shield: ShieldCheck, book: BookOpen, idea: Lightbulb,
};

const DEFAULTS = [
  { icon: 'cpu', title: '15+ Years Machine Learning Experience' },
  { icon: 'graduation', title: 'Former NYU & Columbia Faculty' },
  { icon: 'rocket', title: 'Learn from an AI Entrepreneur' },
  { icon: 'globe', title: 'Multi-industry Expert Guest Lecturers' },
  { icon: 'video', title: 'Taught Live with Personal Attention' },
  { icon: 'briefcase', title: 'Portfolio + Job Placement Services' },
];

/**
 * USP highlights — 6 (or N) bullet-cards with icon + title.
 * Stored under home.usps array. Each item: { icon, title, body? }
 */
export default function USPHighlights() {
  const ctx = useSiteContent();
  const sections = ctx?.home?.sections || {};
  const items = (ctx?.home?.usps && ctx.home.usps.length > 0) ? ctx.home.usps : DEFAULTS;

  return (
    <section data-cms-section="home-usps" className="bg-bone py-12 md:py-16 relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gold/40" />

      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow mb-3" data-cms-path="sections.uspsEyebrow">{sections.uspsEyebrow || 'Why Epsilon'}</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[1.7rem] md:text-[2.4rem] leading-tight mt-4 max-w-2xl" data-cms-path="sections.uspsTitle">
              {sections.uspsTitle || 'A small school. Serious credentials.'}
            </h2>
          </div>
          <p className="font-editorial italic text-navy/65 text-base md:text-lg max-w-md" data-cms-path="sections.uspsSubtitle">
            {sections.uspsSubtitle || 'Six commitments that make the difference between watching a course and becoming a practitioner.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((u, i) => {
            const Icon = ICONS[u.icon] || Sparkles;
            return (
              <div
                key={i}
                className="group relative bg-white border border-navy/10 p-5 md:p-6 hover:border-gold transition-colors duration-300 overflow-hidden"
              >
                <span className="absolute top-0 left-0 h-px w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 border border-gold/40 text-gold group-hover:bg-gold group-hover:text-navy-deep group-hover:border-gold transition-all duration-300">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-caps text-[0.7rem] text-navy/90 tracking-[0.14em] leading-snug"
                      data-cms-path={`usps.${i}.title`}
                    >
                      {u.title}
                    </p>
                    {u.body && (
                      <p className="font-editorial text-navy/65 text-sm leading-relaxed mt-2" data-cms-path={`usps.${i}.body`}>
                        {u.body}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
