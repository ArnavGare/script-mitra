
import React from "react";

export default function Hero() {
  return (
    <div className="text-center mb-7 select-none">
      <h1
        className="inline-block text-[2.4rem] sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight font-playfair headline-glow"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,1) 20%, #d7dbff 60%, #b6d6ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: `
            0 4px 30px #4f46e530, 
            0 1px 12px #b6d6ff50
          `
        }}
      >
        Hashtags Mitra
      </h1>
    </div>
  );
}
