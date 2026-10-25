import { NextResponse } from "next/server";
import { buildDashboardActivity } from "@/lib/dashboard-activity";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { portfolioContributionSchema } from "@/lib/validators";

function longDateLabel(date: Date) {
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

function monthLabel(date: Date) {
  return date.toLocaleDateString("en-IN", { month: "short" });
}

function allTimeLabel(date: Date) {
  return `${date.getFullYear()} Now`;
}

function buildSnapshotLabels(date: Date) {
  return [
    { rangeKey: "1M", label: longDateLabel(date) },
    { rangeKey: "3M", label: monthLabel(date) },
    { rangeKey: "6M", label: monthLabel(date) },
    { rangeKey: "1Y", label: monthLabel(date) },
    { rangeKey: "All", label: allTimeLabel(date) },
  ];
}

export async function POST(request: Request) {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = portfolioContributionSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid portfolio payload" },
      { status: 400 }
    );
  }

  const latestPoint = await db.portfolioSnapshot.findFirst({
    where: {
      userId: session.user.id,
      rangeKey: "1M",
    },
    orderBy: {
      recordedAt: "desc",
    },
  });

  if (!latestPoint) {
    return NextResponse.json(
      { error: "Portfolio history is not initialized yet" },
      { status: 409 }
    );
  }

  const now = new Date();
  const nextInvested = latestPoint.invested + parsed.data.amountInvested;

  const growthMultiplier = latestPoint.invested > 0 ? latestPoint.value / latestPoint.invested : 1;

  const nextCurrentValue =
    latestPoint.value + Math.round(parsed.data.amountInvested * growthMultiplier);
  const snapshotData = buildSnapshotLabels(now);

  await db.$transaction(async (tx) => {
    await tx.portfolioSnapshot.createMany({
      data: snapshotData.map((entry) => ({
        userId: session.user.id,
        rangeKey: entry.rangeKey,
        label: entry.label,
        recordedAt: now,
        invested: nextInvested,
        value: nextCurrentValue,
      })),
    });

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Investing",
          title: "Investment Added",
          description: `Portfolio updated to ${nextCurrentValue.toLocaleString("en-IN")}`,
          icon: "📈",
          iconBg: "#F0F5FF",
          iconBorder: "#D0E0FF",
          amountLabel: `+₹${parsed.data.amountInvested.toLocaleString("en-IN")}`,
          amountColor: "#3A7A5A",
          tag: "Investing",
          tagBg: "#F0F5FF",
          tagColor: "#4A6FA5",
          occurredAt: now,
        }),
      },
    });
  });

  return NextResponse.json({
    success: true,
    portfolio: {
      investedValue: nextInvested,
      currentValue: nextCurrentValue,
      totalReturn: nextCurrentValue - nextInvested,
    },
  });
}

export async function DELETE() {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const snapshotData = buildSnapshotLabels(now);

  await db.$transaction(async (tx) => {
    await tx.portfolioSnapshot.createMany({
      data: snapshotData.map((entry) => ({
        userId: session.user.id,
        rangeKey: entry.rangeKey,
        label: entry.label,
        recordedAt: now,
        invested: 0,
        value: 0,
      })),
    });

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Investing",
          title: "Portfolio Reset",
          description: "Portfolio value and invested amount were reset to zero",
          icon: "↺",
          iconBg: "#FFF3F3",
          iconBorder: "#F3D1D1",
          amountLabel: "₹0",
          amountColor: "#A04A4A",
          tag: "Investing",
          tagBg: "#FFF3F3",
          tagColor: "#A04A4A",
          occurredAt: now,
        }),
      },
    });
  });

  return NextResponse.json({
    success: true,
    portfolio: {
      investedValue: 0,
      currentValue: 0,
      totalReturn: 0,
    },
  });
}
