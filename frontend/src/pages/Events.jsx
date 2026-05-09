import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Video } from 'lucide-react';
import PageHero from '../components/PageHero';
import { events as mockEvents } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function Events() {
  const ctx = useSiteContent();
  const events = ctx?.events?.length ? ctx.events : mockEvents;
  return (
    <div>
      <PageHero
        eyebrow="Events"
        title="Live with us. Before you commit."
        subtitle="Free webinars, alumni panels, and hands-on workshops. The fastest way to feel how we teach before you apply."
      />

      <section className="bg-cream py-10 md:py-20">
        <div className="container-x space-y-8">
          {events.map((e, i) => (
            <div key={e.id} className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0 bg-white border border-navy/10 overflow-hidden group hover:border-gold/50 transition-colors">
              <div className="aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden relative">
                <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="font-caps text-[0.6rem] text-gold w-fit">{e.type}</span>
                <h3 className="font-display text-navy text-[1.6rem] md:text-[2rem] leading-tight mt-3">{e.title}</h3>
                <p className="font-editorial text-navy/75 text-[1.1rem] leading-relaxed mt-4">{e.description}</p>
                <div className="mt-6 flex flex-wrap gap-5 text-sm text-navy/70">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-gold" /> {e.date}</span>
                  <span className="flex items-center gap-2"><Clock size={14} className="text-gold" /> {e.time} · {e.duration}</span>
                  <span className="flex items-center gap-2"><Video size={14} className="text-gold" /> {e.platform}</span>
                </div>
                <Link to="/contact" className="btn-gold mt-7 w-fit">{e.cta} <ArrowRight size={16} /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
