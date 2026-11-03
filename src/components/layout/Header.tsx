'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import ElevationProfile from '@/components/map/ElevationProfile';
import { useRouteProgress, goTo } from '@/components/map/useRouteProgress';
import { WAYPOINTS } from '@/components/map/terrain';
import { SummitMark } from '@/components/map/Markers';

const navLinks = ['about', 'experience', 'projects', 'fun', 'contact'] as const;

export default function Header() {
  const t = useTranslations('Navigation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { x, active, pastHero } = useRouteProgress();
  const activeId = WAYPOINTS[active];

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  const navigate = (id: string) => {
    goTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('hero')}
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label={t('home')}
        >
          <Logo size="md" />
          <span className="hidden whitespace-nowrap font-display text-[15px] font-bold tracking-tight text-ink min-[400px]:inline">
            Izzatjon Akbarov
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const current = activeId === link;
            return (
              <li key={link}>
                <button
                  type="button"
                  onClick={() => navigate(link)}
                  aria-current={current ? 'true' : undefined}
                  className={cn(
                    'relative px-3 py-2 text-[15px] font-medium transition-colors cursor-pointer',
                    'inline-flex items-center gap-1.5',
                    current ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  )}
                >
                  {link === 'contact' && <SummitMark className="size-3 text-trail" />}
                  {t(link)}
                  <span
                    className={cn(
                      'absolute inset-x-3 -bottom-px h-0.5 bg-trail transition-transform origin-left duration-300',
                      current ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center border border-rule text-ink lg:hidden cursor-pointer hover:bg-muted"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-route"
            aria-label={t('menu')}
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Docked route: the hero's elevation profile follows the reader down the page */}
      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          pastHero && !isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
        aria-hidden={!pastHero}
        inert={!pastHero}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-4 border-t border-rule px-5 py-1.5 sm:px-8">
            <span className="hidden shrink-0 text-xs font-medium text-ink-soft sm:block">
              {t('youAreHere')}:{' '}
              <span className="font-semibold text-ink">
                {t(activeId === 'hero' ? 'home' : activeId)}
              </span>
            </span>
            <ElevationProfile variant="docked" progress={x} active={active} className="flex-1 px-3" />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-route" className="border-t border-rule bg-paper lg:hidden">
          <ol className="relative mx-5 my-4 border-l-2 border-trail pl-6 sm:mx-8">
            {WAYPOINTS.map((id, i) => (
              <li key={id} className="relative">
                <span
                  className={cn(
                    'absolute -left-[33px] top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-trail',
                    i <= active ? 'bg-trail' : 'bg-paper'
                  )}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => navigate(id)}
                  className={cn(
                    'w-full py-3 text-left text-lg font-medium cursor-pointer',
                    activeId === id ? 'font-semibold text-ink' : 'text-ink-soft'
                  )}
                >
                  {t(id === 'hero' ? 'home' : id)}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </header>
  );
}
