'use client';

import { useRef } from 'react';
import { TIMELINE } from '@/lib/data';
import { useInViewOnce, useScrollProgress } from '@/lib/hooks';

export default function Experience() {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.1 });
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(timelineRef);

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section bg-paper"
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className={`section-tag justify-center rv ${isInView ? 'is-in' : ''}`}
            data-index="05"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            Journey
          </div>
          <h2
            className={`section-heading rv ${isInView ? 'is-in' : ''}`}
            style={{ '--i': 1 } as React.CSSProperties}
          >
            Education &{' '}
            <span className="accent">Experience</span>.
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          {/* Vertical spine */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-soft">
            {/* Animated fill */}
            <div
              className="absolute top-0 left-0 right-0 bg-ink origin-top transition-transform duration-100"
              style={{
                transform: `scaleY(${scrollProgress})`,
                height: '100%',
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {TIMELINE.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isInView={isInView}
                isEven={index % 2 === 0}
                progress={scrollProgress}
              />
            ))}

            {/* Future card */}
            <div
              className={`
                relative pl-12 sm:pl-0 sm:w-1/2 sm:ml-auto sm:pl-8
                rv ${isInView ? 'is-in' : ''}
              `}
              style={{ '--i': TIMELINE.length + 2 } as React.CSSProperties}
            >
              {/* Dot */}
              <div
                className={`
                  absolute left-2.5 sm:left-1/2 sm:-translate-x-1/2 top-6
                  w-3 h-3 rounded-full border-2 border-dashed border-ink bg-paper
                `}
                style={{ marginLeft: '-1px' }}
              />

              {/* Card */}
              <div className="card p-6 border-dashed border-2 border-line bg-transparent">
                <h3 className="text-lg font-bold text-ink">Next — Your team?</h3>
                <p className="text-sm text-mute mt-1">
                  Open to full-time opportunities in software engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Timeline Item Component
// ============================================================================

interface TimelineItemProps {
  item: (typeof TIMELINE)[0];
  index: number;
  isInView: boolean;
  isEven: boolean;
  progress: number;
}

function TimelineItem({ item, index, isInView, isEven, progress }: TimelineItemProps) {
  // Calculate if this item's dot should be "lit"
  const itemProgress = (index + 0.5) / (TIMELINE.length + 1);
  const isLit = progress >= itemProgress;

  return (
    <div
      className={`
        relative pl-12 sm:pl-0
        ${isEven ? 'sm:w-1/2 sm:pr-8' : 'sm:w-1/2 sm:ml-auto sm:pl-8'}
        rv ${isInView ? 'is-in' : ''}
      `}
      style={{ '--i': index + 2 } as React.CSSProperties}
    >
      {/* Dot on spine */}
      <div
        className={`
          absolute top-6 w-3 h-3 rounded-full
          transition-all duration-500
          ${isLit ? 'bg-ink scale-125' : 'bg-soft'}
          ${isEven ? 'sm:right-0 sm:translate-x-1/2' : 'sm:left-0 sm:-translate-x-1/2'}
        `}
        style={{ 
          left: 'calc(1rem - 6px)', // 16px (left-4) minus half of dot width (6px)
        }}
      />

      {/* Card */}
      <div
        className={`
          card p-6 transition-all duration-500
          ${isLit ? 'shadow-lg' : ''}
        `}
      >
        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`
              px-2 py-0.5 text-xs font-mono rounded-full
              ${item.type === 'work' ? 'bg-ink text-paper' : 'bg-soft text-ink'}
            `}
          >
            {item.type === 'work' ? 'Work' : 'Education'}
          </span>
          <span className="text-sm text-mute">
            {item.startDate} — {item.endDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-ink">{item.title}</h3>

        {/* Organization */}
        <p className="text-mute mt-1">
          {item.organization}
          {item.location && <span className="text-faint"> · {item.location}</span>}
        </p>

        {/* Grade (for education) */}
        {item.grade && (
          <p className="text-sm font-medium text-ink mt-2">{item.grade}</p>
        )}

        {/* Description */}
        {item.description && (
          <p className="text-sm text-mute mt-2">{item.description}</p>
        )}

        {/* Bullets (for work) */}
        {item.bullets && item.bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {item.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-2">
                <span className="text-mute mt-1">–</span>
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
