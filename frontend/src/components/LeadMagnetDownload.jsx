import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, Loader2, CheckCircle2, AlertCircle, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Lead-magnet download box rendered at the end of articles that have a
 * gated downloadable asset. Mirrors the /resume lead-capture pattern:
 * name + email required, newsletter consent optional and unchecked.
 * Posts to /api/beehiiv-subscribe (source "lead-magnet") and triggers the
 * token-gated download from /api/asset-download.
 */
const MAGNETS = {
  'hcm-go-live-checklist': {
    asset: 'go-live-checklist',
    eyebrow: 'Free download',
    title: 'HCM Go-Live Readiness Checklist',
    description:
      'The printable companion to this article: all 30 checkpoints with owner and date columns, the go/no-go decision sheet, the hypercare handoff, and the final sign-off block. Carry it into your go/no-go meeting.',
    fileLabel: 'PDF',
    buttonLabel: 'Download the checklist',
    successFile: 'go-live-readiness-checklist.pdf',
  },
  'data-migration-checklist': {
    asset: 'data-migration-checklist',
    eyebrow: 'Free download',
    title: 'HCM Data Migration Checklist',
    description:
      'The execution companion to this article: phase-gated checklists with owner and wave columns, the mock-load cycle tracker, the data freeze plan sheet, and the common-mistakes guardrail.',
    fileLabel: 'PDF',
    buttonLabel: 'Download the checklist',
    successFile: 'hcm-data-migration-checklist.pdf',
  },
  'implementation-risk-register-template': {
    asset: 'risk-register',
    eyebrow: 'Free download',
    title: 'Implementation Risk Register Template',
    description:
      'The working Excel file: pre-populated with 8 realistic HCM risks, auto-scoring 3×3 matrix with conditional formatting, plus the scoring guide and review-cadence sheets.',
    fileLabel: 'Excel',
    buttonLabel: 'Download the template',
    successFile: 'implementation-risk-register.xlsx',
  },
};

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required.')
    .max(120, 'Name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .max(254, 'Email address is too long.')
    .email('Enter a valid email address.'),
  newsletterConsent: z.boolean().default(false),
});

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1A202C] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/40 focus:border-[#2B6CB0] transition-colors';

export default function LeadMagnetDownload({ slug }) {
  const magnet = MAGNETS[slug];
  const [serverState, setServerState] = useState({ status: 'idle', message: '' });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', newsletterConsent: false },
  });

  if (!magnet) return null;

  const onSubmit = async (values) => {
    setServerState({ status: 'loading', message: '' });
    try {
      const idempotencyKey =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now());
      const res = await fetch('/api/beehiiv-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          newsletterConsent: values.newsletterConsent,
          source: 'lead-magnet',
          asset: magnet.asset,
          idempotencyKey,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok || !data.downloadToken) {
        const message =
          (data.fields && (data.fields.email || data.fields.name || data.fields.asset)) ||
          data.message ||
          'Something went wrong. Please try again.';
        setServerState({ status: 'error', message });
        return;
      }
      setServerState({ status: 'success', message: 'Your download has started.' });
      const a = document.createElement('a');
      a.href = `/api/asset-download?token=${encodeURIComponent(data.downloadToken)}`;
      a.download = magnet.successFile;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      setServerState({
        status: 'error',
        message: 'Could not reach the server. Check your connection and try again.',
      });
    }
  };

  const succeeded = serverState.status === 'success';

  return (
    <section
      aria-labelledby="lead-magnet-heading"
      className="py-14 px-6 bg-[#F0F4F8] border-t border-[#E2E8F0]"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-8 py-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">
              {magnet.eyebrow} · {magnet.fileLabel}
            </p>
            <h2
              id="lead-magnet-heading"
              className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-3"
            >
              <FileDown size={28} aria-hidden="true" className="shrink-0 text-blue-300" />
              {magnet.title}
            </h2>
          </div>

          <div className="p-8">
            <p className="text-[#475569] leading-relaxed">{magnet.description}</p>

            {succeeded ? (
              <div
                role="status"
                className="mt-6 p-5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] flex items-start gap-3"
              >
                <CheckCircle2 size={22} className="text-[#2B6CB0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A202C]">Your file is on its way.</p>
                  <p className="mt-1 text-sm text-[#475569]">
                    {serverState.message} If the download did not start,{' '}
                    <button
                      type="button"
                      onClick={() => setServerState({ status: 'idle', message: '' })}
                      className="text-[#2B6CB0] font-semibold hover:text-[#2563EB]"
                    >
                      submit the form again
                    </button>
                    .
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lm-name" className="block text-sm font-semibold text-[#1A202C] mb-2">
                      Full name <span className="text-[#2B6CB0]">*</span>
                    </label>
                    <input
                      id="lm-name"
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
                    <label htmlFor="lm-email" className="block text-sm font-semibold text-[#1A202C] mb-2">
                      Email address <span className="text-[#2B6CB0]">*</span>
                    </label>
                    <input
                      id="lm-email"
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

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0]">
                  <input
                    id="lm-newsletter"
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#2B6CB0]"
                    {...register('newsletterConsent')}
                  />
                  <label htmlFor="lm-newsletter" className="text-sm text-[#475569] leading-relaxed">
                    Also send me occasional professional insights (newsletter).
                    <span className="block mt-1 text-xs text-[#94A3B8]">
                      Optional — downloading the file does not subscribe you to anything.
                    </span>
                  </label>
                </div>

                {serverState.status === 'error' && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
                  >
                    <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-red-800">Download failed</p>
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
                      <Loader2 size={18} className="animate-spin" /> Processing…
                    </>
                  ) : (
                    <>
                      <Download size={18} /> {magnet.buttonLabel}
                    </>
                  )}
                </button>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Your details are used only to provide the file and, if you
                  opt in, the newsletter. Read our{' '}
                  <Link to="/privacy-policy" className="text-[#2B6CB0] hover:text-[#2563EB]">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
