import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const schema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required.').max(120, 'Name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .max(254, 'Email address is too long.')
    .email('Enter a valid email address.'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm you want to receive the newsletter.' }),
  }),
});

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1A202C] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/40 focus:border-[#2B6CB0] transition-colors';

/**
 * Newsletter signup section rendered once at the end of every blog article.
 * Posts to the secure server-side Beehiiv integration (/api/beehiiv-subscribe).
 */
export default function NewsletterSignup() {
  const [serverState, setServerState] = useState({ status: 'idle', message: '' });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', consent: false },
  });

  const onSubmit = async (values) => {
    setServerState({ status: 'loading', message: '' });
    try {
      const res = await fetch('/api/beehiiv-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          newsletterConsent: true,
          source: 'newsletter',
          idempotencyKey:
            typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : String(Date.now()),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const message =
          data.error === 'newsletter_unavailable'
            ? 'Newsletter signup is temporarily unavailable. Please try again later.'
            : (data.fields && (data.fields.email || data.fields.name)) ||
              data.message ||
              'Something went wrong. Please try again.';
        setServerState({ status: 'error', message });
        return;
      }
      setServerState({
        status: 'success',
        message: data.created === false
          ? 'You are already subscribed — your preferences are up to date.'
          : 'Thanks for subscribing. You will receive new insights by email.',
      });
    } catch (e) {
      setServerState({
        status: 'error',
        message: 'Could not reach the server. Check your connection and try again.',
      });
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-14 px-6 bg-white border-t border-[#E2E8F0]"
    >
      {/* min-height reserves space so the form never shifts the layout */}
      <div className="max-w-2xl mx-auto min-h-[380px]">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#2B6CB0]/10 flex items-center justify-center mb-5">
            <MailCheck size={24} className="text-[#2B6CB0]" />
          </div>
          <h2
            id="newsletter-heading"
            className="text-2xl md:text-3xl font-serif font-bold text-[#1A202C]"
          >
            Stay Ahead With New Insights
          </h2>
          <p className="mt-3 text-[#475569] leading-relaxed">
            Get notified when I publish new insights on project management, HCM
            and ERP transformation, implementation strategy, risk management,
            and business transformation.
          </p>
        </div>

        {serverState.status === 'success' ? (
          <div
            role="status"
            className="mt-8 p-5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] flex items-start gap-3"
          >
            <CheckCircle2 size={22} className="text-[#2B6CB0] shrink-0 mt-0.5" />
            <p className="text-[#1A202C] font-medium">{serverState.message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nl-name" className="block text-sm font-semibold text-[#1A202C] mb-2">
                  Full name <span className="text-[#2B6CB0]">*</span>
                </label>
                <input
                  id="nl-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={inputClass}
                  aria-invalid={Boolean(errors.fullName)}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p role="alert" className="mt-1.5 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="nl-email" className="block text-sm font-semibold text-[#1A202C] mb-2">
                  Email address <span className="text-[#2B6CB0]">*</span>
                </label>
                <input
                  id="nl-email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  className={inputClass}
                  aria-invalid={Boolean(errors.email)}
                  {...register('email')}
                />
                {errors.email && (
                  <p role="alert" className="mt-1.5 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="nl-consent"
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#2B6CB0]"
                aria-invalid={Boolean(errors.consent)}
                {...register('consent')}
              />
              <label htmlFor="nl-consent" className="text-sm text-[#475569] leading-relaxed">
                I agree to receive newsletter emails about new articles and professional
                insights. <span className="text-[#2B6CB0]">*</span>
              </label>
            </div>
            {errors.consent && (
              <p role="alert" className="text-sm text-red-600">
                {errors.consent.message}
              </p>
            )}

            {serverState.status === 'error' && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
              >
                <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-red-800">Subscription failed</p>
                  <p className="mt-1 text-red-700">{serverState.message}</p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 font-semibold text-[#2B6CB0] hover:text-[#2563EB] disabled:opacity-50"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2B6CB0] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition-all duration-300 hover:shadow-lg hover:shadow-[#2B6CB0]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Subscribing…
                </>
              ) : (
                'Subscribe to Updates'
              )}
            </button>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We respect your privacy. Your email is used only to send the
              newsletter — you can unsubscribe anytime. Read our{' '}
              <Link to="/privacy-policy" className="text-[#2B6CB0] hover:text-[#2563EB]">
                privacy policy
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
