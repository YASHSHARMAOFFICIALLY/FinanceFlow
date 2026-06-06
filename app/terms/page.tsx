"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4 mb-16 flex-wrap">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[14px] text-[#555] dark:text-[#aaa] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <ThemeToggle />
        </div>

        {/* Header Block */}
        <div className="mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] mb-5">
            Legal Terms
          </span>
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#0F0F0F] dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-[#888] dark:text-[#666]">
            Effective Date: March 1, 2026 • Please read carefully
          </p>
        </div>

        {/* Asymmetric Block Layout System */}
        <div className="space-y-12">
          
          <div className="grid md:grid-cols-3 gap-4 items-start border-t border-[#E8E8E8] dark:border-[#2A2A2A] pt-8">
            <h2 className="text-lg font-bold text-[#0F0F0F] dark:text-white md:col-span-1">
              1. Platform Nature
            </h2>
            <div className="text-[#666] dark:text-[#A0A0A0] text-[15px] leading-7 md:col-span-2 space-y-3">
              <p>
                Finveda functions strictly as a self-directed digital educational environment and modeling framework utility.
              </p>
              <div className="p-4 rounded-xl bg-[#F5F1E8]/30 border border-[#E8DFC0] text-[#8B7340] text-sm leading-6 font-medium">
                Disclaimer: Finveda does not employ certified investment brokers. None of our analytics charts, blog logs, or calculator outputs constitute binding, formal financial advice.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-start border-t border-[#E8E8E8] dark:border-[#2A2A2A] pt-8">
            <h2 className="text-lg font-bold text-[#0F0F0F] dark:text-white md:col-span-1">
              2. User Obligations
            </h2>
            <p className="text-[#666] dark:text-[#A0A0A0] text-[15px] leading-7 md:col-span-2">
              By using our software, you agree not to scraping script runtimes against platform engines, launch automated payload injections, or leverage security holes to disrupt our servers or runtime application streams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-start border-t border-[#E8E8E8] dark:border-[#2A2A2A] pt-8">
            <h2 className="text-lg font-bold text-[#0F0F0F] dark:text-white md:col-span-1">
              3. Limits of Liability
            </h2>
            <p className="text-[#666] dark:text-[#A0A0A0] text-[15px] leading-7 md:col-span-2">
              Finveda provides all components strictly on an "as-is" structural configuration layout baseline. We reject all liabilities regarding unexpected investment losses or software configuration downtime calculation deviations.
            </p>
          </div>

        </div>

        {/* Legal Inquiries Contact Footer */}
        <div className="mt-20 py-8 border-t border-[#E8E8E8] dark:border-[#2A2A2A] text-center text-xs text-[#888]">
          Have compliance queries? Direct formal requests straight to our legal desk:{" "}
          <a href="mailto:legal@finveda.com" className="text-[#8B7340] hover:underline">
            legal@finveda.com
          </a>
        </div>

      </div>
    </main>
  );
}