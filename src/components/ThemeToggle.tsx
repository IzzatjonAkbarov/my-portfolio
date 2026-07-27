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
      <div className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground opacity-70">
        <Sun className="size-3.5 text-foreground" />
        <span className="sr-only">Toggle Theme</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer outline-hidden">
        {resolvedTheme === 'dark' ? (
          <Moon className="size-3.5 text-foreground" />
        ) : (
          <Sun className="size-3.5 text-foreground" />
        )}
        <span className="sr-only">{t('toggle')}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-36 rounded-xl p-1 shadow-lg border-border">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'flex items-center justify-between cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium transition-colors',
            theme === 'light' ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground font-semibold' : 'text-muted-foreground'
          )}
        >
          <div className="flex items-center gap-2">
            <Sun className="size-3.5" />
            <span>{t('light')}</span>
          </div>
          {theme === 'light' && <Check className="size-3 text-foreground" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'flex items-center justify-between cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium transition-colors',
            theme === 'dark' ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground font-semibold' : 'text-muted-foreground'
          )}
        >
          <div className="flex items-center gap-2">
            <Moon className="size-3.5" />
            <span>{t('dark')}</span>
          </div>
          {theme === 'dark' && <Check className="size-3 text-foreground" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            'flex items-center justify-between cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium transition-colors',
            theme === 'system' ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground font-semibold' : 'text-muted-foreground'
          )}
        >
          <div className="flex items-center gap-2">
            <Monitor className="size-3.5" />
            <span>{t('system')}</span>
          </div>
          {theme === 'system' && <Check className="size-3 text-foreground" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
