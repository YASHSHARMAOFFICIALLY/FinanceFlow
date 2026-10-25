"use client"
import { useState, useMemo } from "react";

function Slider({ label, value, min, max, step, unit, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[13px] text-[#555] dark:text-[#A0A0A0] tracking-[-0.01em]">
          {label}
        </label>

        <span className="text-[14px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
          {unit === "₹"
            ? `₹${Number(value).toLocaleString("en-IN")}`
            : `${value}${unit}`}
        </span>
      </div>

      <div className="relative h-1.5 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-[#0F0F0F] dark:bg-white rounded-full"
          style={{ width: `${pct}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ zIndex: 2 }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-[#0F0F0F] dark:border-white shadow-sm pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>

      <div className="flex justify-between mt-1.5 text-[11px] text-[#BBB] dark:text-[#666]">
        <span>
          {unit === "₹"
            ? `₹${Number(min).toLocaleString("en-IN")}`
            : `${min}${unit}`}
        </span>
        <span>
          {unit === "₹"
            ? `₹${Number(max).toLocaleString("en-IN")}`
            : `${max}${unit}`}
        </span>
      </div>
    </div>
  );
}

function MiniDonut({ invested, returns: ret }) {
  const total = invested + ret;
  const r = 52,
    cx = 60,
    cy = 60,
    stroke = 12;
  const circ = 2 * Math.PI * r;
  const invPct = (invested / total) * circ;
  const retPct = (ret / total) * circ;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F0F0" strokeWidth={stroke} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#C9A84C" strokeWidth={stroke}
        strokeDasharray={`${invPct} ${circ}`} strokeDashoffset={circ * 0.25} strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0F0F0F"
        strokeWidth={stroke}
        strokeDasharray={`${retPct} ${circ}`}
        strokeDashoffset={circ * 0.25 - invPct}
        strokeLinecap="round"
        className="dark:stroke-white"
      />
    </svg>
  );
}

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [copied, setCopied] = useState(false);

  const { invested, estReturns, total } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthly * n;
    return { invested, estReturns: Math.round(fv - invested), total: Math.round(fv) };
  }, [monthly, rate, years]);

  const growth = invested > 0 ? ((estReturns / invested) * 100).toFixed(1) : "0.0";

  const handleCopy = async () => {
  const resultText = `
Invested Amount: ${fmt(invested)}
Estimated Returns: ${fmt(estReturns)}
Total Value: ${fmt(total)}
  `;

  try {
    await
     navigator.clipboard.writeText(resultText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (error) {
    console.error("Copy failed", error);
  }
};
  return (
    <section id="sip-calc" className="py-20 px-6 bg-[#FAFAF8] dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="02" label="SIP Calculator" />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">

          {/* Inputs */}
          <div className="flex-1 max-w-lg">
            <div className="bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white mb-6">
                Configure Your SIP
              </div>

              <Slider label="Monthly Investment" value={monthly} min={500} max={100000} step={500} unit="₹" onChange={setMonthly}/>
              <Slider label="Expected Return Rate" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate}/>
              <Slider label="Investment Duration" value={years} min={1} max={40} step={1} unit=" yrs" onChange={setYears}/>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 max-w-md flex flex-col gap-4">

            {/* Highlight */}
            <div className="bg-[#0F0F0F] text-white rounded-2xl p-6">
              <div className="text-[12px] text-white/50 uppercase mb-2">
                Total Value at Maturity
              </div>
              <div className="text-[40px] font-bold">{fmt(total)}</div>
              <div className="text-[13px] text-[#C9A84C]">
                +{growth}% total returns
              </div>
            </div>

            <div className="mt-4 flex justify-center">
  <button
    onClick={handleCopy}
    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
  >
    {copied ? "Copied!" : "Copy Result"}
  </button>
</div>

            <div className="flex gap-4">
              {/* Donut */}
              <div className="bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] rounded-2xl p-5 flex flex-col items-center flex-1">
                <MiniDonut invested={invested} returns={estReturns} />

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-[12px] text-[#555] dark:text-[#A0A0A0]">
                    <span className="w-2.5 h-2.5 bg-[#C9A84C]" />Invested
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#555] dark:text-[#A0A0A0]">
                    <span className="w-2.5 h-2.5 bg-[#0F0F0F] dark:bg-white" />Returns
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="flex flex-col gap-3 flex-1">
                {[
                  { label: "Invested Amount", value: fmt(invested), color: "#C9A84C" },
                  { label: "Estimated Returns", value: fmt(estReturns), color: "#0F0F0F" },
                  { label: "Total Value", value: fmt(total), color: "#0F0F0F" },
                ].map((item) => (
                  <div key={item.label} className="bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] rounded-xl p-4">
                    <div className="w-5 h-0.5 mb-3" style={{ background: item.color }} />
                    <div className="text-[11.5px] text-[#888] dark:text-[#A0A0A0]">
                      {item.label}
                    </div>
                    <div className="text-[17px] font-bold text-[#0F0F0F] dark:text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[11px] font-semibold text-[#C9A84C] uppercase">
        {number}
      </span>
      <div className="h-px bg-[#E8E8E8] dark:bg-[#2A2A2A] w-10" />
      <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white">
        {label}
      </span>
    </div>
  );
}