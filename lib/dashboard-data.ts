import { db } from "@/lib/db";
import type { QuickStat } from "@/types/dashboard";

type SessionUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
};

const globalForDashboardSeed = globalThis as typeof globalThis & {
  dashboardSeededUsers?: Set<string>;
};

function getSeededUserCache() {
  if (!globalForDashboardSeed.dashboardSeededUsers) {
    globalForDashboardSeed.dashboardSeededUsers = new Set<string>();
  }

  return globalForDashboardSeed.dashboardSeededUsers;
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function formatCurrency(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatCompactCurrency(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  return formatCurrency(value);
}

function shiftDate(baseDate: Date, days: number) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date;
}

function monthLabel(date: Date) {
  return date.toLocaleDateString("en-IN", { month: "short" });
}

function longDateLabel(date: Date) {
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

function relativeDayLabel(date: Date, now: Date) {
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (startOfNow.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

function goalDeadline(date: Date) {
  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

function buildSeedData(user: SessionUser) {
  const now = new Date();
  const identity = user.email || user.name || "finveda-demo";
  const seed = hashString(identity);
  const basePortfolio = 180000 + (seed % 90000);
  const monthlyContribution = 4000 + (seed % 5) * 1000;
  const activeSips = 2 + (seed % 4);
  const streak = 5 + (seed % 11);
  const totalInvested = Math.round(basePortfolio * 0.88);

  const portfolioSeries = {
    "1M": Array.from({ length: 6 }, (_, index) => {
      const pointDate = shiftDate(now, -(35 - index * 7));
      const invested = totalInvested - 18000 + index * 3200;
      const value = invested + 5000 + (seed % 3000) + index * 1800 - (index === 2 ? 2800 : 0);
      return { date: longDateLabel(pointDate), recordedAt: pointDate, invested, value };
    }),
    "3M": Array.from({ length: 4 }, (_, index) => {
      const pointDate = new Date(now.getFullYear(), now.getMonth() - (3 - index), 1);
      const invested = totalInvested - 36000 + index * 9000;
      const value = invested + 9000 + (seed % 4500) + index * 4200;
      return { date: monthLabel(pointDate), recordedAt: pointDate, invested, value };
    }),
    "6M": Array.from({ length: 6 }, (_, index) => {
      const pointDate = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const invested = totalInvested - 54000 + index * 10500;
      const value = invested + 11000 + (seed % 5000) + index * 4500;
      return { date: monthLabel(pointDate), recordedAt: pointDate, invested, value };
    }),
    "1Y": Array.from({ length: 6 }, (_, index) => {
      const pointDate = new Date(now.getFullYear(), now.getMonth() - (10 - index * 2), 1);
      const invested = totalInvested - 90000 + index * 17000;
      const value = invested + 13000 + (seed % 6000) + index * 7000;
      return { date: monthLabel(pointDate), recordedAt: pointDate, invested, value };
    }),
    All: [
      {
        date: `${now.getFullYear() - 2}`,
        recordedAt: new Date(now.getFullYear() - 2, 0, 1),
        invested: totalInvested * 0.28,
        value: totalInvested * 0.32,
      },
      {
        date: `${now.getFullYear() - 1} H1`,
        recordedAt: new Date(now.getFullYear() - 1, 5, 1),
        invested: totalInvested * 0.45,
        value: totalInvested * 0.52,
      },
      {
        date: `${now.getFullYear() - 1} H2`,
        recordedAt: new Date(now.getFullYear() - 1, 11, 1),
        invested: totalInvested * 0.62,
        value: totalInvested * 0.74,
      },
      {
        date: `${now.getFullYear()} Q1`,
        recordedAt: new Date(now.getFullYear(), 2, 31),
        invested: totalInvested * 0.82,
        value: totalInvested * 0.94,
      },
      {
        date: `${now.getFullYear()} Q2`,
        recordedAt: new Date(now.getFullYear(), 5, 30),
        invested: totalInvested * 0.92,
        value: totalInvested * 1.02,
      },
      {
        date: `${now.getFullYear()} Now`,
        recordedAt: now,
        invested: totalInvested,
        value: basePortfolio,
      },
    ].map((point) => ({
      ...point,
      invested: Math.round(point.invested),
      value: Math.round(point.value),
    })),
  } as const;

  const goals = [
    {
      name: "Emergency Fund",
      emoji: "🛡️",
      targetAmount: 300000,
      currentAmount: Math.round(180000 + (seed % 50000)),
      monthlyNeeded: Math.round((300000 - Math.round(180000 + (seed % 50000))) / 12),
      targetDate: new Date(now.getFullYear(), now.getMonth() + 8, 1),
      color: "#3A7A5A",
      achieved: false,
    },
    {
      name: "Dream Vacation",
      emoji: "✈️",
      targetAmount: 150000,
      currentAmount: Math.round(50000 + (seed % 25000)),
      monthlyNeeded: Math.round((150000 - Math.round(50000 + (seed % 25000))) / 12),
      targetDate: new Date(now.getFullYear(), now.getMonth() + 10, 1),
      color: "#4A6FA5",
      achieved: false,
    },
    {
      name: "Laptop Upgrade",
      emoji: "💻",
      targetAmount: 180000,
      currentAmount: 180000,
      monthlyNeeded: 0,
      targetDate: null,
      color: "#C9A84C",
      achieved: true,
    },
    {
      name: "Home Down Payment",
      emoji: "🏠",
      targetAmount: 1800000,
      currentAmount: Math.round(280000 + (seed % 90000)),
      monthlyNeeded: Math.round((1800000 - Math.round(280000 + (seed % 90000))) / 12),
      targetDate: new Date(now.getFullYear() + 3, 11, 1),
      color: "#7A4AA0",
      achieved: false,
    },
  ];

  const learningModules = [
    {
      title: "Budgeting Basics",
      lessons: 8,
      completedLessons: 8,
      icon: "📊",
      color: "#3A7A5A",
      bgColor: "#F0FBF4",
      borderColor: "#C0E8D0",
      badge: "Complete",
      isCurrent: false,
      sortOrder: 0,
    },
    {
      title: "Mutual Funds & SIPs",
      lessons: 12,
      completedLessons: 6 + (seed % 5),
      icon: "📈",
      color: "#4A6FA5",
      bgColor: "#F0F5FF",
      borderColor: "#D0E0FF",
      badge: "In Progress",
      isCurrent: true,
      sortOrder: 1,
    },
    {
      title: "Stock Market Basics",
      lessons: 10,
      completedLessons: 1 + (seed % 4),
      icon: "💹",
      color: "#7A4AA0",
      bgColor: "#F8F0FF",
      borderColor: "#E0C8F8",
      badge: "Started",
      isCurrent: false,
      sortOrder: 2,
    },
    {
      title: "Tax Planning",
      lessons: 6,
      completedLessons: 0,
      icon: "🧾",
      color: "#888",
      bgColor: "#F5F5F3",
      borderColor: "#E0E0E0",
      badge: "Up Next",
      isCurrent: false,
      sortOrder: 3,
    },
  ];

  const latestQuizScore = 6 + (seed % 5);
  const quizAttempts = [
    {
      topic: "Mutual Funds",
      score: latestQuizScore,
      total: 10,
      xpEarned: 20 + latestQuizScore * 5,
      attemptedAt: shiftDate(now, 0),
    },
    {
      topic: "Budgeting Basics",
      score: 7 + (seed % 3),
      total: 10,
      xpEarned: 55,
      attemptedAt: shiftDate(now, -2),
    },
    {
      topic: "Risk Management",
      score: 6 + (seed % 4),
      total: 10,
      xpEarned: 45,
      attemptedAt: shiftDate(now, -5),
    },
  ];

  const activities = [
    {
      category: "Investing",
      title: "SIP Invested",
      description: "Index Fund · Monthly autopay",
      icon: "📈",
      iconBg: "#F0F5FF",
      iconBorder: "#D0E0FF",
      amountLabel: `+${formatCurrency(monthlyContribution)}`,
      amountColor: "#3A7A5A",
      tag: "Investing",
      tagBg: "#F0F5FF",
      tagColor: "#4A6FA5",
      occurredAt: shiftDate(now, 0),
    },
    {
      category: "Learning",
      title: "Quiz Completed",
      description: `Mutual Funds — Score: ${latestQuizScore}/10`,
      icon: "📝",
      iconBg: "#F8F0FF",
      iconBorder: "#E0C8F8",
      amountLabel: `+${20 + latestQuizScore * 5} XP`,
      amountColor: "#7A4AA0",
      tag: "Learning",
      tagBg: "#F8F0FF",
      tagColor: "#7A4AA0",
      occurredAt: shiftDate(now, 0),
    },
    {
      category: "Goals",
      title: "Goal Updated",
      description: `Emergency Fund — ${Math.round((goals[0].currentAmount / goals[0].targetAmount) * 100)}% reached`,
      icon: "🛡️",
      iconBg: "#F0FBF4",
      iconBorder: "#C0E8D0",
      amountLabel: formatCurrency(goals[0].currentAmount),
      amountColor: "#3A7A5A",
      tag: "Goals",
      tagBg: "#F0FBF4",
      tagColor: "#3A7A5A",
      occurredAt: shiftDate(now, -1),
    },
    {
      category: "Learning",
      title: "Lesson Completed",
      description: "Module 2 · SIP vs Lumpsum",
      icon: "📚",
      iconBg: "#F5F1E8",
      iconBorder: "#E8DFC0",
      amountLabel: "+20 XP",
      amountColor: "#8B7340",
      tag: "Learning",
      tagBg: "#F5F1E8",
      tagColor: "#8B7340",
      occurredAt: shiftDate(now, -2),
    },
  ];

  return {
    seed,
    now,
    monthlyContribution,
    activeSips,
    streak,
    basePortfolio,
    totalInvested,
    portfolioSeries,
    goals,
    learningModules,
    quizAttempts,
    activities,
  };
}

async function ensureDashboardSeed(user: SessionUser) {
  if (!user.id) {
    return buildSeedData(user);
  }

  const seededUserCache = getSeededUserCache();

  if (seededUserCache.has(user.id)) {
    return null;
  }
  seededUserCache.add(user.id);

  try {
    const existingData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        portfolioPoints: { select: { id: true }, take: 1 },
        dashboardGoals: { select: { id: true }, take: 1 },
        learningModules: { select: { id: true }, take: 1 },
        quizAttempts: { select: { id: true }, take: 1 },
        activityFeed: { select: { id: true }, take: 1 },
      },
    });

    if (
      existingData?.portfolioPoints.length &&
      existingData.dashboardGoals.length &&
      existingData.learningModules.length &&
      existingData.quizAttempts.length &&
      existingData.activityFeed.length
    ) {
      return null;
    }

    const seedData = buildSeedData(user);

    await db.$transaction(async (tx) => {
    const counts = await tx.user.findUnique({
      where: { id: user.id! },
      select: {
        portfolioPoints: { select: { id: true }, take: 1 },
        dashboardGoals: { select: { id: true }, take: 1 },
        learningModules: { select: { id: true }, take: 1 },
        quizAttempts: { select: { id: true }, take: 1 },
        activityFeed: { select: { id: true }, take: 1 },
      },
    });

    if (!counts?.portfolioPoints.length) {
      await tx.portfolioSnapshot.createMany({
        data: Object.entries(seedData.portfolioSeries).flatMap(([rangeKey, points]) =>
          points.map((point) => ({
            userId: user.id!,
            rangeKey,
            label: point.date,
            recordedAt: point.recordedAt,
            value: point.value,
            invested: point.invested,
          }))
        ),
      });
    }

    if (!counts?.dashboardGoals.length) {
      await tx.dashboardGoal.createMany({
        data: seedData.goals.map((goal) => ({
          ...goal,
          userId: user.id!,
        })),
      });
    }

    if (!counts?.learningModules.length) {
      await tx.learningModuleProgress.createMany({
        data: seedData.learningModules.map((module) => ({
          ...module,
          userId: user.id!,
        })),
      });
    }

    if (!counts?.quizAttempts.length) {
      await tx.quizAttempt.createMany({
        data: seedData.quizAttempts.map((attempt) => ({
          ...attempt,
          userId: user.id!,
        })),
      });
    }

    if (!counts?.activityFeed.length) {
      await tx.dashboardActivity.createMany({
        data: seedData.activities.map((activity) => ({
          ...activity,
          userId: user.id!,
        })),
      });
    }
    });
    return seedData;
  } catch (error) {
    seededUserCache.delete(user.id);
    throw error;
  }
}

export async function getDashboardData(user: SessionUser) {
  const now = new Date();
  const firstName = (user.name || "Investor").trim().split(/\s+/)[0] || "Investor";
  const initial = firstName.charAt(0).toUpperCase() || "I";
  const fallbackSeed = buildSeedData(user);

  if (!user.id) {
    return mapDashboardData({
      ...fallbackSeed,
      user,
      now,
      initial,
      firstName,
      dataSource: "demo",
    });
  }

  try {
    const seeded = await ensureDashboardSeed(user);
    const dashboardRecord = await db.user.findUnique({
      where: { id: user.id },
      select: {
        portfolioPoints: {
          select: {
            label: true,
            rangeKey: true,
            value: true,
            invested: true,
          },
          orderBy: [{ rangeKey: "asc" }, { recordedAt: "asc" }],
        },
        dashboardGoals: {
          select: {
            id: true,
            name: true,
            emoji: true,
            targetAmount: true,
            currentAmount: true,
            monthlyNeeded: true,
            targetDate: true,
            color: true,
            achieved: true,
          },
          orderBy: [{ achieved: "asc" }, { createdAt: "asc" }],
        },
        learningModules: {
          select: {
            id: true,
            title: true,
            icon: true,
            lessons: true,
            completedLessons: true,
            color: true,
            bgColor: true,
            borderColor: true,
            badge: true,
            isCurrent: true,
          },
          orderBy: { sortOrder: "asc" },
        },
        quizAttempts: {
          select: {
            topic: true,
            score: true,
            total: true,
            xpEarned: true,
            attemptedAt: true,
          },
          orderBy: { attemptedAt: "desc" },
          take: 10,
        },
        activityFeed: {
          select: {
            id: true,
            category: true,
            title: true,
            description: true,
            icon: true,
            iconBg: true,
            iconBorder: true,
            amountLabel: true,
            amountColor: true,
            tag: true,
            tagBg: true,
            tagColor: true,
            occurredAt: true,
          },
          orderBy: { occurredAt: "desc" },
          take: 12,
        },
      },
    });

    if (!dashboardRecord) {
      throw new Error("Dashboard user record not found");
    }

    return mapDashboardData({
      user,
      now,
      initial,
      firstName,
      portfolioPoints: dashboardRecord.portfolioPoints,
      goals: dashboardRecord.dashboardGoals,
      learningModules: dashboardRecord.learningModules,
      quizAttempts: dashboardRecord.quizAttempts,
      activities: dashboardRecord.activityFeed,
      seeded,
      dataSource: "database",
    });
  } catch (error) {
    console.error("Failed to load dashboard data", {
      userId: user.id,
      error,
    });

    return mapDashboardData({
      ...fallbackSeed,
      user,
      now,
      initial,
      firstName,
      dataSource: "demo",
    });
  }
}

function mapDashboardData(input: {
  user: SessionUser;
  now: Date;
  firstName: string;
  initial: string;
  portfolioPoints?: Array<{
    label: string;
    rangeKey: string;
    value: number;
    invested: number;
  }>;
  goals?: Array<{
    id?: string;
    name: string;
    emoji: string;
    targetAmount: number;
    currentAmount: number;
    monthlyNeeded: number;
    targetDate: Date | null;
    color: string;
    achieved: boolean;
  }>;
  learningModules?: Array<{
    id?: string;
    title: string;
    icon: string;
    lessons: number;
    completedLessons: number;
    color: string;
    bgColor: string;
    borderColor: string;
    badge: string;
    isCurrent: boolean;
  }>;
  quizAttempts?: Array<{
    topic: string;
    score: number;
    total: number;
    xpEarned: number;
    attemptedAt: Date;
  }>;
  activities?: Array<{
    id?: string;
    category: string;
    title: string;
    description: string;
    icon: string;
    iconBg: string;
    iconBorder: string;
    amountLabel: string;
    amountColor: string;
    tag: string;
    tagBg: string;
    tagColor: string;
    occurredAt: Date;
  }>;
  seeded?: ReturnType<typeof buildSeedData> | null;
  dataSource?: "database" | "demo";
}) {
  const portfolioGroups = (input.portfolioPoints ?? []).reduce<Record<string, Array<{ date: string; value: number; invested: number }>>>(
    (accumulator, point) => {
      if (!accumulator[point.rangeKey]) {
        accumulator[point.rangeKey] = [];
      }

      accumulator[point.rangeKey].push({
        date: point.label,
        value: point.value,
        invested: point.invested,
      });

      return accumulator;
    },
    {}
  );

  const defaultPortfolioSeries = input.seeded?.portfolioSeries ?? buildSeedData(input.user).portfolioSeries;
  const series = {
    "1M": portfolioGroups["1M"] ?? defaultPortfolioSeries["1M"],
    "3M": portfolioGroups["3M"] ?? defaultPortfolioSeries["3M"],
    "6M": portfolioGroups["6M"] ?? defaultPortfolioSeries["6M"],
    "1Y": portfolioGroups["1Y"] ?? defaultPortfolioSeries["1Y"],
    All: portfolioGroups.All ?? defaultPortfolioSeries.All,
  };

  const oneMonthSeries = series["1M"];
  const latestPortfolioPoint = oneMonthSeries[oneMonthSeries.length - 1];
  const previousPortfolioPoint = oneMonthSeries[Math.max(oneMonthSeries.length - 2, 0)];
  const currentValue = latestPortfolioPoint.value;
  const investedValue = latestPortfolioPoint.invested;
  const totalReturn = currentValue - investedValue;
  const totalReturnPct =
    investedValue > 0
      ? Number(((totalReturn / investedValue) * 100).toFixed(1))
      : 0;

  const goals = (input.goals ?? []).map((goal) => ({
    id: goal.id || goal.name.toLowerCase().replace(/\s+/g, "-"),
    name: goal.name,
    emoji: goal.emoji,
    target: goal.targetAmount,
    saved: goal.currentAmount,
    deadline: goal.achieved || !goal.targetDate ? "Achieved!" : goalDeadline(goal.targetDate),
    barColor: goal.color,
    monthlyNeeded: goal.monthlyNeeded,
    achieved: goal.achieved,
  }));

  const learningModules = (input.learningModules ?? []).map((module) => ({
    id: module.id || module.title.toLowerCase().replace(/\s+/g, "-"),
    title: module.title,
    lessons: module.lessons,
    completed: module.completedLessons,
    icon: module.icon,
    color: module.color,
    bg: module.bgColor,
    border: module.borderColor,
    badge: module.badge,
    current: module.isCurrent,
  }));

  const quizAttempts = input.quizAttempts ?? [];
  const latestQuiz = quizAttempts[0] ?? {
    topic: "Mutual Funds",
    score: 0,
    total: 10,
    xpEarned: 0,
    attemptedAt: input.now,
  };
  const streak = Math.max(3, quizAttempts.length ? 5 + quizAttempts.length : 5);
  const activeSips = Math.max(2, Math.round(investedValue / 70000));
  const onTrackGoals = goals.filter((goal) => goal.achieved || goal.saved / goal.target >= 0.55).length;

  const healthIndicators = [
    {
      key: "savings",
      label: "Savings Habit",
      value: Math.min(95, 68 + goals.length * 4),
      color: "#C9A84C",
      status: "Strong",
    },
    {
      key: "investing",
      label: "Investment Consistency",
      value: Math.min(92, 60 + activeSips * 7),
      color: "#4A6FA5",
      status: activeSips >= 4 ? "Great" : "Building",
    },
    {
      key: "learning",
      label: "Learning Progress",
      value: Math.round(
        (learningModules.reduce((sum, module) => sum + module.completed, 0) /
          Math.max(1, learningModules.reduce((sum, module) => sum + module.lessons, 0))) *
          100
      ),
      color: "#3A7A5A",
      status: "On Track",
    },
    {
      key: "resilience",
      label: "Emergency Cushion",
      value: goals[0] ? Math.round((goals[0].saved / goals[0].target) * 100) : 50,
      color: "#7A4AA0",
      status: goals[0] && goals[0].saved / goals[0].target >= 0.7 ? "Healthy" : "Needs Work",
    },
  ];

  const healthScore = Math.round(
    healthIndicators.reduce((sum, indicator) => sum + indicator.value, 0) / healthIndicators.length
  );

  const quickStats: QuickStat[] = [
    {
      label: "Portfolio Value",
      value: formatCurrency(currentValue),
      delta: `${previousPortfolioPoint.value < currentValue ? "+" : ""}${formatCurrency(currentValue - previousPortfolioPoint.value)}`,
      deltaDir: previousPortfolioPoint.value < currentValue ? "up" : "neutral",
    },
    {
      label: "Active SIPs",
      value: String(activeSips),
      delta: `${formatCurrency(Math.round(investedValue / 28))} / mo`,
      deltaDir: "neutral",
    },
    {
      label: "Goals On Track",
      value: `${onTrackGoals} / ${goals.length}`,
      delta: `${Math.round((onTrackGoals / Math.max(1, goals.length)) * 100)}% progress`,
      deltaDir: "up",
    },
    {
      label: "Quiz Streak",
      value: `${streak} days`,
      delta: latestQuiz.score >= 8 ? "Strong momentum" : "Keep going",
      deltaDir: "neutral",
    },
  ];

  return {
    user: {
      firstName: input.firstName,
      fullName: input.user.name || "Finveda Investor",
      email: input.user.email || "demo@finveda.app",
      initial: input.initial,
      plan: onTrackGoals >= 3 ? "Growth Plan" : "Pro Plan",
    },
    hero: {
      dataSource: input.dataSource ?? "demo",
      dataStatusLabel:
        input.dataSource === "database" ? "Live portfolio data" : "Demo portfolio data",
      insight:
        onTrackGoals >= 3
          ? "You are tracking well across investing, goals, and learning."
          : "A few goals need attention. Prioritise one action this week.",
      selectedPeriod: input.now.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
      quickStats,
    },
    financialHealth: {
      score: healthScore,
      indicators: healthIndicators,
      tip: {
        title: "Quick Win",
        description: goals[0]
          ? `Add ${formatCurrency(Math.min(goals[0].monthlyNeeded, 12000))} to your ${goals[0].name.toLowerCase()} this month to improve your resilience score.`
          : "Keep your savings and learning consistency moving this month.",
      },
    },
    portfolio: {
      currentValue,
      investedValue,
      totalReturn,
      totalReturnPct,
      series,
    },
    goals: {
      achieved: goals.filter((goal) => goal.achieved).length,
      items: goals,
    },
    learning: {
      modules: learningModules,
      streak,
      latestQuiz: {
        score: latestQuiz.score,
        total: latestQuiz.total,
        topic: latestQuiz.topic,
        date: relativeDayLabel(latestQuiz.attemptedAt, input.now),
      },
    },
    activities: (input.activities ?? []).map((activity, index) => ({
      id: activity.id || `activity-${index}`,
      icon: activity.icon,
      iconBg: activity.iconBg,
      iconBorder: activity.iconBorder,
      title: activity.title,
      desc: activity.description,
      amount: activity.amountLabel,
      amountColor: activity.amountColor,
      time: relativeDayLabel(activity.occurredAt, input.now),
      tag: activity.tag,
      tagBg: activity.tagBg,
      tagColor: activity.tagColor,
      category: activity.category,
    })),
    tools: [
      {
        id: "sip",
        name: "SIP Calculator",
        desc: "Project monthly investments",
        emoji: "📈",
        bg: "#F0F5FF",
        border: "#D0E0FF",
        color: "#4A6FA5",
        href: "/tools",
      },
      {
        id: "emi",
        name: "EMI Calculator",
        desc: "Estimate loan repayments",
        emoji: "🏦",
        bg: "#F5F1E8",
        border: "#E8DFC0",
        color: "#8B7340",
        href: "/tools",
      },
      {
        id: "goal",
        name: "Goal Planner",
        desc: `Track ${goals.length} active goals`,
        emoji: "🎯",
        bg: "#F0FBF4",
        border: "#C0E8D0",
        color: "#3A7A5A",
        href: "/tools",
      },
      {
        id: "quiz",
        name: "Finance Quiz",
        desc: "Train concepts with daily sets",
        emoji: "🧠",
        bg: "#F8F0FF",
        border: "#E0C8F8",
        color: "#7A4AA0",
        href: "/quiz",
      },
      {
        id: "learn",
        name: "Learning Path",
        desc: learningModules[1]
          ? `${learningModules[1].completed}/${learningModules[1].lessons} lessons in progress`
          : "Continue your next lesson",
        emoji: "📚",
        bg: "#FFF0F0",
        border: "#F8C8C8",
        color: "#A04A4A",
        href: "/learn",
      },
      {
        id: "net-worth",
        name: "Net Worth",
        desc: `Current snapshot ${formatCompactCurrency(currentValue)}`,
        emoji: "⚖️",
        bg: "#F5F5F3",
        border: "#E0E0E0",
        color: "#555",
        href: "/tools",
      },
    ],
  };
}

export type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;
