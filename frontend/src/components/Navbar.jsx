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
      className={`fixed top-0 left-0 right-0 z-[99998] transition-all duration-300 bg-navy-deep lg:bg-[#08131fd6] backdrop-blur-md ${
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

      {/* Mobile menu - Side Drawer (No Portal) */}
      {mobileOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 z-[99999]"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[100000] shadow-2xl overflow-y-auto" style={{ backgroundColor: '#EDE5D2' }}>
            {/* Header */}
            <div className="p-6 flex items-center justify-between sticky top-0 z-10" style={{ backgroundColor: '#0E1F32' }}>
              <img src={logoUrl} alt="Epsilon" className="h-7" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-cream hover:text-gold transition-colors -mr-2"
                aria-label="Close Menu"
              >
                <X size={28} strokeWidth={2} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="p-6" style={{ backgroundColor: '#EDE5D2' }}>
              {/* Programs Accordion */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setProgOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-3 border-b-2 border-navy/10 group bg-cream"
                >
                  <span className="font-caps text-[0.7rem] tracking-[0.2em] text-navy group-hover:text-gold transition-colors font-semibold">
                    PROGRAMS
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-gold transition-transform duration-300 ${progOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {progOpen && (
                  <div className="mt-4 space-y-2 pl-2 bg-cream">
                    {programs.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/programs/${p.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 px-4 bg-navy/5 hover:bg-gold/10 transition-colors group rounded"
                      >
                        <div className="font-display text-navy text-[0.9rem] leading-tight group-hover:text-gold transition-colors">
                          {p.subtitle}
                        </div>
                        <div className="font-caps text-[0.55rem] text-navy/60 mt-1 tracking-wider">
                          {p.weeks} WEEKS · {p.levelLabel?.toUpperCase()}
                        </div>
                      </Link>
                    ))}
                    
                    <Link
                      to="/corporate"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-start gap-3 py-3 px-4 bg-gold/10 hover:bg-gold/20 transition-colors group rounded"
                    >
                      <Building2 size={14} className="text-gold mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-display text-navy text-[0.9rem] leading-tight group-hover:text-gold transition-colors">
                          Corporate Program
                        </div>
                        <div className="font-caps text-[0.55rem] text-navy/60 mt-1 tracking-wider">
                          PRIVATE COHORTS
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Other Menu Items */}
              <nav className="space-y-0 bg-cream">
                {menuItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.link} 
                    onClick={() => setMobileOpen(false)}
                    className="block font-caps text-[0.7rem] tracking-[0.2em] text-navy hover:text-gold transition-colors py-4 border-b-2 border-navy/10 font-semibold bg-cream"
                  >
                    {item.label.toUpperCase()}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-8 pt-8 border-t-2 border-navy/10 bg-cream">
                <Link 
                  to="/apply" 
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full text-center justify-center py-4 font-caps tracking-wider text-sm shadow-lg"
                >
                  {applyButtonText?.toUpperCase() || 'APPLY'}
                </Link>
                <a 
                  href={signInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-center py-4 font-caps tracking-wider text-sm border-2 border-navy text-navy hover:bg-navy hover:text-cream transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <LogIn size={14} /> {signInButtonText?.toUpperCase() || 'SIGN IN'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
