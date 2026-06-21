'use client'
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import CommunityHero from "./CommunityHero";
import CreatePost from "./CreatePost";
import Categories from "./Categories";
import DiscussionFeed from "./Discussionfeed";
import CommunitySidebar from "./Communitysidebar";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-[#0F0F0F] border-b border-[#EBEBEB] dark:border-[#222] flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] dark:bg-white flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="11" r="1.2" fill="#C9A84C" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F] dark:text-white">FinanceFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Tools", href: "/tools" },
            { label: "Learn", href: "/learn" },
            { label: "Community", href: "/community", active: true },
            { label: "Pricing", href: "/pricing" },
          ].map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`text-[13.5px] tracking-[-0.01em] transition-colors ${
                active
                  ? "text-[#0F0F0F] dark:text-white font-medium"
                  : "text-[#555] dark:text-[#AAA] hover:text-[#0F0F0F] dark:hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/signin"
            className="hidden sm:block text-[13.5px] px-4 py-2 rounded-lg border border-[#E0E0E0] dark:border-[#333] text-[#333] dark:text-[#CCC] hover:border-[#0F0F0F] dark:hover:border-white hover:text-[#0F0F0F] dark:hover:text-white transition-all tracking-[-0.01em]"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="text-[13.5px] px-4 py-2 rounded-lg bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] hover:bg-[#2a2a2a] dark:hover:bg-[#E0E0E0] transition-all tracking-[-0.01em] shadow-sm"
          >
            Create Account
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [userPosts, setUserPosts] = useState([]);
  const [highlightForm, setHighlightForm] = useState(false);
  const createRef = useRef(null);

  useEffect(() => {
    const savedPosts = JSON.parse(
      localStorage.getItem("financeflow-community-posts") || "[]"
    );

    setUserPosts(savedPosts);
  }, []);

  const handleStartDiscussion = () => {
    createRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setHighlightForm(true);

    setTimeout(() => {
      setHighlightForm(false);
    }, 1500);
  };

 const handlePost = (post) => {
  const newPost = {
    id: Date.now(),
    ...post,
    category: post.tags?.[0] || "all",
    author: "You",
    timeAgo: "just now",
    replies: 0,
    likes: 0,
    views: "1",
  };

  const updatedPosts = [newPost, ...userPosts];

  setUserPosts(updatedPosts);
  localStorage.setItem(
    "financeflow-community-posts",
    JSON.stringify(updatedPosts)
  );
};

    

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#111] font-sans antialiased">
      <Navbar />

      <div className="pt-16">
        <CommunityHero onStartDiscussion={handleStartDiscussion} />

        <div className="max-w-6xl mx-auto px-5 py-8">
          <div className="flex gap-6 items-start">
            <div className="flex-1 min-w-0 flex flex-col gap-5">
              <div
                ref={createRef}
                className={`rounded-2xl transition-all duration-300 ${
                  highlightForm ? "ring-4 ring-[#C9A84C]/50 shadow-lg" : ""
                }`}
              >
                <CreatePost onPost={handlePost} />
              </div>

              <div className="overflow-x-auto pb-1">
                <Categories
                  active={activeCategory}
                  onChange={setActiveCategory}
                />
              </div>

              <DiscussionFeed
                activeCategory={activeCategory}
                userPosts={userPosts}
              />
            </div>

            <div className="w-72 flex-shrink-0 hidden lg:block sticky top-20">
              <CommunitySidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}