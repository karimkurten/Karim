import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO from '../components/SEO';

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

export default function ResumeRequest() {
  const [serverState, setServerState] = useState({ status: 'idle', message: '' });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', newsletterConsent: false },
  });

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
          source: 'resume',
          idempotencyKey,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok || !data.downloadToken) {
        const message =
          (data.fields && (data.fields.email || data.fields.name)) ||
          data.message ||
          'Something went wrong. Please try again.';
        setServerState({ status: 'error', message });
        return;
      }
      setServerState({ status: 'success', message: 'Your resume download has started.' });
      // Trigger the file download via the single-use token URL.
      const a = document.createElement('a');
      a.href = `/api/resume-download?token=${encodeURIComponent(data.downloadToken)}`;
      a.download = 'Karim_Chaouki_Resume.pdf';
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
    <>
      <SEO
        title="Request My Resume"
        description="Enter your name and email to access Karim Chaouki's professional resume."
        canonical="/resume"
        noindex
      />
      <Header />
      <main id="main-content" className="bg-[#F0F4F8] min-h-screen">
        <section className="max-w-xl mx-auto px-6 py-16 md:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B6CB0] hover:text-[#2563EB] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A202C]">
              Request My Resume
            </h1>
            <p className="mt-4 text-[#475569] leading-relaxed">
              Interested in my professional background? Enter your details below
              to access my resume.
            </p>

            {succeeded ? (
              <div
                role="status"
                className="mt-8 p-5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] flex items-start gap-3"
              >
                <CheckCircle2 size={22} className="text-[#2B6CB0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A202C]">Your resume is on its way.</p>
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
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
                <div>
                  <label htmlFor="resume-name" className="block text-sm font-semibold text-[#1A202C] mb-2">
                    Full name <span className="text-[#2B6CB0]">*</span>
                  </label>
                  <input
                    id="resume-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={inputClass}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'resume-name-error' : undefined}
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p id="resume-name-error" role="alert" className="mt-1.5 text-sm text-red-600">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="resume-email" className="block text-sm font-semibold text-[#1A202C] mb-2">
                    Email address <span className="text-[#2B6CB0]">*</span>
                  </label>
                  <input
                    id="resume-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className={inputClass}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'resume-email-error' : undefined}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p id="resume-email-error" role="alert" className="mt-1.5 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0]">
                  <input
                    id="resume-newsletter"
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#2B6CB0]"
                    {...register('newsletterConsent')}
                  />
                  <label htmlFor="resume-newsletter" className="text-sm text-[#475569] leading-relaxed">
                    Also send me occasional professional insights (newsletter).
                    <span className="block mt-1 text-xs text-[#94A3B8]">
                      Optional — requesting the resume does not subscribe you to anything.
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
                      <p className="font-semibold text-red-800">Request failed</p>
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
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2B6CB0] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition-all duration-300 hover:shadow-xl hover:shadow-[#2B6CB0]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Processing…
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Get My Resume
                    </>
                  )}
                </button>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Your details are used only to provide the resume and, if you
                  opt in, the newsletter. Read our{' '}
                  <Link to="/privacy-policy" className="text-[#2B6CB0] hover:text-[#2563EB]">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
