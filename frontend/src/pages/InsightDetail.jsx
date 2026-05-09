import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { insights as mockInsights } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function InsightDetail() {
  const { slug } = useParams();
  const ctx = useSiteContent();
  const insights = ctx?.insights?.length ? ctx.insights : mockInsights;
  const article = insights.find((i) => i.slug === slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-editorial text-2xl text-navy">Essay not found.</p>
          <Link to="/insights" className="link-gold mt-6 inline-flex">Back to Insights <ArrowUpRight size={13} /></Link>
        </div>
      </div>
    );
  }

  const related = insights.filter(i => i.slug !== slug).slice(0, 2);

  return (
    <div>
      <section className="relative bg-navy-deep text-cream pt-[180px] pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={article.image} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,19,31,0.6), rgba(8,19,31,0.95))' }} />
        </div>
        <div className="relative container-x max-w-4xl">
          <Link to="/insights" className="link-gold mb-8 inline-flex">← All Essays</Link>
          <p className="eyebrow mb-5">{article.category}</p>
          <h1 className="font-display text-[2.2rem] md:text-[3.6rem] leading-[1.05]">{article.title}</h1>
          <div className="mt-8 flex items-center gap-3 text-sm text-cream/70">
            <span className="font-display">{article.author}</span>
            <span>·</span><span>{article.date}</span>
            <span>·</span><span>{article.readTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-cream py-10 md:py-20">
        <div className="container-x max-w-3xl">
          <p className="font-editorial italic text-navy/80 text-[1.35rem] leading-relaxed border-l-2 border-gold pl-6">
            {article.excerpt}
          </p>
          <div className="mt-10 space-y-7">
            {article.body.map((p, i) => (
              <p key={i} className="font-editorial text-navy text-[1.2rem] leading-[1.8]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-10 md:py-20">
        <div className="container-x">
          <p className="eyebrow mb-4">More Reading</p>
          <span className="gold-rule-lg" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {related.map((a) => (
              <Link key={a.slug} to={`/insights/${a.slug}`} className="group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="font-caps text-[0.6rem] text-gold mt-4">{a.category}</p>
                <h3 className="font-display text-navy text-[1.4rem] mt-2 group-hover:text-gold transition-colors">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
