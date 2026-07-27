'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-7 px-2.5 text-xs',
    md: 'h-8 px-3 text-xs sm:text-sm',
    lg: 'h-10 px-4 text-base',
  }[size];

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl font-mono font-extrabold tracking-tight transition-all duration-300 select-none shadow-xs',
        'bg-zinc-900 text-zinc-50 border border-zinc-800 hover:border-emerald-500/50',
        'dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800 dark:hover:border-emerald-500/50',
        sizeClasses,
        className
      )}
    >
      <span className="text-emerald-400 font-black">&lt;</span>
      <span className="text-zinc-50 font-extrabold mx-0.5 tracking-tighter">
        IA
      </span>
      <span className="text-emerald-400 font-black">/&gt;</span>
    </div>
  );
}
