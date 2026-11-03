import { cn } from '@/lib/utils';
import { SummitMark, WaypointMark } from './Markers';
import Reveal from '@/components/motion/Reveal';

interface SectionHeadingProps {
  title: string;
  lede?: string;
  summit?: boolean;
  className?: string;
  reveal?: 'rise' | 'blur' | 'clip' | 'slide';
}

export default function SectionHeading({ title, lede, summit = false, className, reveal = 'rise' }: SectionHeadingProps) {
  return (
    <Reveal variant={reveal} duration={1} className={cn('max-w-3xl', className)}>
      <h2 className="flex items-center gap-4 text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
        {summit ? (
          <SummitMark className="size-7 text-trail sm:size-8" />
        ) : (
          <WaypointMark className="size-7 text-trail sm:size-8" active />
        )}
        <span>{title}</span>
      </h2>
      {lede && <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{lede}</p>}
    </Reveal>
  );
}
