"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function OverviewPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[14px] text-[#555] dark:text-[#aaa] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>

          <ThemeToggle />
        </div>

        {/* Heading */}
        <div className="mb-20 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] mb-5">
            Platform Overview
          </span>

          <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#0F0F0F] dark:text-white mb-6">
            Smart Finance Tools For Everyone
          </h1>

          <p className="max-w-3xl mx-auto text-[17px] leading-8 text-[#666] dark:text-[#A0A0A0]">
            Finveda helps users understand personal finance,
            track goals, calculate investments, and improve
            financial literacy through beautifully designed tools.
          </p>
        </div>

        {/* Overview Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-8 rounded-3xl bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A]">
            <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white mb-4">
              Financial Tools
            </h2>
            <p className="text-[#666] dark:text-[#A0A0A0] leading-7">
              Access SIP calculators, EMI planners, stock tools,
              budgeting systems, and wealth tracking features.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A]">
            <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white mb-4">
              Learn Finance
            </h2>
            <p className="text-[#666] dark:text-[#A0A0A0] leading-7">
              Read beginner-friendly articles covering budgeting,
              investing, taxes, and wealth-building concepts.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A]">
            <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white mb-4">
              Goal Tracking
            </h2>
            <p className="text-[#666] dark:text-[#A0A0A0] leading-7">
              Track financial goals and visualize your progress
              toward savings milestones and investments.
            </p>
          </div>

        </div>

        {/* Explore Button */}
        <div className="mt-20 text-center">
          <Link
            href="/tools#tools-grid"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-[#0F0F0F] dark:bg-white text-white dark:text-black font-medium hover:opacity-90 dark:hover:bg-[#F3F3F3] transition"
          >
            Explore Tools
          </Link>
        </div>

      </div>
    </main>
  );
}