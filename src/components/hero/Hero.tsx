'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PROFILE } from '@/lib/data';
import { useLenis } from '@/lib/scroll';

type SoundState = 'blocked' | 'playing' | 'finished' | 'muted';

const TAGLINE = 'Crafting scalable apps from backend to browser — with a touch of AI.';

function useTypewriter(text: string, speed = 40, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(tick);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(tick);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lastTimeRef = useRef(0);
  const soundPlayedRef = useRef(false);

  const [soundState, setSoundState] = useState<SoundState>('blocked');
  const { scrollTo } = useLenis();
  const { displayed, done } = useTypewriter(TAGLINE);

  // ─── Initial autoplay ────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      // Try unmuted first (most browsers block this)
      try {
        video.muted = false;
        await video.play();
        setSoundState('playing');
      } catch {
        // Fallback: muted (always allowed)
        video.muted = true;
        video.play().catch(() => {});
        setSoundState('blocked');
      }
    };

    attemptPlay();
  }, []);

  // ─── Detect when video loops → mute after first full playthrough ─────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const current = video.currentTime;

      // Loop detected: time jumped backwards by more than 0.5 s
      if (current < lastTimeRef.current - 0.5 && !soundPlayedRef.current) {
        soundPlayedRef.current = true;
        video.muted = true;
        setSoundState('finished');
      }

      lastTimeRef.current = current;
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // ─── Unlock audio on first interaction (when autoplay was blocked) ────────
  useEffect(() => {
    if (soundState !== 'blocked') return;

    const unlock = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      setSoundState('playing');
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [soundState]);

  // ─── Pause/resume when hero scrolls out of view ───────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.35, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ─── Sound button click ───────────────────────────────────────────────────
  const handleSoundToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (soundState === 'playing') {
      // Mute manually
      video.muted = true;
      setSoundState('muted');
    } else {
      // Replay from start with sound
      soundPlayedRef.current = false;
      lastTimeRef.current = 0;
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {});
      setSoundState('playing');
    }
  }, [soundState]);

  const handleExploreWork = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('#work', { offset: -80 });
  };

  const handleLetsTalk = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('#contact', { offset: -80 });
  };

  // Icon logic
  const isAudioOn = soundState === 'playing';
  const isFinished = soundState === 'finished';
  const isBlocked = soundState === 'blocked';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', backgroundColor: '#c2c0bd' }}
    >
      {/* ── Ghost word ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-bold tracking-tighter uppercase leading-none"
          style={{
            fontSize: 'clamp(120px, 22vw, 320px)',
            WebkitTextStroke: '2px rgba(13,13,13,0.15)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* ── Video ─────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        aria-label={`Intro video of ${PROFILE.name}`}
      >
        <video
          ref={videoRef}
          loop
          playsInline
          preload="auto"
          poster="/hero/poster.jpg"
          className="w-full h-full object-cover"
          style={{ mixBlendMode: 'multiply' }}
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Top row: role title  +  sound button ──────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-end justify-between"
        style={{ padding: 'clamp(72px, 11vh, 120px) var(--gutter) 0' }}
      >
        {/* Role + description */}
        <div>
          <h1
            className="font-bold tracking-tight leading-none"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', letterSpacing: '-0.045em' }}
          >
            {PROFILE.role}
            <span style={{ color: 'var(--mute)' }}>.</span>
          </h1>
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
              color: 'var(--ink)',
              opacity: 0.6,
              marginTop: '0.4em',
              letterSpacing: '0.01em',
              lineHeight: 1.5,
              maxWidth: '34ch',
            }}
          >
            {displayed}
            {/* blinking cursor — hidden once typing is done */}
            {!done && (
              <span
                style={{
                  display: 'inline-block',
                  width: '1px',
                  height: '1em',
                  background: 'currentColor',
                  marginLeft: '1px',
                  verticalAlign: 'text-bottom',
                  animation: 'blink 0.8s step-end infinite',
                }}
                aria-hidden="true"
              />
            )}
          </p>
        </div>

        {/* Sound button */}
        <button
          onClick={handleSoundToggle}
          className={`
            relative flex-shrink-0 w-12 h-12 rounded-full
            bg-ink text-paper
            flex items-center justify-center
            transition-transform duration-200 hover:scale-105
            focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2
            ${isBlocked ? 'animate-ping-ring' : ''}
          `}
          aria-label={
            isAudioOn
              ? 'Mute introduction'
              : isFinished
              ? 'Replay introduction with sound'
              : 'Play introduction with sound'
          }
        >
          {isAudioOn ? (
            /* Pause / mute bars */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : isFinished ? (
            /* Replay arrow */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 8a6 6 0 1 0 6-6V0L4 3l4 3V4a4 4 0 1 1-4 4H2z" />
            </svg>
          ) : (
            /* Play triangle */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 1.5v11l9-5.5-9-5.5z" />
            </svg>
          )}

          {/* Soft ping ring when audio was blocked */}
          {isBlocked && (
            <span
              className="absolute inset-0 rounded-full border-2 border-ink animate-ping opacity-25"
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* ── Bottom row: CTAs  +  scroll indicator ─────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between"
        style={{ padding: '0 var(--gutter) clamp(28px, 5vh, 52px)' }}
      >
        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleExploreWork} className="btn btn-primary">
            Explore work
          </button>
          <button onClick={handleLetsTalk} className="btn btn-secondary">
            Let&apos;s talk
          </button>
          <a href={PROFILE.resume} download className="btn btn-secondary">
            Resume ↓
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="hidden sm:flex flex-col items-center gap-2 pb-1"
          aria-hidden="true"
        >
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--mute)' }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom, var(--mute), transparent)',
            }}
          />
        </div>
      </div>

    </section>
  );
}
