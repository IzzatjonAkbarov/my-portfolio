'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Select } from '@/components/ui/select';
import SectionHeading from '@/components/map/SectionHeading';
import ContourField from '@/components/map/ContourField';
import { cn } from '@/lib/utils';
import Reveal from '@/components/motion/Reveal';

const countryOptions = [
  { value: '+998', label: '+998', flag: '🇺🇿' },
  { value: '+1', label: '+1', flag: '🇺🇸' },
  { value: '+44', label: '+44', flag: '🇬🇧' },
  { value: '+971', label: '+971', flag: '🇦🇪' },
  { value: '+90', label: '+90', flag: '🇹🇷' },
  { value: '+49', label: '+49', flag: '🇩🇪' },
  { value: '+82', label: '+82', flag: '🇰🇷' },
  { value: '+7', label: '+7', flag: '🇰🇿' },
];

const directLines = [
  { label: 'telegram', value: '@akbrvi', href: 'https://t.me/akbrvi', external: true },
  { label: 'phone', value: '+998 77 354 35 50', href: 'tel:+998773543550' },
  { label: 'email', value: 'iadevcdr@gmail.com', href: 'mailto:iadevcdr@gmail.com' },
  { label: 'location', value: 'locationValue' },
] as const;

type Field = 'name' | 'email' | 'phone' | 'message';
type FormErrors = Partial<Record<Field, string>>;

const fieldClass =
  'w-full border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-lg text-ink placeholder:text-ink-soft/70 outline-none transition-colors focus:border-water focus-visible:outline-none';

export default function ContactSection() {
  const t = useTranslations('Contact');

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [countryCode, setCountryCode] = useState('+998');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const update = (field: Field, value: string) => {
    setFormData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (status === 'failed' || status === 'sent') setStatus('idle');
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) next.name = t('errors.nameRequired');
    else if (name.length < 2) next.name = t('errors.nameShort');

    if (!email) next.email = t('errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t('errors.emailInvalid');

    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) next.phone = t('errors.phoneInvalid');
    }

    if (!message) next.message = t('errors.messageRequired');
    else if (message.length < 10) next.message = t('errors.messageShort');

    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) document.getElementById(first)?.focus();
    return !first;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const raw = formData.phone.replace(/\s+/g, '');
      const fullPhone = raw ? `${countryCode}${raw.startsWith('+') ? raw.slice(1) : raw}` : 'Not provided';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: fullPhone,
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) throw new Error(`Contact request failed: ${res.status}`);
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('failed');
    }
  };

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-destructive">
        <AlertCircle className="size-4 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const labelClass = 'text-sm font-semibold text-ink';

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <ContourField
        className="pointer-events-none absolute -right-48 -top-40 hidden size-[720px] opacity-70 md:block"
        rings={20}
        inner={18}
        step={16}
        seed={5.2}
        fade
        draw
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading title={t('title')} lede={t('description')} summit reveal="blur" />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8 lg:col-span-7">
            <div>
              <label htmlFor="name" className={labelClass}>{t('nameLabel')}</label>
              <input
                id="name"
                autoComplete="name"
                placeholder={t('namePlaceholder')}
                value={formData.name}
                onChange={(e) => update('name', e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={cn(fieldClass, errors.name && 'border-destructive')}
              />
              {errorText('name')}
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClass}>{t('emailLabel')}</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={cn(fieldClass, errors.email && 'border-destructive')}
                />
                {errorText('email')}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  {t('phoneLabel')} <span className="font-normal text-ink-soft">({t('optional')})</span>
                </label>
                <div className="flex items-end gap-3">
                  <Select
                    options={countryOptions}
                    value={countryCode}
                    onValueChange={setCountryCode}
                    className="h-[50px] w-[104px] shrink-0 rounded-none border-0 border-b-2 border-input bg-transparent px-1 text-base shadow-none"
                  />
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel-national"
                    placeholder={t('phonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={cn(fieldClass, 'figures', errors.phone && 'border-destructive')}
                  />
                </div>
                {errorText('phone')}
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>{t('messageLabel')}</label>
              <textarea
                id="message"
                rows={4}
                placeholder={t('messagePlaceholder')}
                value={formData.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={cn(fieldClass, 'min-h-32 resize-y leading-relaxed', errors.message && 'border-destructive')}
              />
              {errorText('message')}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex h-13 items-center gap-3 bg-trail px-8 text-base font-semibold text-trail-ink shadow-[0_6px_18px_-8px_var(--trail)] transition-[transform,opacity] hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-progress disabled:opacity-70 cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  <>
                    <Send className="size-5" />
                    {t('send')}
                  </>
                )}
              </button>

              <div aria-live="polite" className="min-w-0 flex-1">
                {status === 'sent' && (
                  <p className="flex items-center gap-2 text-base font-medium text-ink">
                    <CheckCircle2 className="size-5 shrink-0 text-trail" />
                    {t('successMessage')}
                  </p>
                )}
                {status === 'failed' && (
                  <p className="flex items-center gap-2 text-base font-medium text-destructive">
                    <AlertCircle className="size-5 shrink-0" />
                    {t('failMessage')}
                  </p>
                )}
              </div>
            </div>
          </form>

          <aside className="lg:col-span-5">
            <h3 className="font-display text-base font-bold text-ink">{t('direct')}</h3>
            <dl className="mt-4 border-t-2 border-ink">
              {directLines.map((line) => (
                <Reveal variant="slide" delay={0.1} key={line.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-5">
                  <dt className="text-sm font-medium text-ink-soft">{t(line.label)}</dt>
                  <dd className="text-lg font-semibold text-ink">
                    {'href' in line ? (
                      <a
                        href={line.href}
                        target={'external' in line ? '_blank' : undefined}
                        rel={'external' in line ? 'noopener noreferrer' : undefined}
                        className="figures inline-flex items-center gap-1 hover:text-trail hover:underline"
                      >
                        {line.value}
                        {'external' in line && <ArrowUpRight className="size-4" />}
                      </a>
                    ) : (
                      t(line.value)
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
