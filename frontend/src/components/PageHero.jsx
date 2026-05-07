import React from 'react';

export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative bg-navy-deep text-cream pt-[130px] md:pt-[200px] pb-12 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />
      <div className="container-x relative">
        {eyebrow && <p className="eyebrow mb-4 md:mb-5">{eyebrow}</p>}
        <h1 className="font-display text-[1.9rem] sm:text-[2.4rem] md:text-[4.2rem] leading-[1.05] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="font-editorial text-[1.02rem] md:text-[1.4rem] leading-relaxed text-cream/80 mt-5 md:mt-7 max-w-3xl">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7 md:mt-9">{children}</div>}
      </div>
    </section>
  );
}
