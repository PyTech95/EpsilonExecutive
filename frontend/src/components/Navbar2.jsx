import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown } from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';
import { programs as mockPrograms } from '../mock';

const BOXED_LOGO = 'https://customer-assets.emergentagent.com/job_logos-11/artifacts/4dwmzm3j_image.png';

/**
 * Home2 navbar — square boxed logo CENTERED, primary nav split left of logo,
 * secondary nav split right of logo. Apply (solid gold) and Sign In are pinned
 * to far-right of the bar so the logo never gets crowded.
 */
export default function Navbar2() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  const signInUrl = ctx?.home?.footer?.signInUrl || 'https://moodle.org/login/index.php';

  const [scrolled, setScrolled] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMobileOpen(false); setProgOpen(false); }, [pathname]);

  const baseNav = 'font-caps text-[0.72rem] font-semibold tracking-[0.2em] transition-colors';
  const navColor = 'text-cream hover:text-gold';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-deep/95 backdrop-blur border-b border-gold/15'
          : 'bg-navy-deep/40 backdrop-blur-sm'
      }`}
    >
      <div className="container-x grid grid-cols-[1fr_auto_1fr] items-center h-[120px] gap-6">
        {/* LEFT nav */}
        <nav className="hidden lg:flex items-center justify-end gap-9">
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
                <div className="bg-navy-deep text-cream border border-gold/20 shadow-2xl w-[360px] p-2">
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
                  <Link to="/corporate" className="block px-4 py-3 hover:bg-navy transition-colors border-t border-gold/15 mt-1">
                    <div className="font-display text-sm text-cream leading-tight">Corporate Program</div>
                    <div className="font-caps text-[0.6rem] text-gold mt-1">Private cohorts for teams</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <NavLink to="/faculty" className={`${baseNav} ${navColor}`}>Faculty</NavLink>
        </nav>

        {/* CENTER logo */}
        <Link to="/home2" className="block mx-auto" aria-label="Epsilon Executive Education">
          <div
            className="h-[96px] w-[96px] flex items-center justify-center bg-navy-deep border border-gold/40 hover:border-gold/80 transition-colors"
            data-testid="navbar2-center-logo"
          >
            <img
              src={BOXED_LOGO}
              alt="Epsilon"
              className="w-[80%] h-[80%] object-contain"
            />
          </div>
        </Link>

        {/* RIGHT nav + CTAs */}
        <div className="hidden lg:flex items-center justify-start gap-9">
          <NavLink to="/about" className={`${baseNav} ${navColor}`}>About</NavLink>
          <NavLink to="/insights" className={`${baseNav} ${navColor}`}>Insights</NavLink>

          <span className="ml-auto flex items-center gap-3">
            <NavLink to="/apply" data-testid="navbar2-apply-btn" className="btn-gold">Apply</NavLink>
            <a
              href={signInUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar2-signin-btn"
              className="btn-outline-gold"
            >
              <LogIn size={14} /> Sign In
            </a>
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-cream justify-self-end"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-navy-deep text-cream border-t border-gold/20">
          <div className="container-x py-6 flex flex-col gap-4">
            <Link to="/programs" className="font-caps text-sm tracking-[0.2em]">Programs</Link>
            <Link to="/corporate" className="font-caps text-sm tracking-[0.2em] pl-4 border-l border-gold/30">Corporate Program</Link>
            <Link to="/faculty" className="font-caps text-sm tracking-[0.2em]">Faculty</Link>
            <Link to="/about" className="font-caps text-sm tracking-[0.2em]">About</Link>
            <Link to="/insights" className="font-caps text-sm tracking-[0.2em]">Insights</Link>
            <div className="flex gap-3 mt-2">
              <Link to="/apply" className="btn-gold">Apply</Link>
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
