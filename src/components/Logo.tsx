import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Summit mark: the route's final triangle carrying the IA monogram.
export default function Logo({ className, size = 'md' }: LogoProps) {
  const box = { sm: 'size-7', md: 'size-9', lg: 'size-12' }[size];

  return (
    <svg viewBox="0 0 36 36" className={cn(box, 'shrink-0 select-none', className)} aria-hidden="true">
      <path d="M18 3 34 32H2Z" fill="var(--trail)" />
      <text
        x="18"
        y="28"
        textAnchor="middle"
        fill="var(--trail-ink)"
        fontSize="9.5"
        fontWeight={800}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        IA
      </text>
    </svg>
  );
}
