'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'en', flag: '🇺🇸', label: 'English', short: 'EN' },
  { code: 'uz', flag: '🇺🇿', label: "O'zbekcha", short: 'UZ' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский', short: 'RU' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('Language');
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-10 items-center gap-1.5 border border-rule px-3 text-sm font-semibold text-ink hover:bg-muted transition-colors cursor-pointer"
      >
        <Globe className="size-3.5 text-muted-foreground" />
        <span>{currentLocale.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-40 rounded-none border border-ink/30 bg-paper-raised p-1 shadow-[0_12px_30px_-14px_rgb(0_0_0/0.45)]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={cn(
              'flex items-center justify-between cursor-pointer rounded-none px-2.5 py-2.5 text-sm font-medium transition-colors',
              locale === loc.code
                ? 'bg-muted text-ink font-semibold'
                : 'text-ink-soft hover:text-ink'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{loc.flag}</span>
              <span>{loc.label}</span>
            </div>
            {locale === loc.code && <Check className="size-3.5 text-trail" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
