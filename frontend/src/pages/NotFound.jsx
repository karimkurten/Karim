import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, BookOpen, SearchX } from 'lucide-react';
import Header from '../components/Header';
import SEO from '../components/SEO';

// 404 page. Renders with noindex (true 404 HTTP status isn't possible under the
// SPA catch-all rewrite, so noindex is what keeps bad URLs out of the index).
// This route intentionally has no prerender entry (see OPT_OUT_ROUTES in
// frontend/scripts/prerender-blog.js).
export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved. Return to the homepage or explore the blog for implementation insights."
        ogType="website"
        noindex
      />
      <Header />
      <main id="main-content" className="bg-[#F0F4F8] min-h-screen">
        <section className="max-w-xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 md:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F4F8] border border-[#E2E8F0]">
              <SearchX size={30} className="text-[#2B6CB0]" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold tracking-widest text-[#2B6CB0] uppercase">
              Error 404
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-[#1A202C]">
              Page Not Found
            </h1>
            <p className="mt-4 text-[#475569] leading-relaxed">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back on track.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2B6CB0] px-6 py-3 font-semibold text-white hover:bg-[#1E4E8C] transition-colors"
              >
                <Home size={16} aria-hidden="true" /> Back to Home
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-6 py-3 font-semibold text-[#1A202C] hover:border-[#2B6CB0] hover:text-[#2B6CB0] transition-colors"
              >
                <BookOpen size={16} aria-hidden="true" /> Browse the Blog
              </Link>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-sm text-[#475569]">
              <p>
                Looking for something specific? Try the{' '}
                <Link to="/" className="font-semibold text-[#2B6CB0] hover:text-[#2563EB] transition-colors">
                  homepage
                </Link>{' '}
                or{' '}
                <Link to="/blog" className="font-semibold text-[#2B6CB0] hover:text-[#2563EB] transition-colors">
                  browse all articles
                </Link>
                .
              </p>
            </div>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2B6CB0] hover:text-[#2563EB] transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Go back
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
