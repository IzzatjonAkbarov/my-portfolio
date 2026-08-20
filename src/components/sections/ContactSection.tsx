'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Code2,
  Globe,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

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

const contactInfo = [
  { icon: Phone, label: 'phone', value: '+998 77 354 35 50', href: 'tel:+998773543550' },
  { icon: Mail, label: 'email', value: 'iadevcdr@gmail.com', href: 'mailto:iadevcdr@gmail.com' },
  { icon: MapPin, label: 'location', value: 'Tashkent, Uzbekistan', href: undefined },
];

const socialLinks = [
  { icon: Code2, href: 'https://github.com/IzzatjonAkbarov', label: 'GitHub' },
  { icon: Globe, href: 'https://www.linkedin.com/in/izzatjon-akbarov-ba7254348/', label: 'LinkedIn' },
  { icon: Terminal, href: 'https://leetcode.com/u/izzatjonakbarov/', label: 'LeetCode' },
  { icon: Send, href: 'https://t.me/akbrvi', label: 'Telegram' },
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection() {
  const t = useTranslations('Contact');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [countryCode, setCountryCode] = useState('+998');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone validation (optional field, but if filled, must contain valid digits)
    if (formData.phone.trim()) {
      const cleanDigits = formData.phone.replace(/\D/g, '');
      if (cleanDigits.length < 7 || cleanDigits.length > 15) {
        newErrors.phone = 'Please enter a valid phone number (7-15 digits).';
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Strip spaces from phone string: e.g. +998121231233
      const cleanRawPhone = formData.phone.replace(/\s+/g, '');
      const fullPhone = cleanRawPhone
        ? `${countryCode}${cleanRawPhone.startsWith('+') ? cleanRawPhone.slice(1) : cleanRawPhone}`
        : 'Not provided';

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

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-border/40 bg-transparent">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/40 text-xs font-mono font-medium text-muted-foreground mb-3">
            <span>04</span>
            <span>/</span>
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-12 lg:grid-cols-12"
        >
          {/* Left — Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Card className="border border-border bg-card p-6 md:p-8 shadow-xs">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t('nameLabel')} *
                  </label>
                  <Input
                    id="name"
                    placeholder={t('namePlaceholder')}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={cn(
                      'h-11 rounded-xl border-border bg-background transition-all',
                      errors.name &&
                        'border-red-500 shadow-md shadow-red-500/20 ring-2 ring-red-500/30'
                    )}
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400 mt-0.5">
                      <AlertCircle className="size-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t('emailLabel')} *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={cn(
                        'h-11 rounded-xl border-border bg-background transition-all',
                        errors.email &&
                          'border-red-500 shadow-md shadow-red-500/20 ring-2 ring-red-500/30'
                      )}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400 mt-0.5">
                        <AlertCircle className="size-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Input with Shadcn Select */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t('phoneLabel')}
                    </label>
                    <div className="flex gap-2">
                      <Select
                        options={countryOptions}
                        value={countryCode}
                        onValueChange={setCountryCode}
                        className="w-[100px] shrink-0"
                      />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className={cn(
                          'h-11 rounded-xl border-border bg-background flex-1 transition-all',
                          errors.phone &&
                            'border-red-500 shadow-md shadow-red-500/20 ring-2 ring-red-500/30'
                        )}
                      />
                    </div>
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400 mt-0.5">
                        <AlertCircle className="size-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t('messageLabel')} *
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('messagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className={cn(
                      'min-h-[120px] rounded-xl border-border bg-background transition-all',
                      errors.message &&
                        'border-red-500 shadow-md shadow-red-500/20 ring-2 ring-red-500/30'
                    )}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400 mt-0.5">
                      <AlertCircle className="size-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 h-11 px-6 font-medium text-sm transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-4" />
                      <span>{t('send')}</span>
                    </>
                  )}
                </Button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 text-xs font-medium text-foreground"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    {t('successMessage')}
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>

          {/* Right — Contact Info */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {contactInfo.map((info) => (
              <motion.div key={info.label} variants={itemVariants}>
                <Card className="border border-border bg-card hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
                  <CardContent className="flex items-center gap-4 py-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-foreground border border-border">
                      <info.icon className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                        {t(info.label)}
                      </span>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm font-semibold text-foreground transition-colors hover:underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-foreground">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Social Links Card */}
            <motion.div variants={itemVariants}>
              <Card className="border border-border bg-card p-5 shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  {t('social')}
                </span>
                <div className="mt-3 flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                    >
                      <social.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
