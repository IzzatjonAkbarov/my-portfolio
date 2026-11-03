'use client';

import { useEffect, useState } from 'react';
import { WAYPOINTS, WAYPOINT_X } from './terrain';

// Maps the scroll position onto the route: x along the profile (0..1) and the current waypoint.
export function useRouteProgress() {
  const [state, setState] = useState({ x: 0, active: 0, pastHero: false });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const tops = WAYPOINTS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      const probe = window.scrollY + window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      let active = 0;
      for (let i = 0; i < tops.length; i++) if (probe >= tops[i]) active = i;

      let x = WAYPOINT_X[active];
      if (atBottom) {
        active = WAYPOINTS.length - 1;
        x = 1;
      } else if (active < tops.length - 1) {
        const span = tops[active + 1] - tops[active] || 1;
        const t = Math.min(1, Math.max(0, (probe - tops[active]) / span));
        x = WAYPOINT_X[active] + t * (WAYPOINT_X[active + 1] - WAYPOINT_X[active]);
      }

      const hero = document.getElementById('hero');
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 120 : false;

      setState((prev) =>
        prev.active === active && Math.abs(prev.x - x) < 0.001 && prev.pastHero === pastHero
          ? prev
          : { x, active, pastHero }
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}

export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}
