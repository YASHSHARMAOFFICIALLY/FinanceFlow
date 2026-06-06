"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const openings = [
  {
    title: "Frontend Engineer (Next.js / Tailwind)",
    team: "Engineering",
    type: "Full-time",
    location: "Remote (India)",
    link: "mailto:careers@finveda.com?subject=Application: Frontend Engineer"
  },
  {
    title: "Financial Content Researcher",
    team: "Education",
    type: "Part-time / Contract",
    location: "Remote",
    link: "mailto:careers@finveda.com?subject=Application: Financial Content Researcher"
  },
  {
    title: "UI/UX Product Designer",
    team: "Design",
    type: "Full-time",
    location: "Remote",
    link: "mailto:careers@finveda.com?subject=Application: UI/UX Product Designer"
  }
];

export default function CareersPage() {
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

        {/* Hero Segment */}
        <div className="mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] mb-5">
            Careers
          </span>
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#0F0F0F] dark:text-white mb-6">
            Build the future of financial clarity.
          </h1>
          <p className="text-[#666] dark:text-[#A0A0A0] text-[18px] leading-8 max-w-2xl">
            We are looking for self-driven builders who care about visual craft, simple engineering systems, and making complex financial knowledge open to everyone.
          </p>
        </div>

        {/* Open Openings List Layout */}
        <div className="space-y-4 mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-[#888] dark:text-[#666] uppercase mb-6">
            Current Open Roles ({openings.length})
          </h2>

          {openings.map((role, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-[#8B7340] dark:hover:border-[#8B7340] transition-colors"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#0F0F0F] dark:text-white">
                  {role.title}
                </h3>
                
                {/* Meta Badges Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FAFAF8] dark:bg-black border border-[#E8E8E8] dark:border-[#2A2A2A] text-[#666] dark:text-[#A0A0A0]">
                    {role.team}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FAFAF8] dark:bg-black border border-[#E8E8E8] dark:border-[#2A2A2A] text-[#666] dark:text-[#A0A0A0]">
                    {role.type}
                  </span>
                  <span className="text-[#888] dark:text-[#666] ml-1">
                    {role.location}
                  </span>
                </div>
              </div>

              <a 
                href={role.link}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0F0F0F] dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition self-start md:self-auto"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>

        {/* Speculative Application Info Footer */}
        <div className="text-center py-6 border-t border-[#E8E8E8] dark:border-[#2A2A2A]">
          <p className="text-sm text-[#666] dark:text-[#888]">
            Don't see your specific framework listed? Drop us a line at{" "}
            <a href="mailto:careers@finveda.com" className="text-[#8B7340] underline hover:opacity-80">
              careers@finveda.com
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}