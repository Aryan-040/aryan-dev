'use client';

import { useState } from 'react';
import { PROJECTS } from '@/lib/data';
import { useInViewOnce } from '@/lib/hooks';
import TechLogo, { isBrand } from '@/components/ui/TechLogo';

export default function Work() {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="work"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section bg-paper"
    >
      <div className="container">
        {/* Section header */}
        <div className="mb-12">
          <div
            className={`section-tag rv ${isInView ? 'is-in' : ''}`}
            data-index="03"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            Selected work
          </div>
          <h2
            className={`section-heading rv ${isInView ? 'is-in' : ''}`}
            style={{ '--i': 1 } as React.CSSProperties}
          >
            Things I&apos;ve{' '}
            <span className="accent">built</span>.
          </h2>
        </div>

        {/* Desktop: Expanding accordion - opens on hover */}
        <div
          className={`hidden md:flex gap-3 rv ${isInView ? 'is-in' : ''}`}
          style={{
            '--i': 2,
            height: 'min(78svh, 600px)',
          } as React.CSSProperties}
        >
          {PROJECTS.map((project, index) => (
            <ProjectPanel
              key={project.id}
              project={project}
              isActive={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Mobile: Vertical accordion */}
        <div className="md:hidden space-y-3">
          {PROJECTS.map((project, index) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              isActive={activeIndex === index}
              onToggle={() => setActiveIndex(activeIndex === index ? -1 : index)}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Desktop Project Panel
// ============================================================================

interface ProjectPanelProps {
  project: (typeof PROJECTS)[0];
  isActive: boolean;
  onActivate: () => void;
  isInView: boolean;
}

function ProjectPanel({ project, isActive, onActivate, isInView }: ProjectPanelProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl bg-card transition-all duration-700 ease-[var(--ease)]
        ${isActive ? 'flex-[8]' : 'flex-[1] cursor-pointer hover:flex-[1.5]'}
      `}
      onClick={!isActive ? onActivate : undefined}
      onMouseEnter={onActivate}
      onFocus={!isActive ? onActivate : undefined}
      tabIndex={isActive ? -1 : 0}
      role="button"
      aria-expanded={isActive}
      style={{
        boxShadow: isActive
          ? 'inset 0 0 0 1px var(--line), 0 8px 40px -12px rgba(13, 13, 13, 0.15)'
          : 'inset 0 0 0 1px var(--line)',
      }}
    >
      {/* Collapsed spine */}
      <div
        className={`
          absolute inset-0 flex flex-col items-center justify-between py-8 transition-opacity duration-500
          ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        {/* Index */}
        <span className="font-mono text-sm text-mute">{project.index}</span>

        {/* Vertical title */}
        <span
          className="font-bold text-ink text-lg tracking-tight"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          {project.title}
        </span>

        {/* Plus button */}
        <button
          className="w-10 h-10 rounded-full border border-line flex items-center justify-center transition-transform hover:rotate-90"
          aria-label={`Expand ${project.title}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7 7V3h2v4h4v2H9v4H7V9H3V7h4z" />
          </svg>
        </button>
      </div>

      {/* Expanded content */}
      <div
        className={`
          flex h-full transition-opacity duration-500 delay-200
          ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Left side - Info */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            {/* Number + Kicker */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-4xl font-bold text-soft">
                {project.index}
              </span>
              <span className="text-sm text-mute uppercase tracking-wider">
                {project.kicker}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-ink mb-4">{project.title}</h3>

            {/* Description */}
            <p className="text-ink-2 leading-relaxed mb-6">{project.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-mute">
                  <span className="text-ink mt-1">•</span>
                  {feature}
                </div>
              ))}
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-soft rounded-full text-xs"
                >
                  {isBrand(tech) && (
                    <TechLogo name={tech} size={14} />
                  )}
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>

        {/* Right side - Illustrative UI */}
        <div className="flex-1 relative bg-soft/50 overflow-hidden">
          <IllustrativeUI project={project} isActive={isActive} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Mobile Project Card
// ============================================================================

interface MobileProjectCardProps {
  project: (typeof PROJECTS)[0];
  isActive: boolean;
  onToggle: () => void;
  isInView: boolean;
  index: number;
}

function MobileProjectCard({
  project,
  isActive,
  onToggle,
  isInView,
  index,
}: MobileProjectCardProps) {
  return (
    <div
      className={`card overflow-hidden rv ${isInView ? 'is-in' : ''}`}
      style={{ '--i': 2 + index } as React.CSSProperties}
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between text-left"
        aria-expanded={isActive}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-2xl font-bold text-soft">
            {project.index}
          </span>
          <div>
            <h3 className="text-xl font-bold text-ink">{project.title}</h3>
            <p className="text-sm text-mute">{project.kicker}</p>
          </div>
        </div>
        <span
          className={`w-10 h-10 rounded-full border border-line flex items-center justify-center transition-transform ${
            isActive ? 'rotate-45' : ''
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7 7V3h2v4h4v2H9v4H7V9H3V7h4z" />
          </svg>
        </span>
      </button>

      {/* Expandable content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isActive ? 'max-h-[800px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6 space-y-4">
          <p className="text-ink-2">{project.description}</p>

          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-mute">
                <span className="text-ink mt-0.5">•</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-soft rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.github && (
            <div className="flex flex-wrap gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex-1"
              >
                GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Illustrative UI Component
// ============================================================================

interface IllustrativeUIProps {
  project: (typeof PROJECTS)[0];
  isActive: boolean;
}

function IllustrativeUI({ project, isActive }: IllustrativeUIProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-8"
      style={{
        clipPath: isActive
          ? 'inset(0 0 0 0)'
          : 'inset(0 100% 0 0)',
        transition: 'clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
      }}
    >
      <div className="relative w-full max-w-sm">
        {/* Label */}
        <span className="absolute -top-6 left-0 text-xs text-mute font-mono">
          Illustrative UI
        </span>

        {/* Mock UI based on project */}
        {project.id === 'prepkit' && <PrepKitUI />}
        {project.id === 'agentmeet' && <AgentMeetUI />}
        {project.id === 'stoxie' && <StoxieUI />}
        {project.id === 'metrics' && <MetricsUI />}
        {project.id === 'ideastash' && <IdeaStashUI />}
      </div>
    </div>
  );
}

// PrepKit - AI Interview Preparation
function PrepKitUI() {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-line">
      {/* Header */}
      <div className="bg-ink text-paper p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-paper/20 flex items-center justify-center">
            <span className="text-lg">🎯</span>
          </div>
          <span className="font-bold">PrepKit</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-mute">
            <span>Interview Prep Progress</span>
            <span>67%</span>
          </div>
          <div className="h-2 bg-soft rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-ink rounded-full" />
          </div>
        </div>

        {/* Stage indicators */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((stage) => (
            <div
              key={stage}
              className={`flex-1 h-1 rounded-full ${
                stage <= 6 ? 'bg-ink' : 'bg-soft'
              }`}
            />
          ))}
        </div>

        {/* Question preview */}
        <div className="p-3 bg-soft/50 rounded-lg">
          <p className="text-xs text-mute mb-1">Generated Question</p>
          <p className="text-sm text-ink">
            Explain how you would design a scalable...
          </p>
        </div>
      </div>
    </div>
  );
}

// Metrics - Feedback Management
function MetricsUI() {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-line">
      {/* Header */}
      <div className="p-4 border-b border-line">
        <div className="flex items-center justify-between">
          <span className="font-bold text-ink">Metrics</span>
          <span className="text-xs px-2 py-1 bg-soft rounded-full text-mute">
            Manager View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Reports', value: '8' },
            { label: 'Pending', value: '3' },
            { label: 'Completed', value: '12' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-2 bg-soft/50 rounded-lg">
              <p className="text-lg font-bold text-ink">{stat.value}</p>
              <p className="text-xs text-mute">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* User list */}
        <div className="space-y-2">
          {['John D.', 'Sarah M.', 'Alex K.'].map((name, i) => (
            <div
              key={name}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-soft/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-ink text-paper text-xs flex items-center justify-center">
                  {name[0]}
                </div>
                <span className="text-sm text-ink">{name}</span>
              </div>
              <span
                className={`w-2 h-2 rounded-full ${
                  i === 0 ? 'bg-green-500' : 'bg-soft'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stoxie - Stock Tracking
function StoxieUI() {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-line">
      {/* Header */}
      <div className="p-4 border-b border-line bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            <span className="font-bold">Stoxie</span>
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Live</span>
        </div>
      </div>

      {/* Watchlist */}
      <div className="p-3 space-y-2">
        {[
          { symbol: 'AAPL', name: 'Apple Inc.', price: '$178.52', change: '+2.34%', up: true },
          { symbol: 'GOOGL', name: 'Alphabet', price: '$141.80', change: '-0.87%', up: false },
          { symbol: 'MSFT', name: 'Microsoft', price: '$378.91', change: '+1.12%', up: true },
        ].map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-2 bg-soft/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ink text-paper rounded-lg flex items-center justify-center text-[10px] font-bold">
                {stock.symbol.slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-medium text-ink">{stock.symbol}</p>
                <p className="text-[10px] text-mute">{stock.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-ink">{stock.price}</p>
              <p className={`text-[10px] ${stock.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {stock.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Alert indicator */}
      <div className="mx-3 mb-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
        <div className="flex items-center gap-2">
          <span className="text-sm">📬</span>
          <span className="text-[10px] text-emerald-700">Email alerts enabled</span>
        </div>
      </div>
    </div>
  );
}

// AgentMeet - Video Conferencing
function AgentMeetUI() {
  return (
    <div className="bg-ink rounded-2xl shadow-lg overflow-hidden">
      {/* Video grid */}
      <div className="grid grid-cols-2 gap-1 p-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-video bg-ink-2 rounded-lg flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-paper/20 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-paper/60"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 p-3">
        {['🎤', '📹', '💬', '✋'].map((icon, i) => (
          <button
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              i === 0 ? 'bg-red-500' : 'bg-paper/10'
            }`}
          >
            <span className="text-sm">{icon}</span>
          </button>
        ))}
      </div>

      {/* AI transcript indicator */}
      <div className="mx-3 mb-3 p-2 bg-paper/10 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-paper/80">AI transcribing...</span>
        </div>
      </div>
    </div>
  );
}

// Idea Stash - Second Brain
function IdeaStashUI() {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-line">
      {/* Header */}
      <div className="p-4 border-b border-line">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span className="font-bold text-ink">Idea Stash</span>
          </div>
          <div className="px-2 py-1 bg-soft rounded text-xs text-mute">
            AI Search
          </div>
        </div>
      </div>

      {/* Content cards */}
      <div className="p-3 space-y-2">
        {[
          { type: '🎬', title: 'React 19 Deep Dive', tag: 'YouTube' },
          { type: '📝', title: 'System Design Notes', tag: 'Article' },
          { type: '💻', title: 'shadcn/ui library', tag: 'GitHub' },
        ].map((item, i) => (
          <div
            key={i}
            className="p-3 bg-soft/50 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{item.type}</span>
              <div className="flex-1">
                <p className="text-sm text-ink font-medium">{item.title}</p>
                <span className="text-[10px] text-mute">{item.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="px-3 pb-3 flex flex-wrap gap-1">
        {['React', 'Design', 'AI'].map((tag) => (
          <span key={tag} className="px-2 py-1 bg-ink text-paper text-[10px] rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
