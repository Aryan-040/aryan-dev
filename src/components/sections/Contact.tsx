'use client';

import { useState, useRef, useEffect } from 'react';
import { PROFILE } from '@/lib/data';
import { useInViewOnce, usePrefersReducedMotion } from '@/lib/hooks';
import { useLenis } from '@/lib/scroll';

export default function Contact() {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.2 });
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('#hero', { offset: 0 });
  };

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--paper) 0%, #e9e6e0 100%)' }}
    >
      {/* Large background text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span 
          className="text-[20vw] font-bold tracking-tighter opacity-[0.03] whitespace-nowrap"
          style={{ color: 'var(--ink)' }}
        >
          CONNECT
        </span>
      </div>

      <div className="container relative z-10 py-24 md:py-32">
        {/* Section tag */}
        <div
          className={`section-tag rv ${isInView ? 'is-in' : ''}`}
          data-index="07"
          style={{ '--i': 0 } as React.CSSProperties}
        >
          Contact
        </div>

        {/* Main heading */}
        <div className={`mb-16 rv ${isInView ? 'is-in' : ''}`} style={{ '--i': 1 } as React.CSSProperties}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="block">Have a project</span>
            <span className="block">in <span className="serif-italic text-mute">mind</span>?</span>
          </h2>
          <p className="mt-6 text-lg text-mute max-w-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        {/* Contact - Compact elegant card */}
        <div 
          className={`mb-16 rv ${isInView ? 'is-in' : ''}`}
          style={{ '--i': 2 } as React.CSSProperties}
        >
          {/* Main contact card - compact */}
          <a 
            href={`mailto:${PROFILE.email}`}
            className="group block max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-ink text-paper transition-all duration-300 hover:scale-[1.02]"
            style={{ boxShadow: '0 8px 30px rgba(13,13,13,0.12)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-paper/50">Available</span>
              </div>
              <span className="text-xs text-paper/40">{PROFILE.location}</span>
            </div>

            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-3 group-hover:text-paper/90 transition-colors">
                {PROFILE.email}
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-paper/50 group-hover:text-paper/70 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22 6 12 13 2 6" />
                </svg>
                Click to send an email
                <svg 
                  className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </a>
        </div>

        {/* Social links row */}
        <div 
          className={`flex flex-wrap gap-3 mb-20 rv ${isInView ? 'is-in' : ''}`}
          style={{ '--i': 3 } as React.CSSProperties}
        >
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-4 rounded-full bg-card border border-line hover:bg-ink hover:text-paper hover:border-ink transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="font-medium">GitHub</span>
            <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-4 rounded-full bg-card border border-line hover:bg-[#0077B5] hover:text-paper hover:border-[#0077B5] transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-medium">LinkedIn</span>
            <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href={PROFILE.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-4 rounded-full bg-card border border-line hover:bg-[#FFA116] hover:text-ink hover:border-[#FFA116] transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
            <span className="font-medium">LeetCode</span>
            <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-3 px-6 py-4 rounded-full bg-soft text-ink hover:bg-ink hover:text-paper transition-all duration-300"
          >
            {copied ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-medium">Copied!</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                <span className="font-medium">Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <footer
          className={`pt-8 border-t border-line rv ${isInView ? 'is-in' : ''}`}
          style={{ '--i': 4 } as React.CSSProperties}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center text-sm font-bold">
                {PROFILE.initials}
              </div>
              <div>
                <p className="font-medium text-ink">{PROFILE.name}</p>
                <p className="text-sm text-mute">{PROFILE.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-mute">
              <button
                onClick={handleBackToTop}
                className="flex items-center gap-2 hover:text-ink transition-colors group"
              >
                <span>Back to top</span>
                <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">© {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
