'use client';

import { useState, useEffect } from 'react';
import { PROFILE } from '@/lib/data';

// ─── Social icons (minimal stroke style) ──────────────────────────────────────
function SocialIcon({ id, size = 16 }: { id: string; size?: number }) {
  const s = { width: size, height: size };

  switch (id) {
    case 'github':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'leetcode':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16H6M16 8l-4-4-8 8 8 8 4-4" />
          <path d="M8 20l-4-4" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Social Links Data ────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { id: 'github', label: 'Gh', href: PROFILE.github },
  { id: 'linkedin', label: 'Li', href: PROFILE.linkedin },
  { id: 'leetcode', label: 'Lc', href: PROFILE.leetcode },
] as const;

// ─── Main component ───────────────────────────────────────────────────────────
export default function SocialLinks() {
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Show after scrolling past hero
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed left-8 bottom-0 z-40 hidden lg:flex flex-col items-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-label="Social links"
    >
      {/* Social icons */}
      <div className="flex flex-col items-center gap-5 mb-6">
        {SOCIAL_LINKS.map((link, index) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Icon */}
            <span
              className="block text-mute transition-all duration-300 ease-out"
              style={{
                transform: hoveredIndex === index ? 'scale(1.15)' : 'scale(1)',
                color: hoveredIndex === index ? 'var(--color-ink)' : undefined,
              }}
            >
              <SocialIcon id={link.id} size={22} />
            </span>

            {/* Tooltip */}
            <span
              className="
                absolute left-full ml-4 top-1/2 -translate-y-1/2
                font-mono text-[10px] tracking-wider uppercase text-mute
                opacity-0 -translate-x-2
                group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-200 ease-out
                pointer-events-none whitespace-nowrap
              "
            >
              {link.label}
            </span>
          </a>
        ))}
      </div>

      {/* Vertical line */}
      <div className="w-px h-24 bg-mute/30" />
    </div>
  );
}
