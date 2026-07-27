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
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-mono font-medium text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer outline-hidden"
      >
        <Globe className="size-3.5 text-muted-foreground" />
        <span>{currentLocale.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-36 rounded-xl p-1 shadow-lg border-border">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={cn(
              'flex items-center justify-between cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium transition-colors',
              locale === loc.code
                ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{loc.flag}</span>
              <span>{loc.label}</span>
            </div>
            {locale === loc.code && <Check className="size-3 text-foreground" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
