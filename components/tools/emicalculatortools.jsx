"use client"
import { useState, useMemo } from "react";

function Slider({ label, value, min, max, step, unit, prefix, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  const display = prefix
    ? `${prefix}${Number(value).toLocaleString("en-IN")}`
    : `${value}${unit}`;
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[13px] text-[#555] dark:text-[#AAA]">{label}</label>
        <span className="text-[14px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">{display}</span>
      </div>
      <div className="relative h-1.5 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full">
        <div className="absolute top-0 left-0 h-full bg-[#0F0F0F] dark:bg-white rounded-full" style={{ width: `${pct}%` }}/>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" style={{ zIndex: 2 }}/>
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#1A1A1A] border-2 border-[#0F0F0F] dark:border-white shadow-sm pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}/>
      </div>
      <div className="flex justify-between mt-1.5 text-[11px] text-[#BBB] dark:text-[#555]">
        <span>{prefix ? `${prefix}${Number(min).toLocaleString("en-IN")}` : `${min}${unit}`}</span>
        <span>{prefix ? `${prefix}${Number(max).toLocaleString("en-IN")}` : `${max}${unit}`}</span>
      </div>
    </div>
  );
}

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function EmiCalculator() {
  const [copied, setCopied] = useState(false);
  const [loan, setLoan] = useState(2000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayment, totalInterest, interestPct } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = tenure * 12;
    const emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loan;
    const interestPct = Math.round((totalInterest / totalPayment) * 100);
    return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest), interestPct };
  }, [loan, rate, tenure]);
        const handleCopy = async () => {
  const resultText = `
Monthly EMI: ${fmt(emi)}
Loan Amount: ${fmt(loan)}
Interest Payable: ${fmt(totalInterest)}
Total Payment: ${fmt(totalPayment)}
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
    <section id="emi-calc" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="03" label="EMI Calculator" />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Inputs */}
          <div className="flex-1 max-w-lg">
            <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#262626] rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white mb-6">Configure Your Loan</div>
              <Slider label="Loan Amount" value={loan} min={100000} max={10000000} step={50000} prefix="₹" onChange={setLoan}/>
              <Slider label="Annual Interest Rate" value={rate} min={1} max={20} step={0.1} unit="%" onChange={setRate}/>
              <Slider label="Loan Tenure" value={tenure} min={1} max={30} step={1} unit=" yrs" onChange={setTenure}/>

              {/* Loan type tabs */}
              <div className="mt-4 pt-4 border-t border-[#F0F0F0] dark:border-[#262626]">
                <div className="text-[11.5px] text-[#888] dark:text-[#666] mb-3">Loan Type Presets</div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: "Home Loan", r: 8.5, t: 20, l: 3000000 },
                    { label: "Car Loan", r: 9.5, t: 5, l: 800000 },
                    { label: "Personal", r: 14, t: 3, l: 500000 },
                  ].map(p => (
                    <button key={p.label}
                      onClick={() => { setRate(p.r); setTenure(p.t); setLoan(p.l); }}
                      className="text-[12px] font-medium px-3 py-1.5 rounded-lg border border-[#E0E0E0] dark:border-[#333] text-[#555] dark:text-[#AAA] hover:border-[#0F0F0F] dark:hover:border-white hover:text-[#0F0F0F] dark:hover:text-white transition-all duration-150">
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 max-w-md flex flex-col gap-4">
            {/* Monthly EMI hero */}
            <div className="bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] rounded-2xl p-6">
              <div className="text-[12px] text-white/50 dark:text-black/40 uppercase tracking-wider mb-2">Monthly EMI</div>
              <div className="text-[40px] font-bold tracking-[-0.04em] leading-none">{fmt(emi)}</div>
              <div className="mt-4 h-1.5 bg-white/10 dark:bg-black/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A84C] rounded-full transition-all duration-500" style={{ width: `${interestPct}%` }}/>
              </div>
              <div className="flex justify-between mt-2 text-[12px] text-white/50 dark:text-black/40">
                <span>Principal {100 - interestPct}%</span>
                <span>Interest {interestPct}%</span>
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

            {/* Breakdown cards */}
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Principal Amount", value: fmt(loan), color: "#C9A84C", icon: "P" },
                { label: "Total Interest Payable", value: fmt(totalInterest), color: "#FF6B6B", icon: "I" },
                { label: "Total Payment", value: fmt(totalPayment), color: "#0F0F0F", icon: "T" },
              ].map(item => (
                <div key={item.label} className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#262626] rounded-xl px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white" style={{ background: item.color }}>
                      {item.icon}
                    </div>
                    <span className="text-[13px] text-[#555] dark:text-[#AAA] tracking-[-0.01em]">{item.label}</span>
                  </div>
                  <span className="text-[15px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#F5F1E8] dark:bg-[#1E1A10] border border-[#E8DFC0] dark:border-[#3A3010] rounded-xl px-5 py-4 text-[13px] text-[#8B7340] dark:text-[#C9A84C] leading-relaxed">
              💡 You&apos;ll pay <strong>{interestPct}%</strong> of your total payment as interest over {tenure} years.
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
      <span className="text-[11px] font-semibold text-[#C9A84C] tracking-[0.14em] uppercase">{number}</span>
      <div className="h-px bg-[#E8E8E8] dark:bg-[#262626] max-w-[40px] w-10"/>
      <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">{label}</span>
    </div>
  );
}
