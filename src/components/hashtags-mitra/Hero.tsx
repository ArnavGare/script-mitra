
import React from "react";

export default function Hero() {
  return (
    <div className="text-center mb-7 select-none">
      <h1
        className="inline-block text-[2.6rem] sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight font-playfair headline-glow"
        style={{
          background: "linear-gradient(92deg, #fff 30%, #dbeafe 70%, #4f95ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 2px 4px #1118) drop-shadow(0 0.5px 20px #b6d6ff88)",
          textShadow: `
            0 0 3px #fff, 
            0 1px 32px #a5b4fdcc, 
            0 4px 32px #60a5fa66
          `
        }}
      >
        Hashtags Mitra
      </h1>
    </div>
  );
}

