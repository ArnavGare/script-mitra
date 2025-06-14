
import React, { useEffect, useState } from "react";

const TIPS = [
  "“Specificity is your superpower. Pick a niche!” – Arnav G.",
  "“Use curiosity and emotion. That’s what fuels virality.” – Tanya B.",
  "“Always add 1-2 trending keywords–not too many!” – Manu M.",
  "“Short scripts = more accurate hashtag matches.” – Lisa Q.",
  "“Test what works. Track with analytics, iterate fast.” – Genie P.",
  "“Include the platform, e.g., 'for Instagram creators'” – Expert Panel",
];

export default function TipCarousel({ className = "" }: { className?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1)%TIPS.length), 4800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`flex justify-center items-center transition-all ${className}`}>
      <div className="bg-gradient-to-br from-white/70 via-cyan-100/60 to-purple-100/60 dark:from-gray-900/90 dark:to-purple-950/50 glass-input rounded-xl shadow-md px-6 py-3 text-lg text-gray-700 dark:text-cyan-100 font-display font-medium animate-fade-in transition-all w-full sm:w-auto max-w-2xl text-center select-none min-h-[56px]">
        <span className="transition-all duration-500">{TIPS[current]}</span>
      </div>
    </div>
  );
}
