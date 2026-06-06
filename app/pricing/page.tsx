"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PricingPage() {
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
        <div className="text-center mb-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] mb-5">
            Pricing
          </span>

          <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#0F0F0F] dark:text-white mb-6">
            Simple Pricing
          </h1>

          <p className="text-[#666] dark:text-[#A0A0A0] text-[17px] max-w-2xl mx-auto leading-8">
            Start free and access powerful finance tools,
            educational resources, and financial planning features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Free Plan */}
          <div className="rounded-3xl p-10 bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-[#0F0F0F] dark:text-white mb-2">
                Free
              </h2>

              <div className="text-5xl font-bold mb-6 text-[#0F0F0F] dark:text-white">
                ₹0
              </div>

              <ul className="space-y-4 text-[#666] dark:text-[#A0A0A0] mb-10">
                <li>• Access all calculators</li>
                <li>• Read finance blogs</li>
                <li>• Goal tracking</li>
                <li>• Basic financial planning</li>
              </ul>
            </div>

            <Link 
              href="/signup" 
              className="block w-full py-3 text-center rounded-xl bg-[#0F0F0F] dark:bg-white text-white dark:text-black font-medium hover:opacity-90 dark:hover:bg-[#F3F3F3] transition"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl p-10 bg-[#0F0F0F] text-white border border-[#0F0F0F] relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 flex flex-col justify-between">
            <div className="absolute top-5 right-5 text-[11px] bg-[#C9A84C] text-black px-3 py-1 rounded-full font-medium">
              Popular
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-2">
                Pro
              </h2>

              <div className="text-5xl font-bold mb-6">
                ₹299
                <span className="text-lg font-medium text-white/60">
                  /month
                </span>
              </div>

              <ul className="space-y-4 text-white/70 mb-10">
                <li>• Advanced analytics</li>
                <li>• AI finance insights</li>
                <li>• Smart budgeting suggestions</li>
                <li>• Portfolio tracking</li>
                <li>• Priority support</li>
              </ul>
            </div>

            <button className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-[#F3F3F3] transition">
              Upgrade Now
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}