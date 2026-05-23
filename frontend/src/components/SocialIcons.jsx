import React from 'react';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';

/**
 * Renders a row of social icons. Each icon is only rendered if its URL exists.
 * URLs are stored in site_content.home.social = { instagram, facebook, linkedin, youtube }
 *
 * Props:
 *  - size: icon px size (default 16)
 *  - tone: "dark" (on cream/bone) | "light" (on navy)
 *  - className: optional wrapper className
 *  - testidPrefix: optional prefix for data-testid
 */
const ICONS = [
  { key: 'instagram', Icon: Instagram, label: 'Instagram' },
  { key: 'facebook', Icon: Facebook, label: 'Facebook' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn' },
  { key: 'youtube', Icon: Youtube, label: 'YouTube' },
];

export default function SocialIcons({ size = 16, tone = 'light', className = '', testidPrefix = 'social' }) {
  const ctx = useSiteContent();
  const social = ctx?.home?.social || {};
  const items = ICONS.filter(({ key }) => !!social[key]);
  if (items.length === 0) return null;

  const isLight = tone === 'light';
  const baseBtn = isLight
    ? 'border border-gold/30 text-cream/85 hover:text-navy-deep hover:bg-gold hover:border-gold'
    : 'border border-navy/15 text-navy/80 hover:text-navy-deep hover:bg-gold hover:border-gold';

  return (
    <div className={`flex items-center gap-2.5 ${className}`} data-testid={`${testidPrefix}-icons`}>
      {items.map(({ key, Icon, label }) => (
        <a
          key={key}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-testid={`${testidPrefix}-${key}`}
          className={`inline-flex items-center justify-center w-9 h-9 transition-colors duration-300 ${baseBtn}`}
        >
          <Icon size={size} strokeWidth={1.6} />
        </a>
      ))}
    </div>
  );
}
