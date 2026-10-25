'use client'
import { useEffect, useRef } from "react";

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const tools = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 15L9.5 9L12 13L14 11L16 15" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    name: "SIP Calculator",
    desc: "Project your mutual fund returns over any time horizon with monthly SIP planning.",
    tag: "Investing",
    link: "/tools#sip-calc",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M11 7V11L14 13" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    name: "Compound Interest",
    desc: "See the real power of compounding on your savings and fixed deposits.",
    tag: "Savings",
    

  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6H18M4 11H13M4 16H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M16 14V19M13.5 16.5H18.5" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    name: "Budget Planner",
    desc: "Allocate income across needs, wants, and savings using the 50/30/20 rule.",
    tag: "Budgeting",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 18L4 12M8 18L8 8M12 18L12 10M16 18L16 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="16" cy="4" r="1.5" fill="#C9A84C"/>
      </svg>
    ),
    name: "Stock Market Calculator",
    desc: "Measure investment performance with quick and accurate market calculations.",
    tag: "Planning",
    link: "tools#stock-tool"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11H10L12 7L14 15L16 11H18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="1.2" fill="#C9A84C"/>
      </svg>
    ),
    name: "EMI Calculator",
    desc: "Understand your loan repayment schedule and total interest paid on any loan.",
    tag: "Debt",
    link: "/tools#emi-calc"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="7" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 7V6C7 4.895 7.895 4 9 4H13C14.105 4 15 4.895 15 6V7" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 12H14M11 10V14" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    name: "Goal Planner",
    desc: "Plan for your financial goals — home, car, vacation — with a clear savings roadmap.",
    tag: "Goals",
    link : "/tools#goal-tracker"
  },
];

const tagColors = {
  Investing: "bg-[#F5F1E8] dark:bg-[#2a2518] text-[#8B7340] dark:text-[#C9A84C] border-[#E8DFC0] dark:border-[#4a3f28]",
  Savings: "bg-[#F0F5FF] dark:bg-[#1a2233] text-[#4A6FA5] dark:text-[#7AAFEF] border-[#D0E0FF] dark:border-[#2a3a55]",
  Budgeting: "bg-[#F0FBF4] dark:bg-[#1a2b1f] text-[#3A7A5A] dark:text-[#6ABF8A] border-[#C0E8D0] dark:border-[#2a4a35]",
  Planning: "bg-[#F8F0FF] dark:bg-[#251a33] text-[#7A4AA0] dark:text-[#B07ADF] border-[#E0C8F8] dark:border-[#3a2a55]",
  Debt: "bg-[#FFF0F0] dark:bg-[#2b1a1a] text-[#A04A4A] dark:text-[#DF7A7A] border-[#F8C8C8] dark:border-[#4a2a2a]",
  Goals: "bg-[#F5F5F3] dark:bg-[#1a1a1a] text-[#555] dark:text-[#aaa] border-[#E0E0E0] dark:border-[#2a2a2a]",
};

function ToolCard({ tool, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group p-6 rounded-2xl border border-[#E8E8E8] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:border-[#D0D0D0] dark:hover:border-[#444] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-200 cursor-pointer text-[#0F0F0F] dark:text-white"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#F8F8F6] dark:bg-[#222] border border-[#F0F0F0] dark:border-[#333] flex items-center justify-center group-hover:bg-[#F5F1E8] dark:group-hover:bg-[#2a2518] transition-colors duration-200">
          {tool.icon}
        </div>
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${tagColors[tool.tag]}`}>
          {tool.tag}
        </span>
      </div>
      <h3 className="text-[15px] font-semibold tracking-[-0.02em] mb-2">{tool.name}</h3>
      <p className="text-[13.5px] leading-relaxed text-[#777] dark:text-[#888] tracking-[-0.01em]">{tool.desc}</p>
      <div className="mt-5 flex items-center gap-1 text-[12.5px] font-medium text-[#888] dark:text-[#777] group-hover:text-[#0F0F0F] dark:group-hover:text-white transition-colors duration-200">
        <a href = {tool.link}>Open tool</a>
        <svg  width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
          <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default function FinanceTools() {
  const headerRef = useScrollReveal();

  return (
    <section className="py-24 px-6 bg-[#FAFAF8] dark:bg-[#111]">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] mb-5">
              <span className="text-[12px] text-[#666] dark:text-[#aaa] font-medium tracking-wide">Finance Tools</span>
            </div>
            <h2
              className="text-[38px] font-semibold tracking-[-0.03em] text-[#0F0F0F] dark:text-white leading-tight max-w-sm"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Powerful calculators at your fingertips
            </h2>
          </div>
          <p className="text-[15px] text-[#666] dark:text-[#aaa] max-w-xs leading-relaxed tracking-[-0.01em] md:text-right">
            All the financial tools you need — free, fast, and built for clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
