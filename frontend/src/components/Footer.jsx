import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../mock';

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-cream pt-20 pb-10 border-t border-gold/10 relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={LOGO_URL} alt="Epsilon" className="h-14 w-auto object-contain mb-5" />
            <p className="font-editorial text-[1.15rem] leading-relaxed text-cream/80 max-w-md">
              Epsilon Executive Education — turning technical fluency into strategic value. Live online cohort-based programmes for working professionals.
            </p>
          </div>

          <div>
            <p className="font-caps text-[0.65rem] text-gold mb-5">Learn</p>
            <ul className="space-y-3 font-sans text-sm">
              <li><Link to="/programs" className="text-cream/80 hover:text-gold transition-colors">Programmes</Link></li>
              <li><Link to="/faculty" className="text-cream/80 hover:text-gold transition-colors">Faculty</Link></li>
              <li><Link to="/admissions" className="text-cream/80 hover:text-gold transition-colors">Admissions</Link></li>
              <li><Link to="/insights" className="text-cream/80 hover:text-gold transition-colors">Insights</Link></li>
              <li><Link to="/events" className="text-cream/80 hover:text-gold transition-colors">Events</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-caps text-[0.65rem] text-gold mb-5">Connect</p>
            <ul className="space-y-3 font-sans text-sm">
              <li><Link to="/about" className="text-cream/80 hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-cream/80 hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/apply" className="text-cream/80 hover:text-gold transition-colors">Apply</Link></li>
              <li><a href="https://moodle.org/login/index.php" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-gold transition-colors">Sign In to Moodle</a></li>
              <li className="text-cream/60 text-xs">admissions@epsilon-edu.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em]">© 2026 Epsilon Executive Education · All rights reserved</p>
          <p className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em]">Live online · Cohorts based in India</p>
        </div>
      </div>
    </footer>
  );
}
