
import React from "react";

export default function Hero() {
  return (
    <div className="text-center mb-7 select-none">
      <h1
        className="inline-block text-[2.6rem] sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight font-playfair"
        style={{
          color: "#fff",
          filter: "drop-shadow(0 2px 4px #1118) drop-shadow(0 0.5px 20px #b6d6ff88)",
          textShadow: `
            0 0 4px #27272a, 
            0 2px 12px #4f95ff88,
            0 4px 48px #4f95ff33
          `,
        }}
      >
        Hashtags Mitra
      </h1>
    </div>
  );
}
