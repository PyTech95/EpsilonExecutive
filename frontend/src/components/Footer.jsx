import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, LogIn } from 'lucide-react';
import { LOGO_URL, programs } from '../mock';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    try { localStorage.setItem('epsilon_subscriber_'+Date.now(), email); } catch {}
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-navy-deep text-cream pt-24 pb-10 border-t border-gold/10 relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand + email signup */}
          <div className="lg:col-span-2">
            <img src={LOGO_URL} alt="Epsilon" className="h-[90px] w-auto object-contain mb-6 -ml-1" />
            <p className="font-editorial text-[1.1rem] leading-relaxed text-cream/80 max-w-md">
              Turning technical fluency into strategic value &mdash; executive education for the AI era.
            </p>

            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mt-10 mb-3">Stay in the Loop</p>
            <form onSubmit={onSubscribe} className="flex items-center border-b border-cream/30 max-w-sm">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-cream placeholder:text-cream/40 py-3 outline-none font-sans text-sm"
              />
              <button type="submit" className="text-gold p-2 hover:text-cream transition-colors" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
            {subscribed && <p className="font-caps text-[0.6rem] text-gold mt-3">Thank you · we&rsquo;ll be in touch.</p>}
          </div>

          {/* Programmes */}
          <div>
            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-5">Programmes</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              <li><Link to="/programs" className="text-cream/85 hover:text-gold transition-colors">All Programmes</Link></li>
              {programs.map((p) => (
                <li key={p.slug}>
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
              <li><Link to="/faculty" className="text-cream/85 hover:text-gold transition-colors">Faculty</Link></li>
              <li><Link to="/admissions" className="text-cream/85 hover:text-gold transition-colors">Admissions</Link></li>
              <li><Link to="/about" className="text-cream/85 hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/insights" className="text-cream/85 hover:text-gold transition-colors">Insights</Link></li>
              <li><Link to="/events" className="text-cream/85 hover:text-gold transition-colors">Events</Link></li>
            </ul>

            <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mt-10 mb-5">Get in Touch</p>
            <ul className="space-y-3 font-sans text-[0.95rem]">
              <li><Link to="/apply" className="text-cream/85 hover:text-gold transition-colors">Apply</Link></li>
              <li><Link to="/contact" className="text-cream/85 hover:text-gold transition-colors">Contact</Link></li>
              <li>
                <a href="https://moodle.org/login/index.php" target="_blank" rel="noopener noreferrer"
                   className="text-cream/85 hover:text-gold transition-colors inline-flex items-center gap-2">
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
                <a href="mailto:admissions@epsilon-edu.in" className="text-cream/85 hover:text-gold transition-colors break-all">
                  admissions@epsilon-edu.in
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-cream/85">+91 · on request</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-cream/85">Live online · cohorts based in India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-caps text-[0.6rem] text-cream/70 tracking-[0.22em]">© 2026 Epsilon Executive Education · All rights reserved</p>
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
