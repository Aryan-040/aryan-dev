'use client';

import { CERTIFICATIONS } from '@/lib/data';
import { useInViewOnce } from '@/lib/hooks';

export default function Certifications() {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.2 });

  // Only render if there are certifications
  if (CERTIFICATIONS.length === 0) return null;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-16 bg-card border-y border-line"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
          {/* Left: Sticky heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className={`section-tag rv ${isInView ? 'is-in' : ''}`}
              data-index="04"
              style={{ '--i': 0 } as React.CSSProperties}
            >
              Certifications
            </div>
            <h2
              className={`section-heading text-3xl sm:text-4xl rv ${isInView ? 'is-in' : ''}`}
              style={{ '--i': 1 } as React.CSSProperties}
            >
              Always{' '}
              <span className="accent">learning</span>.
            </h2>
            <p
              className={`text-mute mt-4 rv ${isInView ? 'is-in' : ''}`}
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {CERTIFICATIONS.length} certification{CERTIFICATIONS.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Right: Certification list */}
          <div className="space-y-0">
            {CERTIFICATIONS.map((cert, index) => (
              <CertificationRow
                key={cert.id}
                certification={cert}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Certification Row Component
// ============================================================================

interface CertificationRowProps {
  certification: (typeof CERTIFICATIONS)[0];
  index: number;
  isInView: boolean;
}

function CertificationRow({ certification, index, isInView }: CertificationRowProps) {
  const Wrapper = certification.link ? 'a' : 'div';
  const wrapperProps = certification.link
    ? { href: certification.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`
        group ink-flood-row relative py-6 border-b border-line last:border-b-0 block
        rv ${isInView ? 'is-in' : ''}
        ${certification.link ? 'cursor-pointer' : ''}
      `}
      style={{ '--i': 3 + index } as React.CSSProperties}
    >
      {/* Ink flood background */}
      <div
        className="ink-flood-bg absolute inset-0 bg-ink origin-left transition-transform duration-500 ease-[var(--ease)] scale-x-0"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex items-center gap-6 transition-colors duration-300 group-hover:text-paper group-focus-within:text-paper">
        {/* Index number */}
        <span className="font-mono text-sm text-mute group-hover:text-paper/60 group-focus-within:text-paper/60 transition-colors w-8">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title and issuer */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-paper group-focus-within:text-paper transition-colors">
            {certification.title}
          </h3>
          <p className="text-sm text-mute group-hover:text-paper/60 group-focus-within:text-paper/60 transition-colors">
            {certification.issuer} · {certification.year}
          </p>
        </div>

        {/* Arrow - only show if there's a link */}
        {certification.link && (
          <span
            className="
              text-ink opacity-0 -translate-x-4
              group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-paper
              group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:text-paper
              transition-all duration-300
            "
            aria-hidden="true"
          >
            ↗
          </span>
        )}
      </div>
    </Wrapper>
  );
}
