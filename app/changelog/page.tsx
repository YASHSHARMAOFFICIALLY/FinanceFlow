"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const updates = [
  {
    version: "v2.1",
    date: "May 2026",
    changes: [
      "Added Financial Goal Tracker",
      "Improved dark mode experience",
      "Enhanced tools page animations",
    ],
  },
  {
    version: "v2.0",
    date: "April 2026",
    changes: [
      "Launched finance learning section",
      "Added blog article pages",
      "Improved mobile responsiveness",
    ],
  },
  {
    version: "v1.0",
    date: "March 2026",
    changes: [
      "Initial launch of Finveda",
      "Added SIP & EMI calculators",
      "Created stock market tool",
    ],
  },
];

export default function ChangelogPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-4xl mx-auto">

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
        <div className="mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] mb-5">
            Changelog
          </span>

          <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#0F0F0F] dark:text-white mb-6">
            Product Updates
          </h1>

          <p className="text-[#666] dark:text-[#A0A0A0] text-[17px] leading-8 max-w-2xl">
            Track the latest improvements, features, and updates
            added to the Finveda platform.
          </p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {updates.map((update) => (
            <div
              key={update.version}
              className="p-8 rounded-3xl bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A]"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white">
                  {update.version}
                </h2>

                <span className="text-sm text-[#888] dark:text-[#777]">
                  {update.date}
                </span>
              </div>

              <ul className="space-y-3 text-[#666] dark:text-[#A0A0A0]">
                {update.changes.map((change) => (
                  <li key={change}>• {change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}