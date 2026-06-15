import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { insights as mockInsights } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function Insights() {
  const ctx = useSiteContent();
  const insights = ctx?.insights?.length ? ctx.insights : [];
  const featured = insights.find((i) => i.featured);
  const rest = insights.filter((i) => !i.featured);
  const ph = ctx?.home?.pages?.insights?.hero || {};

  return (
    <div>
      <PageHero
        eyebrow={ph.eyebrow || 'Insights'}
        title={ph.title || 'Essays for the people who decide.'}
        subtitle={ph.subtitle || 'Frameworks, field notes, and provocations from Epsilon faculty on applied AI, decision science, and the craft of leading through ambiguity.'}
        pathPrefix="pages.insights.hero"
      />

      <section data-cms-section="insights-grid" className="bg-cream py-10 md:py-20">
        <div className="container-x">
          {featured && (
            <Link to={`/insights/${featured.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-caps text-[0.6rem] text-gold">Featured</span>
                  <span className="w-1 h-1 rounded-full bg-navy/40" />
                  <span className="font-caps text-[0.6rem] text-navy/60">{featured.category}</span>
                </div>
                <h2 className="font-display text-navy text-[1.8rem] md:text-[2.6rem] leading-[1.1] group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="font-editorial text-navy/75 text-[1.2rem] leading-relaxed mt-5">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-sm text-navy/60">
                  <span className="font-display">{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="link-gold mt-7 inline-flex w-fit">Read the Essay <ArrowUpRight size={13} /></span>
              </div>
            </Link>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            {rest.map((a) => (
              <Link key={a.slug} to={`/insights/${a.slug}`} className="group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="font-caps text-[0.6rem] text-gold mt-5">{a.category}</p>
                <h3 className="font-display text-navy text-[1.4rem] md:text-[1.6rem] leading-tight mt-2 group-hover:text-gold transition-colors">
                  {a.title}
                </h3>
                <p className="font-editorial text-navy/70 text-lg leading-relaxed mt-3">{a.excerpt}</p>
                <p className="font-caps text-[0.6rem] text-navy/60 mt-4">{a.author} · {a.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
