'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import { Mountain, Flame, Compass, Heart, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function FunSection() {
  const t = useTranslations('Fun');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const activities = [
    {
      icon: Mountain,
      title: t('peaksTitle'),
      subtitle: t('peaksSubtitle'),
      description: t('peaksDesc'),
      tags: ['Big Chimgan (3,309m)', 'Small Chimgan', 'Oqtosh Peak', 'Mountaineering'],
    },
    {
      icon: Flame,
      title: t('marathonsTitle'),
      subtitle: t('marathonsSubtitle'),
      description: t('marathonsDesc'),
      tags: ['New Uzbekistan 1st Place', 'Bukhara Night Race 10km', '5km < 20 min'],
    },
    {
      icon: Compass,
      title: t('passionsTitle'),
      subtitle: t('passionsSubtitle'),
      description: t('passionsDesc'),
      tags: ['Problem Solving', 'LeetCode', 'Tech Exploration', 'Open Source'],
    },
  ];

  return (
    <section id="fun" className="relative py-24 border-t border-border/40 bg-background">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/40 text-xs font-mono font-medium text-muted-foreground mb-3">
            <span>04</span>
            <span>/</span>
            <span>BEYOND CODING</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 md:grid-cols-3"
        >
          {activities.map((act, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group flex flex-col justify-between h-full border border-border bg-card p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
                <CardContent className="p-0 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-foreground border border-border">
                      <act.icon className="size-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {act.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground block mt-0.5">
                      {act.subtitle}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {act.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {act.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[11px] px-2 py-0.5 rounded-md font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
