import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/map/SectionHeading';
import { cn } from '@/lib/utils';
import Reveal from '@/components/motion/Reveal';
import RouteLine from '@/components/motion/RouteLine';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  const experiences = [
    {
      company: t('exp3.company'),
      role: t('exp3.role'),
      period: t('exp3.period'),
      description: t('exp3.description'),
      tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LeetCode Algorithms', 'Mentorship', 'Code Reviews'],
      pages: t('exp3.pages'),
    },
    {
      company: t('exp2.company'),
      role: t('exp2.role'),
      period: t('exp2.period'),
      description: t('exp2.description'),
      tech: ['React.js', 'TypeScript', 'Shadcn UI', 'Zustand', 'Tailwind CSS'],
      pages: t('exp2.pages'),
    },
    {
      company: t('exp1.company'),
      role: t('exp1.role'),
      period: t('exp1.period'),
      description: t('exp1.description'),
      tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Ant Design', 'Recharts'],
      pages: t('exp1.pages'),
    },
  ];

  const education = [
    { institution: t('edu2.institution'), degree: t('edu2.degree'), period: t('edu2.period') },
    { institution: t('edu1.institution'), degree: t('edu1.degree'), period: t('edu1.period') },
  ];

  return (
    <section id="experience" className="border-y border-rule bg-paper-raised px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('title')} reveal="slide" />

        {/* One continuous route: the newest role is the highest point, training is the trailhead */}
        <RouteLine className="relative mt-16 md:ml-[13rem]">

          <li className="relative pb-6 pl-10 md:pl-12">
            <h3 className="font-display text-sm font-bold text-ink-soft">{t('workTitle')}</h3>
          </li>

          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.company} className="relative pb-14 pl-10 md:pl-12">
              <span
                className={cn(
                  'absolute left-0 top-1.5 size-4 rounded-full border-[3px] border-trail',
                  i === 0 ? 'bg-trail' : 'bg-paper-raised'
                )}
                aria-hidden="true"
              />
              <p className="figures mb-2 font-mono text-[13px] font-medium text-trail md:absolute md:-left-[13rem] md:top-1 md:mb-0 md:w-[11rem] md:text-right">
                {exp.period}
              </p>
              <h4 className="font-display text-2xl font-bold tracking-[-0.01em] text-ink">{exp.company}</h4>
              <p className="mt-1 text-base font-medium text-ink-soft">{exp.role}</p>
              <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-ink">{exp.description}</p>
              {exp.pages && (
                <p className="mt-3 max-w-[68ch] text-[15px] text-ink">
                  <span className="font-semibold">{t('keyPages')}:</span> {exp.pages}
                </p>
              )}
              <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink-soft">
                [{exp.tech.map((x, j) => (
                  <span key={x}>
                    <span className="text-contour">&apos;{x}&apos;</span>
                    {j < exp.tech.length - 1 && ', '}
                  </span>
                ))}]
              </p>
            </Reveal>
          ))}

          <li className="relative pb-6 pl-10 md:pl-12">
            <h3 className="font-display text-sm font-bold text-ink-soft">{t('educationTitle')}</h3>
          </li>

          {education.map((edu) => (
            <Reveal as="li" variant="slide" key={edu.institution} className="relative pb-8 pl-10 last:pb-0 md:pl-12">
              <span className="absolute left-0.5 top-1.5 size-3 rounded-full border-2 border-trail bg-paper-raised" aria-hidden="true" />
              <p className="figures mb-1 font-mono text-[13px] font-medium text-trail md:absolute md:-left-[13rem] md:top-0.5 md:mb-0 md:w-[11rem] md:text-right">
                {edu.period}
              </p>
              <h4 className="text-lg font-semibold text-ink">{edu.institution}</h4>
              <p className="text-base text-ink-soft">{edu.degree}</p>
            </Reveal>
          ))}
        </RouteLine>
      </div>
    </section>
  );
}
