import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown, Building2 } from 'lucide-react';
import { LOGO_URL, programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function Navbar() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  
  // Use navbar data from context if available, otherwise fallback to ctx.logoUrl and defaults
  const navbar = ctx?.navbar || {};
  const logoUrl = navbar.logoUrl || ctx?.logoUrl || LOGO_URL;
  const menuItems = navbar.menuItems || [
    { label: 'Faculty', link: '/faculty', type: 'link' },
    { label: 'About', link: '/about', type: 'link' },
  ];
  const applyButtonText = navbar.applyButtonText || 'Apply';
  const signInButtonText = navbar.signInButtonText || 'Sign In';
  const signInUrl = navbar.signInUrl || ctx?.home?.footer?.signInUrl || 'https://moodle.org/login/index.php';
  
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-navy-deep lg:bg-[#08131fd6] backdrop-blur-md ${
        transparent
          ? 'border-b border-transparent'
          : 'border-b border-gold/15 shadow-[0_4px_20px_rgba(8,19,31,0.35)]'
      }`}
    >
      <div className="container-x flex items-center justify-between h-[78px] lg:h-[96px]">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="Epsilon" className="h-[58px] sm:h-[64px] lg:h-[68px] w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10 -ml-[50px]" data-testid="primary-nav">
          <div
            className="relative"
            onMouseEnter={() => setProgOpen(true)}
            onMouseLeave={() => setProgOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProgOpen((v) => !v)}
              data-testid="nav-programs-toggle"
              className={`${baseNav} ${navColor} flex items-center gap-1 cursor-pointer`}
              aria-expanded={progOpen}
            >
              Programs <ChevronDown size={12} strokeWidth={2} className={`transition-transform ${progOpen ? 'rotate-180' : ''}`} />
            </button>
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
          {menuItems.map((item, idx) => (
            <NavLink key={idx} to={item.link} className={`${baseNav} ${navColor}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <NavLink to="/apply" data-testid="nav-apply-btn" className="btn-gold">
            {applyButtonText}
          </NavLink>
          <a
            href={signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-signin-btn"
            className="btn-outline-gold"
          >
            <LogIn size={14} /> {signInButtonText}
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
        <div className="lg:hidden bg-navy-deep text-cream border-t border-gold/20 max-h-[calc(100vh-110px)] overflow-y-auto">
          <div className="container-x py-6 flex flex-col gap-3">
            {/* Programs accordion */}
            <button
              type="button"
              onClick={() => setProgOpen((v) => !v)}
              data-testid="mobile-programs-toggle"
              className="font-caps text-sm text-cream tracking-[0.2em] flex items-center justify-between w-full py-1"
              aria-expanded={progOpen}
            >
              <span>Programs</span>
              <ChevronDown size={14} className={`transition-transform ${progOpen ? 'rotate-180' : ''}`} />
            </button>
            {progOpen && (
              <div className="border-l border-gold/30 ml-1 pl-4 -mt-1 mb-2">
                {programs.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/programs/${p.slug}`}
                    className="block py-3 hover:bg-navy/40 -mx-2 px-2 transition-colors"
                  >
                    <div className="font-display text-sm text-cream leading-tight">{p.subtitle}</div>
                    <div className="font-caps text-[0.6rem] text-gold mt-1">{p.weeks} weeks · {p.levelLabel}</div>
                  </Link>
                ))}
                <Link
                  to="/corporate"
                  className="flex items-start gap-2 py-3 hover:bg-navy/40 -mx-2 px-2 transition-colors border-t border-gold/15 mt-1"
                >
                  <Building2 size={14} className="text-gold mt-1" />
                  <div>
                    <div className="font-display text-sm text-cream leading-tight">Corporate Program</div>
                    <div className="font-caps text-[0.6rem] text-gold mt-1">Private cohorts for teams</div>
                  </div>
                </Link>
                <Link to="/programs" className="block py-3 -mx-2 px-2 font-caps text-[0.65rem] text-gold border-t border-gold/15 mt-1">
                  View all programs →
                </Link>
              </div>
            )}

            {menuItems.map((item, idx) => (
              <Link key={idx} to={item.link} className="font-caps text-sm text-cream tracking-[0.2em] py-1">
                {item.label}
              </Link>
            ))}
            
            <div className="flex gap-3 mt-3">
              <Link to="/apply" className="btn-gold">{applyButtonText}</Link>
              <a href={signInUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                <LogIn size={14} /> {signInButtonText}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
