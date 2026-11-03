'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, X } from 'lucide-react';
import SectionHeading from '@/components/map/SectionHeading';
import { SummitMark, WaypointMark } from '@/components/map/Markers';
import { cn } from '@/lib/utils';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';

export interface ActivityDetail {
  id: string;
  key: 'newUzbekistan' | 'bukhara' | 'bigChimgan' | 'begiztash';
  date: string;
  category: 'mountain' | 'race';
  image: string;
  secondaryImage?: string;
  stats: string[];
  paragraphs: number;
}

const activities: ActivityDetail[] = [
  {
    id: 'new-uzbekistan-run',
    key: 'newUzbekistan',
    date: '2026',
    category: 'race',
    image: '/images/activities/new-uzbekistan-run-1.jpg',
    secondaryImage: '/images/activities/new-uzbekistan-run-2.jpg',
    stats: ['distance', 'result', 'time', 'award'],
    paragraphs: 3,
  },
  {
    id: 'big-chimgan-peak',
    key: 'bigChimgan',
    date: '2025',
    category: 'mountain',
    image: '/images/activities/big-chimgan.jpg',
    stats: ['elevation', 'mountain', 'terrain', 'status'],
    paragraphs: 2,
  },
  {
    id: 'bukhara-night-race',
    key: 'bukhara',
    date: '2025',
    category: 'race',
    image: '/images/activities/bukhara-night-race.jpg',
    stats: ['distance', 'format', 'location', 'status'],
    paragraphs: 2,
  },
  {
    id: 'begiztash-peak',
    key: 'begiztash',
    date: '2025',
    category: 'mountain',
    image: '/images/activities/begiztash-peak.jpg',
    stats: ['elevation', 'season', 'conditions', 'status'],
    paragraphs: 2,
  },
];

export default function FunSection() {
  const t = useTranslations('Fun');
  const [selected, setSelected] = useState<ActivityDetail | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const open = (act: ActivityDetail, el: HTMLButtonElement) => {
    opener.current = el;
    setSelected(act);
  };

  const close = () => {
    setSelected(null);
    opener.current?.focus();
  };

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  const [lead, ...rest] = activities;
  const leadFigure = (a: ActivityDetail) => t(`${a.key}.v.${a.stats[0]}`);

  return (
    <section id="fun" className="border-y border-rule bg-paper-raised px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('sectionTitle')} lede={t('sectionSubtitle')} reveal="clip" />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* The winning race leads */}
          <article className="lg:col-span-7">
            <Reveal variant="blur" duration={1.1} className="group relative aspect-[4/3] overflow-hidden border border-ink/30">
              <Image
                src={lead.image}
                alt={t(`${lead.key}.title`)}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 bg-trail px-3 py-1.5 text-sm font-bold text-trail-ink">
                {t(`${lead.key}.badge`)}
              </span>
            </Reveal>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {t(`${lead.key}.title`)}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                  <MapPin className="size-4 text-trail" />
                  {t(`${lead.key}.place`)} · <span className="figures">{lead.date}</span>
                </p>
              </div>
              <CountUp value={leadFigure(lead)} className="figures font-display text-4xl font-bold text-trail sm:text-5xl" />
            </div>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink">{t(`${lead.key}.shortDesc`)}</p>
            <StoryButton label={t('readFullStory')} onClick={(el) => open(lead, el)} />
          </article>

          <div className="flex flex-col divide-y divide-rule border-y border-rule lg:col-span-5">
            {rest.map((act) => (
              <Reveal as="article" variant="slide" key={act.id} className="group grid grid-cols-[7.5rem_1fr] gap-5 py-6 sm:grid-cols-[10rem_1fr]">
                <div className="relative aspect-square overflow-hidden border border-ink/30">
                  <Image
                    src={act.image}
                    alt={t(`${act.key}.title`)}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <p className="figures flex items-center gap-2 font-display text-2xl font-bold text-trail">
                    {act.category === 'mountain' ? (
                      <SummitMark className="size-4" />
                    ) : (
                      <WaypointMark className="size-4" active />
                    )}
                    <CountUp value={leadFigure(act)} />
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">{t(`${act.key}.title`)}</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {t(`${act.key}.place`)} · <span className="figures">{act.date}</span>
                  </p>
                  <StoryButton label={t('readFullStory')} onClick={(el) => open(act, el)} compact />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 bg-[rgb(10_14_12/0.72)]"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="story-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-ink/30 bg-paper text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)]"
            >
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-20 grid size-11 place-items-center bg-paper text-ink hover:bg-trail hover:text-trail-ink cursor-pointer"
                aria-label={t('close')}
              >
                <X className="size-5" />
              </button>

              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={selected.secondaryImage || selected.image}
                  alt={t(`${selected.key}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-7 p-6 sm:p-10">
                <div>
                  <h2 id="story-title" className="text-2xl font-bold leading-tight sm:text-3xl">
                    {t(`${selected.key}.title`)}
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                    <MapPin className="size-4 text-trail" />
                    {t(`${selected.key}.place`)} · <span className="figures">{selected.date}</span>
                    <span className="ml-2 bg-trail px-2 py-0.5 text-xs font-bold text-trail-ink">
                      {t(`${selected.key}.badge`)}
                    </span>
                  </p>
                </div>

                <dl className="grid grid-cols-2 border-y border-rule sm:grid-cols-4">
                  {selected.stats.map((s, i) => (
                    <div key={s} className={cn('py-4 pr-4', i > 0 && 'sm:border-l sm:border-rule sm:pl-4', i === 2 && 'border-t border-rule sm:border-t-0', i === 3 && 'border-t border-rule sm:border-t-0')}>
                      <dt className="text-xs font-medium text-ink-soft">{t(`labels.${s}`)}</dt>
                      <dd className="figures mt-1 text-base font-bold text-ink">{t(`${selected.key}.v.${s}`)}</dd>
                    </div>
                  ))}
                </dl>

                {selected.secondaryImage && (
                  <div className="relative aspect-[16/10] overflow-hidden border border-ink/30">
                    <Image src={selected.image} alt={t(`${selected.key}.title`)} fill sizes="768px" className="object-cover" />
                  </div>
                )}

                <div className="flex flex-col gap-4 text-base leading-relaxed">
                  <h3 className="font-display text-lg font-bold">{t('storyTitle')}</h3>
                  {Array.from({ length: selected.paragraphs }, (_, i) => (
                    <p key={i} className="max-w-[65ch]">{t(`${selected.key}.p${i + 1}`)}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StoryButton({
  label,
  onClick,
  compact = false,
}: {
  label: string;
  onClick: (el: HTMLButtonElement) => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => onClick(e.currentTarget)}
      className={cn(
        'group inline-flex items-center gap-2 font-semibold text-ink underline decoration-ink/40 hover:decoration-trail cursor-pointer',
        compact ? 'mt-3 text-sm' : 'mt-5 text-[15px]'
      )}
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
