import React from 'react';
import LegalLayout from './LegalLayout';
import { Scale } from 'lucide-react';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1A202C] mb-4">
      {title}
    </h2>
    <div className="text-[#94A3B8] leading-[1.8] space-y-4 text-[0.938rem]">
      {children}
    </div>
    <hr className="mt-10 border-[#E2E8F0]" />
  </section>
);

const TermsConditions = () => (
  <LegalLayout>
    {/* Page Header */}
    <div className="mb-14">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2B6CB0]/20 bg-[#2B6CB0]/5 mb-6">
        <Scale size={16} className="text-[#2B6CB0]" />
        <span className="text-sm text-[#2B6CB0] font-medium">Legal</span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C] mb-4">
        Terms &amp; Conditions
      </h1>
      <p className="text-[#94A3B8] text-sm">
        Effective Date: January 1, 2025 &middot; Last Updated: July 2025
      </p>
    </div>

    <Section title="1. Purpose of This Website">
      <p>
        This website (<strong className="text-[#1A202C]">karimchaouki.com</strong>) is the
        personal professional portfolio of Karim Chaouki. It serves as an
        informational resource to showcase professional experience,
        certifications, skills, and career achievements. This site is not a
        commercial product or service platform, and no goods or services are
        sold through it.
      </p>
      <p>
        By accessing and using this website, you agree to be bound by these
        Terms &amp; Conditions. If you do not agree with any part of these terms,
        please discontinue use of this website immediately.
      </p>
    </Section>

    <Section title="2. Intellectual Property">
      <p>
        All content on this website — including but not limited to text,
        graphics, photographs, logos, icons, design elements, layout, code, and
        multimedia — is the intellectual property of{' '}
        <strong className="text-[#1A202C]">Karim Chaouki</strong> unless otherwise
        attributed, and is protected by applicable Canadian and international
        copyright, trademark, and intellectual property laws.
      </p>
      <p>
        No content from this website may be reproduced, distributed,
        transmitted, displayed, published, or broadcast in any form without the
        prior written consent of Karim Chaouki. Unauthorized use of any
        materials on this site may violate copyright, trademark, and other
        applicable laws.
      </p>
      <p>
        Permitted use includes viewing the website content for personal,
        non-commercial purposes and sharing links to the website.
      </p>
    </Section>

    <Section title="3. No Professional Advice">
      <p>
        The information provided on this website is for general informational
        and portfolio presentation purposes only. Nothing contained on this
        website constitutes, or is intended to constitute:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>Legal advice or legal opinion</li>
        <li>Human resources or employment advice</li>
        <li>Financial, accounting, or tax advice</li>
        <li>Consulting or professional services recommendations</li>
        <li>Any form of professional engagement or advisory relationship</li>
      </ul>
      <p>
        You should not rely on any information on this website as a substitute
        for professional advice. For specific professional matters, please
        consult a qualified professional in the relevant field.
      </p>
    </Section>

    <Section title="4. Limitation of Liability">
      <p>
        To the fullest extent permitted by applicable law, Karim Chaouki shall
        not be liable for any direct, indirect, incidental, consequential,
        special, or exemplary damages arising from or in connection with:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>Your access to or use of (or inability to access or use) this website</li>
        <li>Any decisions made or actions taken based on information presented on this website</li>
        <li>Any errors, omissions, or inaccuracies in the website content</li>
        <li>Any unauthorized access to or alteration of your transmissions or data</li>
        <li>Any interruption, suspension, or discontinuation of the website</li>
      </ul>
      <p>
        This website is provided on an <strong className="text-[#1A202C]">"as is" and "as available"</strong>{' '}
        basis without warranties of any kind, whether express or implied,
        including but not limited to implied warranties of merchantability,
        fitness for a particular purpose, and non-infringement.
      </p>
    </Section>

    <Section title="5. Third-Party Links">
      <p>
        This website may contain links to third-party websites, including but
        not limited to LinkedIn, email services, and other external resources.
        These links are provided for your convenience and informational
        purposes only.
      </p>
      <p>
        Karim Chaouki does not control, endorse, or assume any responsibility
        for the content, privacy policies, or practices of any third-party
        websites. Accessing third-party links is entirely at your own risk, and
        you should review the terms and privacy policies of any external
        websites you visit.
      </p>
      <p>
        The inclusion of any link does not imply affiliation, endorsement, or
        approval by Karim Chaouki of the linked website or its content.
      </p>
    </Section>

    <Section title="6. Acceptable Use">
      <p>
        When using this website, you agree <strong className="text-[#1A202C]">not to</strong>:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>Use automated tools, bots, or scrapers to extract data or content from this website</li>
        <li>Attempt to gain unauthorized access to any portion of the website, its servers, or connected systems</li>
        <li>Impersonate Karim Chaouki or misrepresent any affiliation with this website</li>
        <li>Use the website content for any unlawful, harmful, or fraudulent purpose</li>
        <li>Transmit any malicious code, viruses, or disruptive technology through the contact form or any other means</li>
        <li>Reproduce, mirror, or create derivative works based on this website's content or design without written consent</li>
      </ul>
      <p>
        Violation of these terms may result in restriction of access to this
        website and, where applicable, legal action.
      </p>
    </Section>

    <Section title="7. Contact Form">
      <p>
        The contact form on this website is provided as a convenience for
        legitimate professional inquiries. By submitting a message through the
        contact form, you:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>Confirm that the information you provide is accurate and truthful</li>
        <li>Consent to the processing of your personal data as described in our Privacy Policy</li>
        <li>Understand that submission does not create a professional or contractual relationship</li>
        <li>Acknowledge that response times may vary and a response is not guaranteed</li>
      </ul>
    </Section>

    <Section title="8. Governing Law">
      <p>
        These Terms &amp; Conditions shall be governed by and construed in
        accordance with the laws of the <strong className="text-[#1A202C]">Province of Ontario</strong>{' '}
        and the federal laws of <strong className="text-[#1A202C]">Canada</strong> applicable
        therein, without regard to conflict of law principles.
      </p>
      <p>
        Any disputes arising out of or relating to these terms or your use of
        this website shall be subject to the exclusive jurisdiction of the
        courts located in Toronto, Ontario, Canada.
      </p>
    </Section>

    <Section title="9. Amendments">
      <p>
        Karim Chaouki reserves the right to modify, amend, or update these
        Terms &amp; Conditions at any time without prior notice. Changes become
        effective immediately upon publication on this page.
      </p>
      <p>
        Your continued use of this website after any modifications constitutes
        your acceptance of the revised terms. We encourage you to review this
        page periodically to stay informed of any changes.
      </p>
    </Section>

    <Section title="10. Contact">
      <p>
        If you have any questions or concerns regarding these Terms &amp;
        Conditions, please contact:
      </p>
      <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white/50 mt-4">
        <p className="text-[#1A202C] font-semibold">Karim Chaouki</p>
        <p className="text-[#94A3B8] mt-1">Toronto, Ontario, Canada</p>
        <p className="mt-2">
          <a href="mailto:karim.chaouki@gmail.com" className="text-[#2B6CB0] hover:text-[#2563EB] underline underline-offset-2 transition-colors">
            karim.chaouki@gmail.com
          </a>
        </p>
      </div>
    </Section>

    <div className="text-xs text-[#475569] mt-12">
      These terms were last reviewed and updated in July 2025.
    </div>
  </LegalLayout>
);

export default TermsConditions;
