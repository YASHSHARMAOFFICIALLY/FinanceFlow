import ExportPDFButton from "@/components/dashboard/ExportPDFButton";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardHero from "@/components/dashboard/DashboardHero"
import FinancialHealthCard from "@/components/dashboard/FinancialHealthCard";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import GoalProgress from "@/components/dashboard/GoalProgress";
// import ToolsPage from "@/components/tools/tools-page";
import LearningProgress from "@/components/dashboard/Learningprogress";
import QuickTools from "@/components/dashboard/Quiztools";
import RecentActivity from "@/components/dashboard/QuizActivity";
import { auth } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import type { DashboardData } from "@/lib/dashboard-data";
import { ThemeToggle } from "@/components/theme-toggle";
import SidebarAccountItems from "@/components/dashboard/SidebarAccountItems";




export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  }).catch(() => null);

  // TEMP: bypass auth for local preview
  const mockUser = { id: null, name: "Preview User", email: "preview@test.com" };
  const dashboard: DashboardData = await getDashboardData(session?.user ?? mockUser);
  const mainNavItems = [
    { label: "Dashboard", icon: "◉", href: "/dashboard", active: true },
    { label: "Portfolio", icon: "📈", href: "/dashboard#portfolio" },
    { label: "Goals", icon: "🎯", href: "/dashboard#goals" },
    { label: "Tools", icon: "🔧", href: "/tools" },
    { label: "Learn", icon: "📚", href: "/learn" },
    { label: "Quiz", icon: "🧠", href: "/Quiz" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[radial-gradient(circle_at_top,_#18222b_0%,_#0b1014_42%,_#070b0e_100%)]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-60 bg-white/96 dark:bg-[#0d151b]/92 border-r border-[#EBEBEB] dark:border-[#24343e] backdrop-blur-xl z-40 flex flex-col hidden lg:flex">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[#EBEBEB] dark:border-[#22313a]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] dark:bg-[#f3efe3] flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7" cy="11" r="1.2" fill="#C9A84C" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F] dark:text-white">
              FinanceFlow
            </span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="text-[10.5px] font-bold text-[#BBB] dark:text-[#6c8593] uppercase tracking-[0.1em] px-3 mb-2">
            Main
          </div>
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium mb-0.5 transition-all duration-150 ${
                item.active
                  ? "bg-[#0F0F0F] text-white dark:bg-[#f3efe3] dark:text-[#091116] shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                  : "text-[#555] dark:text-[#a8b7c1] hover:bg-[#F5F5F3] dark:hover:bg-[#162129] hover:text-[#0F0F0F] dark:hover:text-[#f4f7f8]"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="text-[10.5px] font-bold text-[#BBB] dark:text-[#6c8593] uppercase tracking-[0.1em] px-3 mb-2 mt-5">
            Account
          </div>
          <SidebarAccountItems />
        </nav>

        {/* User profile */}
        <div className="px-3 py-4 border-t border-[#EBEBEB] dark:border-[#22313a]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F5F3] dark:hover:bg-[#162129] cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#0F0F0F] dark:bg-[#142028] flex items-center justify-center text-[13px] font-bold text-[#C9A84C] flex-shrink-0 border border-transparent dark:border-[#28414f]">
              {dashboard.user.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em] truncate">
                {dashboard.user.fullName}
              </div>
              <div className="text-[11.5px] text-[#888] dark:text-[#7e97a6] truncate">{dashboard.user.plan}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 4L8 7L5 10" stroke="#BBB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </aside>

      {/* Mobile top nav */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white/96 dark:bg-[#0d151b]/92 border-b border-[#EBEBEB] dark:border-[#24343e] backdrop-blur-xl flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] dark:bg-[#f3efe3] flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="11" r="1.2" fill="#C9A84C" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F] dark:text-white">FinanceFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-[#0F0F0F] dark:bg-[#142028] flex items-center justify-center text-[13px] font-bold text-[#C9A84C] border border-transparent dark:border-[#28414f]">
            {dashboard.user.initial}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
          <div className="hidden lg:flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <div id="dashboard-report">
          {/* Hero */}
          <DashboardHero
            userName={dashboard.user.firstName}
            initial={dashboard.user.initial}
            quickStats={dashboard.hero.quickStats}
            selectedPeriod={dashboard.hero.selectedPeriod}
            dataSource={dashboard.hero.dataSource}
            dataStatusLabel={dashboard.hero.dataStatusLabel}
            insight={dashboard.hero.insight}
            currentValue={dashboard.portfolio.currentValue}
          />
          <div className="flex justify-end mt-6">
            <ExportPDFButton />
            </div>
          {/* Row 1: Health Card + Portfolio Chart */}
          <div id="portfolio" className="grid grid-cols-1  lg:grid-cols-[500px_1fr] gap-10 mt-6 scroll-mt-20">
            <FinancialHealthCard health={dashboard.financialHealth} />
            <PortfolioChart portfolio={dashboard.portfolio} />
          </div>

          {/* Row 2: Goals + Learning */}
          <div id="goals" className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 scroll-mt-20">
            <GoalProgress goals={dashboard.goals} />
            <LearningProgress learning={dashboard.learning} />
          </div>

          {/* Row 3: Quick Tools + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 mt-5 pb-10">
            <RecentActivity activities={dashboard.activities} />
            <QuickTools tools={dashboard.tools} />
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
