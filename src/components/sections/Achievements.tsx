'use client';

import { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '@/lib/data';
import { useInViewOnce, useCountUp, usePrefersReducedMotion } from '@/lib/hooks';

// Platform logo configurations
const PLATFORM_LOGOS: Record<string, { color: string; icon: string }> = {
  LeetCode: { color: '#FFA116', icon: 'leetcode' },
  GitHub: { color: '#181717', icon: 'github' },
  'Smart India Hackathon': { color: '#FF6B35', icon: 'hackerrank' },
  'Bennett University': { color: '#1E3A8A', icon: 'academia' },
  Hackathons: { color: '#8B5CF6', icon: 'devpost' },
};

export default function Achievements() {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const cardWidth = 440; // Approximate card width + gap
  const totalCards = ACHIEVEMENTS.length + 1; // +1 for "and counting" card
  const maxTranslate = cardWidth * (totalCards - 1);

  // Handle scroll-driven horizontal movement
  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress based on how much we've scrolled past the sticky point
      const stickyStart = 0;
      const scrollableDistance = container.offsetHeight - viewportHeight;
      
      if (rect.top <= stickyStart && scrollableDistance > 0) {
        const scrolled = Math.abs(rect.top - stickyStart);
        const progress = Math.min(scrolled / scrollableDistance, 1);
        const newTranslate = progress * maxTranslate;
        
        setTranslateX(newTranslate);
        setActiveIndex(Math.round(progress * (totalCards - 1)));
      } else if (rect.top > stickyStart) {
        setTranslateX(0);
        setActiveIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxTranslate, totalCards, prefersReducedMotion]);

  // Progress percentage
  const progress = maxTranslate > 0 ? translateX / maxTranslate : 0;

  return (
    <section
      id="achievements"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-paper"
    >
      {/* Scrollable height container */}
      <div
        ref={containerRef}
        style={{
          height: prefersReducedMotion ? 'auto' : `${100 + totalCards * 40}vh`,
        }}
      >
        {/* Sticky viewport */}
        <div
          className={`
            ${prefersReducedMotion ? '' : 'sticky top-0'}
            h-screen flex flex-col justify-center overflow-hidden
          `}
        >
          {/* Header */}
          <div className="container mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div
                  className={`section-tag rv ${isInView ? 'is-in' : ''}`}
                  data-index="06"
                  style={{ '--i': 0 } as React.CSSProperties}
                >
                  Achievements
                </div>
                <h2
                  className={`section-heading rv ${isInView ? 'is-in' : ''}`}
                  style={{ '--i': 1 } as React.CSSProperties}
                >
                  Numbers that{' '}
                  <span className="accent">matter</span>.
                </h2>
              </div>

              {/* Progress bar */}
              {!prefersReducedMotion && (
                <div className="w-32 h-1 bg-soft rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ink rounded-full transition-transform duration-100"
                    style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Card track */}
          <div
            ref={trackRef}
            className={`
              flex gap-6 px-[--gutter]
              ${prefersReducedMotion ? 'flex-wrap justify-center' : ''}
            `}
            style={{
              transform: prefersReducedMotion ? 'none' : `translateX(-${translateX}px)`,
              transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            {ACHIEVEMENTS.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
                isActive={activeIndex === index}
                isInView={isInView}
              />
            ))}

            {/* "And counting" card */}
            <div
              className={`
                flex-shrink-0 card flex items-center justify-center
                ${prefersReducedMotion ? 'w-full sm:w-auto' : ''}
              `}
              style={{
                width: prefersReducedMotion ? undefined : 'clamp(340px, 40vw, 540px)',
                height: prefersReducedMotion ? '200px' : 'clamp(260px, 36vh, 310px)',
              }}
            >
              <p className="text-2xl font-bold text-mute">
                and counting →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Achievement Card Component
// ============================================================================

interface AchievementCardProps {
  achievement: (typeof ACHIEVEMENTS)[0];
  index: number;
  isActive: boolean;
  isInView: boolean;
}

function AchievementCard({ achievement, index, isActive, isInView }: AchievementCardProps) {
  const [cardRef, cardInView] = useInViewOnce({ threshold: 0.5 });
  const count = useCountUp(achievement.value, 1400, cardInView);
  const platformConfig = PLATFORM_LOGOS[achievement.platform];

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className={`
        flex-shrink-0 card flex flex-col justify-between p-6 transition-all duration-500
        ${isActive ? 'scale-[1.02] shadow-xl' : 'scale-100'}
      `}
      style={{
        width: 'clamp(340px, 40vw, 540px)',
        height: 'clamp(260px, 36vh, 310px)',
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        {/* Platform logo */}
        <div
          className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: platformConfig
              ? `${platformConfig.color}10`
              : 'var(--soft)',
          }}
        >
          {/* Soft brand glow */}
          {platformConfig && (
            <div
              className={`
                absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500
                ${isActive ? 'opacity-40' : 'opacity-20'}
              `}
              style={{ backgroundColor: platformConfig.color }}
            />
          )}
          
          {/* Icon */}
          {platformConfig ? (
            <img
              src={`https://cdn.simpleicons.org/${platformConfig.icon}/${platformConfig.color.replace('#', '')}`}
              alt={achievement.platform}
              width={36}
              height={36}
              className="relative z-10"
              loading="lazy"
            />
          ) : (
            <span className="text-2xl relative z-10">🏆</span>
          )}
        </div>

        {/* Index */}
        <span className="font-mono text-sm text-mute">
          {String(index + 1).padStart(2, '0')} / {String(ACHIEVEMENTS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between">
        {/* Labels */}
        <div>
          <p className="text-sm font-medium text-ink">{achievement.label}</p>
          <p className="text-xs text-mute">{achievement.caption}</p>
          <p className="text-xs text-faint mt-1">{achievement.detail}</p>
        </div>

        {/* Big number */}
        <div className="text-right">
          <span className="text-5xl sm:text-6xl font-bold text-ink tabular-nums">
            {achievement.prefix || ''}{count}{achievement.suffix || ''}
          </span>
        </div>
      </div>
    </div>
  );
}
