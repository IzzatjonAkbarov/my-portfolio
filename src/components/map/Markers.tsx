import { cn } from '@/lib/utils';

// Map symbols: a summit triangle and a waypoint ring, drawn at one stroke weight.

export function SummitMark({ className, filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('size-4 shrink-0', className)} aria-hidden="true">
      <path
        d="M8 2.2 14.4 13.6H1.6Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WaypointMark({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('size-4 shrink-0', className)} aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" fill="var(--paper)" stroke="currentColor" strokeWidth="1.75" />
      {active && <circle cx="8" cy="8" r="2.5" fill="currentColor" />}
    </svg>
  );
}
