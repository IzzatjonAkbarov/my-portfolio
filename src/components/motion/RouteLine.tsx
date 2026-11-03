'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

// The experience route grows as the reader climbs through it.
export default function RouteLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className={className}>
      <span className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-rule" aria-hidden="true" />
      <motion.span
        className="absolute left-[7px] top-3 bottom-3 w-0.5 origin-top bg-trail"
        style={reduce ? undefined : { scaleY }}
        aria-hidden="true"
      />
      {children}
    </ol>
  );
}
