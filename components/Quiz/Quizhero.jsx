
// import React from "react";

// const TOPIC_CHIPS = [
//   { icon: "📈", label: "SIP & Investing" },
//   { icon: "🏦", label: "Banking Basics" },
//   { icon: "💹", label: "Market Concepts" },
//   { icon: "💰", label: "Tax Planning" },
// ];

// const META_ITEMS = [
//   "10 questions",
//   "~5 minutes",
//   "Instant feedback",
//   "Free forever",
// ];

// export default function QuizHero({ onStart }) {
//   return (
//     <div className="hero" style={{ paddingBottom: 0 }}>
//       {/* Badge */}
//       <div className="hero-badge">
//         <span className="hero-badge-dot" />
//         Finance Quiz · 10 Questions
//       </div>

//       {/* Title */}
//       <h1 className="hero-title">
//         Test Your <span className="gold">Financial</span> Intelligence
//       </h1>

//       {/* Subtitle */}
//       <p className="hero-sub">
//         Answer quick questions and discover how strong your finance knowledge
//         really is.
//       </p>

//       {/* Meta info */}
//       <div className="hero-meta">
//         {META_ITEMS.map((item) => (
//           <span key={item} className="hero-meta-item">
//             <span className="hero-meta-dot" />
//             {item}
//           </span>
//         ))}
//       </div>

//       {/* CTA */}
//       <div
//         style={{
//           marginTop: 36,
//           maxWidth: 480,
//           margin: "32px auto 0",
//           display: "flex",
//           flexDirection: "column",
//           gap: 10,
//         }}
//       >
//         <button
//           onClick={onStart}
//           style={{
//             padding: "14px 32px",
//             background: "#0F0F0F",
//             color: "#fff",
//             borderRadius: 14,
//             border: "none",
//             fontSize: 15,
//             fontWeight: 600,
//             letterSpacing: "-.01em",
//             cursor: "pointer",
//             transition: "all .2s",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 8,
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = "#2a2a2a";
//             e.currentTarget.style.transform = "translateY(-1px)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = "#0F0F0F";
//             e.currentTarget.style.transform = "";
//           }}
//         >
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//             <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.3" />
//             <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="white" />
//           </svg>
//           Start Quiz
//         </button>

//         <p
//           style={{
//             fontSize: 12.5,
//             color: "#BBB",
//             textAlign: "center",
//             marginTop: 8,
//           }}
//         >
//           No sign-up required · Answers explained
//         </p>
//       </div>

//       {/* Topic chips */}
//       <div
//         style={{
//           display: "flex",
//           gap: 10,
//           justifyContent: "center",
//           marginTop: 40,
//           flexWrap: "wrap",
//           paddingBottom: 40,
//         }}
//       >
//         {TOPIC_CHIPS.map((chip) => (
//           <div
//             key={chip.label}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 7,
//               padding: "8px 14px",
//               borderRadius: 12,
//               border: "1px solid #EBEBEB",
//               background: "#fff",
//               fontSize: 13,
//               color: "#555",
//               fontWeight: 500,
//               letterSpacing: "-.01em",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//             }}
//           >
//             <span>{chip.icon}</span>
//             {chip.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";

const TOPIC_CHIPS = [
  { icon: "📈", label: "SIP & Investing" },
  { icon: "🏦", label: "Banking Basics" },
  { icon: "💹", label: "Market Concepts" },
  { icon: "💰", label: "Tax Planning" },
];

const META_ITEMS = [
  "10 questions",
  "~5 minutes",
  "Instant feedback",
  "Free forever",
];

export default function QuizHero({ onStart }) {
  return (
    <div className="hero" style={{ paddingBottom: 0, textAlign: 'center' }}>
      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 18px",
          borderRadius: 100,
          background: "linear-gradient(135deg, #F5F1E8, #EDE6D3)",
          border: "1px solid #E8DFC0",
          boxShadow: "0 2px 8px rgba(201,168,76,0.12)",
          marginBottom: 20,
          fontSize: 13,
          fontWeight: 600,
          color: "#1A1A1A",
          letterSpacing: "-0.01em",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="14" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.3" />
          <path d="M5 7L8 10L11 7" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Finance Quiz
        <span style={{ width: 1, height: 14, background: "#D4C5A0" }} />
        10 Questions
      </div>

      {/* Title */}
      <h1 className="hero-title" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
        Test Your <span className="gold" style={{ color: '#D4AF37' }}>Financial</span> Intelligence
      </h1>

      {/* Subtitle */}
      <p className="hero-sub" style={{ color: '#666', marginBottom: 24 }}>
        Answer quick questions and discover how strong your finance knowledge really is.
      </p>

      {/* Meta info */}
      <div className="hero-meta" style={{ display: 'flex', gap: 15, justifyContent: 'center', fontSize: 14 }}>
        {META_ITEMS.map((item) => (
          <span key={item} className="hero-meta-item" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="hero-meta-dot" style={{ height: 4, width: 4, background: '#ccc', borderRadius: '50%' }} />
            {item}
          </span>
        ))}
      </div>

      {/* CTA Section */}
      <div
        style={{
          maxWidth: 480,
          margin: "40px auto 0", // Cleaned up redundant margin
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button
          onClick={onStart}
          style={{
            padding: "16px 32px",
            background: "#0F0F0F",
            color: "#fff",
            borderRadius: 14,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "transform 0.2s, background 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2a2a2a";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#0F0F0F";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor" />
          </svg>
          Start Quiz
        </button>

        <p style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
          No sign-up required · Answers explained
        </p>
      </div>

      {/* Topic chips */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          marginTop: 48,
          flexWrap: "wrap",
          paddingBottom: 60,
        }}
      >
        {TOPIC_CHIPS.map((chip) => (
          <div
            key={chip.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 100, // Pill shape often looks better for chips
              border: "1px solid #EEE",
              background: "#fff",
              fontSize: 14,
              color: "#444",
              fontWeight: 500,
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <span>{chip.icon}</span>
            {chip.label}
          </div>
        ))}
      </div>
    </div>
  );
}