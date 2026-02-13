
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    end: number;
    suffix?: string;
    duration?: number;
    className?: string;
}

export const AnimatedCounter: React.FC<Props> = ({
    end,
    suffix = '',
    duration = 2000,
    className = ''
}) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    observer.unobserve(el);

                    if (prefersReducedMotion) {
                        setCount(end);
                        return;
                    }

                    const startTime = performance.now();
                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease-out cubic for smooth deceleration
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(end);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration, hasStarted]);

    return (
        <span ref={ref} className={className}>
            {count}{suffix}
        </span>
    );
};
