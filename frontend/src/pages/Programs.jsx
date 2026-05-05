import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Filter } from 'lucide-react';
import PageHero from '../components/PageHero';
import { programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';

const FILTERS = [
  { key: 'all', label: 'All Programs' },
  { key: 'mid', label: 'Mid Career' },
  { key: 'senior', label: 'Senior Leadership' },
];

export default function Programs() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  const [filter, setFilter] = useState('all');
  const list = programs.filter((p) => filter === 'all' || p.level === filter);

  return (
    <div>
      <PageHero
        eyebrow="Programs"
        title="Cohorts that produce work-ready capability."
        subtitle="Each program is designed for working professionals who want to translate technical fluency into evidence-based business action."
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <span className="font-caps text-[0.65rem] text-navy/60 flex items-center gap-2 mr-2">
              <Filter size={13} /> Filter
            </span>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`font-caps text-[0.65rem] tracking-[0.2em] px-4 py-2 border transition-colors ${
                  filter === f.key
                    ? 'bg-navy-deep text-cream border-navy-deep'
                    : 'bg-transparent text-navy border-navy/30 hover:border-gold hover:text-gold'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="font-editorial text-navy/60 text-xl py-20 text-center">No programs match this filter.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  to={`/programs/${p.slug}`}
                  className="group bg-white border border-navy/10 hover:border-gold/60 transition-colors overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="font-caps text-[0.6rem] text-gold">{p.weeks} weeks · {p.levelLabel}</p>
                    <h3 className="font-display text-navy text-[1.6rem] leading-tight mt-3">{p.subtitle}</h3>
                    <p className="font-editorial italic text-navy/70 mt-2 text-lg">{p.tagline}</p>
                    <p className="font-sans text-navy/70 text-sm leading-relaxed mt-4">{p.short}</p>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-navy/10 mt-6">
                      <span className="font-display text-navy">{p.fee}</span>
                      <span className="link-gold">Explore <ArrowUpRight size={13} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
