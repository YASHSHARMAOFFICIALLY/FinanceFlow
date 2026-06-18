"use client"
import { useState, useEffect, useCallback, useRef } from "react";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
  isRealTime: boolean;
  week52High: number;
  week52Low: number;
}

const FALLBACK_STOCKS: Record<string, StockData> = {
  TCS:      { symbol: "TCS",      name: "Tata Consultancy Services", price: 3842, change: 47.2,  changePercent: 1.24,  high: 3901, low: 3810, volume: "18.4L", marketCap: "13.94L Cr", week52High: 0, week52Low: 0, isRealTime: false },
  RELIANCE: { symbol: "RELIANCE", name: "Reliance Industries",       price: 2745, change: 48.6,  changePercent: 1.80,  high: 2789, low: 2718, volume: "22.1L", marketCap: "18.58L Cr", week52High: 0, week52Low: 0, isRealTime: false },
  INFY:     { symbol: "INFY",     name: "Infosys Ltd",               price: 1498, change: -9.5,  changePercent: -0.63, high: 1519, low: 1487, volume: "14.7L", marketCap: "6.21L Cr",  week52High: 0, week52Low: 0, isRealTime: false },
  HDFC:     { symbol: "HDFC",     name: "HDFC Bank",                 price: 1652, change: 6.9,   changePercent: 0.42,  high: 1671, low: 1638, volume: "9.8L",  marketCap: "12.52L Cr", week52High: 0, week52Low: 0, isRealTime: false },
  WIPRO:    { symbol: "WIPRO",    name: "Wipro Ltd",                  price: 487,  change: -5.6,  changePercent: -1.15, high: 502,  low: 484,  volume: "11.2L", marketCap: "2.53L Cr", week52High: 0, week52Low: 0, isRealTime: false },
  BAJAJ:    { symbol: "BAJAJ",    name: "Bajaj Finance",             price: 6934, change: 156.8, changePercent: 2.31,  high: 7012, low: 6870, volume: "6.4L",  marketCap: "4.18L Cr",  week52High: 0, week52Low: 0,isRealTime: false },
};

const SUGGESTIONS = ["TCS", "RELIANCE", "INFY", "HDFC", "WIPRO", "BAJAJ"];

function formatIndianVolume(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000)   return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000)     return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

async function fetchRealTimeStock(symbol: string): Promise<StockData | null> {
  try {
    const yahooSymbol = SUGGESTIONS.includes(symbol) ? `${symbol}.NS` : symbol;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error("Proxy fetch failed");

    const outer = await res.json();
    const data = JSON.parse(outer.contents);
    const result = data?.chart?.result?.[0];
    if (!result) throw new Error("No data");

    const meta = result.meta;
    const price     = meta.regularMarketPrice;
    const prevClose = meta.previousClose || meta.chartPreviousClose || price;
    const change    = price - prevClose;
    const changePct = prevClose !== 0 ? (change / prevClose) * 100 : 0;


    return {
      symbol,
      name:          FALLBACK_STOCKS[symbol]?.name || meta.shortName || symbol,
      price:         Math.round(price * 100) / 100,
      change:        Math.round(change * 100) / 100,
      changePercent: Math.round(changePct * 100) / 100,
      high:          Math.round(meta.regularMarketDayHigh),
      low:           Math.round(meta.regularMarketDayLow),
      volume:        formatIndianVolume(meta.regularMarketVolume),
      marketCap:     meta.marketCap ? formatIndianVolume(meta.marketCap) : "N/A",
      isRealTime:    true,
    };
  } catch {
    return null;
  }
}

function MiniChart({ positive }: { positive: boolean }) {
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
          <stop offset="0%"   stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#g${positive})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StockMarketTool() {
  const [query,       setQuery]       = useState("");
  const [selected,    setSelected]    = useState("RELIANCE");
  const [stock,       setStock]       = useState<StockData>(FALLBACK_STOCKS["RELIANCE"]);
  const [loading,     setLoading]     = useState(false);
  const [copied,      setCopied]      = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const fetchVersion = useRef(0);
  const loadStock = useCallback(async (symbol: string) => {
    setLoading(true);
    const version = ++fetchVersion.current;
    const realData = await fetchRealTimeStock(symbol);
    if (version !== fetchVersion.current) return;
    if (realData) {
      setStock(realData);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    } else {
      setStock(FALLBACK_STOCKS[symbol] || FALLBACK_STOCKS["RELIANCE"]);
      setLastUpdated("");
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadStock(selected); }, [selected, loadStock]);

  useEffect(() => {
    const interval = setInterval(() => loadStock(selected), 60000);
    return () => clearInterval(interval);
  }, [selected, loadStock]);

  const positive = stock.changePercent >= 0;

  const filtered = SUGGESTIONS.filter(s =>
    s.includes(query.toUpperCase()) ||
    FALLBACK_STOCKS[s]?.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = async () => {
    const text = `${stock.name} (${stock.symbol})
Price: ₹${stock.price.toLocaleString("en-IN")}
Change: ${stock.changePercent >= 0 ? "+" : ""}${stock.changePercent}%
Day High: ₹${stock.high} | Day Low: ₹${stock.low}
Volume: ${stock.volume} | Market Cap: ${stock.marketCap}
${stock.isRealTime ? `Updated: ${lastUpdated}` : "Showing estimated data"}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { console.error("Copy failed"); }
  };

  return (
    <section id="stock-tool" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="01" label="Stock Market Tool" />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">

          {/* Left */}
          <div className="flex-1 max-w-lg">
            {/* Search */}
            <div className="relative mb-6">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#262626] bg-white dark:bg-[#111111]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="#999" strokeWidth="1.4"/>
                  <path d="M11 11L14 14" stroke="#999" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input
                  className="flex-1 text-[14px] text-[#0F0F0F] dark:text-white placeholder-[#BBB] dark:placeholder-[#555] outline-none bg-transparent"
                  placeholder="Search stock (e.g. TCS, Reliance)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-[#BBB] hover:text-[#666]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
              {query && filtered.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#111] border border-[#E0E0E0] dark:border-[#262626] rounded-xl shadow-lg z-10 overflow-hidden">
                  {filtered.map(sym => (
                    <button key={sym} onClick={() => { setSelected(sym); setQuery(""); }}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#F5F5F3] dark:hover:bg-[#1A1A1A] text-left">
                      <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white">{sym}</span>
                      <span className="text-[12px] text-[#888]">{FALLBACK_STOCKS[sym]?.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-[#E8E8E8] dark:border-[#262626] bg-white dark:bg-[#111111] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] relative">
              {loading && (
                <div className="absolute inset-0 rounded-2xl bg-white/70 dark:bg-[#111]/70 flex items-center justify-center z-10 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[13px] text-[#888]">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
                      <path d="M8 2a6 6 0 016 6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Fetching live data...
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-[11px] font-semibold text-[#888] dark:text-[#666] tracking-wide uppercase">{stock.symbol} · NSE</div>
                    {stock.isRealTime ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"/>Live
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">Estimated</span>
                    )}
                  </div>
                  <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white mt-1">{stock.name}</div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${positive ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}>
                  {positive ? "▲" : "▼"} {Math.abs(stock.changePercent)}%
                </span>
              </div>

              <div className="mt-4 mb-5">
                <span className="text-[36px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.04em] leading-none">
                  ₹{stock.price.toLocaleString("en-IN")}
                </span>
                <span className={`ml-3 text-[14px] font-medium ${positive ? "text-green-600" : "text-red-500"}`}>
                  {positive ? "+" : ""}₹{Math.abs(stock.change).toFixed(2)} today
                </span>
              </div>

              <MiniChart positive={positive} />

              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-[#F0F0F0] dark:border-[#262626]">
                {[
                  { label: "Day High",   value: `₹${stock.high.toLocaleString("en-IN")}` },
                  { label: "Day Low",    value: `₹${stock.low.toLocaleString("en-IN")}` },
                  { label: "Volume",     value: stock.volume },
                  { label: "Market Cap", value: stock.marketCap },
                  { label: "52W High",   value: stock.week52High ? `₹${stock.week52High.toLocaleString("en-IN")}` : "N/A",
                  { label: "52W Low",    value: stock.week52Low ? `₹${stock.week52Low.toLocaleString("en-IN")}` : "N/A"} ,
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-[11px] text-[#888] dark:text-[#666] mb-0.5">{item.label}</div>
                    <div className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F0F0F0] dark:border-[#262626]">
                <span className="text-[11px] text-[#AAA] dark:text-[#555]">
                  {stock.isRealTime && lastUpdated ? `Updated at ${lastUpdated}` : "Live data unavailable · Showing estimates"}
                </span>
                <button onClick={() => loadStock(selected)} disabled={loading}
                  className="flex items-center gap-1.5 text-[11px] text-[#C9A84C] hover:text-[#a8893c] font-medium transition-colors disabled:opacity-50">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={loading ? "animate-spin" : ""}>
                    <path d="M10 6A4 4 0 112 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M10 3v3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button onClick={handleCopy}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-[13px] font-medium transition-colors">
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 max-w-md pt-2">
            <p className="text-[16px] leading-relaxed text-[#555] dark:text-[#AAA] tracking-[-0.01em] mb-6">
              Search any NSE-listed stock to view its live price, day range, volume, and market cap. Data refreshes automatically every 60 seconds.
            </p>
            <div className="space-y-3">
              {["Live price via Yahoo Finance API", "Day high / low range", "Volume and market cap", "Auto-refresh every 60 seconds", "Graceful fallback if API unavailable"].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-[14px] text-[#444] dark:text-[#AAA]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#F5F1E8"/>
                    <path d="M5 8L7 10L11 6" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-2xl bg-[#FAFAF8] dark:bg-[#111111] border border-[#EBEBEB] dark:border-[#262626]">
              <div className="text-[12px] text-[#888] dark:text-[#666] mb-3 font-medium uppercase tracking-wider">Popular Stocks</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(sym => (
                  <button key={sym} onClick={() => { setSelected(sym); setQuery(""); }}
                    className={`text-[12.5px] font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                      selected === sym
                        ? "bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] border-[#0F0F0F] dark:border-white"
                        : "bg-white dark:bg-[#1A1A1A] text-[#555] dark:text-[#AAA] border-[#E0E0E0] dark:border-[#333] hover:border-[#0F0F0F] dark:hover:border-white"
                    }`}>
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[11px] font-semibold text-[#C9A84C] tracking-[0.14em] uppercase">{number}</span>
      <div className="h-px flex-1 bg-[#F0F0F0] dark:bg-[#262626] max-w-[40px]" />
      <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">{label}</span>
    </div>
  );
}