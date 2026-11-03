'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('Theme');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex size-10 items-center justify-center border border-rule text-ink opacity-70">
        <Sun className="size-4 text-ink" />
        <span className="sr-only">Toggle Theme</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-10 items-center justify-center border border-rule text-ink hover:bg-muted transition-colors cursor-pointer">
        {resolvedTheme === 'dark' ? (
          <Moon className="size-4 text-ink" />
        ) : (
          <Sun className="size-4 text-ink" />
        )}
        <span className="sr-only">{t('toggle')}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-40 rounded-none border border-ink/30 bg-paper-raised p-1 shadow-[0_12px_30px_-14px_rgb(0_0_0/0.45)]">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'flex items-center justify-between cursor-pointer rounded-none px-2.5 py-2.5 text-sm font-medium transition-colors',
            theme === 'light' ? 'bg-muted text-ink font-semibold' : 'text-ink-soft'
          )}
        >
          <div className="flex items-center gap-2">
            <Sun className="size-3.5" />
            <span>{t('light')}</span>
          </div>
          {theme === 'light' && <Check className="size-3.5 text-trail" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'flex items-center justify-between cursor-pointer rounded-none px-2.5 py-2.5 text-sm font-medium transition-colors',
            theme === 'dark' ? 'bg-muted text-ink font-semibold' : 'text-ink-soft'
          )}
        >
          <div className="flex items-center gap-2">
            <Moon className="size-3.5" />
            <span>{t('dark')}</span>
          </div>
          {theme === 'dark' && <Check className="size-3.5 text-trail" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            'flex items-center justify-between cursor-pointer rounded-none px-2.5 py-2.5 text-sm font-medium transition-colors',
            theme === 'system' ? 'bg-muted text-ink font-semibold' : 'text-ink-soft'
          )}
        >
          <div className="flex items-center gap-2">
            <Monitor className="size-3.5" />
            <span>{t('system')}</span>
          </div>
          {theme === 'system' && <Check className="size-3.5 text-trail" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
