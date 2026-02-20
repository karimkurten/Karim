import React from 'react';
import LegalLayout from './LegalLayout';
import { Shield } from 'lucide-react';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#F1F5F9] mb-4">
      {title}
    </h2>
    <div className="text-[#94A3B8] leading-[1.8] space-y-4 text-[0.938rem]">
      {children}
    </div>
    <hr className="mt-10 border-[#1E293B]" />
  </section>
);

const PrivacyPolicy = () => (
  <LegalLayout>
    {/* Page Header */}
    <div className="mb-14">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8A94E]/20 bg-[#C8A94E]/5 mb-6">
        <Shield size={16} className="text-[#C8A94E]" />
        <span className="text-sm text-[#C8A94E] font-medium">Legal</span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F1F5F9] mb-4">
        Privacy Policy
      </h1>
      <p className="text-[#64748B] text-sm">
        Effective Date: January 1, 2025 &middot; Last Updated: July 2025
      </p>
    </div>

    <Section title="1. Who I Am">
      <p>
        This website is the personal professional portfolio of <strong className="text-[#F1F5F9]">Karim Chaouki</strong>,
        a Senior Project &amp; Program Manager based in Toronto, Ontario, Canada. The
        purpose of this site is to showcase professional experience, skills, and
        certifications to attract recruiters, talent acquisition managers, and
        peer consultants for career and collaboration opportunities.
      </p>
      <p>
        <strong className="text-[#F1F5F9]">Contact:</strong>{' '}
        <a href="mailto:karim.chaouki@gmail.com" className="text-[#C8A94E] hover:text-[#E2C878] underline underline-offset-2 transition-colors">
          karim.chaouki@gmail.com
        </a>
        <br />
        <strong className="text-[#F1F5F9]">LinkedIn:</strong>{' '}
        <a href="https://www.linkedin.com/in/karimchaouki" target="_blank" rel="noopener noreferrer" className="text-[#C8A94E] hover:text-[#E2C878] underline underline-offset-2 transition-colors">
          linkedin.com/in/karimchaouki
        </a>
      </p>
    </Section>

    <Section title="2. Data We Collect">
      <p>
        We collect information in two ways:
      </p>
      <p>
        <strong className="text-[#F1F5F9]">a) Information You Provide Directly</strong><br />
        When you use the contact form, you voluntarily submit your name, email
        address, subject, and message. This data is stored securely and used
        solely to respond to your inquiry.
      </p>
      <p>
        <strong className="text-[#F1F5F9]">b) Information Collected Automatically</strong><br />
        When you visit this site, certain technical data may be collected
        automatically, including your IP address, browser type and version,
        operating system, referring URL, pages visited, time spent on pages, and
        session identifiers. This information is used for analytics purposes to
        improve the website experience.
      </p>
    </Section>

    <Section title="3. Purpose of Data Collection">
      <p>Your personal data is processed for the following purposes:</p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>To respond to inquiries submitted through the contact form</li>
        <li>To improve the website's user experience and content</li>
        <li>To evaluate professional opportunities and collaborations</li>
        <li>To maintain website security and prevent abuse</li>
        <li>To generate anonymized, aggregate analytics about site usage</li>
      </ul>
    </Section>

    <Section title="4. Legal Basis for Processing (GDPR Article 6)">
      <p>We process your personal data based on the following legal grounds:</p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>
          <strong className="text-[#F1F5F9]">Consent (Art. 6(1)(a)):</strong> When you
          submit the contact form or accept cookies, you provide explicit
          consent for the processing of your data for those specific purposes.
        </li>
        <li>
          <strong className="text-[#F1F5F9]">Legitimate Interest (Art. 6(1)(f)):</strong>{' '}
          We have a legitimate interest in analyzing website traffic to improve
          user experience and in processing inquiries from potential
          collaborators and employers.
        </li>
        <li>
          <strong className="text-[#F1F5F9]">Contractual Necessity (Art. 6(1)(b)):</strong>{' '}
          When you reach out regarding a potential professional engagement, the
          processing of your data is necessary for pre-contractual measures
          taken at your request.
        </li>
      </ul>
    </Section>

    <Section title="5. Data Retention">
      <p>
        <strong className="text-[#F1F5F9]">Contact Form Data:</strong> Messages submitted
        through the contact form are retained for a maximum of <strong className="text-[#F1F5F9]">12 months</strong>{' '}
        from the date of submission, after which they are permanently deleted
        unless an ongoing professional relationship requires continued
        retention.
      </p>
      <p>
        <strong className="text-[#F1F5F9]">Analytics Data:</strong> Any analytics data
        collected is subject to the retention policies of the respective
        third-party analytics tools used. We do not independently store
        analytics data beyond what these tools retain.
      </p>
    </Section>

    <Section title="6. Third-Party Sharing">
      <p>
        We do <strong className="text-[#F1F5F9]">not sell, trade, rent, or otherwise share</strong>{' '}
        your personal data with third parties for marketing purposes. Your data
        may be processed by the following service providers solely for the
        operation of this website:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li><strong className="text-[#F1F5F9]">Email Delivery:</strong> Gmail (Google LLC) — for sending and receiving contact form notifications</li>
        <li><strong className="text-[#F1F5F9]">Hosting Provider:</strong> The website hosting service that stores and serves the site</li>
      </ul>
      <p>
        Each of these providers is bound by their own privacy policies and data
        processing agreements.
      </p>
    </Section>

    <Section title="7. Your Rights Under GDPR">
      <p>
        If you are located in the European Union or European Economic Area, you
        have the following rights under the General Data Protection Regulation:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li><strong className="text-[#F1F5F9]">Right of Access:</strong> You may request a copy of the personal data we hold about you.</li>
        <li><strong className="text-[#F1F5F9]">Right to Rectification:</strong> You may request correction of inaccurate or incomplete data.</li>
        <li><strong className="text-[#F1F5F9]">Right to Erasure:</strong> You may request deletion of your personal data ("right to be forgotten").</li>
        <li><strong className="text-[#F1F5F9]">Right to Restriction:</strong> You may request that we limit the processing of your data.</li>
        <li><strong className="text-[#F1F5F9]">Right to Data Portability:</strong> You may request your data in a structured, commonly used format.</li>
        <li><strong className="text-[#F1F5F9]">Right to Object:</strong> You may object to the processing of your data based on legitimate interest.</li>
        <li><strong className="text-[#F1F5F9]">Right to Lodge a Complaint:</strong> You have the right to file a complaint with a supervisory authority in your EU/EEA member state.</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{' '}
        <a href="mailto:karim.chaouki@gmail.com" className="text-[#C8A94E] hover:text-[#E2C878] underline underline-offset-2 transition-colors">
          karim.chaouki@gmail.com
        </a>.
        We will respond to your request within 30 days.
      </p>
    </Section>

    <Section title="8. Cookies">
      <p>
        This website uses cookies — small text files stored on your device — to
        enhance your browsing experience.
      </p>
      <p>
        <strong className="text-[#F1F5F9]">Functional Cookies:</strong> These are essential
        for the website to function properly, including remembering your cookie
        consent preference. These cannot be disabled.
      </p>
      <p>
        <strong className="text-[#F1F5F9]">Analytics Cookies:</strong> These help us
        understand how visitors interact with the website by collecting
        anonymized usage statistics. You may opt out of analytics cookies by
        using your browser's cookie management settings or by declining
        non-essential cookies via the cookie consent banner.
      </p>
      <p>
        You can clear or block cookies at any time through your browser
        settings. Please note that disabling cookies may affect some
        functionality of this website.
      </p>
    </Section>

    <Section title="9. International Transfers">
      <p>
        This website is operated from <strong className="text-[#F1F5F9]">Toronto, Ontario, Canada</strong>.
        Canada's Personal Information Protection and Electronic Documents Act
        (PIPEDA) governs the collection and use of personal data as the primary
        jurisdiction.
      </p>
      <p>
        For visitors located in the European Union or European Economic Area,
        the General Data Protection Regulation (GDPR) applies. Canada has been
        recognized by the European Commission as providing an adequate level of
        data protection, which means transfers of personal data from the EU/EEA
        to Canada are permitted without additional safeguards.
      </p>
    </Section>

    <Section title="10. CASL Compliance">
      <p>
        In accordance with Canada's Anti-Spam Legislation (CASL), this website
        does <strong className="text-[#F1F5F9]">not send unsolicited commercial electronic messages</strong>.
        Any email communication initiated as a result of a contact form
        submission is a direct response to your inquiry and does not constitute
        commercial messaging.
      </p>
    </Section>

    <Section title="11. Privacy Requests">
      <p>
        For any questions, concerns, or requests regarding your personal data or
        this privacy policy, please contact:
      </p>
      <div className="p-5 rounded-xl border border-[#1E293B] bg-[#111827]/50 mt-4">
        <p className="text-[#F1F5F9] font-semibold">Karim Chaouki</p>
        <p className="text-[#94A3B8] mt-1">Data Controller</p>
        <p className="mt-2">
          <a href="mailto:karim.chaouki@gmail.com" className="text-[#C8A94E] hover:text-[#E2C878] underline underline-offset-2 transition-colors">
            karim.chaouki@gmail.com
          </a>
        </p>
      </div>
    </Section>

    <div className="text-xs text-[#475569] mt-12">
      This policy was last reviewed and updated in July 2025.
    </div>
  </LegalLayout>
);

export default PrivacyPolicy;
