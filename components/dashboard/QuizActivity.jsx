"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * @typedef {import("@/types/dashboard").DashboardActivity} DashboardActivity
 */

function ActivityItem({ activity }) {
  return (
    <div className="flex items-start gap-3 py-3 group hover:bg-[#FAFAF8] dark:hover:bg-[#10181d] -mx-2 px-2 rounded-xl transition-colors duration-150 cursor-pointer">
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
        style={{
          background: activity.iconBg,
          border: `1px solid ${activity.iconBorder}`,
        }}
      >
        {activity.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">
            {activity.title}
          </span>
          <span
            className="text-[10.5px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ background: activity.tagBg, color: activity.tagColor }}
          >
            {activity.tag}
          </span>
        </div>
        <div className="text-[12.5px] text-[#888] dark:text-[#89a0ad] tracking-[-0.01em]">{activity.desc}</div>
        <div className="text-[11px] text-[#BBB] dark:text-[#708692] mt-0.5">{activity.time}</div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <div
          className="text-[13px] font-bold tracking-[-0.01em]"
          style={{ color: activity.amountColor }}
        >
          {activity.amount}
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{ activities?: DashboardActivity[] }} props
 */
export default function RecentActivity({ activities = [] }) {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredActivities = useMemo(() => {
  return activities.filter((activity) => {
    const matchesCategory =
      filter === "All" || activity.category === filter;

    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.desc.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}, [activities, filter, searchTerm]);

  return (
    <div className="bg-white dark:bg-[linear-gradient(180deg,_rgba(18,28,34,0.96)_0%,_rgba(10,16,21,0.99)_100%)] border border-[#E8E8E8] dark:border-[#243842] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.34)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#89a0ad] uppercase tracking-[0.08em] mb-0.5">
            Activity
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            Recent transactions
          </div>
        </div>
        <Link href="/dashboard" className="text-[12px] font-medium text-[#555] dark:text-[#a7bac6] hover:text-[#0F0F0F] dark:hover:text-white transition-colors">
          View all →
        </Link>
      </div>
     <div className="mb-4 relative">
  <input
    type="text"
    aria-label="Search transactions"
    placeholder="Search transactions..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-4 py-2 pr-10 rounded-xl border border-[#E8E8E8] dark:border-[#243842] bg-white dark:bg-[#10181d] text-sm text-[#0F0F0F] dark:text-white placeholder:text-[#888] dark:placeholder:text-[#708692] outline-none focus:ring-2 focus:ring-[#0F0F0F] dark:focus:ring-[#f3efe3] transition-all"
  />

  {searchTerm && (
    <button
  onClick={() => setSearchTerm("")}
  aria-label="Clear search"
  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#0F0F0F] dark:hover:text-white transition-colors"
>
  ✕
</button>
  )}
</div>
      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4">
        {["All", "Investing", "Learning", "Goals"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
              filter === f
                ? "bg-[#0F0F0F] text-white dark:bg-[#f3efe3] dark:text-[#091116]"
                : "text-[#888] dark:text-[#89a0ad] hover:text-[#555] dark:hover:text-white border border-[#F0F0F0] dark:border-[#243842]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredActivities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E0E0E0] dark:border-[#2d434f] px-4 py-6 text-[12.5px] text-[#888] dark:text-[#89a0ad] bg-transparent dark:bg-[#10181d]/70">
          {searchTerm
           ? "No matching transactions found."
           : "No activity in this category yet."}
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-[#F5F5F5] dark:divide-[#22343d]">
          {filteredActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
