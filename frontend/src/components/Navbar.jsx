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

      {/* Mobile menu - Clean Modern Style */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-navy-deep/98 backdrop-blur-lg">
          <div className="h-full overflow-y-auto">
            {/* Header with logo and close */}
            <div className="container-x py-6 flex items-center justify-between border-b border-gold/10">
              <img src={logoUrl} alt="Epsilon" className="h-8" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-cream hover:text-gold transition-colors p-2 -mr-2"
                aria-label="Close Menu"
              >
                <X size={28} strokeWidth={2} />
              </button>
            </div>

            {/* Menu content */}
            <div className="container-x py-12">
              <nav className="space-y-1">
                {/* Programs Accordion */}
                <div className="border-b border-gold/10 pb-1">
                  <button
                    type="button"
                    onClick={() => setProgOpen((v) => !v)}
                    className="w-full flex items-center justify-between py-5 group"
                  >
                    <span className="font-caps text-[0.75rem] tracking-[0.2em] text-cream group-hover:text-gold transition-colors">
                      PROGRAMS
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-gold transition-transform duration-300 ${progOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {progOpen && (
                    <div className="pb-6 space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {programs.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/programs/${p.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-4 px-4 -mx-4 hover:bg-gold/10 transition-colors group"
                        >
                          <div className="font-display text-cream text-[0.95rem] leading-tight group-hover:text-gold transition-colors">
                            {p.subtitle}
                          </div>
                          <div className="font-caps text-[0.6rem] text-gold/70 mt-1.5 tracking-wider">
                            {p.weeks} WEEKS · {p.levelLabel?.toUpperCase()}
                          </div>
                        </Link>
                      ))}
                      
                      {/* Corporate Program */}
                      <Link
                        to="/corporate"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-start gap-3 py-4 px-4 -mx-4 hover:bg-gold/10 transition-colors group"
                      >
                        <Building2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-display text-cream text-[0.95rem] leading-tight group-hover:text-gold transition-colors">
                            Corporate Program
                          </div>
                          <div className="font-caps text-[0.6rem] text-gold/70 mt-1.5 tracking-wider">
                            PRIVATE COHORTS FOR TEAMS
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Other Menu Items */}
                {menuItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.link} 
                    onClick={() => setMobileOpen(false)}
                    className="block font-caps text-[0.75rem] tracking-[0.2em] text-cream hover:text-gold transition-colors py-5 border-b border-gold/10"
                  >
                    {item.label.toUpperCase()}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-12 pt-12 border-t border-gold/10">
                <Link 
                  to="/apply" 
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full text-center justify-center py-4 font-caps tracking-wider"
                >
                  {applyButtonText?.toUpperCase() || 'APPLY'}
                </Link>
                <a 
                  href={signInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-outline-gold w-full text-center justify-center py-4 font-caps tracking-wider"
                >
                  <LogIn size={14} /> {signInButtonText?.toUpperCase() || 'SIGN IN'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
