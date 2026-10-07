'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { PROFILE, ID_CARD, QUICK_FACTS, ABOUT_QUOTE } from '@/lib/data';
import { useInViewOnce, useAnimationFrame, usePrefersReducedMotion } from '@/lib/hooks';

export default function About() {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section bg-paper"
    >
      <div className="container">
        {/* Section tag */}
        <div
          className={`section-tag rv ${isInView ? 'is-in' : ''}`}
          data-index="01"
          style={{ '--i': 0 } as React.CSSProperties}
        >
          About
        </div>

        {/* Three column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 lg:gap-12 items-stretch">
          {/* Left column - Intro text */}
          <div
            className={`rv ${isInView ? 'is-in' : ''} space-y-6`}
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <h2 className="section-heading">
              Hi, I&apos;m{' '}
              <span className="accent">{PROFILE.firstName}</span>.
            </h2>

            <p className="text-ink-2 text-lg leading-relaxed">
              {PROFILE.resumeSummary}
            </p>

            <p className="text-mute">
              {PROFILE.stats.leetcodeProblems}+ LeetCode problems solved · {PROFILE.stats.githubCommits}+ GitHub commits
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={PROFILE.resume}
                download
                className="btn btn-primary"
              >
                Résumé
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Center column - ID Card */}
          <div
            className={`rv ${isInView ? 'is-in' : ''} flex justify-center`}
            style={{ '--i': 2 } as React.CSSProperties}
          >
            <IDCard isInView={isInView} />
          </div>

          {/* Right column - Quick facts */}
          <div
            className={`rv ${isInView ? 'is-in' : ''} space-y-6`}
            style={{ '--i': 3 } as React.CSSProperties}
          >
            <h3 className="text-sm font-mono text-mute uppercase tracking-wider">
              Quick facts
            </h3>

            <div className="space-y-4">
              {QUICK_FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`rv ${isInView ? 'is-in' : ''} flex justify-between items-start py-3 border-b border-line`}
                  style={{ '--i': 4 + i } as React.CSSProperties}
                >
                  <span className="text-mute text-sm">{fact.label}</span>
                  {fact.href ? (
                    <a
                      href={fact.href}
                      className="text-ink font-medium hover:text-ink-2 transition-colors text-right"
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <span className="text-ink font-medium text-right">
                      {fact.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="pt-6 border-l-2 border-ink pl-4">
              <p className="text-ink-2 italic serif-italic">
                &ldquo;{ABOUT_QUOTE}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ID Card Component with Pendulum Animation
// Deterministic barcode pattern — avoids SSR/client Math.random() hydration mismatch
const BARCODE_PATTERN: boolean[] = [
  true, false, true, true, false, true, false, false, true, true,
  false, true, true, false, false, true, false, true, true, false,
  true, false, true, false, true, true, false, false, true, false,
];

// ============================================================================
// ID Card Component with Pendulum Animation
// ============================================================================

interface IDCardProps {
  isInView: boolean;
}

function IDCard({ isInView }: IDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState(0);
  const velocityRef = useRef(0);
  const targetRotationRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const SPRING = 0.03;
  const DAMPING = 0.92;
  const IDLE_SPEED = 0.001;

  useAnimationFrame(
    useCallback(
      (deltaTime: number) => {
        if (prefersReducedMotion) return;
        const dt = Math.min(deltaTime / 16.67, 2);
        const force = (targetRotationRef.current - rotation) * SPRING;
        velocityRef.current += force;
        velocityRef.current *= DAMPING;
        const idleSway = Math.sin(Date.now() * IDLE_SPEED) * 0.6;
        setRotation((prev) => prev + velocityRef.current * dt + idleSway * 0.01);
      },
      [rotation, prefersReducedMotion]
    ),
    isInView && !prefersReducedMotion
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const mouseVelocity = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;
      const distance = Math.abs(e.clientX - cardCenterX);
      if (distance < 400) {
        const influence = 1 - distance / 400;
        targetRotationRef.current = mouseVelocity * 0.1 * influence;
      } else {
        targetRotationRef.current = 0;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const handleFlip = () => setIsFlipped((prev) => !prev);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(); }
  };

  return (
    <div className="relative pt-16" style={{ perspective: '1000px' }}>
      {/* ── Lanyard strap ─────────────────────────────────────────────── */}
      <div
        className="absolute left-1/2 top-0 w-7 h-16 bg-ink rounded-b overflow-hidden z-10"
        style={{
          transform: `translateX(-50%) rotate(${rotation * 0.3}deg)`,
          transformOrigin: 'top center',
        }}
      >
        <div className="absolute inset-0 flex justify-center overflow-hidden">
          <div
            className="text-paper text-[7px] font-mono leading-none animate-scroll-up"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', whiteSpace: 'nowrap' }}
          >
            {PROFILE.name} · {PROFILE.role} · {PROFILE.name} · {PROFILE.role} ·&nbsp;
          </div>
        </div>
        {/* metal clip */}
        <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-b from-[#d1d0ce] to-[#a9a6a0]" />
      </div>

      {/* ── Card ──────────────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-pressed={isFlipped}
        aria-label="Developer ID card — click or press Enter to flip"
        className="relative w-[288px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
        style={{
          height: '400px',
          transformStyle: 'preserve-3d',
          transform: `rotateZ(${rotation}deg) rotateY(${isFlipped ? 180 : 0}deg)`,
          transformOrigin: 'top center',
          transition: prefersReducedMotion
            ? 'transform 0.3s ease'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >

        {/* ══ FRONT ═════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            background: 'var(--card)',
            boxShadow: 'inset 0 0 0 1px var(--line), 0 8px 32px -8px rgba(13,13,13,0.18)',
          }}
        >
          {/* Top band */}
          <div className="flex-shrink-0 bg-ink text-paper py-2.5 px-4 text-center">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Developer ID</span>
          </div>

          {/* Photo */}
          <div className="flex-shrink-0 flex flex-col items-center pt-5 pb-3 px-4">
            {/* Square face-crop frame */}
            <div className="relative">
              {/* gradient ring */}
              <div
                className="absolute -inset-[5px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, var(--soft), var(--faint), var(--mute), var(--faint), var(--soft))',
                  opacity: 0.6,
                }}
              />
              {/*
                Container is square (96×96) and circular.
                The img is intentionally taller than the container so
                only the top portion (face) is visible.
                object-position pushes the crop to the very top of the image.
              */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-soft shadow-md">
                <img
                  src="/portrait.webp"
                  alt={`Portrait of ${PROFILE.name}`}
                  className="absolute inset-0 w-full object-cover"
                  style={{
                    height: '180%',   /* taller than frame → zooms in */
                    top: 0,           /* anchor to top → shows face, not torso */
                    objectPosition: 'center top',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2)' }}
                />
              </div>
            </div>

            <h3 className="mt-3 text-[15px] font-bold text-ink leading-tight text-center">
              {PROFILE.name}
            </h3>
            <p className="text-[11px] text-mute mt-0.5 text-center">{PROFILE.role}</p>
          </div>

          {/* Info rows */}
          <div className="flex-shrink-0 border-t border-line mx-4" />
          <div className="flex-shrink-0 px-4 py-2 space-y-1.5">
            {[
              { label: 'ID No.', value: ID_CARD.idNumber },
              { label: 'Dept.',  value: ID_CARD.department },
              { label: 'Valid',  value: ID_CARD.validTill },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-mute">{label}</span>
                <span className="text-[10px] font-mono text-ink">{value}</span>
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Barcode + hologram footer */}
          <div className="flex-shrink-0 border-t border-line mx-4" />
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3">
            {/* Barcode */}
            <div className="flex items-end gap-px" style={{ height: 28 }}>
              {BARCODE_PATTERN.map((wide, i) => (
                <div
                  key={i}
                  className="bg-ink self-stretch"
                  style={{ width: wide ? '2px' : '1px', opacity: 0.75 }}
                />
              ))}
            </div>
            {/* Holographic sticker */}
            <div
              className="w-9 h-9 rounded-full flex-shrink-0"
              style={{
                background: 'conic-gradient(from 0deg, #e9e6e0, #a9a6a0, #e9e6e0, #77756f, #e9e6e0)',
                opacity: 0.75,
              }}
            />
          </div>
        </div>

        {/* ══ BACK ══════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'var(--card)',
            boxShadow: 'inset 0 0 0 1px var(--line), 0 8px 32px -8px rgba(13,13,13,0.18)',
          }}
        >
          {/* Top band */}
          <div className="flex-shrink-0 bg-ink text-paper py-2.5 px-4 text-center">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">What I am</span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden px-5 pt-4">
            <ul className="space-y-2.5">
              {ID_CARD.backContent.map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-ink-2 leading-snug">
                  <span className="text-mute mt-0.5 flex-shrink-0">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Signature row */}
          <div className="flex-shrink-0 px-5 pb-2">
            <div className="border-b border-line pb-0" style={{ paddingTop: '28px' }} />
            <span className="text-[9px] text-faint mt-1 block font-mono tracking-wide">Signature</span>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-line mx-5" />
          <div className="flex-shrink-0 px-5 py-3 text-center">
            <p className="text-[10px] text-mute leading-relaxed">
              If found, say hello
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-[10px] text-ink underline underline-offset-2 hover:text-ink-2 transition-colors break-all"
              onClick={(e) => e.stopPropagation()}
            >
              {PROFILE.email}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
