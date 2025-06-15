
import React from "react";

export default function Logo() {
  return (
    <span
      className="font-extrabold text-white text-[1.6rem] sm:text-[2rem] tracking-wide select-none font-playfair drop-shadow-md headline-glow-animation"
      style={{
        letterSpacing: "0.085em",
        textShadow: "0 0 18px #7dd3fc88, 0 0 5px #8b5cf688, 0 0 1.5px #fff, 0 0 0.5px #fff",
        filter: "brightness(1.10)",
        transition: "filter 0.25s, text-shadow 0.25s",
      }}
      aria-label="Automation Mitra"
    >
      Automation Mitra
      <style>
        {`
          .headline-glow-animation {
            animation: am-glow-pulse 2.6s ease-in-out infinite alternate;
          }
          @keyframes am-glow-pulse {
            0% {
              text-shadow: 0 0 8px #93c5fd50, 0 0 1.5px #fff, 0 0 0px #fff;
              filter: brightness(1.07);
            }
            70% {
              text-shadow: 0 0 22px #9333ea80, 0 0 8px #7dd3fc80, 0 0 0.5px #fff, 0 0 2px #fff;
              filter: brightness(1.13);
            }
            100% {
              text-shadow: 0 0 10px #7dd3fc60, 0 0 2px #a78bfa40, 0 0 1.5px #fff, 0 0 0.5px #fff;
              filter: brightness(1.10);
            }
          }
        `}
      </style>
    </span>
  );
}
