'use client';

import { useEffect, createContext, useContext, useState, useRef } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Don't initialize Lenis if user prefers reduced motion
      setIsReady(true);
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenisInstance;

    let animationFrameId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Add lenis class to html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    setIsReady(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisInstance.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement | number,
    options: ScrollToOptions = {}
  ) => {
    const { offset = 0, duration = 1.2, immediate = false } = options;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset,
        duration: immediate ? 0 : duration,
      });
    } else {
      // Fallback for when Lenis is not initialized (reduced motion)
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target + offset, behavior: immediate ? 'auto' : 'smooth' });
      } else if (target instanceof HTMLElement) {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Scroll to a target element with offset
 */
export function scrollToTarget(
  target: string | HTMLElement,
  offset: number = 0
): void {
  const element =
    typeof target === 'string' ? document.querySelector(target) : target;

  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
