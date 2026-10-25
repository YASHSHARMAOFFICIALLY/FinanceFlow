"use client"
import { useEffect, useRef, useState } from "react";
import QuizHero from "./Quizhero";
import ProgressBar from "./Progressbar";
import QuizCard from "./QuizCard";
import QuizResult from "./QuizResult";
import { QUESTIONS } from "@/data/question";

// ── Sound effects via Web Audio API ───────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);

    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.setValueAtTime(262, ctx.currentTime + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch {}
}

// ── Streak badge ───────────────────────────────────────────
function StreakBadge({ streak }) {
  if (streak < 2) return null;
  return (
    <div className="text-center mb-3">
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E8DFC0] text-[12px] text-[#8B7340] font-semibold"
        style={{ animation: "popIn 0.4s cubic-bezier(0.4,0,0.2,1) both" }}
      >
        🔥 {streak} in a row!
      </span>
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          65%  { transform: scale(1.18) rotate(4deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── In-quiz top header ─────────────────────────────────────
function QuizHeader({ title }) {
  return (
    <div className="text-center px-6 pt-8 pb-2 ">
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E8DFC0] mb-5"
        style={{ animation: "fadeUp 0.4s ease both" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <span className="text-[12px] text-[#8B7340] font-medium tracking-wide">
          {title}
        </span>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Main QuizPage ──────────────────────────────────────────
export default function QuizPage() {
  const [phase, setPhase]          = useState("intro");
  const [qIndex, setQIndex]        = useState(0);
  const [score, setScore]          = useState(0);
  const [answered, setAnswered]    = useState(false);
  const [selectedIdx, setSelected] = useState(null);
  const [isCorrect, setIsCorrect]  = useState(false);
  const [streak, setStreak]        = useState(0);
  const [cardKey, setCardKey]      = useState(0);
  const savedResultRef = useRef(false);

  const currentQuestion = QUESTIONS[qIndex];

  useEffect(() => {
    if (phase !== "result" || savedResultRef.current) {
      return;
    }

    savedResultRef.current = true;

    void fetch("/api/dashboard/quiz-attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: "Finance Fundamentals",
        score,
        total: QUESTIONS.length,
      }),
    }).catch(() => null);
  }, [phase, score]);

  const handleStart = () => {
    setPhase("quiz");
    setQIndex(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setIsCorrect(false);
    setStreak(0);
    setCardKey((k) => k + 1);
    savedResultRef.current = false;
  };

  const handleAnswer = (idx) => {
    if (idx === "next") {
      if (qIndex + 1 >= QUESTIONS.length) {
        setPhase("result");
      } else {
        setQIndex((i) => i + 1);
        setAnswered(false);
        setSelected(null);
        setIsCorrect(false);
        setCardKey((k) => k + 1);
      }
      return;
    }

    const correct = idx === currentQuestion.correct;
    setSelected(idx);
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) { setScore((s) => s + 1); setStreak((s) => s + 1); playSound("correct"); }
    else         { setStreak(0); playSound("wrong"); }
  };

  if (phase === "intro") return <QuizHero onStart={handleStart} />;

  if (phase === "result") return (
    <>
      <QuizHeader title="Quiz Complete" />
      <h1
        className="text-center text-[32px] font-semibold tracking-[-0.03em] text-[#0F0F0F] mb-6 px-6"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Here&apos;s How You Did
      </h1>
      <QuizResult score={score} total={QUESTIONS.length} onRetry={handleStart} />
    </>
  );

  return (
    <>
      <QuizHeader title="Finance Quiz" />
      <h1
        className="text-center text-[30px] font-semibold tracking-[-0.03em] text-[#0F0F0F] mb-6 px-6"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Test Your Financial Intelligence
      </h1>
      <StreakBadge streak={streak} />
      <ProgressBar current={qIndex} total={QUESTIONS.length} />
      <div className=" mx-auto px-6 pb-24">
        <div key={cardKey}>
          <QuizCard
            question={currentQuestion}
            qIndex={qIndex}
            total={QUESTIONS.length}
            answered={answered}
            selectedIdx={selectedIdx}
            isCorrect={isCorrect}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    </>
  );
}
