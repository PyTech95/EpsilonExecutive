import React from 'react';

/**
 * Chapter-style section header used across the home page.
 * - Roman numeral chapter mark
 * - Eyebrow in gold caps
 * - Gold rule divider
 * - Large display title (optionally with italic gold accent)
 * - Optional subtitle in editorial serif
 *
 * Pass `pathPrefix` (e.g. "sections.brochure") to make the eyebrow/title/
 * accent/subtitle editable through the live frontend editor.
 */
export default function SectionHeader({
  chapter,
  eyebrow,
  title,
  accent,          // italic gold portion rendered AFTER title
  accentFirst,     // if true, accent rendered BEFORE title
  subtitle,
  align = 'left',  // 'left' | 'center'
  tone = 'light',  // 'light' (cream bg) | 'dark' (navy bg)
  className = '',
  pathPrefix,
}) {
  const titleColor = tone === 'dark' ? 'text-cream' : 'text-navy';
  const subColor = tone === 'dark' ? 'text-cream/75' : 'text-navy/75';
  const chapterColor = tone === 'dark' ? 'text-cream/40' : 'text-navy/35';
  const isCenter = align === 'center';
  const p = (k) => (pathPrefix ? `${pathPrefix}.${k}` : undefined);

  return (
    <div className={`${isCenter ? 'text-center' : ''} ${className}`}>
      {chapter && (
        <p className={`font-editorial italic ${chapterColor} text-[0.95rem] tracking-widest leading-tight mt-[30px] mb-[30px] md:mt-0 md:mb-2`} data-cms-path={p('chapter')}>
          — {chapter} —
        </p>
      )}
      {eyebrow && <p className="eyebrow mt-0 mb-1 md:mt-0 md:mb-4" data-cms-path={p('eyebrow')}>{eyebrow}</p>}
      <div className={isCenter ? 'flex justify-center' : ''}>
        <span className="gold-rule-lg" />
      </div>
      <h2 className={`font-display ${titleColor} text-[2rem] md:text-[3rem] lg:text-[3.4rem] leading-[1.05] mt-1 md:mt-6 ${isCenter ? 'max-w-4xl mx-auto' : 'max-w-4xl'}`} data-cms-path={p('title')}>
        {accentFirst && accent && (
          <>
            <span className="italic font-editorial text-gold" data-cms-path={p('accent')}>{accent}</span>{' '}
          </>
        )}
        {title}
        {!accentFirst && accent && (
          <>
            {' '}<span className="italic font-editorial text-gold" data-cms-path={p('accent')}>{accent}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className={`font-editorial ${subColor} text-[1.15rem] md:text-[1.3rem] leading-relaxed mt-3 md:mt-6 ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`} data-cms-path={p('subtitle')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Gold diamond ornament used between sections.
 */
export function SectionOrnament({ tone = 'light' }) {
  const lineColor = tone === 'dark' ? 'bg-gold/30' : 'bg-navy/15';
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <span className={`block h-px w-20 ${lineColor}`} />
      <span className="text-gold text-xs rotate-45 inline-block">◆</span>
      <span className={`block h-px w-20 ${lineColor}`} />
    </div>
  );
}
