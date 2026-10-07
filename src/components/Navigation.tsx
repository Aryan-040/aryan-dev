'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PROFILE, NAV } from '@/lib/data';
import { useLenis } from '@/lib/scroll';
import { useActiveSection, useBodyScrollLock } from '@/lib/hooks';

// ─── Section icons ────────────────────────────────────────────────────────────
function NavIcon({ id, size = 18 }: { id: string; size?: number }) {
  const s = { width: size, height: size };
  const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (id) {
    case 'about':
      return (
        <svg {...s} viewBox="0 0 24 24" {...base}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      );
    case 'skills':
      return (
        <svg {...s} viewBox="0 0 24 24" {...base}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'work':
      return (
        <svg {...s} viewBox="0 0 24 24" {...base}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      );
    case 'experience':
      return (
        <svg {...s} viewBox="0 0 24 24" {...base}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15.5 14" />
        </svg>
      );
    case 'achievements':
      return (
        <svg {...s} viewBox="0 0 24 24" {...base}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'contact':
      return (
        <svg {...s} viewBox="0 0 24 24" {...base}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22 6 12 13 2 6" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Navigation() {
  const [scrolled, setScrolled]           = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling]     = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollTo } = useLenis();
  const sectionIds  = NAV.map(item => item.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds);

  useBodyScrollLock(mobileMenuOpen);

  // Scroll tracking — progress + shrink state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? window.scrollY / docH : 0);

      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 500);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (href: string, e: React.MouseEvent) => {
      e.preventDefault();
      scrollTo(href, { offset: -80 });
      setMobileMenuOpen(false);
    },
    [scrollTo]
  );

  return (
    <>
      {/* ── Logo — top left ── */}
      <div className="fixed top-4 z-50" style={{ left: 'calc(var(--gutter) - 8px)' }}>
        <button
          onClick={e => handleNavClick('#hero', e)}
          className="group relative w-10 h-10 rounded-full flex items-center justify-center"
          aria-label="Back to top"
        >
          <span
            className={`absolute inset-0 rounded-full border-2 border-ink transition-all duration-300 group-hover:rotate-[360deg] ${
              scrolled ? 'bg-ink' : 'bg-transparent'
            }`}
            style={{ transitionProperty: 'transform, background-color' }}
          />
          <span
            className={`relative z-10 text-sm font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-paper' : 'text-ink'
            }`}
          >
            {PROFILE.initials}
          </span>
        </button>
      </div>

      {/* ── Right-side vertical nav — desktop ── */}
      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center rounded-2xl"
        style={{
          gap:            isScrolling ? '4px' : '12px',
          padding:        scrolled ? (isScrolling ? '10px 8px' : '14px 10px') : '0',
          background:     scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow:      scrolled ? '0 4px 24px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)' : 'none',
          transition:     'gap 0.5s cubic-bezier(0.4,0,0.2,1), padding 0.5s cubic-bezier(0.4,0,0.2,1), background 0.5s, box-shadow 0.5s',
        }}
        aria-label="Page sections"
      >
        {NAV.map(item => {
          const id       = item.href.replace('#', '');
          const isActive = activeSection === id;

          return (
            <div key={item.href} className="group relative flex items-center">

              {/* Tooltip — slides in from the right, appears to the left */}
              <span
                className="
                  absolute right-full mr-3 top-1/2 -translate-y-1/2
                  px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap
                  pointer-events-none select-none
                  bg-ink text-paper
                  opacity-0 translate-x-2
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-200 ease-out
                "
              >
                {item.label}
              </span>

              {/* Icon button */}
              <button
                onClick={e => handleNavClick(item.href, e)}
                aria-label={item.label}
                className={`flex items-center justify-center rounded-full transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-mute hover:text-ink'
                }`}
                style={{
                  width:      isScrolling ? 32 : 42,
                  height:     isScrolling ? 32 : 42,
                  background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
                  transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1), height 0.5s cubic-bezier(0.4,0,0.2,1), background 0.2s, color 0.2s',
                }}
              >
                <NavIcon id={id} size={isScrolling ? 16 : 21} />
              </button>

              {/* Active dot — right side of button */}
              <span
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-ink"
                style={{
                  opacity:   isActive ? 1 : 0,
                  transform: `translateY(-50%) scale(${isActive ? 1 : 0})`,
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
              />
            </div>
          );
        })}
      </nav>

      {/* ── Mobile menu button — top right ── */}
      <div className="fixed top-4 right-[--gutter] z-50 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 text-ink'
              : 'bg-ink text-paper'
          }`}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </div>

      {/* ── Mobile menu overlay ── */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-paper transition-all duration-500"
          style={{
            clipPath: mobileMenuOpen
              ? 'circle(150% at calc(100% - 40px) 32px)'
              : 'circle(0% at calc(100% - 40px) 32px)',
          }}
        />

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-[--gutter] px-4 py-2 text-sm font-medium bg-ink text-paper rounded-full z-10"
          aria-label="Close menu"
        >
          Close
        </button>

        <div className="relative h-full flex flex-col justify-center px-[--gutter]">
          <nav className="space-y-2">
            {NAV.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => handleNavClick(item.href, e)}
                  className="group flex items-center gap-6 py-4"
                  style={{
                    opacity:   mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.4s ease ${index * 0.05 + 0.2}s, transform 0.4s ease ${index * 0.05 + 0.2}s`,
                  }}
                >
                  <span className="font-mono text-sm text-mute tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-4xl sm:text-5xl font-bold tracking-tight transition-colors ${
                    isActive ? 'text-ink' : 'text-mute group-hover:text-ink'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && <span className="w-2 h-2 bg-ink rounded-full" />}
                </a>
              );
            })}
          </nav>

          <div
            className="absolute bottom-8 left-[--gutter] right-[--gutter]"
            style={{ opacity: mobileMenuOpen ? 1 : 0, transition: 'opacity 0.4s ease 0.5s' }}
          >
            <div className="flex flex-wrap items-center gap-4 text-sm text-mute">
              <a href={`mailto:${PROFILE.email}`} className="hover:text-ink transition-colors">
                {PROFILE.email}
              </a>
              <span>·</span>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                GitHub
              </a>
              <span>·</span>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
