import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { Unbounded, Golos_Text, JetBrains_Mono } from 'next/font/google';
import AgentEmbed from '@/components/AgentEmbed';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Izzatjon Akbarov | Frontend Developer',
    template: '%s | Izzatjon Akbarov',
  },
  description:
    'Portfolio of Izzatjon Akbarov — Frontend Developer specializing in React.js, Next.js, TypeScript, and modern UI engineering.',
  keywords: [
    'Izzatjon Akbarov',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Tashkent',
    'Uzbekistan',
    'Shadcn UI',
    'Tailwind CSS',
    'EduCoin',
  ],
  authors: [{ name: 'Izzatjon Akbarov', url: 'https://github.com/IzzatjonAkbarov' }],
  creator: 'Izzatjon Akbarov',
  publisher: 'Izzatjon Akbarov',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://izzatjon.dev',
    siteName: 'Izzatjon Akbarov Portfolio',
    title: 'Izzatjon Akbarov | Frontend Developer',
    description:
      'Frontend Developer specializing in building high-performance, scalable web applications with React.js, Next.js, and TypeScript.',
    images: [
      {
        url: '/images/hero-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Izzatjon Akbarov — Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Izzatjon Akbarov | Frontend Developer',
    description:
      'Frontend Developer specializing in building high-performance, scalable web applications with React.js, Next.js, and TypeScript.',
    images: ['/images/hero-portrait.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e9ece3' },
    { media: '(prefers-color-scheme: dark)', color: '#121815' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const display = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700', '800'],
  variable: '--font-display',
});

const body = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-code',
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <AgentEmbed />
      </body>
    </html>
  );
}
