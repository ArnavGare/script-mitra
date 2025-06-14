
import React, { useEffect, useRef, useState } from "react";

const tips = [
  "Pro Tip: Start your video with a question to grab attention instantly.",
  "Did you know? Posting consistently helps you grow your audience faster.",
  "Editing your video for mobile viewers improves engagement.",
  "Keep scripts short and sweet for social media reels & shorts.",
  "Smiling while speaking makes your tone sound friendlier on camera.",
  "A strong CTA can boost your leads by 50%!",
  "Don't forget: trending topics can double your reach.",
  "Record in a quiet environment for better audio quality.",
  "Try to use natural light – it flatters every face!",
  "End with a fun fact or a teaser for your next video.",
  "Check analytics weekly and double down on content that works.",
  "Speak clearly and avoid jargon for broader appeal.",
  "Keep a sheet of your best hooks and openers handy.",
  "Batch record scripts to save time during the week.",
  "Short captions work best on Instagram and YouTube Shorts.",
  "Engage in comments to build a real community."
];

const INTERVAL_MS = 2600;

const ScriptGenerationTips = () => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * tips.length));
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % tips.length);
        setFade(true);
      }, 350); // Fade out, then change tip, then fade in
    }, INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-4 min-h-[44px]">
      <div
        className={`transition-opacity duration-300 text-base md:text-lg text-blue-700 dark:text-blue-300 font-medium text-center px-2 ${fade ? "opacity-100" : "opacity-0"}`}
        aria-live="polite"
      >
        <span className="inline-flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400 animate-spin-slow mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" /></svg>
          {tips[index]}
        </span>
      </div>
    </div>
  );
};

export default ScriptGenerationTips;
