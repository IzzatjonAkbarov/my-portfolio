'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ContourField from './ContourField';
import { elevationAt } from './terrain';

// Tashkent sheet origin; the readout walks a small window around it as the pointer moves.
const LAT = 41.3111;
const LON = 69.2797;

function dms(v: number, pos: string, neg: string) {
  const a = Math.abs(v);
  const d = Math.floor(a);
  const m = Math.floor((a - d) * 60);
  const s = Math.round(((a - d) * 60 - m) * 60);
  return `${d}°${String(m).padStart(2, '0')}′${String(s).padStart(2, '0')}″${v >= 0 ? pos : neg}`;
}

export default function HudField({ portraitAlt }: { portraitAlt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [p, setP] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const x = p?.x ?? 0.5;
  const y = p?.y ?? 0.5;
  const dist = Math.min(1, Math.hypot(x - 0.5, y - 0.5) * 2);
  const elev = Math.round(3309 - dist * 1500 - elevationAt(dist) * 40);

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={() => setP(null)}
      className="group relative mx-auto aspect-square w-full max-w-[460px] cursor-crosshair lg:col-span-5"
    >
      <ContourField
        className="absolute inset-0 size-full"
        rings={17}
        inner={44}
        step={15}
        seed={2.3}
        labels={['3000', '2700', '2400']}
        animate
        fade
      />

      {/* HUD crosshair */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span
          className="absolute inset-y-0 w-px bg-water/50 transition-[left] duration-100 ease-out"
          style={{ left: `${x * 100}%` }}
        />
        <span
          className="absolute inset-x-0 h-px bg-water/50 transition-[top] duration-100 ease-out"
          style={{ top: `${y * 100}%` }}
        />
        <span
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-water transition-[left,top] duration-100 ease-out"
          style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
        />
        {/* corner brackets of the viewfinder */}
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map((c) => (
          <span key={c} className={`absolute size-5 border-ink/40 ${c}`} />
        ))}
      </div>

      <figure className="absolute left-1/2 top-1/2 w-[44%] -translate-x-1/2 -translate-y-1/2 border border-ink/40 bg-paper-raised p-1.5 shadow-[0_18px_40px_-22px_rgb(0_0_0/0.55)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src="/images/profile.jpg" alt={portraitAlt} fill priority sizes="(max-width: 1024px) 45vw, 230px" className="object-cover" />
        </div>
      </figure>

      <p
        className="figures absolute bottom-1 left-1 bg-paper/90 px-2 py-1 font-mono text-[11px] leading-tight text-ink-soft"
        aria-hidden="true"
      >
        <span className="text-ink">{dms(LAT + (0.5 - y) * 0.04, 'N', 'S')}</span>{' '}
        {dms(LON + (x - 0.5) * 0.05, 'E', 'W')}
        <br />
        elev <span className="text-trail">{elev.toLocaleString('en-US')} m</span>
      </p>
    </div>
  );
}
