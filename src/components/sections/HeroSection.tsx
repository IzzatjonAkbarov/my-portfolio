'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Download, Mail, ArrowRight, Code2, Globe, Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const socialLinks = [
  { icon: Code2, href: 'https://github.com/IzzatjonAkbarov', label: 'GitHub' },
  { icon: Globe, href: 'https://www.linkedin.com/in/izzatjon-akbarov-ba7254348/', label: 'LinkedIn' },
  { icon: Terminal, href: 'https://leetcode.com/u/izzatjonakbarov/', label: 'LeetCode' },
  { icon: Send, href: 'https://t.me/akbrvi', label: 'Telegram' },
];

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background pt-24 pb-16"
    >
      {/* Shadcn-style background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/60 to-background pointer-events-none" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column — Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
          >
            {/* Top Announcement Pill */}
            <motion.div variants={itemVariants}>
              <a
                href="#about"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 shadow-xs"
              >
                <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('role')} · Tashkent, UZ</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 text-muted-foreground" />
              </a>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
            >
              Izzatjon Akbarov
            </motion.h1>

            {/* Sub-headline / Summary */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
            >
              {t('summary')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="/cv/Izzatjon_Akbarov_CV.pdf"
                download="Izzatjon_Akbarov_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-6 py-2.5 text-sm font-medium transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xs group cursor-pointer"
              >
                <span>{t('downloadCV')}</span>
                <Download className="ml-2 size-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-zinc-200 dark:border-zinc-800 px-6 py-2.5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Mail className="mr-2 size-4 text-muted-foreground" />
                {t('contactMe')}
              </Button>
            </motion.div>

            {/* Social Profile Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-4 border-t border-border/50 w-full max-w-md"
            >
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Connect
              </span>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-8 items-center justify-center rounded-md text-muted-foreground border border-transparent hover:border-border hover:bg-muted hover:text-foreground transition-all"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column — Updated Portrait Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Outer frame matching shadcn component container */}
              <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-2.5 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/40">
                <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-950">
                  <Image
                    src="/images/profile.jpg"
                    alt="Izzatjon Akbarov"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 280px, 320px"
                  />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-xl" />
                </div>
              </div>

              {/* Decorative Tech Badge */}
              <div className="absolute -bottom-4 -left-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur-md px-3.5 py-2 shadow-lg flex items-center gap-2">
                <span className="size-2 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-ping" />
                <span className="text-xs font-mono font-medium text-foreground">
                  React / Next.js / TS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
