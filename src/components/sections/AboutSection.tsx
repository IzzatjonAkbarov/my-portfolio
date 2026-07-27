'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import {
  Code,
  FileCode,
  Layers,
  Palette,
  LayoutGrid,
  Component,
  Database,
  GitBranch,
  Globe2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const skills = [
  { icon: Code, label: 'HTML5 / CSS3' },
  { icon: FileCode, label: 'JavaScript / TypeScript' },
  { icon: Layers, label: 'React.js / Next.js' },
  { icon: Palette, label: 'Tailwind CSS / Sass' },
  { icon: LayoutGrid, label: 'Ant Design / MUI' },
  { icon: Component, label: 'Shadcn UI' },
  { icon: Database, label: 'React Query' },
  { icon: GitBranch, label: 'Redux / Zustand' },
  { icon: GitBranch, label: 'Git / GitHub' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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

export default function AboutSection() {
  const t = useTranslations('About');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-24 border-t border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono font-medium text-muted-foreground mb-3">
            <span>01</span>
            <span>/</span>
            <span>OVERVIEW</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column — Bio & Languages */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                Background & Philosophy
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t('description')}
              </p>
            </motion.div>

            {/* Languages Card */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <Globe2 className="size-4 text-muted-foreground" />
                <span>{t('languages')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-3.5 py-1.5 h-auto text-xs font-medium rounded-full border-border bg-zinc-100/80 dark:bg-zinc-900/80">
                  🇺🇿 {t('uzbek')}
                </Badge>
                <Badge variant="outline" className="px-3.5 py-1.5 h-auto text-xs font-medium rounded-full border-border bg-zinc-100/80 dark:bg-zinc-900/80">
                  🇬🇧 {t('english')}
                </Badge>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column — Tech Stack Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {skills.map((skill) => (
              <motion.div key={skill.label} variants={itemVariants}>
                <Card className="group relative cursor-default border border-border/80 bg-card hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
                  <CardContent className="flex flex-col items-center gap-2.5 py-5 px-3 text-center">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 transition-transform duration-200 group-hover:scale-105">
                      <skill.icon className="size-4" />
                    </div>
                    <span className="text-xs font-medium tracking-tight text-foreground">
                      {skill.label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
