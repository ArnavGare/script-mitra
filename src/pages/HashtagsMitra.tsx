import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MotionGridBg from "@/components/MotionGridBg";

const rotatingPlaceholders = [
  "e.g. How to get rich in 2025…",
  "e.g. Top 5 mutual fund myths…",
  "e.g. Insurance tips for new parents…",
  "e.g. Mastering Instagram reels…",
  "e.g. Travel hacks on a budget…",
  "e.g. Daily fitness motivation…",
  "e.g. Startups for Gen Z in India…"
];

const tips = [
  "Be specific about your niche (e.g. 'personal finance for millennials').",
  "Use emotion-focused language (joy, fear, curiosity, etc.).",
  "Mention target audience or platform in your script.",
  "Add trending keywords or phrases as context.",
  "Keep your script concise for better hashtag detection."
];

// Util to copy hashtags
function copyHashtags(tags: string[]) {
  navigator.clipboard.writeText(tags.map((t) => `#${t}`).join(" ")).then(() => {
    toast.success("Copied all hashtags!");
  });
}

export default function HashtagsMitra() {
  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Animate placeholder
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPlaceholderIdx((idx) => (idx + 1) % rotatingPlaceholders.length);
    }, 2300);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  // Generate hashtags using OpenAI Edge Function (assumed POST /api/generate-hashtags, replace with your endpoint)
  async function handleGenerate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim()) {
      toast.error("Paste your script first!");
      return;
    }
    setIsLoading(true);
    setHashtags([]);
    try {
      const res = await fetch("/api/generate-hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: input }),
      });
      if (!res.ok) throw new Error("Could not generate hashtags");
      const data = await res.json();
      setHashtags(data.hashtags || []);
      if (!data.hashtags || data.hashtags.length === 0)
        toast.error("No hashtags found. Try revising your script!");
    } catch (err) {
      // Demo: fallback dummy data
      setHashtags([
        "ViralGrowth", "ForYou", "InstaSuccess",
        "Trending2025", "LifeHacks", "FinanceTips",
        "StartupIndia", "Motivation", "HotTopic", "SocialMedia",
        "ViralReels", "NicheTribe"
      ]);
      toast("Showing sample hashtags (demo mode)");
    }
    setIsLoading(false);
  }

  return (
    <>
      <Header />
      <MotionGridBg />
      <div
        className="min-h-screen flex flex-col items-center justify-center py-10 px-2 relative overflow-hidden bg-black">
        {/* Animated Motion Grid BG Overlays, matching the main page */}
        {/* Animation layer uses a grid pattern with subtle shimmer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full -z-10"
        >
          {/* Main animated grid: soft lines + animated dots */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.02)_1px,_transparent_1px)] [background-size:36px_36px] animate-[gradientX_16s_linear_infinite] opacity-70"></div>
          {/* Animated subtle grid shimmer */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90vw] h-48 rounded-full blur-3xl bg-gradient-to-r from-[#383afc0a] via-[#8f68f914] to-[#16f8ef09] animate-pulse opacity-80 pointer-events-none" />
        </div>
        <section className="max-w-2xl w-full mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white tracking-tight text-center font-playfair headline-glow">
            🔥 Hashtags Mitra – Your Viral Boost Partner
          </h1>
          <p className="mt-0 mb-6 text-cyan-100 font-medium text-lg text-center px-2 drop-shadow">
            Paste your script and get trending, niche-relevant hashtags instantly.
          </p>
          <form onSubmit={handleGenerate} className="w-full flex flex-col gap-5">
            <Textarea
              className="bg-white/10 dark:bg-black/30 border-cyan-600 placeholder:text-blue-200/75 rounded-2xl shadow-lg text-lg text-white min-h-[128px] max-h-72 resize-vertical font-medium px-5 py-4 focus:ring-2 focus:ring-cyan-500"
              placeholder={rotatingPlaceholders[placeholderIdx]}
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={6}
              autoFocus
              disabled={isLoading}
            />
            <Button
              size="lg"
              type="submit"
              disabled={isLoading}
              className="neon-pill-btn notion-button-primary w-full rounded-full text-xl font-semibold py-3 tracking-wide"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Generating Hashtags...
                </span>
              ) : (
                <>
                  <Sparkles className="text-yellow-300" />
                  Generate Hashtags
                </>
              )}
            </Button>
          </form>

          {/* Hashtag Output */}
          {hashtags.length > 0 && (
            <div className="w-full mt-8 flex flex-col items-center gap-2 fade-in">
              <div className="flex flex-wrap justify-center gap-2 mb-2">
                {hashtags.map((tag, i) => (
                  <Badge key={tag+i} variant="secondary" className="rounded-full px-4 py-2 font-mono text-lg bg-gradient-to-r from-[#3ddadf] via-[#9877ec] to-[#9f8af3] text-white shadow hover:scale-105 transition duration-300 cursor-pointer select-text">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <Button
                size="sm"
                className="notion-button-secondary rounded-full px-5 mt-2"
                onClick={() => copyHashtags(hashtags)}
              >
                Copy All
              </Button>
            </div>
          )}

          {/* Tips Toggle Section */}
          <div className="mt-8 text-center">
            <button
              type="button"
              className="text-cyan-400 underline underline-offset-4 hover:text-purple-300 font-bold transition"
              onClick={() => setShowTips(v => !v)}
            >
              {showTips ? "Hide" : "💡 Tips"} for Better Hashtags
            </button>
            {showTips && (
              <ul className="mt-4 list-disc list-inside text-cyan-200 text-base animate-fade-in-up max-w-lg mx-auto text-left">
                {tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
