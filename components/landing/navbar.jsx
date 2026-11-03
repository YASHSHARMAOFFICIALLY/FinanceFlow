'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/learn", label: "Learn" },
  { href: "/quiz", label: "Quiz" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-[#0F0F0F]/95 backdrop-blur-md shadow-[0_1px_0_0_#e5e5e5] dark:shadow-[0_1px_0_0_#222]" : "bg-white dark:bg-[#0F0F0F]"
      }`}
      style={{ height: 64 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] dark:bg-white flex items-center justify-center">
            <svg suppressHydrationWarning width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path suppressHydrationWarning d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle suppressHydrationWarning cx="7" cy="11" r="1.2" fill="#C9A84C"/>
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F] dark:text-white">FinanceFLow</span>
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-[#555] dark:text-[#aaa] hover:text-[#0F0F0F] dark:hover:text-white transition-colors duration-200 tracking-[-0.01em]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/signin"
            className="hidden sm:block text-[13.5px] px-4 py-2 rounded-lg border border-[#E0E0E0] dark:border-[#333] text-[#333] dark:text-[#ccc] hover:border-[#0F0F0F] dark:hover:border-white hover:text-[#0F0F0F] dark:hover:text-white transition-all duration-200 tracking-[-0.01em]"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-[13.5px] px-4 py-2 rounded-lg bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] hover:bg-[#2a2a2a] dark:hover:bg-[#e0e0e0] transition-all duration-200 tracking-[-0.01em] shadow-sm"
          >
            Create Account
          </Link>
        </div>
      </div>
    </nav>
  );
}
