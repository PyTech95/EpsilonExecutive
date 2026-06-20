import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { insights as mockInsights } from '../mock';
import { useSiteContent } from '../context/SiteContent';

// Custom renderers so markdown picks up the editorial typography of the site
const mdComponents = {
  h1: ({ node, ...props }) => (
    <h2 className="font-display text-navy text-[1.9rem] md:text-[2.3rem] leading-tight mt-12 mb-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="font-display text-navy text-[1.6rem] md:text-[2rem] leading-tight mt-10 mb-3" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="font-display text-navy text-[1.3rem] md:text-[1.55rem] leading-tight mt-8 mb-3" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="font-caps text-[0.75rem] text-gold tracking-[0.22em] mt-7 mb-2" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="font-editorial text-navy text-[1.15rem] md:text-[1.2rem] leading-[1.8] mb-5" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc pl-6 space-y-2 mb-6 font-editorial text-navy text-[1.1rem] leading-[1.75]" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-6 font-editorial text-navy text-[1.1rem] leading-[1.75]" {...props} />
  ),
  li: ({ node, ...props }) => <li className="pl-1" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="font-editorial italic text-navy/80 text-[1.3rem] md:text-[1.4rem] leading-relaxed border-l-2 border-gold pl-6 my-7" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a className="text-gold underline hover:text-gold/80 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  strong: ({ node, ...props }) => <strong className="text-navy font-semibold" {...props} />,
  em: ({ node, ...props }) => <em className="italic text-navy/85" {...props} />,
  hr: () => <hr className="border-t border-navy/10 my-10" />,
  code: ({ node, ...props }) => (
    <code className="font-mono text-[0.92em] bg-bone border border-navy/10 px-1.5 py-0.5 rounded" {...props} />
  ),
};

export default function InsightDetail() {
  const { slug } = useParams();
  const ctx = useSiteContent();
  const insights = ctx?.insights?.length ? ctx.insights : [];
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
  // Body may be either an array of paragraphs (legacy) or a single markdown string.
  // Join arrays with blank lines so paragraph breaks are preserved.
  const body = Array.isArray(article.body) ? article.body.join('\n\n') : (article.body || '');

  return (
    <div>
      <section className="relative bg-navy-deep text-cream pt-[180px] pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={article.image} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,19,31,0.6), rgba(8,19,31,0.95))' }} />
        </div>
        <div className="relative container-x max-w-4xl">
          <Link to="/insights" className="link-gold mb-8 inline-flex">← Insights</Link>
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
          {article.excerpt && (
            <p className="font-editorial italic text-navy/80 text-[1.35rem] leading-relaxed border-l-2 border-gold pl-6 mb-10">
              {article.excerpt}
            </p>
          )}
          <article className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {body}
            </ReactMarkdown>
          </article>
        </div>
      </section>

      <section className="bg-bone py-10 md:py-20">
        <div className="container-x">
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
