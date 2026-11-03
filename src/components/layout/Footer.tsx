import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { profileLinks } from '@/lib/profiles';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t-2 border-ink px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <p className="text-sm text-ink-soft">
            © <span className="figures">{new Date().getFullYear()}</span> Izzatjon Akbarov. {t('rights')}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {profileLinks.map((p) => (
            <li key={p.label}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-ink hover:text-trail hover:underline"
              >
                {p.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            </li>
          ))}
          <li className="figures font-mono text-[13px] text-ink-soft">41°18′N 69°14′E</li>
        </ul>
      </div>
    </footer>
  );
}
