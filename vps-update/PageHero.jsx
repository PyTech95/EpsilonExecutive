import React from 'react';

/**
 * Generic page hero. If `pathPrefix` is provided (e.g. "about.hero"),
 * the eyebrow/title/subtitle gain data-cms-path attributes so the
 * live frontend editor can target them.
 */
export default function PageHero({ eyebrow, title, subtitle, children, pathPrefix }) {
  const p = (k) => (pathPrefix ? `${pathPrefix}.${k}` : undefined);
  return (
    <section data-cms-section={pathPrefix ? `${pathPrefix.replace(/\./g, '-')}-section` : undefined} className="relative bg-navy-deep text-cream pt-[110px] md:pt-[160px] pb-8 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />
      <div className="container-x relative">
        {eyebrow && <p className="eyebrow mb-4 md:mb-5" data-cms-path={p('eyebrow')}>{eyebrow}</p>}
        <h1 className="font-display text-[1.9rem] sm:text-[2.4rem] md:text-[4.2rem] leading-[1.05] max-w-4xl" data-cms-path={p('title')}>
          {title}
        </h1>
        {subtitle && (
          <p className="font-editorial text-[1.02rem] md:text-[1.4rem] leading-relaxed text-cream/80 mt-5 md:mt-7 max-w-3xl" data-cms-path={p('subtitle')}>
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7 md:mt-9">{children}</div>}
      </div>
    </section>
  );
}
