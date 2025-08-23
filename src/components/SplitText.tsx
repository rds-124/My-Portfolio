import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, Transition } from 'framer-motion';
import { EasingFunction } from 'framer-motion';

// --- Interface updated to match the new component's capabilities ---
export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  // This prop is kept for compatibility, but the new component uses 'animateBy' internally
  splitType?: "chars" | "words" | "lines"; 
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
}

// Helper function to build the keyframes for the animation
const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number | null>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number | null>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k] ?? null, ...steps.map((s) => s[k] ?? null)];
  });
  return keyframes;
};


// --- The component is now the BlurText logic, but named SplitText ---
const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 50, // Adjusted default delay for a snappier feel
  splitType = 'chars', // Kept for compatibility
  direction = 'top',
  onAnimationComplete,
}) => {
  // Map the old `splitType` prop to the new `animateBy` logic
  const animateBy = splitType === 'chars' ? 'letters' : 'words';
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // --- Default animation values ---
  const from = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(12px)', opacity: 0, y: -30 }
        : { filter: 'blur(12px)', opacity: 0, y: 30 },
    [direction]
  );

  const to = useMemo(
    () => [{ filter: 'blur(0px)', opacity: 1, y: 0 }],
    []
  );

  return (
    <p
      ref={ref}
      className={className}
      // Added styles to handle word wrapping and alignment correctly
      style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}
    >
      <span className="sr-only">{text}</span> {/* For SEO and screen readers */}
      <span aria-hidden>
        {elements.map((segment, index) => {
          const animateKeyframes = buildKeyframes(from, to);

          const spanTransition: Transition = {
            duration: 0.8, // A slightly longer duration for a smoother effect
            delay: (index * delay) / 1000,
            ease: "easeOut",
          };

          return (
            <motion.span
              key={index}
              initial={from}
              animate={inView ? animateKeyframes : from}
              transition={spanTransition}
              onAnimationComplete={
                index === elements.length - 1 ? onAnimationComplete : undefined
              }
              style={{
                display: 'inline-block',
                willChange: 'transform, filter, opacity',
              }}
            >
              {segment === ' ' ? '\u00A0' : segment}
              {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
            </motion.span>
          );
        })}
      </span>
    </p>
  );
};

export default SplitText;
