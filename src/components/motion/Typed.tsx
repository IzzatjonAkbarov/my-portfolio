'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypedProps {
  text: string;
  delay?: number;
  speed?: number;
  caret?: boolean;
  className?: string;
}

// Types text one character at a time. Screen readers get the full string immediately.
export default function Typed({ text, delay = 0, speed = 55, caret = false, className }: TypedProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed, reduce]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span className={cn('relative', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        {caret && <span className="caret ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.12em] bg-current" />}
        {/* reserve the final width so the line never reflows while typing */}
        <span className="invisible">{text.slice(shown.length)}</span>
      </span>
    </span>
  );
}
