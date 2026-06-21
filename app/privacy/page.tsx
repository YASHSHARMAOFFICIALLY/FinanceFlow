export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#111] dark:text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-14 border-b border-[#ECECEC] dark:border-[#1E1E1E] pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>

          <p className="text-sm text-[#666] dark:text-[#888]">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mt-6 text-[15px] leading-8 text-[#555] dark:text-[#AAA] max-w-3xl">
            This Privacy Policy explains how Finveda (“we”, “our”, or “us”)
            collects, uses, stores, and protects your information when you use
            our website, applications, tools, calculators, and related services.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-14 text-[15px] leading-8 text-[#444] dark:text-[#AAA]">
          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              1. Information We Collect
            </h2>

            <p>
              We may collect information you provide directly to us as well as
              information automatically collected while using our platform.
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="font-semibold text-[#111] dark:text-white mb-2">
                  Personal Information
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Profile details</li>
                  <li>Authentication credentials</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#111] dark:text-white mb-2">
                  Financial & Usage Information
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Budget entries and expense tracking data</li>
                  <li>Investment preferences and SIP calculations</li>
                  <li>Net worth tracking inputs</li>
                  <li>Financial goals and savings information</li>
                  <li>Feature interactions and activity logs</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#111] dark:text-white mb-2">
                  Device & Technical Information
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Device identifiers</li>
                  <li>Analytics and performance data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              2. How We Use Your Information
            </h2>

            <p>
              We use collected information to operate, improve, and personalize
              our services.
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-2">
              <li>Provide and maintain the platform</li>
              <li>Personalize your finance dashboard and insights</li>
              <li>Improve calculators and tracking tools</li>
              <li>Monitor application performance and stability</li>
              <li>Prevent fraud, abuse, and unauthorized access</li>
              <li>Respond to support requests and inquiries</li>
              <li>Send service-related updates and notifications</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              3. Cookies & Tracking Technologies
            </h2>

            <p>
              We may use cookies, local storage, and similar technologies to
              enhance your experience and analyze usage patterns.
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-2">
              <li>Remember user preferences and sessions</li>
              <li>Understand feature usage and engagement</li>
              <li>Improve application performance</li>
              <li>Provide secure authentication</li>
            </ul>

            <p className="mt-5">
              You can manage cookie settings through your browser preferences.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              4. Data Sharing & Third Parties
            </h2>

            <p>
              We do not sell your personal data. However, we may share
              information with trusted third-party service providers that help
              us operate our platform.
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-2">
              <li>Cloud hosting providers</li>
              <li>Analytics platforms</li>
              <li>Authentication services</li>
              <li>Customer support tools</li>
              <li>Payment processors (if applicable)</li>
            </ul>

            <p className="mt-5">
              These providers are only given access to information necessary to
              perform their services and are obligated to protect your data.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              5. Data Retention
            </h2>

            <p>
              We retain your information only for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce agreements.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              6. Data Security
            </h2>

            <p>
              We implement industry-standard safeguards designed to protect your
              information against unauthorized access, alteration, disclosure,
              or destruction.
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-2">
              <li>Encrypted connections (HTTPS)</li>
              <li>Secure authentication systems</li>
              <li>Restricted internal access</li>
              <li>Regular monitoring and maintenance</li>
            </ul>

            <p className="mt-5">
              However, no digital platform can guarantee absolute security.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              7. Your Rights & Choices
            </h2>

            <p>
              Depending on your location and applicable laws, you may have
              rights regarding your personal information.
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent where applicable</li>
              <li>Export your data</li>
              <li>Opt out of certain communications</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              8. Children’s Privacy
            </h2>

            <p>
              Finveda is not intended for children under the age of 13. We do
              not knowingly collect personal information from children.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              9. International Data Transfers
            </h2>

            <p>
              Your information may be stored and processed in countries outside
              your jurisdiction where data protection laws may differ from your
              local laws.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              10. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy periodically. Changes will be
              reflected on this page along with the updated revision date.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#111] dark:text-white mb-4">
              11. Contact Us
            </h2>

            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy or your data, please contact us:
            </p>

            <div className="mt-5 rounded-2xl border border-[#ECECEC] dark:border-[#1E1E1E] p-5 bg-[#FAFAFA] dark:bg-[#111]">
              <p className="font-medium text-[#111] dark:text-white">
                Finveda Support
              </p>

              <p className="mt-2">support@finveda.com</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
