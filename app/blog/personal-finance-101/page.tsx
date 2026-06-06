import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function PersonalFinancePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <Link
            href="/learn#blogs"
            className="inline-flex items-center gap-2 text-[14px] text-[#555] dark:text-[#aaa] hover:text-black dark:hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Back
          </Link>

          <ThemeToggle />
        </div>

        {/* Article Header */}
        <div className="mb-10">

          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] mb-5">
            Finance Basics
          </span>

          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-[#0F0F0F] dark:text-white leading-tight mb-6">
            Personal Finance 101
          </h1>

          <div className="flex items-center gap-3 text-[13px] text-[#999] dark:text-[#666] mb-6">
            <span>Jan 14, 2025</span>

            <span className="w-1 h-1 rounded-full bg-[#DDD] dark:bg-[#444]" />

            <span>8 min read</span>
          </div>

          <p className="text-[16px] leading-8 text-[#666] dark:text-[#A0A0A0] max-w-3xl">
            Learn the fundamentals of budgeting, saving, investing,
            and managing money wisely to build long-term financial stability.
          </p>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden border border-[#E8E8E8] dark:border-[#2A2A2A] mb-14">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400&auto=format&fit=crop"
            alt="Personal Finance"
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl">

          <div className="space-y-8 text-[16px] leading-8 text-[#555] dark:text-[#B0B0B0]">

            <p>
              Personal finance is the process of planning and managing
              your money effectively. It includes budgeting, saving,
              investing, insurance, taxes, and retirement planning.
            </p>

            <p>
              A strong financial foundation helps reduce stress and
              prepares you for emergencies while allowing you to
              achieve future financial goals.
            </p>

            <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white pt-6">
              The 50/30/20 Rule
            </h2>

            <p>
              One of the simplest budgeting strategies is the
              50/30/20 rule:
            </p>

            <ul className="space-y-3 pl-5">
              <li>• 50% for needs</li>
              <li>• 30% for wants</li>
              <li>• 20% for savings and investments</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white pt-6">
              Why Emergency Funds Matter
            </h2>

            <p>
              Emergency savings protect you from unexpected
              situations like medical expenses or job loss.
              Experts recommend saving at least 3–6 months of expenses.
            </p>

            <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white pt-6">
              Start Investing Early
            </h2>

            <p>
              Investing early allows your money to benefit from
              compounding over time. Even small consistent investments
              can grow significantly in the long run.
            </p>

          </div>
        </article>
      </div>
    </main>
  );
}