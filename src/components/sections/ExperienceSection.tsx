'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

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

export default function ExperienceSection() {
  const t = useTranslations('Experience');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const experiences = [
    {
      company: t('exp1.company'),
      role: t('exp1.role'),
      period: t('exp1.period'),
      description: t('exp1.description'),
      tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Ant Design', 'Recharts'],
      pages: t('exp1.pages'),
    },
    {
      company: t('exp2.company'),
      role: t('exp2.role'),
      period: t('exp2.period'),
      description: t('exp2.description'),
      tech: ['React.js', 'TypeScript', 'Shadcn UI', 'Zustand', 'Tailwind CSS'],
      pages: t('exp2.pages'),
    },
  ];

  const education = [
    {
      institution: t('edu1.institution'),
      degree: t('edu1.degree'),
      period: t('edu1.period'),
    },
    {
      institution: t('edu2.institution'),
      degree: t('edu2.degree'),
      period: t('edu2.period'),
    },
  ];

  return (
    <section id="experience" className="relative py-24 border-t border-border/40 bg-transparent">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/40 text-xs font-mono font-medium text-muted-foreground mb-3">
            <span>02</span>
            <span>/</span>
            <span>EXPERIENCE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {t('title')}
          </h2>
        </motion.div>

        {/* Work Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative mb-20"
        >
          <div className="flex items-center gap-2 mb-8 text-foreground font-bold text-xl">
            <Briefcase className="size-5 text-muted-foreground" />
            <h3>{t('workTitle')}</h3>
          </div>

          {/* Timeline line */}
          <div className="absolute left-[19px] top-20 bottom-6 w-px bg-border hidden md:block" />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative md:pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-3 top-6 hidden size-3.5 rounded-full border-2 border-foreground bg-background md:block" />

                <Card className="border border-border bg-card hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg font-bold text-foreground">
                          {exp.company}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm font-medium text-muted-foreground">
                          {exp.role}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 px-3 py-1 h-auto text-xs font-mono rounded-full border-border bg-zinc-100/80 dark:bg-zinc-900/80"
                      >
                        <Calendar className="size-3 text-muted-foreground" />
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    {exp.pages && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-zinc-100/50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-border/50">
                        <CheckCircle2 className="size-3.5 text-foreground shrink-0" />
                        <span>
                          <strong className="text-foreground">{t('keyPages')}:</strong> {exp.pages}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2.5 py-0.5 rounded-md font-mono"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="flex items-center gap-2 mb-6 text-foreground font-bold text-xl">
            <GraduationCap className="size-5 text-muted-foreground" />
            <h3>{t('educationTitle')}</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border border-border bg-card hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs h-full">
                  <CardContent className="flex items-center gap-4 py-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-foreground border border-border">
                      <GraduationCap className="size-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-semibold text-sm text-foreground">{edu.institution}</h4>
                      <p className="text-xs text-muted-foreground">
                        {edu.degree}
                      </p>
                      <span className="text-[11px] font-mono text-muted-foreground mt-0.5">
                        {edu.period}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
