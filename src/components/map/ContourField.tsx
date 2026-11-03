'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { contourRings } from './terrain';
import { cn } from '@/lib/utils';

interface ContourFieldProps {
  className?: string;
  width?: number;
  height?: number;
  rings?: number;
  inner?: number;
  step?: number;
  seed?: number;
  /** Elevation printed on index contours, top ring first. */
  labels?: string[];
  animate?: boolean;
  /** Fade the rings out toward the edges instead of cropping them. */
  fade?: boolean;
  /** Draw the rings in, summit outward, when the field scrolls into view. */
  draw?: boolean;
}

export default function ContourField({
  className,
  width = 640,
  height = 640,
  rings = 16,
  inner = 28,
  step = 18,
  seed = 1,
  labels,
  animate = false,
  fade = false,
  draw = false,
}: ContourFieldProps) {
  const reduce = useReducedMotion();
  const cx = width / 2;
  const cy = height / 2;
  const paths = contourRings({ cx, cy, rings, inner, step, seed });
  const indexRings = paths
    .map((p, i) => ({ ...p, i }))
    .filter((p) => p.index);
  const drawing = draw && !reduce;

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('text-contour', animate && 'contour-settle', className)}
      fill="none"
      aria-hidden="true"
      initial={drawing ? 'hidden' : undefined}
      whileInView={drawing ? 'shown' : undefined}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      style={{
        transformOrigin: 'center',
        ...(fade && {
          maskImage: 'radial-gradient(closest-side, #000 62%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 62%, transparent 100%)',
        }),
      }}
    >
      {paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          stroke="currentColor"
          strokeOpacity={p.index ? 0.6 : 0.32}
          strokeWidth={p.index ? 1.4 : 0.8}
          vectorEffect="non-scaling-stroke"
          variants={
            drawing
              ? {
                  hidden: { pathLength: 0, opacity: 0 },
                  shown: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { duration: 1.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
                  },
                }
              : undefined
          }
        />
      ))}
      {labels &&
        indexRings.map((p, n) =>
          labels[n] ? (
            <text
              key={p.i}
              x={cx + (inner + p.i * step) * 1.25 * 0.72}
              y={cy - (inner + p.i * step) * 0.7}
              fill="currentColor"
              fontSize="11"
              fontWeight={500}
              className="figures font-mono"
              style={{ paintOrder: 'stroke', stroke: 'var(--paper)', strokeWidth: 4 }}
            >
              {labels[n]}
            </text>
          ) : null
        )}
    </motion.svg>
  );
}
