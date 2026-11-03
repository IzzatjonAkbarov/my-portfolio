'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { WAYPOINTS, WAYPOINT_X, elevationAt, profilePath } from './terrain';
import { goTo } from './useRouteProgress';

const W = 1000;

interface ElevationProfileProps {
  variant: 'hero' | 'docked';
  /** Position of the "you are here" marker along the route, 0..1. */
  progress?: number;
  active?: number;
  className?: string;
}

export default function ElevationProfile({
  variant,
  progress,
  active = 0,
  className,
}: ElevationProfileProps) {
  const t = useTranslations('Navigation');
  const clipId = useId();
  const hero = variant === 'hero';
  const H = hero ? 160 : 40;
  const pad = hero ? 14 : 6;
  const line = profilePath(W, H, pad);
  const yPct = (x: number) => ((pad + (1 - elevationAt(x)) * (H - pad * 2)) / H) * 100;

  return (
    <div className={cn('relative', className)}>
      <div className={cn('relative w-full', hero ? 'h-28 sm:h-36' : 'h-7')}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          {hero && (
            <>
              <path d={`${line} L${W} ${H} L0 ${H}Z`} fill="var(--water)" fillOpacity="0.12" />
              {[0.25, 0.5, 0.75].map((g) => (
                <line
                  key={g}
                  x1="0"
                  x2={W}
                  y1={H * g}
                  y2={H * g}
                  stroke="var(--rule)"
                  strokeDasharray="2 6"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </>
          )}
          <path
            d={line}
            fill="none"
            stroke={hero ? 'var(--trail)' : 'var(--ink-soft)'}
            strokeWidth={hero ? 3 : 1.5}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={hero ? 'trail-draw' : undefined}
          />
          {!hero && progress !== undefined && (
            <>
              <clipPath id={clipId}>
                <rect x="0" y="-10" width={progress * W} height={H + 20} />
              </clipPath>
              <path
                d={line}
                fill="none"
                stroke="var(--trail)"
                strokeWidth={2.5}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                clipPath={`url(#${clipId})`}
              />
            </>
          )}
        </svg>

        {WAYPOINTS.map((id, i) => {
          const x = WAYPOINT_X[i];
          const summit = i === WAYPOINTS.length - 1;
          const reached = i <= active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              aria-label={t(id === 'hero' ? 'home' : id)}
              title={hero ? undefined : t(id === 'hero' ? 'home' : id)}
              className={cn(
                'group absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center cursor-pointer',
                hero ? 'size-9' : 'size-6'
              )}
              style={{ left: `${x * 100}%`, top: `${yPct(x)}%` }}
            >
              {summit ? (
                <svg viewBox="0 0 16 16" className={cn(hero ? 'size-5' : 'size-3.5', 'text-trail transition-transform group-hover:-translate-y-0.5')}>
                  <path d="M8 2.2 14.4 13.6H1.6Z" fill="currentColor" stroke="var(--paper)" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              ) : (
                <span
                  className={cn(
                    'block rounded-full border-2 transition-colors',
                    hero ? 'size-3.5' : 'size-2.5',
                    hero || reached ? 'border-trail' : 'border-ink-soft',
                    reached && !hero ? 'bg-trail' : 'bg-paper',
                    'group-hover:bg-trail'
                  )}
                />
              )}
            </button>
          );
        })}

        {!hero && progress !== undefined && (
          <span
            className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trail ring-4 ring-trail/20 transition-[left,top] duration-150 ease-out"
            style={{ left: `${progress * 100}%`, top: `${yPct(progress)}%` }}
            aria-hidden="true"
          />
        )}
      </div>

      {hero && (
        <ol className="relative mt-3 hidden h-5 text-[13px] font-medium text-ink-soft sm:block">
          {WAYPOINTS.map((id, i) => {
            const x = WAYPOINT_X[i];
            const edge = i === 0 ? 'translate-x-0' : i === WAYPOINTS.length - 1 ? '-translate-x-full' : '-translate-x-1/2';
            return (
              <li key={id} className={cn('absolute whitespace-nowrap', edge)} style={{ left: `${x * 100}%` }}>
                <button
                  type="button"
                  onClick={() => goTo(id)}
                  className={cn(
                    'cursor-pointer hover:text-ink hover:underline',
                    i === WAYPOINTS.length - 1 && 'font-semibold text-trail hover:text-trail'
                  )}
                >
                  {t(id === 'hero' ? 'home' : id)}
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
