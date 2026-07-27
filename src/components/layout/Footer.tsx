'use client';

import { useTranslations } from 'next-intl';
import { Code2, Globe, Send, Terminal } from 'lucide-react';
import Logo from '@/components/Logo';

const socialLinks = [
  { icon: Code2, href: 'https://github.com/IzzatjonAkbarov', label: 'GitHub' },
  { icon: Globe, href: 'https://www.linkedin.com/in/izzatjon-akbarov-ba7254348/', label: 'LinkedIn' },
  { icon: Terminal, href: 'https://leetcode.com/u/izzatjonakbarov/', label: 'LeetCode' },
  { icon: Send, href: 'https://t.me/akbrvi', label: 'Telegram' },
];

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-border/40 bg-background py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Izzatjon Akbarov. {t('rights')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground border border-transparent hover:border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-foreground transition-all"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
