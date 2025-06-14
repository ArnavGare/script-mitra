
import React from "react";

export default function Hero() {
  return (
    <div className="text-center mb-7 select-none">
      <h1
        className="inline-block font-playfair text-[2.8rem] sm:text-5xl md:text-6xl font-bold tracking-tight headline-glow uppercase"
        style={{
          background: "linear-gradient(90deg,#a1faff 5%, #64e9ff 33%,#b6d6ff 60%,#b7aaff 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          padding: "0.18em 1.3em",
          borderRadius: "1em",
          boxShadow:
            "0 2.5px 48px #4ee0ffb6, 0 0.5px 18px #b07fff80, 0 0.5px 12px #4f46e540",
          textShadow: `
            0 2px 36px #3ddadfb9,
            0 6px 42px #6de6f5cc,
            0 4px 24px #8adaff70,
            0 1.5px 10px #b7adff80
          `,
          letterSpacing: "0.01em",
          fontWeight: 700
        }}
      >
        Hashtags Mitra
      </h1>
    </div>
  );
}
