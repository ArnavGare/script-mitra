
import React from "react";

export default function Logo() {
  return (
    <span
      className={`
        font-extrabold
        text-[2.05rem] sm:text-[2.6rem] md:text-[2.85rem] lg:text-[3rem]
        tracking-wide
        select-none
        font-playfair
        drop-shadow-lg
        transition-all
        text-white
        relative
        px-3
        py-1.5
        rounded-xl
        header-logo-premium
      `}
      style={{
        letterSpacing: "0.08em",
        textShadow: `
          0 4px 34px #8f88ff88,
          0 0px 11px #4dedfa88,
          0 2px 6px #13ffc733,
          0 0px 0.5px #fff
        `,
      }}
      aria-label="Automation Mitra"
    >
      <span className="relative z-10 drop-shadow-[0_3px_12px_#38e0ffd0]">
        Automation Mitra
      </span>
      {/* Subtle animated gradient background glow behind text for premium style */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl pointer-events-none z-0 animate-headline-premium-glow"
        style={{
          background:
            "linear-gradient(92deg,rgba(76,252,255,0.28) 10%,rgba(188,124,255,0.28) 65%,rgba(182,240,255,0.17) 100%)",
          filter: "blur(7px) brightness(1.15)",
          opacity: 0.69,
        }}
      />
      <style>
        {`
          .header-logo-premium {
            box-shadow: 0 1.7px 16px #33fdf82d, 0 2px 8px #5673ff22;
          }
          @media (max-width: 640px) {
            .header-logo-premium {
              font-size: 2.05rem !important;
              padding-left: 0.3em;
              padding-right: 0.3em;
            }
          }
          @keyframes headline-premium-glow {
            0% { filter: blur(7px) brightness(1.12); opacity: .64; }
            50% { filter: blur(11px) brightness(1.24); opacity: .98; }
            100% { filter: blur(7px) brightness(1.12); opacity: .64; }
          }
          .animate-headline-premium-glow {
            animation: headline-premium-glow 2.2s ease-in-out infinite;
          }
        `}
      </style>
    </span>
  );
}
