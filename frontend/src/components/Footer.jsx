import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, LogIn } from 'lucide-react';
import { programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function Footer() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  const home = ctx?.home || {};
  const contact = home.contact || {};
  
  // Use footer data from context if available, otherwise fallback to defaults
  const footerData = ctx?.footer || {};
  const programsCol = footerData.programsColumn || { title: 'Programs', links: [] };
  const discoverCol = footerData.discoverColumn || {
    title: 'Discover',
    links: [
      { label: 'Home', url: '/' },
      { label: 'Faculty', url: '/faculty' },
      { label: 'About', url: '/about' },
    ],
  };
  const getTouchCol = footerData.getTouchColumn || {
    title: 'Get in Touch',
    links: [
      { label: 'Apply', url: '/apply' },
      { label: 'Contact', url: '/contact' },
    ],
  };
  const signInUrl = footerData.signInUrl || home.footer?.signInUrl || 'https://moodle.org/login/index.php';
  const copyright = footerData.copyright || '© 2026 Epsilon Executive Education · All rights reserved';
  const bottomLinks = footerData.bottomLinks || [
    { label: 'Privacy', url: '/about' },
    { label: 'Terms', url: '/about' },
    { label: 'Press', url: '/contact' },
  ];

  return (
    <footer className="bg-navy-deep text-cream pt-16 pb-10 border-t border-gold/10 relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
      <div className="container-x relative">
        {/* 4 columns in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Programs */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">{programsCol.title}</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              {programsCol.links.map((link, i) => (
                <li key={i}>
                  <Link to={link.url} className="text-cream/85 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* Dynamic program list */}
              {programs.map((p) => (
                <li key={p.slug || p._id}>
                  <Link to={`/programs/${p.slug}`} className="text-cream/85 hover:text-gold transition-colors">
                    {p.subtitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">{discoverCol.title}</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              {discoverCol.links.map((link, i) => (
                <li key={i}>
                  <Link to={link.url} className="text-cream/85 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">{getTouchCol.title}</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              {getTouchCol.links.map((link, i) => (
                <li key={i}>
                  {link.url.startsWith('http') ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/85 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.url} className="text-cream/85 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={signInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/85 hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <LogIn size={13} /> Sign In to Learn
                </a>
              </li>
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">Reach Us</p>
            <ul className="space-y-5 font-sans text-[0.92rem]">
              <li className="flex gap-3">
                <Mail size={16} className="text-gold mt-1 flex-shrink-0" />
                <a
                  href={`mailto:${contact.email || 'admissions@epsilonexec.com'}`}
                  className="text-cream/85 hover:text-gold transition-colors break-all"
                >
                  {contact.email || 'admissions@epsilonexec.com'}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-cream/85">{contact.phone || '+91 · on request'}</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-cream/85">{contact.address || 'Live online · cohorts based in India'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-cream/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em]">
            {copyright}
          </p>
          <div className="flex gap-6">
            {bottomLinks.map((link, i) => (
              <Link
                key={i}
                to={link.url}
                className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em] hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
