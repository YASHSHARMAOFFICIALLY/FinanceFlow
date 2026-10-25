"use client"
import { useState } from "react";

const STOCKS = {
  TCS: { name: "Tata Consultancy Services", price: 3842, change: +1.24, high: 3901, low: 3810, vol: "18.4L", cap: "13.94L Cr" },
  RELIANCE: { name: "Reliance Industries", price: 2745, change: +1.8, high: 2789, low: 2718, vol: "22.1L", cap: "18.58L Cr" },
  INFY: { name: "Infosys Ltd", price: 1498, change: -0.63, high: 1519, low: 1487, vol: "14.7L", cap: "6.21L Cr" },
  HDFC: { name: "HDFC Bank", price: 1652, change: +0.42, high: 1671, low: 1638, vol: "9.8L", cap: "12.52L Cr" },
  WIPRO: { name: "Wipro Ltd", price: 487, change: -1.15, high: 502, low: 484, vol: "11.2L", cap: "2.53L Cr" },
  BAJAJ: { name: "Bajaj Finance", price: 6934, change: +2.31, high: 7012, low: 6870, vol: "6.4L", cap: "4.18L Cr" },
};

const SUGGESTIONS = ["TCS", "RELIANCE", "INFY", "HDFC", "WIPRO", "BAJAJ"];

function MiniChart({ positive }) {
  const points = positive
    ? [60, 55, 58, 52, 54, 48, 46, 42, 38, 35, 30, 28]
    : [30, 34, 32, 36, 38, 42, 44, 48, 50, 54, 56, 60];
  const max = Math.max(...points), min = Math.min(...points);
  const h = 48, w = 200;
  const pts = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * (h - 4);
    return `${x},${y}`;
  }).join(" ");
  const color = positive ? "#16a34a" : "#dc2626";
  const fillPts = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id={`g${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#g${positive})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StockMarketTool() {

  const [copied, setCopied] = useState(false);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("RELIANCE");

  const filtered = SUGGESTIONS.filter(s =>
    s.includes(query.toUpperCase()) ||
    STOCKS[s].name.toLowerCase().includes(query.toLowerCase())
  );

  const stock = selected ? STOCKS[selected] ?? null : null;

  const positive = stock ? stock.change >= 0 : true;

  const handleCopy = async () => {
    if (!stock) return;

    const resultText = `
Day High: ₹${stock.high}
Day Low: ₹${stock.low}
Volume: ${stock.vol}
Market Cap: ${stock.cap}
52W High: ₹${Math.round(stock.price * 1.18)}
52W Low: ₹${Math.round(stock.price * 0.74)}
    `;

    try {
      await navigator.clipboard.writeText(resultText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error("Copy failed", error);
    }
  };
  return (
    <section id="stock-tool" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="01" label="Stock Market Tool" />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Left: search + result */}
          <div className="flex-1 max-w-lg">
            {/* Search */}
            <div className="relative mb-6">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#262626] bg-white dark:bg-[#111111] transition-all duration-200">


                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="#999" strokeWidth="1.4" />
                  <path d="M11 11L14 14" stroke="#999" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  className="flex-1 text-[14px] text-[#0F0F0F] dark:text-white placeholder-[#BBB] dark:placeholder-[#555] outline-none tracking-[-0.01em] bg-transparent"
                  placeholder="Search stock (e.g. TCS, Reliance)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      const sym = query.trim().toUpperCase();
                      if (STOCKS[sym]) {
                        setSelected(sym);
                        setQuery("");
                      } else {
                        setSelected(null);
                      }
                    }
                  }}

                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-[#BBB] hover:text-[#666] dark:hover:text-[#AAA] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  </button>
                )}
              </div>




            </div>

            {/* Stock card */}
            <div className="rounded-2xl border border-[#E8E8E8] dark:border-[#262626] bg-white dark:bg-[#111111] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="text-[11px] font-semibold text-[#888] dark:text-[#666] tracking-wide uppercase mb-1">{selected ? `${selected} · NSE` : "Search"}</div>
                  <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">{stock ? stock.name : (query ? `No results for "${query}"` : "No stock selected")}</div>
                </div>
                {stock ? (
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${positive ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}>
                    {positive ? "▲" : "▼"} {Math.abs(stock.change)}%
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400">
                    — %
                  </span>
                )}
              </div>

              <div className="mt-4 mb-5">
                <span className="text-[36px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.04em] leading-none">{stock ? `₹${stock.price.toLocaleString("en-IN")}` : "—"}</span>
                <span className={`ml-3 text-[14px] font-medium ${positive ? "text-green-600" : "text-red-500"}`}>
                  {stock ? `${positive ? "+" : ""}₹${(stock.price * Math.abs(stock.change) / 100).toFixed(2)} today` : ""}
                </span>
              </div>

              {stock ? (
                <MiniChart positive={positive} />
              ) : (
                <div className="h-10 w-full rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
              )}

              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-[#F0F0F0] dark:border-[#262626]">
                {[
                  { label: "Day High", value: stock ? `₹${stock.high}` : "—" },
                  { label: "Day Low", value: stock ? `₹${stock.low}` : "—" },
                  { label: "Volume", value: stock ? stock.vol : "—" },
                  { label: "Market Cap", value: stock ? stock.cap : "—" },
                  { label: "52W High", value: stock ? `₹${Math.round(stock.price * 1.18)}` : "—" },
                  { label: "52W Low", value: stock ? `₹${Math.round(stock.price * 0.74)}` : "—" },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-[11px] text-[#888] dark:text-[#666] mb-0.5">{item.label}</div>
                    <div className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: description */}
          <div className="flex-1 max-w-md pt-2">
            <p className="text-[16px] leading-relaxed text-[#555] dark:text-[#AAA] tracking-[-0.01em] mb-6">
              Search any NSE-listed stock to view its current price, day range, volume, and market cap in a clean, distraction-free interface.
            </p>
            <div className="space-y-3">
              {["Real-time price & change", "Day high / low range", "Volume and market cap", "52-week performance"].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-[14px] text-[#444] dark:text-[#AAA]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#F5F1E8" /><path d="M5 8L7 10L11 6" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-[#FAFAF8] dark:bg-[#111111] border border-[#EBEBEB] dark:border-[#262626]">
              <div className="text-[12px] text-[#888] dark:text-[#666] mb-3 font-medium uppercase tracking-wider">Popular Stocks</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(sym => (
                  <button
                    key={sym}
                    onClick={() => { setSelected(sym); setQuery(""); }}
                    className={`text-[12.5px] font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 ${selected === sym ? "bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] border-[#0F0F0F] dark:border-white" : "bg-white dark:bg-[#1A1A1A] text-[#555] dark:text-[#AAA] border-[#E0E0E0] dark:border-[#333] hover:border-[#0F0F0F] dark:hover:border-white"}`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleCopy}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          {copied ? "Copied!" : "Copy Result"}
        </button>
      </div>
    </section>
  );


  function SectionLabel({ number, label }) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-semibold text-[#C9A84C] tracking-[0.14em] uppercase">{number}</span>
        <div className="h-px flex-1 bg-[#F0F0F0] dark:bg-[#262626] max-w-[40px]" />
        <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">{label}</span>
      </div>

    );
  }
}