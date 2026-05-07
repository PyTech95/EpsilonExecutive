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
  const footer = home.footer || {};

  return (
    <footer className="bg-navy-deep text-cream pt-16 pb-10 border-t border-gold/10 relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
      <div className="container-x relative">
        {/* 4 columns in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Programs */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">Programs</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              <li><Link to="/programs" className="text-cream/85 hover:text-gold transition-colors">All Programs</Link></li>
              {programs.map((p) => (
                <li key={p.slug || p._id}>
                  <Link to={`/programs/${p.slug}`} className="text-cream/85 hover:text-gold transition-colors">
                    {p.subtitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">Discover</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              <li><Link to="/" className="text-cream/85 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/faculty" className="text-cream/85 hover:text-gold transition-colors">Faculty</Link></li>
              <li><Link to="/admissions" className="text-cream/85 hover:text-gold transition-colors">Admissions</Link></li>
              <li><Link to="/about" className="text-cream/85 hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/insights" className="text-cream/85 hover:text-gold transition-colors">Insights</Link></li>
              <li><Link to="/events" className="text-cream/85 hover:text-gold transition-colors">Events</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">Get in Touch</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              <li><Link to="/apply" className="text-cream/85 hover:text-gold transition-colors">Apply</Link></li>
              <li><Link to="/contact" className="text-cream/85 hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/schedule" className="text-cream/85 hover:text-gold transition-colors">Schedule a Call</Link></li>
              <li><Link to="/corporate" className="text-cream/85 hover:text-gold transition-colors">Corporate Program</Link></li>
              <li>
                <a
                  href={footer.signInUrl || 'https://moodle.org/login/index.php'}
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
                  href={`mailto:${contact.email || 'admissions@epsilon-edu.in'}`}
                  className="text-cream/85 hover:text-gold transition-colors break-all"
                >
                  {contact.email || 'admissions@epsilon-edu.in'}
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
            {footer.copyright || '© 2026 Epsilon Executive Education · All rights reserved'}
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em] hover:text-gold transition-colors">Privacy</Link>
            <Link to="/about" className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em] hover:text-gold transition-colors">Terms</Link>
            <Link to="/contact" className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em] hover:text-gold transition-colors">Press</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
