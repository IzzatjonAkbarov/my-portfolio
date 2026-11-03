"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import ElevationProfile from "@/components/map/ElevationProfile";
import HudField from "@/components/map/HudField";
import Typed from "@/components/motion/Typed";
import { goTo } from "@/components/map/useRouteProgress";
import { profileLinks } from "@/lib/profiles";

const stack = ["React", "Next.js", "TypeScript", "Tailwind"];
const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const t = useTranslations("Hero");
  const reduce = useReducedMotion();

  // The terminal types first; everything else lands after it, in reading order.
  const enter = (delay: number, from: "blur" | "rise" = "rise") =>
    reduce
      ? {}
      : {
          initial:
            from === "blur"
              ? { opacity: 0, filter: "blur(12px)" }
              : { opacity: 0, y: 18 },
          animate:
            from === "blur"
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section id="hero" className="relative px-4 pt-22 pb-10 sm:px-8 sm:pt-24">
      {/* Map sheet with its neatline and marginalia */}
      <div className="relative mx-auto max-w-7xl border border-ink/25">
        <div
          className="absolute inset-x-0 top-0 h-1.5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--ink) 0 1px, transparent 1px 48px)",
            opacity: 0.35,
          }}
          aria-hidden="true"
        />
        <span className="absolute -top-2.5 left-4 bg-paper px-2 font-mono text-xs font-medium text-ink-soft sm:left-6">
          {t("sheet")}
        </span>
        <span className="figures absolute -bottom-2.5 right-4 bg-paper px-2 font-mono text-xs text-ink-soft sm:right-6">
          41°18′N 69°14′E
        </span>

        <div className="grid items-center gap-8 px-5 pt-10 pb-4 sm:px-10 sm:pt-12 lg:grid-cols-12 lg:gap-6 lg:px-14">
          <div className="min-w-0 lg:col-span-7">
            <motion.h1
              {...enter(0.15, "blur")}
              className="text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.02em] text-ink">
              Izzatjon
              <br />
              Akbarov
            </motion.h1>
            <motion.p
              {...enter(0.4)}
              className="mt-4 font-display text-xl font-medium text-trail sm:text-2xl">
              {t("title")}
            </motion.p>
            <motion.p
              {...enter(0.55)}
              className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
              {t("summary")}
            </motion.p>

            {/* A terminal readout: the prompt types, then the stack, as he would write it */}
            <motion.pre
              {...enter(0.7)}
              className="mt-5 whitespace-pre-wrap break-words border border-ink/20 bg-paper-raised/70 px-4 py-3 font-mono text-[13px] leading-relaxed text-ink"
              aria-label={`stack: ${stack.join(", ")}`}>
              <span className="text-water">~/tashkent</span>{" "}
              <span className="text-trail">$</span>{" "}
              <Typed text="whoami --stack" delay={900} speed={70} caret />
              {"\n"}
              <span className="text-water">const</span> stack = [
              {stack.map((s, i) => (
                <span key={s}>
                  <span className="text-contour">&apos;{s}&apos;</span>
                  {i < stack.length - 1 && ", "}
                </span>
              ))}
              ];
            </motion.pre>

            <motion.div
              {...enter(0.85)}
              className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
              <button
                type="button"
                onClick={() => goTo("contact")}
                className="group relative inline-flex h-13 items-center gap-3 overflow-hidden bg-trail px-7 text-base font-semibold text-trail-ink shadow-[0_6px_18px_-8px_var(--trail)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_var(--trail)] cursor-pointer">
                <span
                  className="absolute inset-0 -translate-x-full bg-ink/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                  aria-hidden="true"
                />
                <span className="relative">{t("contactMe")}</span>
                <ArrowDownRight className="relative size-5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <a
                href="/cv/Izzatjon_Akbarov_CV.pdf"
                download="Izzatjon_Akbarov_CV.pdf"
                className="group inline-flex items-center gap-2 text-base font-semibold text-ink underline decoration-ink/40 hover:decoration-trail">
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                {t("downloadCV")}
              </a>
            </motion.div>

            <motion.div
              {...enter(1)}
              className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm">
              <span className="text-ink-soft">{t("profiles")}</span>
              {profileLinks.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-0.5 font-medium text-ink hover:text-trail hover:underline">
                  {p.label}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </motion.div>
          </div>

          <HudField portraitAlt={t("portraitAlt")} />
        </div>

        <ElevationProfile
          variant="hero"
          className="px-5 pb-7 sm:px-10 lg:px-14"
        />
      </div>
    </section>
  );
}
