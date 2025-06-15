
import React from "react";

export default function MotionGridBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 w-full h-full -z-10 overflow-hidden"
      style={{ WebkitMaskImage: "linear-gradient(to bottom, white 80%, transparent 100%)" }}
    >
      {/* Animated grid dots/lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#6ee7ff22_1px,_transparent_1.6px)] [background-size:42px_42px] animate-gradient-motion opacity-60"></div>
      {/* Animated colored gradient lights and flows */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a135fd7] via-[#110a26dd] to-[#070b1ed7]"></div>
      {/* Deep blue glow at top */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[80vw] h-56 rounded-full blur-3xl bg-gradient-to-r from-[#3638fc40] via-[#48f5f518] to-[#7646ff22] animate-bg-pulse"></div>
      {/* Side cyan & purple moving glow */}
      <div className="absolute -left-24 top-1/4 w-72 h-36 rounded-full blur-2xl bg-gradient-to-br from-[#68f9fa44] to-[#896bfa22] animate-orbit"></div>
      <div className="absolute -right-16 bottom-0 w-60 h-32 rounded-full blur-2xl bg-gradient-to-br from-[#a06fff33] via-[#39e3fc29] to-[#2e106559] animate-float-delayed"></div>
      {/* Subtle dark falloff at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
      <style>
        {`
          @keyframes gradient-motion {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 52%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-motion {
            animation: gradient-motion 16s linear infinite;
          }
          @keyframes bg-pulse {
            0%,100% { filter: blur(68px) brightness(1.13); opacity: 0.67;}
            50% { filter: blur(92px) brightness(1.27); opacity: 1; }
          }
          .animate-bg-pulse {
            animation: bg-pulse 7s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

