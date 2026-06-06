"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-5xl mx-auto">

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
        <div className="mb-12 border-b border-[#E8E8E8] dark:border-[#2A2A2A] pb-8">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#0F0F0F] dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#888] dark:text-[#666]">
            Last Updated: May 2026 • Effective Immediately
          </p>
        </div>

        {/* Two Column Legal Layout */}
        <div className="grid md:grid-cols-4 gap-10 items-start">
          
          {/* Quick Links Table Header */}
          <aside className="hidden md:block sticky top-6 space-y-3 text-sm text-[#666] dark:text-[#888] border-l border-[#E8E8E8] dark:border-[#2A2A2A] pl-4">
            <div className="font-semibold text-xs text-[#8B7340] uppercase tracking-wider mb-2">Sections</div>
            <a href="#data-collection" className="block hover:text-[#0F0F0F] dark:hover:text-white transition-colors">1. Data Collection</a>
            <a href="#processing" className="block hover:text-[#0F0F0F] dark:hover:text-white transition-colors">2. Core Processing</a>
            <a href="#storage" className="block hover:text-[#0F0F0F] dark:hover:text-white transition-colors">3. Local Storage</a>
            <a href="#security" className="block hover:text-[#0F0F0F] dark:hover:text-white transition-colors">4. Security Measures</a>
          </aside>

          {/* Core Text Body Column */}
          <div className="md:col-span-3 space-y-10 text-[#333] dark:text-[#C0C0C0] text-[15px] leading-7">
            
            <section id="data-collection" className="space-y-3">
              <h2 className="text-xl font-semibold text-[#0F0F0F] dark:text-white tracking-tight">
                1. Data Collection & Scope
              </h2>
              <p>
                Finveda fundamentally values user privacy. We do not sell, trade, or monetize your personalized financial tracking profiles. When utilizing our baseline open interactive calculators (e.g., SIP, EMI modules), calculations are handled statelessly within your immediate runtime workspace browser memory context.
              </p>
            </section>

            <section id="processing" className="space-y-3">
              <h2 className="text-xl font-semibold text-[#0F0F0F] dark:text-white tracking-tight">
                2. Core Processing Information
              </h2>
              <p>
                For users who deliberately establish a premium account synchronization tier, we securely record primary metadata metrics including email address credentials, specified destination financial parameters, and target goal allocations strictly to offer functional analytics updates.
              </p>
            </section>

            <section id="storage" className="space-y-3">
              <h2 className="text-xl font-semibold text-[#0F0F0F] dark:text-white tracking-tight">
                3. Local Browser Storage Ecosystem
              </h2>
              <p>
                We leverage localized browser data caches or cookies specifically to preserve selected configuration toggles (such as dark mode alignment indices or unsaved structural simulation histories) across persistent operating system reload phases.
              </p>
            </section>

            <section id="security" className="space-y-3">
              <h2 className="text-xl font-semibold text-[#0F0F0F] dark:text-white tracking-tight">
                4. Data Security Protocols
              </h2>
              <p>
                All data transmitted through our web services utilizes modern Transport Layer Security (TLS) standard encryptions. While no system is absolutely bulletproof, we work hard to keep unauthorized external exploits from penetrating our cloud interfaces.
              </p>
            </section>

          </div>
        </div>

      </div>
    </main>
  );
}