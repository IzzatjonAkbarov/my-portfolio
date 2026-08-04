'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import { ExternalLink, Code2, CheckCircle2, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

export default function ProjectsSection() {
  const t = useTranslations('Projects');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const projects = [
    {
      name: 'EduCoin LMS & Gamification Platform',
      description: 'Comprehensive Learning Management System with gamification features, role-based access for Admin, Teacher, and Students, deployed live at EduCoin App.',
      features: [
        'Role-based Dashboards (Admin, Teacher, CEO, Student)',
        'Gamified learning points & reward tracking',
        'Interactive analytics & student progress monitoring',
      ],
      tech: ['Next.js', 'TypeScript', 'Shadcn UI', 'Tailwind CSS', 'Zustand', 'Recharts'],
      liveUrl: 'https://educoinapp.uz/login',
      sourceUrl: 'https://github.com/IzzatjonAkbarov',
    },
    {
      name: t('chatty.name'),
      description: t('chatty.description'),
      features: [
        t('chatty.features.realtime'),
        t('chatty.features.auth'),
        t('chatty.features.themes'),
      ],
      tech: ['React.js', 'DaisyUI', 'Tailwind CSS', 'Zustand', 'WebSocket', 'JWT'],
      liveUrl: 'https://chat-app-vert-sigma-96.vercel.app/',
      sourceUrl: 'https://github.com/IzzatjonAkbarov',
    },
  ];

  return (
    <section id="projects" className="relative py-24 border-t border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono font-medium text-muted-foreground mb-3 hover:border-primary/50 hover:text-foreground transition-colors cursor-default">
            <span>03</span>
            <span>/</span>
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-foreground border border-border">
                      <Layers className="size-4" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-col gap-2 mb-6">
                    {project.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-foreground" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-border/50">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs px-2.5 py-0.5 rounded-md font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-4 py-2 text-xs font-medium transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xs gap-1.5"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>{t('viewProject')}</span>
                    </a>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 gap-1.5"
                    >
                      <Code2 className="size-3.5 text-muted-foreground" />
                      <span>{t('viewCode')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
