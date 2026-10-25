'use client'
import { useRef } from "react";
import Link from "next/link";

const testimonials = [
  {
    quote:
      "FinanceFlow finally made investing understandable for me. The daily quizzes turned finance from something intimidating into something I actually look forward to.",
    name: "Priya Menon",
    role: "Software Engineer, 26",
    avatar: "PM",
    avatarBg: "#F5F1E8",
    avatarColor: "#8B7340",
    stars: 5,
  },
  {
    quote:
      "I've been tracking my SIPs manually in Excel for two years. The SIP tracker here just does everything automatically — with actual beautiful charts. I can't go back.",
    name: "Rohan Sharma",
    role: "Product Manager, 29",
    avatar: "RS",
    avatarBg: "#F0F5FF",
    avatarColor: "#4A6FA5",
    stars: 5,
  },
  {
    quote:
      "The Financial Health Score was a wake-up call. I thought I was doing fine — turns out my emergency fund was lacking. Fixing it was easy with the actionable steps provided.",
    name: "Anjali Iyer",
    role: "Graphic Designer, 24",
    avatar: "AI",
    avatarBg: "#F0FBF4",
    avatarColor: "#3A7A5A",
    stars: 5,
  },
  {
    quote:
      "The quiz streaks keep me coming back every day. I've learned more about mutual funds in 3 weeks than I did in 3 years of random Googling.",
    name: "Karan Bhatia",
    role: "Startup Founder, 31",
    avatar: "KB",
    avatarBg: "#FFF0F0",
    avatarColor: "#A54A4A",
    stars: 5,
  },
  {
    quote:
      "Super clean UI, actually useful insights. Most finance apps feel like they're built for CAs — this one finally feels like it's built for me.",
    name: "Sneha Pillai",
    role: "UX Designer, 27",
    avatar: "SP",
    avatarBg: "#F3F0FB",
    avatarColor: "#6A4FA5",
    stars: 5,
  },
  {
    quote:
      "I hit my first ₹1L SIP milestone last month. The goal tracker made it feel like a game. Genuinely motivating in a way no other app has been.",
    name: "Dev Malhotra",
    role: "Data Analyst, 25",
    avatar: "DM",
    avatarBg: "#F0F9FF",
    avatarColor: "#2A7AA5",
    stars: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M6.5 1L7.89 4.82L12 5.27L9 8.16L9.85 12.24L6.5 10.23L3.15 12.24L4 8.16L1 5.27L5.11 4.82L6.5 1Z"
            fill="#C9A84C"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="w-[340px] flex-shrink-0 p-6 rounded-2xl border border-[#E8E8E8] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-200">
      <StarRating count={t.stars} />
      <blockquote className="text-[14.5px] leading-relaxed text-[#333] dark:text-[#ccc] tracking-[-0.01em] mb-5">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0"
          style={{ background: t.avatarBg, color: t.avatarColor }}
        >
          {t.avatar}
        </div>

        <div>
          <div className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">
            {t.name}
          </div>
          <div className="text-[12px] text-[#888] dark:text-[#777]">
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

const track = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F3] dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] mb-5">
          <span className="text-[12px] text-[#666] dark:text-[#aaa] font-medium tracking-wide">
            Testimonials
          </span>
        </div>

        <h2
          className="text-[38px] font-semibold tracking-[-0.03em] text-[#0F0F0F] dark:text-white max-w-lg mx-auto leading-tight"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Trusted by people building better finances
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="relative w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]"
          style={{
            animation: "marquee 32s linear infinite",
          }}
        >
          {track.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Social proof + CTA */}
      <div className="mt-12 px-6 flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-8 text-[13px] text-[#888] dark:text-[#777]">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["#F5F1E8", "#F0F5FF", "#F0FBF4", "#F8F0FF"].map((bg, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0A0A0A]"
                  style={{ background: bg }}
                />
              ))}
            </div>
            <span>10,000+ learners</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-[#DDD] dark:bg-[#444]" />

          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M6.5 1L7.89 4.82L12 5.27L9 8.16L9.85 12.24L6.5 10.23L3.15 12.24L4 8.16L1 5.27L5.11 4.82L6.5 1Z"
                fill="#C9A84C"
              />
            </svg>
            <span>4.9 / 5 average rating</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-[#DDD] dark:bg-[#444]" />
          <span>Free forever plan available</span>
        </div>

        {/* CTA BUTTON */}
        <Link href="/review">
          <button
            className="px-6 py-2.5 rounded-full text-[13px] font-medium 
            border border-[#E8E8E8] dark:border-[#2a2a2a]
            bg-white dark:bg-[#1a1a1a]
            text-[#0F0F0F] dark:text-white
            hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] 
            dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]
            transition-all duration-200 hover:-translate-y-0.5"
          >
            Share Your Experience
          </button>
        </Link>
      </div>
    </section>
  );
}