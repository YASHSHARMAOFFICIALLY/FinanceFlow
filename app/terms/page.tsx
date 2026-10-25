// app/terms/page.tsx

export default function TermsPage() {
  const sections = [
    {
      title: "Introduction",
      content: `
        Welcome to Finveda. These Terms and Conditions govern your access to and use of our website,
        tools, content, and services. By using Finveda, you agree to comply with these terms.
        If you do not agree with any part of these Terms, you should discontinue use of the platform.
      `,
    },
    {
      title: "Eligibility",
      content: `
        By using Finveda, you confirm that you are at least 18 years old or have the permission
        of a parent or legal guardian. You also confirm that your use of the platform complies
        with all applicable laws and regulations.
      `,
    },
    {
      title: "User Responsibilities",
      content: `
        Users are responsible for maintaining the confidentiality of their account credentials
        and for all activities conducted through their account. You agree to provide accurate,
        current, and complete information while using the platform.
      `,
    },
    {
      title: "Acceptable Use",
      content: `
        You agree not to misuse the platform or engage in activities that may harm Finveda,
        its users, or its services. Prohibited activities include unauthorized access,
        distributing malicious software, spamming, data scraping, or violating applicable laws.
      `,
    },
    {
      title: "Financial Disclaimer",
      content: `
        Finveda provides educational and informational content related to personal finance.
        The platform does not provide financial, investment, legal, or tax advice.
        Users should consult qualified professionals before making financial decisions.
      `,
    },
    {
      title: "Intellectual Property",
      content: `
        All content, branding, logos, graphics, software, and materials available on Finveda
        are the intellectual property of Finveda unless otherwise stated. Unauthorized copying,
        reproduction, distribution, or modification of any content is strictly prohibited.
      `,
    },
    {
      title: "Third-Party Links",
      content: `
        Finveda may contain links to third-party websites or services. We are not responsible
        for the content, practices, or policies of third-party platforms and encourage users
        to review their respective terms and privacy policies.
      `,
    },
    {
      title: "Limitation of Liability",
      content: `
        Finveda and its team shall not be liable for any direct, indirect, incidental,
        consequential, or financial damages arising from the use or inability to use the platform.
        Use of the platform is entirely at your own risk.
      `,
    },
    {
      title: "Privacy",
      content: `
        Your use of Finveda is also governed by our Privacy Policy. By using the platform,
        you consent to the collection and use of information as outlined in our Privacy Policy.
      `,
    },
    {
      title: "Termination Clause",
      content: `
        We reserve the right to suspend or terminate user access to Finveda at any time,
        without prior notice, if users violate these Terms or engage in unlawful or harmful activities.
      `,
    },
    {
      title: "Changes to Terms",
      content: `
        Finveda may update or modify these Terms and Conditions at any time.
        Updated versions will be posted on this page, and continued use of the platform
        after changes are published constitutes acceptance of the revised Terms.
      `,
    },
    {
      title: "Governing Law",
      content: `
        These Terms and Conditions shall be governed and interpreted in accordance
        with the laws applicable in your jurisdiction, without regard to conflict of law principles.
      `,
    },
    {
      title: "Contact Information",
      content: `
        If you have questions or concerns regarding these Terms and Conditions,
        please contact us at support@finveda.com.
      `,
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[12px] uppercase tracking-[0.24em] text-[#B89B4F] font-semibold mb-4">
            Legal
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-[#0F0F0F] dark:text-white mb-6 leading-tight">
            Terms & Conditions
          </h1>

          <p className="text-[15px] leading-8 text-[#666] dark:text-[#888] max-w-2xl">
            Please read these Terms and Conditions carefully before using
            Finveda. These terms outline your rights, responsibilities, and the
            rules governing the use of our platform and services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="border-b border-[#F1F1F1] dark:border-[#1D1D1D] pb-10"
            >
              <div className="flex items-start gap-5">
                {/* Number */}
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F7F3E8] dark:bg-[#1A1A1A] flex items-center justify-center text-[13px] font-semibold text-[#B89B4F]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#0F0F0F] dark:text-white mb-4">
                    {section.title}
                  </h2>

                  <p className="text-[15px] leading-8 text-[#555] dark:text-[#888] whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[#ECECEC] dark:border-[#1E1E1E] pt-8">
          <div>
            <p className="text-[13px] text-[#999] dark:text-[#666]">
              Last updated: May {new Date().getFullYear()}
            </p>

            <p className="text-[13px] text-[#999] dark:text-[#666] mt-1">
              © {new Date().getFullYear()} Finveda. All rights reserved.
            </p>
          </div>

          <a
            href="/privacy"
            className="text-[13px] text-[#777] dark:text-[#888] hover:text-[#0F0F0F] dark:hover:text-white transition-colors duration-200"
          >
            View Privacy Policy →
          </a>
        </div>
      </div>
    </main>
  );
}
