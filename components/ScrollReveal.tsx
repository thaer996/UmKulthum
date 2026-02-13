
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
}

export const ScrollReveal: React.FC<Props> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.15
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const directionClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[direction];

  return (
    <div
      ref={ref}
      className={`${directionClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
