'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to detect if an element is in view using IntersectionObserver
 */
export function useInView(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return [ref, isInView];
}

/**
 * Hook to detect if an element is in view (triggers once)
 */
export function useInViewOnce(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasBeenInView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasBeenInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin, hasBeenInView]);

  return [ref, hasBeenInView];
}

/**
 * Hook to track scroll progress within an element
 */
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate progress: 0 when element enters view, 1 when it leaves
      const start = windowHeight;
      const end = -elementHeight;
      const current = elementTop;
      const rawProgress = (start - current) / (start - end);
      
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}

/**
 * Hook to detect prefers-reduced-motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check SSR
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to track window scroll position
 */
export function useWindowScroll(): { x: number; y: number } {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScroll({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
}

/**
 * Hook to track active section based on scroll position
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-45% 0px -50% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}

/**
 * Hook for requestAnimationFrame loop
 */
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  enabled: boolean = true
): void {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  // Update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const animate = (time: number) => {
      if (previousTimeRef.current !== 0) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [enabled]);
}

/**
 * Hook to track mouse/touch position relative to an element
 */
export function usePointerPosition(
  ref: React.RefObject<HTMLElement | null>
): { x: number; y: number; isOver: boolean } {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5, isOver: false });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      setPosition({ x, y, isOver: true });
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleLeave = () => setPosition((prev) => ({ ...prev, isOver: false }));

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return position;
}

/**
 * Hook to lock body scroll
 */
export function useBodyScrollLock(lock: boolean): void {
  useEffect(() => {
    if (lock) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [lock]);
}

/**
 * Hook to count up a number when in view
 */
export function useCountUp(
  target: number,
  duration: number = 1400,
  isInView: boolean = true
): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    
    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, isInView]);

  return count;
}
