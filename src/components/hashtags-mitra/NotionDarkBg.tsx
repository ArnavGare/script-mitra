
import React from "react";

/**
 * A premium dark mode linear gradient + subtle edge glow, inspired by Notion's dark backgrounds.
 * Does not interfere with the grid.
 */
export default function NotionDarkBg() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-20 pointer-events-none transition-colors duration-700"
      style={{
        // Main dark gradient
        background:
          "linear-gradient(120deg, #1c1927 0%, #211e31 60%, #0f1124 100%)",
      }}
    >
      {/* Top edge glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[92vw] h-[140px] md:h-[180px] blur-2xl opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, #a6e1fc36 0%, #591aec15 92%, transparent 100%)",
        }}
      />
      {/* Bottom edge glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[95vw] h-[120px] md:h-[150px] blur-2xl opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, #311a5740 0%, #1aecc516 60%, transparent 95%)",
        }}
      />
      {/* Left vertical glow */}
      <div
        className="absolute top-0 left-[-8vw] h-[110vh] w-[76px] blur-[80px] opacity-70"
        style={{
          background:
            "linear-gradient(180deg, #38e0ffd7 0%, #4400ffaa 60%, transparent 100%)",
        }}
      />
      {/* Right vertical glow */}
      <div
        className="absolute top-0 right-[-6vw] h-[120vh] w-[54px] blur-[70px] opacity-60"
        style={{
          background:
            "linear-gradient(180deg, #a472ffc1 10%, #60feff52 100%, transparent 100%)",
        }}
      />
    </div>
  );
}
