
import React from "react";

export default function Logo() {
  return (
    <span
      className="font-extrabold text-[1.44rem] sm:text-[1.72rem] tracking-[0.031em] select-none font-inter logo-premium-gradient"
      style={{
        background:
          "linear-gradient(92deg,#d6faff 7%,#31ffc7 27%,#a7bcff 58%,#8882ff 80%,#fff4 95%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 2px 12px #45f5ff24) drop-shadow(0 0.5px 3px #7675f22e)",
        textShadow: "0 3px 18px #90e3ff13,0 1.5px 6px #c6bfff20",
        letterSpacing: "0.07em",
        lineHeight: 1.11,
      }}
      aria-label="Automation Mitra"
    >
      Automation Mitra
    </span>
  );
}
