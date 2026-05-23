import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown, Building2 } from 'lucide-react';
import { LOGO_URL, programs as mockPrograms } from '../mock';
import { useSiteContent } from '../context/SiteContent';
import SocialIcons from './SocialIcons';

export default function Navbar() {
  const ctx = useSiteContent();
  const programs = ctx?.programs?.length ? ctx.programs : [];
  
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

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  const transparent = onHome && !scrolled;

  const baseNav = 'font-caps text-[0.7rem] font-semibold tracking-[0.2em] transition-colors';
  const navColor = 'theme-nav-brand hover:text-gold';

  return (
    <>
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

    </header>

    {/* Mobile menu - Rendered OUTSIDE header to avoid height clipping */}
    <div className="lg:hidden" aria-hidden={!mobileOpen}>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer - matches desktop navy/gold/cream theme */}
      <aside
        data-testid="mobile-menu-drawer"
        className={`fixed top-0 right-0 bottom-0 w-[88%] max-w-[380px] z-[100000] bg-navy-deep text-cream shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col transform transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ borderLeft: '1px solid rgba(212,175,55,0.18)' }}
      >
        {/* Decorative gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gold/15 bg-navy-deep">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
            <img src={logoUrl} alt="Epsilon" className="h-9 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            data-testid="mobile-menu-close"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gold/25 text-cream hover:text-gold hover:border-gold/60 transition-all"
            aria-label="Close Menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Menu Content - scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <nav className="px-6 pt-6 pb-4">
            {/* Programs Accordion */}
            <div className="mb-2">
              <button
                type="button"
                onClick={() => setProgOpen((v) => !v)}
                data-testid="mobile-programs-toggle"
                className="w-full flex items-center justify-between py-4 border-b border-gold/15 group"
                aria-expanded={progOpen}
              >
                <span className="font-caps text-[0.72rem] tracking-[0.22em] text-cream group-hover:text-gold transition-colors font-semibold">
                  PROGRAMS
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`text-gold transition-transform duration-300 ${progOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  progOpen ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-1.5 pl-1">
                    {programs.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/programs/${p.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 px-4 border border-gold/10 hover:border-gold/40 hover:bg-gold/5 transition-all group"
                      >
                        <div className="font-display text-[0.95rem] leading-tight text-cream group-hover:text-gold transition-colors">
                          {p.subtitle}
                        </div>
                        <div className="font-caps text-[0.58rem] text-gold/80 mt-1.5 tracking-[0.18em]">
                          {p.weeks} WEEKS · {p.levelLabel?.toUpperCase()}
                        </div>
                      </Link>
                    ))}

                    <Link
                      to="/corporate"
                      onClick={() => setMobileOpen(false)}
                      data-testid="mobile-corporate-link"
                      className="flex items-start gap-3 py-3 px-4 border border-gold/30 bg-gold/5 hover:bg-gold/10 transition-all group"
                    >
                      <Building2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-display text-[0.95rem] leading-tight text-cream group-hover:text-gold transition-colors">
                          Corporate Program
                        </div>
                        <div className="font-caps text-[0.58rem] text-gold/80 mt-1.5 tracking-[0.18em]">
                          PRIVATE COHORTS FOR TEAMS
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Menu Items */}
            <div>
              {menuItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.link}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 border-b border-gold/15 font-caps text-[0.72rem] tracking-[0.22em] font-semibold transition-colors ${
                      isActive ? 'text-gold' : 'text-cream hover:text-gold'
                    }`
                  }
                >
                  <span>{item.label.toUpperCase()}</span>
                  <span className="text-gold/40 text-xs">→</span>
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        {/* Footer / Action Buttons - sticky bottom */}
        <div className="px-6 py-5 border-t border-gold/20 bg-navy-deep space-y-3">
          <Link
            to="/apply"
            onClick={() => setMobileOpen(false)}
            data-testid="mobile-apply-btn"
            className="btn-gold w-full justify-center py-3.5 font-caps tracking-[0.18em] text-[0.78rem]"
          >
            {applyButtonText?.toUpperCase() || 'APPLY'}
          </Link>
          <a
            href={signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mobile-signin-btn"
            className="btn-outline-gold w-full justify-center py-3.5 font-caps tracking-[0.18em] text-[0.78rem]"
          >
            <LogIn size={14} /> {signInButtonText?.toUpperCase() || 'SIGN IN'}
          </a>

          {/* Social icons */}
          <div className="pt-3 flex items-center justify-center">
            <SocialIcons size={15} tone="light" testidPrefix="mobile-social" />
          </div>
        </div>
      </aside>
    </div>
    </>
  );
}
