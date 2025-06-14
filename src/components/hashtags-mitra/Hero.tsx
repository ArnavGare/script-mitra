
import React from "react";

export default function Hero() {
  return (
    <div className="text-center mb-7 select-none">
      <h1
        className="inline-block text-[2.5rem] sm:text-5xl md:text-6xl font-bold tracking-tight font-playfair headline-glow"
        style={{
          background: "linear-gradient(88deg, #fff 20%, #b6d6ff 60%, #3ddadf 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: `
            0 2px 16px #3ddadf80,
            0 6px 36px #5de3f7bb,
            0 4px 30px #4f46e540,
            0 1.5px 12px #d7dbff70
          `,
          letterSpacing: "0.01em"
        }}
      >
        Hashtags Mitra
      </h1>
    </div>
  );
}
