import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown, Building2 } from 'lucide-react';
import { LOGO_URL, programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function Navbar() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  const logoUrl = ctx?.logoUrl || LOGO_URL;
  const signInUrl = ctx?.home?.footer?.signInUrl || 'https://moodle.org/login/index.php';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setProgOpen(false); }, [pathname]);

  const transparent = onHome && !scrolled;

  const baseNav = 'font-caps text-[0.7rem] font-semibold tracking-[0.2em] transition-colors';
  const navColor = 'text-cream hover:text-gold';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-navy-deep/30 backdrop-blur-sm'
          : 'bg-navy-deep/95 backdrop-blur border-b border-gold/10'
      }`}
    >
      <div className="container-x flex items-center justify-between h-[140px]">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="Epsilon" className="h-[113px] w-auto object-contain logo-white" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          <div
            className="relative"
            onMouseEnter={() => setProgOpen(true)}
            onMouseLeave={() => setProgOpen(false)}
          >
            <NavLink to="/programs" className={`${baseNav} ${navColor} flex items-center gap-1`}>
              Programs <ChevronDown size={12} strokeWidth={2} />
            </NavLink>
            {progOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                <div className="bg-navy-deep text-cream border border-gold/20 shadow-2xl w-[380px] p-2">
                  {programs.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/programs/${p.slug}`}
                      className="block px-4 py-3 hover:bg-navy transition-colors"
                    >
                      <div className="font-display text-sm text-cream leading-tight">{p.subtitle}</div>
                      <div className="font-caps text-[0.6rem] text-gold mt-1">{p.weeks} weeks · {p.levelLabel}</div>
                    </Link>
                  ))}

                  {/* Corporate Program (private cohort offering) */}
                  <Link
                    to="/corporate"
                    data-testid="nav-corporate-program-link"
                    className="block px-4 py-3 hover:bg-navy transition-colors border-t border-gold/15 mt-1"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-gold" />
                      <div className="font-display text-sm text-cream leading-tight">Corporate Program</div>
                    </div>
                    <div className="font-caps text-[0.6rem] text-gold mt-1 ml-6">Private cohorts for teams</div>
                  </Link>

                  <div className="border-t border-gold/10 mt-1 pt-1">
                    <Link to="/programs" className="block px-4 py-3 hover:bg-navy transition-colors font-caps text-[0.65rem] text-gold">
                      View all programs →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <NavLink to="/faculty" className={`${baseNav} ${navColor}`}>Faculty</NavLink>
          <NavLink to="/about" className={`${baseNav} ${navColor}`}>About</NavLink>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <NavLink to="/apply" data-testid="nav-apply-btn" className="btn-gold">
            Apply Now
          </NavLink>
          <a
            href={signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-signin-btn"
            className="btn-outline-gold"
          >
            <LogIn size={14} /> Sign In
          </a>
        </div>

        <button
          className="lg:hidden text-cream"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-deep text-cream border-t border-gold/20">
          <div className="container-x py-6 flex flex-col gap-5">
            <Link to="/programs" className="font-caps text-sm text-cream tracking-[0.2em]">Programs</Link>
            <Link to="/corporate" className="font-caps text-sm text-cream tracking-[0.2em] pl-4 border-l border-gold/30">Corporate Program</Link>
            <Link to="/faculty" className="font-caps text-sm text-cream tracking-[0.2em]">Faculty</Link>
            <Link to="/about" className="font-caps text-sm text-cream tracking-[0.2em]">About</Link>
            <div className="flex gap-3 mt-2">
              <Link to="/apply" className="btn-gold">Apply Now</Link>
              <a href={signInUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                <LogIn size={14} /> Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
