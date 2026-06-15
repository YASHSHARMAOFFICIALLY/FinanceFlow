"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    review: "",
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just log (later connect to DB/API)
    console.log("Review submitted:", form);

    alert("Thank you for your feedback!");

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-white dark:bg-[#0A0A0A]">
      <div className="w-full max-w-lg border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-8 bg-white dark:bg-[#1a1a1a] shadow-sm">
        <h1
          className="text-2xl font-semibold mb-2 text-[#0F0F0F] dark:text-white"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Share Your Experience
        </h1>

        <p className="text-sm text-[#777] dark:text-[#999] mb-6">
          Your feedback helps us improve FinanceFlow.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm text-[#666] dark:text-[#aaa]">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[#E8E8E8] dark:border-[#2a2a2a] bg-transparent text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]"
              placeholder="Your name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-[#666] dark:text-[#aaa]">Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[#E8E8E8] dark:border-[#2a2a2a] bg-transparent text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]"
              placeholder="e.g. Software Engineer"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm text-[#666] dark:text-[#aaa]">
              Rating
            </label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setForm({ ...form, rating: star })}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl transition"
                >
                  <span
                    className={
                      star <= (hoverRating || form.rating)
                        ? "text-[#C9A84C]"
                        : "text-[#ddd] dark:text-[#444]"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="text-sm text-[#666] dark:text-[#aaa]">
              Your Review
            </label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              required
              rows={4}
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[#E8E8E8] dark:border-[#2a2a2a] bg-transparent text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]"
              placeholder="Write your experience..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-[#0F0F0F] dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
