
import { Carousel } from "recharts";
import { useState } from "react";

const cards = [
  {
    title: "Algorithm Tips",
    content: [
      "Post at audience-active hours (evenings, weekends).",
      "Use platform-native tools (Reels, Shorts).",
      "Engage within 30 mins of posting.",
      "Boost retention – bait curiosity, tell stories."
    ]
  },
  {
    title: "Hashtag Strategy",
    content: [
      "Mix broad + niche + branded hashtags.",
      "Update tags based on performance analytics.",
      "Don’t overuse; 3 to 6 relevant tags per post."
    ]
  },
  {
    title: "Consistency Hacks",
    content: [
      "Batch shoot & schedule content weekly.",
      "Use content calendars to plan topics.",
      "Repurpose winning ideas. Stay inspired."
    ]
  },
  {
    title: "Top-Performing Creators",
    content: [
      "@financewithraja – 2M+ followers with daily explainers.",
      "@finshotsdaily – Consistency + visuals = viral success.",
      "@ca_rohit – Hooks + humor growing rapidly."
    ]
  }
];

export default function GrowOnSocial() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <main className="flex flex-col items-center min-h-[80vh] py-14 px-4 bg-[#181f2e]">
      <h1 className="text-3xl md:text-4xl font-extrabold neon-text text-center mb-10">
        Grow on Social Media
      </h1>
      <div className="w-full max-w-3xl mb-10">
        <div className="flex items-center justify-center gap-4">
          {cards.map((card, idx) => (
            <button
              key={idx}
              className={`rounded-full px-4 py-2 font-semibold 
                ${activeIdx === idx ? "neon-gradient-bg text-white" : "bg-[#232044]/80 text-[#b1b5dd]"}
                transition-all duration-150 hover:scale-105`}
              onClick={() => setActiveIdx(idx)}
            >
              {card.title}
            </button>
          ))}
        </div>
        <div className="w-full mt-7">
          <div className="rounded-xl bg-[#232044]/90 neon-glow-panel p-7 md:p-10 shadow-xl animate-fade-in-up min-h-[180px] transition-all">
            <ul className="space-y-2">
              {cards[activeIdx].content.map((point, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-sky-400 font-bold animate-pulse">●</span>
                  <span className="text-[#e0e7ef] font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="inline-flex items-center px-6 py-3 neon-gradient-bg rounded-full text-white font-bold text-lg shadow-lg transition hover:scale-105 hover:shadow-xl animate-fade-in-up"
      >
        📥 Download Free Viral Growth Blueprint (PDF)
      </a>
    </main>
  );
}
