'use client'
import { useState, useRef } from "react";
import { toast } from "sonner";


const SUGGESTED_TAGS = [
    "Investing", "SIP", "Stocks", "Budgeting",
    "Mutual Funds", "Tax", "Emergency Fund", "ELSS",
    "Index Funds", "Crypto", "Real Estate", "Books",
]

const TAG_STYLES = {
    Investing: { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
    SIP: { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
    Stocks: { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
    Budgeting: { bg: "#FFF0F0", text: "#A04A4A", border: "#F8C8C8" },
    "Mutual Funds": { bg: "#F8F0FF", text: "#7A4AA0", border: "#E0C8F8" },
    Tax: { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
    "Emergency Fund": { bg: "#F5F5F3", text: "#555", border: "#E0E0E0" },
    ELSS: { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
    "Index Funds": { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
    Crypto: { bg: "#FFF0F0", text: "#A04A4A", border: "#F8C8C8" },
    "Real Estate": { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
    Books: { bg: "#F8F0FF", text: "#7A4AA0", border: "#E0C8F8" },
};

function TagPill({ label, onRemove, onClick, selected }) {
    const s = TAG_STYLES[label] || { bg: "#F5F5F3", text: "#555", border: "#E0E0E0" };
    return (
        <span 
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium border cursor-pointer transition-all duration-150 ${
                selected ? "opacity-100" : "opacity-80 hover:opacity-100"
            }`}
            style={{ background: s.bg, color: s.text, borderColor: s.border }}
            onClick={onClick}
        >
            {label}
            {onRemove && (
                <button
                    onClick={(e) => { e.stopPropagation(); onRemove(label); }}
                    className="ml-0.5  
                    
                    
                    
                     hover:opacity-70"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                </button>
            )}
        </span>
    );
}

export default function CreatePost({ onPost }) {
    const [expanded, setExpanded] = useState(false)
    const [body, setBody] = useState("")
    const [title, setTitle] = useState("")
    const [selectedTags, setSelectedTags] = useState([])
    const [showTagPicker, setShowTagPicker] = useState(false);
    const titleRef = useRef(null);
 
    const handleExpand = () => {
        setExpanded(true)
        setTimeout(() => titleRef.current?.focus(), 50)
    }

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag].slice(0, 4)
        )
    }

    const handleSubmit = () => {
        if (!title.trim()) return;
        onPost?.({ title: title.trim(), body: body.trim(), tags: selectedTags });
        setTitle("");
        setBody("");
        setSelectedTags([]);
        setExpanded(false);
         toast.success("Discussion posted successfully!");
    };

    return (
        <div className="bg-white border border-[#E8E8E8] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">
            {!expanded ? (
                <button
                    onClick={handleExpand}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#FAFAF8] transition-colors duration-150">
                    <div className="w-8 h-8 rounded-full bg-[#0F0F0F] flex items-center justify-center text-[12px] font-bold text-[#C9A84C] shrink-0">
                        Y
                    </div>
                    <span className="text-[14px] text-[#AAA] flex-1 tracking-[-0.01em]">
                        Ask a question about investing, savings, or finance…
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E8E8] text-[12.5px] text-[#666] font-medium hover:border-[#0F0F0F] transition-colors">
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                <path d="M2 4L7 2L12 4V7C12 9.76 9.76 11.76 7 12.5C4.24 11.76 2 9.76 2 7V4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                            </svg>
                            Post Question
                        </span>
                    </div>
                </button>
            ) : (
                <>
                    <div className="px-5 pt-5">
                        <input
                            ref={titleRef}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's your question or insight?"
                            className="w-full text-[17px] font-semibold text-[#0F0F0F] placeholder-[#CCC] outline-none bg-transparent tracking-[-0.02em] leading-snug"
                        />
                    </div>

                    <div className="px-5 pt-3">
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Add more context, background or details"
                            rows={4}
                            className="w-full text-[14px] text-[#444] placeholder-[#CCC] outline-none bg-transparent tracking-[-0.01em] leading-relaxed resize-none"
                        />
                    </div>

                    {selectedTags.length > 0 && (
                        <div className="px-5 pb-2 flex flex-wrap gap-1.5">
                            {selectedTags.map((tag) => (
                                <TagPill key={tag} label={tag} onRemove={toggleTag} />
                            ))}
                        </div>
                    )}

                    {showTagPicker && (
                        <div className="px-5 pb-3">
                            <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#EBEBEB]">
                                <div className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">
                                    Select up to 4 tags
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {SUGGESTED_TAGS.map((tag) => (
                                        <TagPill
                                            key={tag}
                                            label={tag}
                                            selected={selectedTags.includes(tag)}
                                            onClick={() => toggleTag(tag)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#F0F0F0] bg-[#FAFAF8]">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowTagPicker((v) => !v)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12.5px] font-medium transition-all duration-150 ${
                                    showTagPicker
                                        ? "bg-[#0F0F0F] text-white border-[#0F0F0F]"
                                        : "border-[#E8E8E8] text-[#555] hover:border-[#0F0F0F] hover:text-[#0F0F0F] bg-white"
                                }`}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M1.5 3.5L5.5 1.5L10.5 6.5L6.5 10.5L1.5 5.5V3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                                    <circle cx="4" cy="4" r="1" fill="currentColor" />
                                </svg>
                                Add Tag
                                {selectedTags.length > 0 && (
                                    <span className="w-4 h-4 rounded-full bg-[#C9A84C] text-white text-[10px] flex items-center justify-center">
                                        {selectedTags.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => { setExpanded(false); setTitle(""); setBody(""); setSelectedTags([]); setShowTagPicker(false); }}
                                className="px-3 py-1.5 rounded-lg border border-[#E8E8E8] text-[12.5px] text-[#888] hover:text-[#0F0F0F] hover:border-[#C0C0C0] bg-white transition-all duration-150"
                            >
                                Cancel
                            </button>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!title.trim()}
                            className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
                                title.trim()
                                    ? "bg-[#0F0F0F] text-white hover:bg-[#2a2a2a] hover:-translate-y-0.5 hover:shadow-md"
                                    : "bg-[#F0F0F0] text-[#AAA] cursor-not-allowed"
                            }`}
                        >
                            Post Discussion
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}