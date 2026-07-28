'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import {
  Mountain,
  Trophy,
  Flame,
  Calendar,
  MapPin,
  ArrowRight,
  X,
  Medal,
  Activity,
  Maximize2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export interface ActivityDetail {
  id: string;
  titleKey: string;
  subtitleKey: string;
  location: string;
  date: string;
  category: 'mountain' | 'marathon';
  image: string;
  secondaryImage?: string;
  badgeText: string;
  stats: { label: string; value: string }[];
  shortDescKey: string;
  fullStoryKeys: string[];
}

const activities: ActivityDetail[] = [
  {
    id: 'new-uzbekistan-run',
    titleKey: 'newUzbekistan.title',
    subtitleKey: 'newUzbekistan.subtitle',
    location: 'New Uzbekistan Park, Tashkent',
    date: '2026',
    category: 'marathon',
    image: '/images/activities/new-uzbekistan-run-1.jpg',
    secondaryImage: '/images/activities/new-uzbekistan-run-2.jpg',
    badgeText: '1st Place Champion 🏆',
    stats: [
      { label: 'Distance', value: '5 km' },
      { label: 'Result', value: '1st Place Winner' },
      { label: 'Time', value: '< 20:00 mins' },
      { label: 'Award', value: 'Official Certificate' },
    ],
    shortDescKey: 'newUzbekistan.shortDesc',
    fullStoryKeys: [
      'newUzbekistan.p1',
      'newUzbekistan.p2',
      'newUzbekistan.p3',
    ],
  },
  {
    id: 'bukhara-night-race',
    titleKey: 'bukhara.title',
    subtitleKey: 'bukhara.subtitle',
    location: 'Bukhara Old City, Uzbekistan',
    date: '2025',
    category: 'marathon',
    image: '/images/activities/bukhara-night-race.jpg',
    badgeText: '10km Finisher Medal 🏅',
    stats: [
      { label: 'Distance', value: '10 km' },
      { label: 'Format', value: 'Night Marathon' },
      { label: 'Location', value: 'Silk Road Bukhara' },
      { label: 'Status', value: 'Finisher Medalist' },
    ],
    shortDescKey: 'bukhara.shortDesc',
    fullStoryKeys: [
      'bukhara.p1',
      'bukhara.p2',
    ],
  },
  {
    id: 'big-chimgan-peak',
    titleKey: 'bigChimgan.title',
    subtitleKey: 'bigChimgan.subtitle',
    location: 'Chatkal Range, Bostanlyk',
    date: '2025',
    category: 'mountain',
    image: '/images/activities/big-chimgan.jpg',
    badgeText: '3,309m Summit 🏔️',
    stats: [
      { label: 'Elevation', value: '3,309 meters' },
      { label: 'Mountain', value: 'Great Chimgan' },
      { label: 'Terrain', value: 'Scramble Ridge' },
      { label: 'Status', value: 'Summited' },
    ],
    shortDescKey: 'bigChimgan.shortDesc',
    fullStoryKeys: [
      'bigChimgan.p1',
      'bigChimgan.p2',
    ],
  },
  {
    id: 'begiztash-peak',
    titleKey: 'begiztash.title',
    subtitleKey: 'begiztash.subtitle',
    location: 'Western Tien Shan Range',
    date: '2025',
    category: 'mountain',
    image: '/images/activities/begiztash-peak.jpg',
    badgeText: '2,025m Winter Summit ❄️',
    stats: [
      { label: 'Elevation', value: '2,025 meters' },
      { label: 'Season', value: 'Winter Trek' },
      { label: 'Conditions', value: 'Sub-zero Snow' },
      { label: 'Status', value: 'Summited' },
    ],
    shortDescKey: 'begiztash.shortDesc',
    fullStoryKeys: [
      'begiztash.p1',
      'begiztash.p2',
    ],
  },
];

export default function FunSection() {
  const t = useTranslations('Fun');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedActivity, setSelectedActivity] = useState<ActivityDetail | null>(null);

  return (
    <section id="fun" className="relative py-24 border-t border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono font-medium text-muted-foreground mb-3">
            <span>04</span>
            <span>/</span>
            <span>PASSIONS & MOUNTAINEERING</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {t('sectionTitle')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        {/* Activities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
        >
          {activities.map((act) => (
            <motion.div key={act.id} variants={itemVariants}>
              <Card className="group relative flex flex-col justify-between overflow-hidden border border-border bg-card hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 shadow-xs h-full">
                {/* Card Header Image */}
                <div className="relative h-64 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={act.image}
                    alt={t(act.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge & Category */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Badge className="bg-zinc-900/90 backdrop-blur-md text-zinc-50 border border-zinc-700 text-xs font-mono px-3 py-1">
                      {act.badgeText}
                    </Badge>
                    <span className="flex size-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {act.category === 'mountain' ? (
                        <Mountain className="size-4 text-emerald-400" />
                      ) : (
                        <Flame className="size-4 text-amber-400" />
                      )}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
                      {t(act.titleKey)}
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono flex items-center gap-1 mt-1">
                      <MapPin className="size-3 text-emerald-400 shrink-0" />
                      <span>{act.location}</span>
                    </p>
                  </div>
                </div>

                <CardContent className="flex flex-col justify-between flex-1 p-6 gap-6">
                  {/* Short Article */}
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t(act.shortDescKey)}
                  </p>

                  {/* Key Stats Chips */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-border/60">
                    {act.stats.slice(0, 2).map((st) => (
                      <div key={st.label} className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground">
                          {st.label}
                        </span>
                        <span className="text-xs font-bold text-foreground">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Read Full Story Button */}
                  <Button
                    onClick={() => setSelectedActivity(act)}
                    className="w-full rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 h-10 px-4 text-xs font-medium transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer shadow-xs gap-2 group/btn"
                  >
                    <span>{t('readFullStory')}</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full Detail Modal Overlay */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card text-card-foreground shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer border border-white/20"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              {/* Header Cover Image / Carousel */}
              <div className="relative h-72 sm:h-96 w-full bg-zinc-950">
                <Image
                  src={selectedActivity.secondaryImage || selectedActivity.image}
                  alt={t(selectedActivity.titleKey)}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="mb-2 bg-emerald-500 text-zinc-950 font-mono font-bold text-xs">
                    {selectedActivity.badgeText}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {t(selectedActivity.titleKey)}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono flex items-center gap-1.5 mt-1">
                    <MapPin className="size-4 text-emerald-500 shrink-0" />
                    <span>{selectedActivity.location}</span>
                    <span>•</span>
                    <Calendar className="size-4 text-muted-foreground shrink-0" />
                    <span>{selectedActivity.date}</span>
                  </p>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border border-border bg-muted/40">
                  {selectedActivity.stats.map((st) => (
                    <div key={st.label} className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">
                        {st.label}
                      </span>
                      <span className="text-sm font-extrabold text-foreground mt-0.5">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Gallery preview if secondary image exists */}
                {selectedActivity.secondaryImage && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative h-44 rounded-xl overflow-hidden border border-border">
                      <Image
                        src={selectedActivity.image}
                        alt="Event view 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-44 rounded-xl overflow-hidden border border-border">
                      <Image
                        src={selectedActivity.secondaryImage}
                        alt="Event view 2"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Article Paragraphs */}
                <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                  <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Activity className="size-4 text-emerald-500" />
                    <span>Story & Experience</span>
                  </h4>
                  {selectedActivity.fullStoryKeys.map((key) => (
                    <p key={key}>{t(key)}</p>
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
