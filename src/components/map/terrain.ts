// Deterministic terrain geometry shared by the contour fields and the elevation profile.
// No randomness: server and client render identical paths.

export const WAYPOINTS = ['hero', 'about', 'experience', 'projects', 'fun', 'contact'] as const;
export type Waypoint = (typeof WAYPOINTS)[number];

// Elevation profile of the route, x and y in 0..1 (y = 1 is the summit).
// Waypoints sit on the even fifths so the docked marker can interpolate between them.
export const PROFILE: [number, number][] = [
  [0, 0.06], [0.05, 0.12], [0.1, 0.08], [0.15, 0.2], [0.2, 0.26],
  [0.26, 0.22], [0.32, 0.36], [0.4, 0.44], [0.45, 0.39], [0.52, 0.53],
  [0.6, 0.6], [0.66, 0.55], [0.72, 0.7], [0.8, 0.78], [0.85, 0.73],
  [0.92, 0.9], [1, 1],
];

export const WAYPOINT_X = [0, 0.2, 0.4, 0.6, 0.8, 1];

export function elevationAt(x: number): number {
  for (let i = 1; i < PROFILE.length; i++) {
    const [x1, y1] = PROFILE[i];
    const [x0, y0] = PROFILE[i - 1];
    if (x <= x1) {
      const t = (x - x0) / (x1 - x0 || 1);
      return y0 + (y1 - y0) * t;
    }
  }
  return PROFILE[PROFILE.length - 1][1];
}

export function profilePath(width: number, height: number, pad = 0): string {
  return PROFILE.map(([x, y], i) => {
    const px = x * width;
    const py = pad + (1 - y) * (height - pad * 2);
    return `${i === 0 ? 'M' : 'L'}${px.toFixed(1)} ${py.toFixed(1)}`;
  }).join(' ');
}

function wobble(angle: number, ring: number, seed: number): number {
  return (
    Math.sin(angle * 2 + seed) * 0.14 +
    Math.sin(angle * 3 - seed * 1.7 + ring * 0.21) * 0.08 +
    Math.cos(angle * 5 + seed * 0.6 - ring * 0.13) * 0.045
  );
}

// Closed, smooth contour rings around a peak. Every fifth ring is an index contour.
export function contourRings(opts: {
  cx: number;
  cy: number;
  rings: number;
  inner: number;
  step: number;
  seed?: number;
  stretch?: number;
}): { d: string; index: boolean }[] {
  const { cx, cy, rings, inner, step, seed = 1, stretch = 1.25 } = opts;
  const samples = 48;
  const result: { d: string; index: boolean }[] = [];

  for (let r = 0; r < rings; r++) {
    const base = inner + r * step;
    const pts: [number, number][] = [];
    for (let s = 0; s < samples; s++) {
      const a = (s / samples) * Math.PI * 2;
      const rad = base * (1 + wobble(a, r, seed) * (0.6 + r * 0.05));
      pts.push([cx + Math.cos(a) * rad * stretch, cy + Math.sin(a) * rad]);
    }
    // Catmull-Rom to cubic Bézier, closed
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < samples; i++) {
      const p0 = pts[(i - 1 + samples) % samples];
      const p1 = pts[i];
      const p2 = pts[(i + 1) % samples];
      const p3 = pts[(i + 2) % samples];
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    result.push({ d: d + 'Z', index: r % 5 === 4 });
  }
  return result;
}
