'use client';

import { useState, useRef, useEffect } from 'react';
import { SKILL_GROUPS, ALL_SKILLS, type Skill, type SkillFamily } from '@/lib/data';
import { useInViewOnce } from '@/lib/hooks';
import TechLogo from '@/components/ui/TechLogo';

const FAMILIES = Object.keys(SKILL_GROUPS) as SkillFamily[];

// ── Family accent colours (used for card glow, border, neon tint) ─────────
const FAMILY_COLORS: Record<string, { hex: string; glow: string }> = {
  Languages:        { hex: '#F59E0B', glow: 'rgba(245,158,11,0.35)' },
  Frontend:         { hex: '#06B6D4', glow: 'rgba(6,182,212,0.35)'  },
  Backend:          { hex: '#10B981', glow: 'rgba(16,185,129,0.35)' },
  Databases:        { hex: '#3B82F6', glow: 'rgba(59,130,246,0.35)' },
  'Cloud & DevOps': { hex: '#F97316', glow: 'rgba(249,115,22,0.35)' },
  Testing:          { hex: '#8B5CF6', glow: 'rgba(139,92,246,0.35)' },
  'AI/LLM':         { hex: '#EC4899', glow: 'rgba(236,72,153,0.35)' },
  Concepts:         { hex: '#64748B', glow: 'rgba(100,116,139,0.35)'},
};

export default function Skills() {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState<SkillFamily | 'all'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [focusedSkill, setFocusedSkill] = useState<Skill | null>(null);
  // Stays on the last hovered skill — defaults to Java, never clears
  const [displayedSkill, setDisplayedSkill] = useState<Skill>(ALL_SKILLS[0]);

  const activeSkill = hoveredSkill || focusedSkill;

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section bg-paper"
    >
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div
              className={`section-tag rv ${isInView ? 'is-in' : ''}`}
              data-index="02"
              style={{ '--i': 0 } as React.CSSProperties}
            >
              Skills
            </div>
            <h2
              className={`section-heading rv ${isInView ? 'is-in' : ''}`}
              style={{ '--i': 1 } as React.CSSProperties}
            >
              The tools behind my{' '}
              <span className="accent">work</span>.
            </h2>
          </div>

          {/* Filter chips */}
          <div
            className={`rv ${isInView ? 'is-in' : ''} flex flex-wrap gap-2`}
            style={{ '--i': 2 } as React.CSSProperties}
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                activeFilter === 'all'
                  ? 'bg-ink text-paper'
                  : 'bg-soft text-ink hover:bg-line'
              }`}
            >
              All
            </button>
            {FAMILIES.map((family) => (
              <button
                key={family}
                onClick={() => setActiveFilter(family)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  activeFilter === family
                    ? 'bg-ink text-paper'
                    : 'bg-soft text-ink hover:bg-line'
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Skills grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
            {ALL_SKILLS.map((skill, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const delay = (row + col) * 40;
              const isFiltered =
                activeFilter !== 'all' && skill.family !== activeFilter;

              return (
                <SkillTile
                  key={skill.name}
                  skill={skill}
                  index={index + 1}
                  isInView={isInView}
                  delay={delay}
                  isFiltered={isFiltered}
                  isActive={activeSkill?.name === skill.name}
                  onHover={() => { setHoveredSkill(skill); setDisplayedSkill(skill); }}
                  onLeave={() => setHoveredSkill(null)}
                  onFocus={() => { setFocusedSkill(skill); setDisplayedSkill(skill); }}
                  onBlur={() => setFocusedSkill(null)}
                />
              );
            })}
          </div>

          {/* Inspector panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <InspectorPanel skill={displayedSkill} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Skill Tile Component
// ============================================================================

interface SkillTileProps {
  skill: Skill;
  index: number;
  isInView: boolean;
  delay: number;
  isFiltered: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

function SkillTile({
  skill,
  index,
  isInView,
  delay,
  isFiltered,
  isActive,
  onHover,
  onLeave,
  onFocus,
  onBlur,
}: SkillTileProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

  // Refs let the stable transitionend listener always read current values
  const isHoveredRef   = useRef(false);
  const isAnimatingRef = useRef(false);
  const isFlippedRef   = useRef(false);   // mirrors isFlipped state
  const onHoverRef     = useRef(onHover);
  const onLeaveRef     = useRef(onLeave);
  useEffect(() => { onHoverRef.current = onHover; }, [onHover]);
  useEffect(() => { onLeaveRef.current = onLeave; }, [onLeave]);

  const flip = (val: boolean) => {
    isFlippedRef.current = val;
    isAnimatingRef.current = true;
    setIsFlipped(val);
  };

  // Single stable listener — reads only refs, registered once
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      isAnimatingRef.current = false;

      if (isFlippedRef.current && !isHoveredRef.current) {
        // Logo visible, user has left → flip back
        flip(false);
        onLeaveRef.current();
      } else if (!isFlippedRef.current && isHoveredRef.current) {
        // Flip-back finished but user re-entered mid-flip → flip forward again
        flip(true);
        onHoverRef.current();
      }
    };

    card.addEventListener('transitionend', onEnd);
    return () => card.removeEventListener('transitionend', onEnd);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — uses only refs

  // Reset when filtered out
  useEffect(() => {
    if (isFiltered && isFlippedRef.current) {
      isAnimatingRef.current = false;
      isHoveredRef.current = false;
      isFlippedRef.current = false;
      setIsFlipped(false);
    }
  }, [isFiltered]);

  // ── Detect entry edge ─────────────────────────────────────────────────────
  const getEntryDirection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const dTop = y, dBot = rect.height - y, dLeft = x, dRight = rect.width - x;
    const min = Math.min(dTop, dBot, dLeft, dRight);
    return min === dTop ? 'top' : min === dBot ? 'bottom' : min === dLeft ? 'left' : 'right';
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isFiltered) return;
    isHoveredRef.current = true;

    // Update direction only when card is NOT mid-flip-to-logo.
    // It's always safe to update direction during flip-back (transform ignores direction when isFlipped=false).
    if (!isFlippedRef.current) {
      setFlipDirection(getEntryDirection(e) as 'top' | 'bottom' | 'left' | 'right');
    }

    // If already showing logo or mid-animation: transitionend will handle the rest
    if (isFlippedRef.current || isAnimatingRef.current) {
      onHover();
      return;
    }

    // At rest showing front — flip to logo
    flip(true);
    onHover();
  };

  const handleMouseLeave = () => {
    if (isFiltered) return;
    isHoveredRef.current = false;

    // If animating, let transitionend decide what to do
    if (isAnimatingRef.current) return;

    // At rest showing logo — flip back immediately
    if (isFlippedRef.current) {
      flip(false);
      onLeave();
    }
  };

  const handleFocus = () => {
    if (isFiltered) return;
    isHoveredRef.current = true;
    if (isFlippedRef.current || isAnimatingRef.current) return;
    setFlipDirection('top');
    flip(true);
    onFocus();
  };

  const handleBlur = () => {
    isHoveredRef.current = false;
    if (!isAnimatingRef.current && isFlippedRef.current) {
      flip(false);
      onBlur();
    }
  };

  // Build transform based on flip direction
  const getFlipTransform = () => {
    if (!isFlipped) return 'rotateX(0deg) rotateY(0deg)';
    switch (flipDirection) {
      case 'top': return 'rotateX(180deg)';
      case 'bottom': return 'rotateX(-180deg)';
      case 'left': return 'rotateY(-180deg)';
      case 'right': return 'rotateY(180deg)';
    }
  };

  // Back face rotation (opposite of front)
  const getBackTransform = () => {
    switch (flipDirection) {
      case 'top': return 'rotateX(-180deg)';
      case 'bottom': return 'rotateX(180deg)';
      case 'left': return 'rotateY(180deg)';
      case 'right': return 'rotateY(-180deg)';
    }
  };

  const accent = FAMILY_COLORS[skill.family] ?? { hex: '#888', glow: 'rgba(136,136,136,0.3)' };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`
        relative aspect-square rounded-xl
        transition-all duration-300
        ${isFiltered ? 'opacity-20 cursor-default' : 'opacity-100'}
        ${isActive ? 'scale-110 z-20' : isFiltered ? '' : 'hover:scale-105'}
      `}
      style={{
        perspective: '800px',
        opacity: isInView ? (isFiltered ? 0.2 : 1) : 0,
        transform: isInView ? undefined : 'scale(0.85)',
        transitionDelay: isInView ? `${delay}ms` : '0ms',
      }}
      aria-label={`${skill.name} - ${skill.family}`}
    >
      {/* Card inner — this rotates on flip */}
      <div
        ref={cardRef}
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: getFlipTransform(),
          transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ═══ FRONT: Symbol ═══ */}
        <div
          className={`
            absolute inset-0 rounded-xl border p-2
            flex flex-col items-center justify-center
            ${isActive ? 'bg-ink text-paper border-ink shadow-xl' : 'bg-card border-line shadow-sm'}
          `}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className={`absolute top-1.5 left-2 text-[10px] font-mono ${isActive ? 'text-paper/50' : 'text-faint'}`}>
            {String(index).padStart(2, '0')}
          </span>
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            {skill.symbol}
          </span>
          <span className={`absolute bottom-1.5 left-1 right-1 text-[8px] sm:text-[9px] truncate text-center ${isActive ? 'text-paper/70' : 'text-mute'}`}>
            {skill.name}
          </span>
        </div>

        {/* ═══ BACK: Logo ═══ */}
        <div
          className="absolute inset-0 rounded-xl border p-2 flex flex-col items-center justify-center bg-ink border-ink shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: getBackTransform(),
          }}
        >
          <div style={{ filter: 'brightness(0) invert(1)' }}>
            <TechLogo name={skill.name} size={28} />
          </div>
          <span className="absolute bottom-1.5 left-1 right-1 text-[8px] sm:text-[9px] truncate text-center text-paper/70">
            {skill.name}
          </span>
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// Inspector Panel Component
// ============================================================================




function InspectorPanel({ skill }: { skill: Skill }) {
  // Separate "rendered" skill from "requested" skill so we can crossfade
  const [rendered, setRendered] = useState<Skill>(skill);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (skill.name === rendered.name) return;
    // Fade out → swap content → fade in
    setFading(true);
    const t = setTimeout(() => {
      setRendered(skill);
      setFading(false);
    }, 160);
    return () => clearTimeout(t);
  }, [skill]); // eslint-disable-line react-hooks/exhaustive-deps

  const index = ALL_SKILLS.findIndex(s => s.name === rendered.name) + 1;

  return (
    <div className="card flex flex-col overflow-hidden" style={{ height: 380 }}>

      {/* ── Header — always at top ── */}
      <div className="flex items-center justify-between px-5 pt-5 flex-shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-widest text-faint">
          {rendered.family}
        </span>
        <span className="text-[10px] font-mono tabular-nums text-faint">
          #{String(index).padStart(2, '0')}
        </span>
      </div>

      {/* ── Crossfading content ── */}
      <div
        className="flex flex-col flex-1 min-h-0"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(6px)' : 'translateY(0)',
          transition: 'opacity 0.16s ease, transform 0.16s ease',
        }}
      >
        {/* Logo — fixed height so divider never moves */}
        <div className="flex items-center justify-center flex-shrink-0" style={{ height: 180 }}>
          <TechLogo name={rendered.name} size={80} />
        </div>

        {/* Divider — always at the same spot */}
        <div className="mx-5 h-px bg-line flex-shrink-0" />

        {/* Text */}
        <div className="px-5 pt-4 pb-5 flex flex-col gap-1.5">
          <h3 className="text-xl font-bold text-ink leading-tight tracking-tight">
            {rendered.name}
          </h3>
          <p className="text-[13px] leading-relaxed text-mute line-clamp-4">
            {rendered.description}
          </p>
        </div>
      </div>

    </div>
  );
}
