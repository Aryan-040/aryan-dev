'use client';

// ─── Simple Icons CDN slugs (verified against simple-icons package) ──────────
const SI_LOGOS: Record<string, { color: string; slug: string }> = {
  JavaScript:       { color: '#F7DF1E', slug: 'javascript' },
  TypeScript:       { color: '#3178C6', slug: 'typescript' },
  SQL:              { color: '#4479A1', slug: 'mysql' },
  'React.js':       { color: '#61DAFB', slug: 'react' },
  'Next.js':        { color: '#ffffff', slug: 'nextdotjs' },
  'Tailwind CSS':   { color: '#06B6D4', slug: 'tailwindcss' },
  'HTML/CSS':       { color: '#E34F26', slug: 'html5' },
  'Node.js':        { color: '#339933', slug: 'nodedotjs' },
  'Express.js':     { color: '#ffffff', slug: 'express' },
  tRPC:             { color: '#2596BE', slug: 'trpc' },
  PostgreSQL:       { color: '#4169E1', slug: 'postgresql' },
  MongoDB:          { color: '#47A248', slug: 'mongodb' },
  MySQL:            { color: '#4479A1', slug: 'mysql' },
  Prisma:           { color: '#5a67d8', slug: 'prisma' },
  Docker:           { color: '#2496ED', slug: 'docker' },
  Git:              { color: '#F05032', slug: 'git' },
  'GitHub Actions': { color: '#2088FF', slug: 'githubactions' },
  Vercel:           { color: '#ffffff', slug: 'vercel' },
  JUnit:            { color: '#25A162', slug: 'junit5' },
};

// ─── Inline SVGs for brands not in Simple Icons ──────────────────────────────
const INLINE_BRAND_SVGS: Record<string, { color: string; svg: React.ReactNode }> = {
  Java: {
    color: '#007396',
    svg: (
      <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Cup body */}
        <path d="M35 30 Q32 55 38 65 Q44 75 50 76 Q56 75 62 65 Q68 55 65 30 Z" opacity="0.15"/>
        <path d="M35 30 Q32 55 38 65 Q44 75 50 76 Q56 75 62 65 Q68 55 65 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        {/* Steam wisps */}
        <path d="M43 22 Q40 16 43 10 Q46 4 43 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M50 24 Q47 18 50 12 Q53 6 50 2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M57 22 Q54 16 57 10 Q60 4 57 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        {/* Saucer */}
        <ellipse cx="50" cy="78" rx="22" ry="5" fill="none" stroke="currentColor" strokeWidth="3.5"/>
        <path d="M30 80 Q28 88 50 90 Q72 88 70 80" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
        {/* java text hint - small dots */}
        <rect x="38" y="95" width="4" height="4" rx="2"/>
        <rect x="46" y="95" width="4" height="4" rx="2"/>
        <rect x="54" y="95" width="4" height="4" rx="2"/>
      </svg>
    ),
  },
  AWS: {
    color: '#FF9900',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.6 38.5l-5.3 14.8h-3.2l-5.4-14.8h3.2l3.8 11.3 3.8-11.3h3.1zm14.3 11.6c0 .9-.3 1.6-.8 2.1-.6.5-1.3.7-2.2.7-.9 0-1.6-.2-2.2-.7-.5-.5-.8-1.2-.8-2.1V38.5h3v11.1c0 .4.1.6.2.8.1.1.3.2.5.2s.4-.1.5-.2c.1-.2.2-.4.2-.8v-11h3v11.6h-.4zm14.3 3.2h-3.1l-2-5.4-2 5.4h-3.1l3.5-7.5-3.3-7.3h3.1l1.8 5 1.8-5h3.1l-3.3 7.3 3.5 7.5z" fill="#FF9900"/>
        <path d="M50 65c-8.3 0-16.2-2.1-23-5.8l-1.5 1.5C33.1 64.8 41.3 67 50 67c8.7 0 16.9-2.2 24.2-6.1L72.8 59C66.1 62.9 58.2 65 50 65z" fill="#FF9900"/>
        <path d="M76.2 58l1.3 1.3c1.2-1 2.3-2.1 3.3-3.2l-1.3-1.3c-1 1.1-2.1 2.2-3.3 3.2z" fill="#FF9900"/>
        <path d="M78.5 55.5l1.5-1.1c-.4-.5-.8-1-1.2-1.5l-1.4 1.1c.4.5.7 1 1.1 1.5z" fill="#FF9900"/>
      </svg>
    ),
  },
  'OpenAI API': {
    color: '#412991',
    svg: (
      <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M92.1 42.9a25.1 25.1 0 0 0-2.2-20.6 25.4 25.4 0 0 0-27.4-12.2A25.2 25.2 0 0 0 43.6 3a25.4 25.4 0 0 0-24.2 17.6 25.2 25.2 0 0 0-16.8 12.2 25.5 25.5 0 0 0 3.1 29.9 25.1 25.1 0 0 0 2.2 20.6 25.4 25.4 0 0 0 27.4 12.2A25.2 25.2 0 0 0 54.2 97a25.4 25.4 0 0 0 24.3-17.6 25.2 25.2 0 0 0 16.8-12.2 25.4 25.4 0 0 0-3.2-24.3zM54.2 90.8a18.8 18.8 0 0 1-12.1-4.4l.6-.3 20.1-11.6a3.3 3.3 0 0 0 1.7-2.9V44.1l8.5 4.9a.3.3 0 0 1 .2.3v23.5a18.9 18.9 0 0 1-19 18zm-40.7-17.4a18.8 18.8 0 0 1-2.3-12.7l.6.4 20.1 11.6a3.4 3.4 0 0 0 3.3 0L57.8 61l8.5 4.9a.3.3 0 0 1 .1.3L47.6 77.6a19 19 0 0 1-34.1-4.2zm-5.3-44a18.9 18.9 0 0 1 9.8-8.3v23.8a3.3 3.3 0 0 0 1.7 2.9L41.2 59l-8.5 4.9a.3.3 0 0 1-.3 0L14.2 53.5a19 19 0 0 1-6-24.1zm49.4 16.2L35.9 34l8.5-4.9a.3.3 0 0 1 .3 0l18.2 10.5a19 19 0 0 1-2.9 34.2V50.2a3.3 3.3 0 0 0-1.4-2.6zm8.5-12.8l-.6-.4-20.1-11.6a3.4 3.4 0 0 0-3.3 0L20.4 32.1l-8.5-4.9a.3.3 0 0 1-.1-.3L30.5 16.5a18.9 18.9 0 0 1 28.2 6 18.8 18.8 0 0 1 2.5 8.3 19.1 19.1 0 0 1-4.9 2zM9.5 35.6l8.5 4.9a.3.3 0 0 1 .1.3v23a18.9 18.9 0 0 1-11.1-17.2 19.1 19.1 0 0 1 2.5-11z"/>
      </svg>
    ),
  },
  Inngest: {
    color: '#5D5DFF',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="18" height="70" rx="6" fill="currentColor"/>
        <rect x="62" y="15" width="18" height="70" rx="6" fill="currentColor"/>
        <rect x="20" y="41" width="60" height="18" rx="6" fill="currentColor"/>
      </svg>
    ),
  },
};

// ─── Custom line icons for concept-level skills ───────────────────────────────
const CONCEPT_ICONS: Record<string, React.ReactNode> = {
  'Data Structures': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <rect x="28" y="8" width="12" height="12" rx="2" />
      <rect x="18" y="28" width="12" height="12" rx="2" />
      <line x1="14" y1="20" x2="24" y2="28" />
      <line x1="34" y1="20" x2="24" y2="28" />
    </svg>
  ),
  'System Design': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="18" width="12" height="12" rx="2" />
      <rect x="18" y="4" width="12" height="12" rx="2" />
      <rect x="18" y="32" width="12" height="12" rx="2" />
      <rect x="32" y="18" width="12" height="12" rx="2" />
      <line x1="16" y1="24" x2="18" y2="24" />
      <line x1="30" y1="24" x2="32" y2="24" />
      <line x1="24" y1="16" x2="24" y2="18" />
      <line x1="24" y1="30" x2="24" y2="32" />
    </svg>
  ),
  OOP: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="14" r="8" />
      <circle cx="12" cy="34" r="6" />
      <circle cx="36" cy="34" r="6" />
      <line x1="19" y1="20" x2="14" y2="28" />
      <line x1="29" y1="20" x2="34" y2="28" />
    </svg>
  ),
  Agile: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="16" />
      <path d="M24 12 L24 24 L32 28" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  ),
  SDLC: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 8 L24 16" />
      <path d="M24 32 L24 40" />
      <path d="M8 24 L16 24" />
      <path d="M32 24 L40 24" />
      <circle cx="24" cy="24" r="10" />
      <path d="M20 24 L22 26 L28 20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'REST APIs': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="12" width="16" height="24" rx="2" />
      <rect x="26" y="12" width="16" height="24" rx="2" />
      <path d="M22 20 L26 24 L22 28" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="18" x2="18" y2="18" />
      <line x1="10" y1="24" x2="16" y2="24" />
      <line x1="30" y1="24" x2="38" y2="24" />
      <line x1="30" y1="30" x2="36" y2="30" />
    </svg>
  ),
  Microservices: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="10" height="10" rx="2" />
      <rect x="19" y="4" width="10" height="10" rx="2" />
      <rect x="34" y="4" width="10" height="10" rx="2" />
      <rect x="4" y="34" width="10" height="10" rx="2" />
      <rect x="19" y="34" width="10" height="10" rx="2" />
      <rect x="34" y="34" width="10" height="10" rx="2" />
      <line x1="24" y1="14" x2="24" y2="34" />
      <line x1="9" y1="14" x2="9" y2="34" />
      <line x1="39" y1="14" x2="39" y2="34" />
    </svg>
  ),
  'Unit Testing': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="8" width="32" height="32" rx="4" />
      <path d="M16 24 L20 28 L32 16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  'Integration Testing': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="14" width="14" height="20" rx="2" />
      <rect x="30" y="14" width="14" height="20" rx="2" />
      <path d="M18 24 L30 24" strokeLinecap="round" />
      <path d="M24 20 L24 28" />
    </svg>
  ),
  'Test Automation': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="16" />
      <path d="M24 14 L24 24" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <path d="M16 32 L24 24 L32 32" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  RAG: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="6" width="14" height="18" rx="2" />
      <rect x="28" y="6" width="14" height="18" rx="2" />
      <rect x="17" y="28" width="14" height="14" rx="2" />
      <line x1="13" y1="24" x2="24" y2="28" />
      <line x1="35" y1="24" x2="24" y2="28" />
      <circle cx="24" cy="35" r="3" fill="currentColor" />
    </svg>
  ),
  'LLM Integration': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="14" />
      <path d="M18 20 Q24 14 30 20" strokeLinecap="round" />
      <path d="M18 28 Q24 34 30 28" strokeLinecap="round" />
      <circle cx="18" cy="24" r="2" fill="currentColor" />
      <circle cx="30" cy="24" r="2" fill="currentColor" />
    </svg>
  ),
  WebRTC: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="14" cy="24" r="8" />
      <circle cx="34" cy="24" r="8" />
      <path d="M22 20 L26 20" />
      <path d="M22 24 L26 24" />
      <path d="M22 28 L26 28" />
    </svg>
  ),
  'CI/CD': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="24" r="6" />
      <circle cx="38" cy="24" r="6" />
      <path d="M16 24 L32 24" />
      <path d="M28 20 L32 24 L28 28" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="10" r="4" />
      <circle cx="24" cy="38" r="4" />
      <line x1="24" y1="14" x2="24" y2="20" />
      <line x1="24" y1="28" x2="24" y2="34" />
    </svg>
  ),
};

export function isBrand(name: string): boolean {
  return name in SI_LOGOS || name in INLINE_BRAND_SVGS;
}

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export default function TechLogo({ name, size = 48, className = '' }: TechLogoProps) {
  const si = SI_LOGOS[name];
  const inline = INLINE_BRAND_SVGS[name];
  const concept = CONCEPT_ICONS[name];

  // ── Simple Icons CDN brand ────────────────────────────────────────────────
  if (si) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={`https://cdn.simpleicons.org/${si.slug}/${si.color.replace('#', '')}`}
          alt={name}
          width={size * 0.72}
          height={size * 0.72}
          className="relative z-10"
          loading="lazy"
        />
      </div>
    );
  }

  // ── Inline SVG brand (AWS, OpenAI API, Inngest) ───────────────────────────
  if (inline) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size, color: inline.color }}
      >
        <div style={{ width: size * 0.72, height: size * 0.72 }}>
          {inline.svg}
        </div>
      </div>
    );
  }

  // ── Concept / custom line icon ────────────────────────────────────────────
  if (concept) {
    return (
      <div
        className={`text-ink ${className}`}
        style={{ width: size, height: size }}
      >
        {concept}
      </div>
    );
  }

  // ── Fallback: two-letter monogram ─────────────────────────────────────────
  return (
    <div
      className={`flex items-center justify-center bg-soft rounded-lg text-ink font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.slice(0, 2)}
    </div>
  );
}
