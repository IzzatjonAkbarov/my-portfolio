'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

const variants: Record<'rise' | 'blur' | 'clip' | 'slide', Variants> = {
  rise: { hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0 } },
  blur: { hidden: { opacity: 0, filter: 'blur(10px)' }, shown: { opacity: 1, filter: 'blur(0px)' } },
  clip: { hidden: { clipPath: 'inset(0 100% 0 0)' }, shown: { clipPath: 'inset(0 0% 0 0)' } },
  slide: { hidden: { opacity: 0, x: -24 }, shown: { opacity: 1, x: 0 } },
};

interface RevealProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'span';
}

export default function Reveal({
  children,
  variant = 'rise',
  delay = 0,
  duration = 0.8,
  className,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={cn(className)}
      variants={variants[variant]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  );
}
