'use client'
import { useState } from "react";
import DiscussionCard from "./DiscussionCard";

export const POSTS = [
  {
    id: 1,
    author: "Rahul Mehta",
    badge: "Top Contributor",
    timeAgo: "2h ago",
    title: "Is SIP better than lump sum investing? My analysis after 3 years",
    preview:
      "I've been investing via SIP for 3 years and recently did a lump sum during the dip. Here's what the data actually shows — and which approach worked better for my Nifty 50 index fund.",
    tags: ["Investing", "SIP", "Index Funds"],
    replies: 47,
    likes: 132,
    views: "2.1K",
    pinned: true,
    solved: false,
  },
  {
    id: 2,
    author: "Priya Sharma",
    timeAgo: "5h ago",
    title: "Best beginner books for investing in 2025?",
    preview:
      "I'm completely new to investing. Started my first job 6 months ago and want to learn properly. Which books would you recommend starting with? Already have 'Psychology of Money' on my list.",
    tags: ["Books", "Beginner", "Investing"],
    replies: 32,
    likes: 89,
    views: "1.4K",
    solved: true,
  },
  {
    id: 3,
    author: "Arjun Kapoor",
    timeAgo: "8h ago",
    title: "How much should I keep in my emergency fund as a freelancer?",
    preview:
      "Salaried employees usually keep 3-6 months. But as a freelancer with variable income, I'm not sure if that's enough. My income varies ±40% month to month.",
    tags: ["Emergency Fund", "Planning", "Budgeting"],
    replies: 28,
    likes: 74,
    views: "980",
    solved: false,
  },
  {
    id: 4,
    author: "Neha Joshi",
    badge: "Finance Nerd",
    timeAgo: "1d ago",
    title: "ELSS vs PPF — which actually wins on post-tax returns?",
    preview:
      "I ran the numbers for different income slabs and time horizons. The answer isn't as simple as 'ELSS always wins' — it depends heavily on your tax bracket and lock-in tolerance.",
    tags: ["Tax", "ELSS", "Investing"],
    replies: 51,
    likes: 156,
    views: "3.2K",
    solved: false,
  },
  {
    id: 5,
    author: "Vikram Nair",
    timeAgo: "1d ago",
    title: "My first year of index fund investing — honest review",
    preview:
      "Started with ₹5,000/month SIP in Nifty 50 exactly 12 months ago. Here's my portfolio performance, what I learned, mistakes I made, and what I'd do differently.",
    tags: ["Index Funds", "SIP", "Beginner"],
    replies: 63,
    likes: 201,
    views: "4.8K",
  },
  {
    id: 6,
    author: "Ananya Singh",
    timeAgo: "2d ago",
    title: "Confused about direct vs regular mutual fund plans — help?",
    preview:
      "My bank RM keeps recommending regular plans. But online everyone says go direct. Can someone explain the actual cost difference over 10 years with real numbers?",
    tags: ["Mutual Funds", "Beginner"],
    replies: 19,
    likes: 54,
    views: "740",
    solved: true,
  },
  {
    id: 7,
    author: "Karthik Raj",
    badge: "CFA Level 2",
    timeAgo: "2d ago",
    title: "Understanding the Buffett Indicator and what it means for Indian markets",
    preview:
      "The market cap to GDP ratio (Buffett Indicator) is at historic highs in India. Does this mean a correction is imminent? Here's a deep-dive into what this metric actually tells us.",
    tags: ["Stocks", "Investing"],
    replies: 38,
    likes: 143,
    views: "5.1K",
  },
  {
    id: 8,
    author: "Divya Patel",
    timeAgo: "3d ago",
    title: "How I paid off ₹8L in debt in 18 months on a ₹45K salary",
    preview:
      "Used the avalanche method, cut discretionary spending by 60%, and picked up a side hustle. Sharing my exact month-by-month breakdown and the spreadsheet I used.",
    tags: ["Budgeting", "Planning"],
    replies: 92,
    likes: 387,
    views: "12K",
    pinned: false,
  },
];

const SORT_OPTIONS = [
  { id: "trending", label: "Trending" },
  { id: "newest",   label: "Newest" },
  { id: "top",      label: "Top Liked" },
  { id: "unanswered", label: "Unanswered" },
];

export default function DiscussionFeed({
  activeCategory,
  userPosts = [],
}) {
  const [sort, setSort] = useState("trending");

  const allPosts = [...userPosts, ...POSTS];

  const filtered = activeCategory === "all"
    ? allPosts
    : allPosts.filter((p) => {
        const catTagMap = {
          investing: ["Investing", "Index Funds"],
          stocks:    ["Stocks"],
          mf:        ["Mutual Funds"],
          savings:   ["Emergency Fund", "Budgeting"],
          planning:  ["Planning", "Budgeting"],
          books:     ["Books"],
          tax:       ["Tax", "ELSS"],
          crypto:    ["Crypto"],
        };
        const tags = catTagMap[activeCategory] || [];
        return p.tags?.some((t) => tags.includes(t));
      });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "newest") return (b.id || 0) - (a.id || 0);
    if (sort === "top")    return b.likes - a.likes;
    if (sort === "unanswered") return a.replies - b.replies;
    return b.likes + b.replies * 2 - (a.likes + a.replies * 2);
  });

  return (
    <div id="feed">
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-[13px] text-[#888]">
          <span className="font-semibold text-[#0F0F0F]">{sorted.length}</span> discussions
        </div>
        <div className="flex items-center gap-1 bg-[#F5F5F3] rounded-xl p-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSort(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                sort === opt.id
                  ? "bg-white text-[#0F0F0F] shadow-sm"
                  : "text-[#888] hover:text-[#555]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-3">
        {sorted.length === 0 ? (
          <div className="text-center py-16 text-[#AAA]">
            <div className="text-3xl mb-3">🔍</div>
            <div className="text-[14px]">No discussions in this category yet.</div>
            <div className="text-[13px] mt-1">Be the first to start one!</div>
          </div>
        ) : (
          sorted.map((post, i) => (
            <div
              key={post.id}
              style={{
                opacity: 0,
                animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
              }}
            >
              <DiscussionCard post={post} />
            </div>
          ))
        )}
      </div>

      {sorted.length > 0 && (
        <div className="mt-6 text-center">
          <button className="px-5 py-2.5 rounded-xl border border-[#E8E8E8] text-[13px] font-medium text-[#555] hover:border-[#0F0F0F] hover:text-[#0F0F0F] transition-all duration-150 bg-white">
            Load more discussions
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}