
import React from "react";

export default function Logo() {
  return (
    <span
      className={`
        font-display font-extrabold 
        text-[1.6rem] sm:text-[2rem] tracking-wide select-none
        bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400
        bg-clip-text text-transparent 
        drop-shadow-md headline-glow-animation
      `}
      style={{
        letterSpacing: "0.085em",
        textShadow:
          "0 0 14px #84e0fe4e, 0 0 3px #b993fe50, 0 0 1.2px #fff, 0 0 0.8px #fff",
        filter: "brightness(1.11)",
        transition: "filter 0.22s, text-shadow 0.22s",
      }}
      aria-label="Automation Mitra"
    >
      Automation Mitra
      <style>
        {`
          .headline-glow-animation {
            animation: am-glow-pulse 2.7s ease-in-out infinite alternate;
          }
          @keyframes am-glow-pulse {
            0% {
              text-shadow: 0 0 4px #93c5fd38, 0 0 1.2px #fff, 0 0 0px #fff;
              filter: brightness(1.06);
            }
            70% {
              text-shadow: 0 0 15px #9333ea50, 0 0 6px #7dd3fc48, 0 0 1.5px #fff, 0 0 2px #fff;
              filter: brightness(1.15);
            }
            100% {
              text-shadow: 0 0 6px #7dd3fc32, 0 0 2px #a78bfa28, 0 0 1.2px #fff, 0 0 0.4px #fff;
              filter: brightness(1.10);
            }
          }
        `}
      </style>
    </span>
  );
}
