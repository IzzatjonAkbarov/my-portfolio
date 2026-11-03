'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Counts the first number inside a label ("3,309 m", "< 20:00", "10 km") up from zero when it scrolls in.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const match = value.match(/\d[\d,\s]*/);
  const target = match ? Number(match[0].replace(/[,\s]/g, '')) : NaN;
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) return;
    let frame = 0;
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, target]);

  let display = value;
  if (match && n !== null) {
    const sep = match[0].includes(',') ? ',' : match[0].includes(' ') ? ' ' : '';
    const formatted = sep ? n.toLocaleString('en-US').replace(/,/g, sep) : String(n);
    display = value.replace(match[0].trim(), formatted);
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
