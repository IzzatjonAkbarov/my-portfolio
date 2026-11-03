import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/map/SectionHeading';
import Reveal from '@/components/motion/Reveal';

// Each skill gets its own map-legend symbol, drawn at one stroke weight.
const symbols: Record<string, React.ReactNode> = {
  line: <path d="M2 8h20" strokeWidth="2.5" />,
  dash: <path d="M2 8h20" strokeWidth="2.5" strokeDasharray="4 3" />,
  dots: <path d="M3 8h18" strokeWidth="3" strokeDasharray="0.1 4.5" strokeLinecap="round" />,
  double: <path d="M2 5.5h20M2 10.5h20" strokeWidth="1.5" />,
  ring: <circle cx="12" cy="8" r="4.5" strokeWidth="1.75" />,
  tri: <path d="M12 3 17.5 13h-11Z" strokeWidth="1.75" strokeLinejoin="round" />,
  square: <rect x="7" y="3.5" width="10" height="9" strokeWidth="1.75" />,
  hatch: (
    <>
      <rect x="6" y="3" width="12" height="10" strokeWidth="1.25" />
      <path d="M6 9 10 3M9 13l6-10M14 13l4-6" strokeWidth="1.1" />
    </>
  ),
  cross: <path d="M8 4l8 8M16 4l-8 8" strokeWidth="1.75" />,
};

const skills = [
  { symbol: 'line', label: 'HTML5 / CSS3' },
  { symbol: 'double', label: 'JavaScript / TypeScript' },
  { symbol: 'tri', label: 'React.js / Next.js' },
  { symbol: 'dash', label: 'Tailwind CSS / Sass' },
  { symbol: 'square', label: 'Ant Design / MUI' },
  { symbol: 'hatch', label: 'Shadcn UI' },
  { symbol: 'ring', label: 'React Query' },
  { symbol: 'dots', label: 'Redux / Zustand' },
  { symbol: 'cross', label: 'Git / GitHub' },
];

function LegendSymbol({ name, tone }: { name: string; tone: string }) {
  return (
    <svg viewBox="0 0 24 16" className={`h-4 w-6 shrink-0 ${tone}`} fill="none" stroke="currentColor" aria-hidden="true">
      {symbols[name]}
    </svg>
  );
}

export default function AboutSection() {
  const t = useTranslations('About');

  const languages = [t('uzbek'), t('english'), t('russian')];

  return (
    <section id="about" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 lg:pt-2">
          <SectionHeading title={t('title')} reveal="clip" />
          <Reveal variant="blur" delay={0.2}>
            <p className="mt-8 max-w-[60ch] text-xl leading-[1.65] text-ink">{t('description')}</p>
          </Reveal>
        </div>

        <aside className="lg:col-span-5">
          <Reveal variant="rise" delay={0.1} className="border border-ink/30 bg-paper-raised">
            <h3 className="border-b border-ink/30 px-6 py-4 font-display text-base font-bold text-ink">
              {t('skillsTitle')}
            </h3>
            <ul className="grid gap-x-6 px-6 py-5 sm:grid-cols-2">
              {skills.map((s, i) => (
                <Reveal as="li" variant="slide" delay={0.1 + i * 0.05} duration={0.6} key={s.label} className="flex items-center gap-3 py-2 text-[15px] font-medium text-ink">
                  <LegendSymbol name={s.symbol} tone={i % 3 === 0 ? 'text-trail' : i % 3 === 1 ? 'text-water' : 'text-contour'} />
                  {s.label}
                </Reveal>
              ))}
            </ul>
            <h3 className="border-y border-ink/30 px-6 py-4 font-display text-base font-bold text-ink">
              {t('languages')}
            </h3>
            <ul className="px-6 py-4">
              {languages.map((lang) => (
                <li key={lang} className="flex items-baseline gap-3 py-1.5 text-[15px] text-ink">
                  <span className="h-px w-6 shrink-0 translate-y-[-0.3em] bg-ink/50" aria-hidden="true" />
                  {lang}
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
