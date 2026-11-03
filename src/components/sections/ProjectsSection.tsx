import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/map/SectionHeading';
import ContourField from '@/components/map/ContourField';
import { SummitMark } from '@/components/map/Markers';
import { cn } from '@/lib/utils';
import Reveal from '@/components/motion/Reveal';

export default function ProjectsSection() {
  const t = useTranslations('Projects');

  const projects = [
    {
      name: t('educoin.name'),
      host: 'educoinapp.uz',
      description: t('educoin.description'),
      features: [
        t('educoin.features.roles'),
        t('educoin.features.points'),
        t('educoin.features.analytics'),
      ],
      tech: ['Next.js', 'TypeScript', 'Shadcn UI', 'Tailwind CSS', 'Zustand', 'Recharts'],
      liveUrl: 'https://educoinapp.uz/login',
      sourceUrl: 'https://github.com/IzzatjonAkbarov',
      seed: 4.1,
    },
    {
      name: t('chatty.name'),
      host: 'Chatty',
      description: t('chatty.description'),
      features: [
        t('chatty.features.realtime'),
        t('chatty.features.auth'),
        t('chatty.features.themes'),
      ],
      tech: ['React.js', 'DaisyUI', 'Tailwind CSS', 'Zustand', 'WebSocket', 'JWT'],
      liveUrl: 'https://chat-app-vert-sigma-96.vercel.app/',
      sourceUrl: 'https://github.com/IzzatjonAkbarov',
      seed: 7.6,
    },
  ];

  return (
    <section id="projects" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('title')} reveal="blur" />

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {projects.map((project, i) => (
            <article key={project.name} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={cn('lg:col-span-5', i % 2 === 1 && 'lg:order-2')}>
                <div className="group relative aspect-[5/4] overflow-hidden border border-ink/30 bg-paper-raised">
                  <ContourField
                    className="absolute -inset-[15%] size-[130%] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-6 group-hover:scale-105"
                    rings={15}
                    inner={22}
                    step={19}
                    seed={project.seed}
                    draw
                  />
                  <p className="absolute left-3 top-3 flex items-center gap-2 bg-paper-raised/90 px-2 py-1 font-mono text-[11px] text-ink">
                    <span className="relative flex size-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-trail/60 motion-reduce:hidden" />
                      <span className="relative size-2 rounded-full bg-trail" />
                    </span>
                    status: live
                  </p>
                  <p className="figures absolute right-3 top-3 bg-paper-raised/90 px-2 py-1 font-mono text-[11px] text-ink-soft">
                    grid {i === 0 ? 'K-42-04' : 'K-42-07'}
                  </p>
                  <div className="absolute bottom-3 right-3 flex items-end gap-2 bg-paper-raised/90 px-2 py-1 font-mono text-[11px] text-ink-soft" aria-hidden="true">
                    <span className="flex h-1.5 w-16 border border-ink/50">
                      <span className="w-1/2 bg-ink/60" />
                    </span>
                    1:25k
                  </div>
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                    <SummitMark className="size-7 text-trail" />
                    <span className="bg-paper-raised px-2 py-0.5 font-mono text-sm font-medium text-ink">{project.host}</span>
                  </div>
                </div>
              </div>

              <Reveal variant="rise" delay={0.15} className="lg:col-span-7">
                <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.25rem)] font-bold leading-tight tracking-[-0.015em] text-ink">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{project.description}</p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-base text-ink">
                      <SummitMark className="mt-1 size-3.5 text-contour" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-rule pt-4 font-mono text-[13px] leading-relaxed text-ink-soft">
                  <span className="text-water">{t('stack')}</span>: [
                  {project.tech.map((x, j) => (
                    <span key={x}>
                      <span className="text-contour">&apos;{x}&apos;</span>
                      {j < project.tech.length - 1 && ', '}
                    </span>
                  ))}
                  ]
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex h-11 items-center gap-2 bg-ink px-5 text-[15px] font-semibold text-paper transition-colors hover:bg-trail hover:text-trail-ink"
                  >
                    {t('viewProject')}
                    <ArrowUpRight className="size-4 transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
                  </a>
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] font-semibold text-ink underline decoration-ink/40 hover:decoration-trail"
                  >
                    {t('viewCode')}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
