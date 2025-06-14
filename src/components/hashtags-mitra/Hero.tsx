
import React from "react";

export default function Hero() {
  return (
    <div className="text-center mb-7 select-none">
      <h1
        className="inline-block text-[2.2rem] sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-wide font-inter headline-glow"
        style={{
          background: "linear-gradient(90deg,rgba(255,255,255,0.98) 27%,#b7b2fc 55%,#00cfff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.08em",
          textShadow: `
            0 3px 22px #4f46e528, 
            0 0.5px 12px #93c5fd14,
            0 1.5px 4px #7dd3fc12
          `
        }}
      >
        Hashtags Mitra – <span className="font-playfair">Your Viral Boost Partner</span>
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-gray-700 dark:text-cyan-100/80 font-sans font-medium drop-shadow-sm max-w-lg mx-auto">
        Generate high-converting hashtags from your script instantly
      </p>
    </div>
  );
}
