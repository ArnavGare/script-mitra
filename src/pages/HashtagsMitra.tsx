import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Loader2, Sparkles, ClipboardList, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MotionGridBg from "@/components/MotionGridBg";
import TipCarousel from "@/components/TipCarousel";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

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
function copyHashtags(tags: string[], notify = true) {
  navigator.clipboard.writeText(tags.map((t) => `#${t}`).join(" ")).then(() => {
    if (notify) toast.success("Copied all hashtags!");
  });
}

export default function HashtagsMitra() {
  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { copy, copiedIdx, copyAll } = useCopyToClipboard();
  const [theme, setTheme] = useState<'light'|'dark'>(() => (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  // Animate placeholder
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPlaceholderIdx((idx) => (idx + 1) % rotatingPlaceholders.length);
    }, 2800);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  // Sync theme to root
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Generate hashtags by POSTing to the webhook and parsing .output
  async function handleGenerate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim()) {
      toast.error("Paste your script first!");
      return;
    }
    setIsLoading(true);
    setHashtags([]);
    try {
      const res = await fetch("https://arnavgare01.app.n8n.cloud/webhook-test/1986a54c-73ce-4f24-a35b-0a9bae4b4950", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: input }),
      });
      if (!res.ok) throw new Error("Could not generate hashtags");
      const data = await res.json();

      let finalTags: string[] = [];
      if (data.output && typeof data.output === "string") {
        finalTags = data.output
          .split(/[#]/)
          .map(s => s.trim())
          .filter(Boolean)
          .map(tagStr => {
            const [firstWord] = tagStr.split(/\s|,|\./);
            return firstWord ? firstWord.replace(/\s/g, '') : '';
          })
          .filter(t => t.length > 0);
      } else if (Array.isArray(data.hashtags)) {
        finalTags = data.hashtags;
      } else if (Array.isArray(data.tags)) {
        finalTags = data.tags;
      }

      setHashtags(finalTags);

      if (!finalTags.length) {
        toast.error("No hashtags found. Try revising your script!");
      }
    } catch (err) {
      toast.error("Unable to generate hashtags. Please try again.");
    }
    setIsLoading(false);
  }

  return (
    <>
      <MotionGridBg />
      <Header />
      <div className="fixed right-6 top-8 z-30">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="bg-gray-300/60 dark:bg-gray-900/60 backdrop-blur px-3 py-2 rounded-full border border-gray-100/70 dark:border-gray-700 shadow-smooth hover:scale-110 transition-all"
        >
          {theme === "dark" ? <Sun size={22} className="text-yellow-300" /> : <Moon size={20} className="text-blue-600" />}
        </button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-2 bg-gradient-to-br from-[#f5f8fc] via-[#ece7fa] to-[#e9fafd] dark:from-black dark:via-[#171524] dark:to-[#110b16] transition-colors duration-500 overflow-x-hidden">
        <section className="w-full max-w-[900px] mx-auto glass-panel px-5 sm:px-9 pt-10 pb-8 rounded-2xl shadow-smooth relative z-10 border border-white/10 dark:border-white/10 backdrop-blur-lg bg-white/50 dark:bg-black/50 bg-clip-padding">
          {/* Hero */}
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
          <form onSubmit={handleGenerate} className="w-full flex flex-col gap-7">
            {/* Label */}
            <label
              htmlFor="script-input"
              className="block text-left text-base font-semibold mb-2 text-gray-700 dark:text-gray-200 font-sans"
            >
              Paste your video script here
            </label>
            <Textarea
              id="script-input"
              className="glass-input w-full font-sans text-lg min-h-[128px] max-h-72 px-6 py-4 rounded-xl shadow backdrop-blur-lg transition-border focus:border-cyan-400 bg-white/40 dark:bg-black/40 border border-white/30 dark:border-gray-800/80 placeholder-gray-400 placeholder-opacity-70 focus:ring-2 focus:ring-cyan-500"
              placeholder={rotatingPlaceholders[placeholderIdx]}
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={6}
              autoFocus
              disabled={isLoading}
              spellCheck
            />
            <Button
              size="lg"
              type="submit"
              disabled={isLoading}
              className="group w-full rounded-full py-3 text-xl font-semibold font-display bg-gradient-cyan-purple shadow-smooth text-white hover:scale-[1.03] hover:shadow-lg transition-all duration-200 ring-1 ring-blue-200/20 dark:ring-blue-900/40"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Generating Hashtags...
                </span>
              ) : (
                <>
                  <Sparkles className="text-yellow-400" />
                  <span className="ml-1">Generate Hashtags</span>
                </>
              )}
            </Button>
          </form>

          {/* Bonus: Tip of the day carousel */}
          <TipCarousel className="my-7" />

          {/* Hashtag Output */}
          {hashtags.length > 0 && (
            <div className="w-full mt-10 flex flex-col items-center gap-2 animate-fade-in">
              <div className="w-full text-center mb-2">
                <span className="text-lg font-semibold text-cyan-500 dark:text-cyan-200 tracking-wide font-display">Hashtags generated:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-3 max-w-2xl">
                {hashtags.map((tag, i) => (
                  <button
                    key={tag+i}
                    type="button"
                    onClick={() => copy(tag, i)}
                    className={`
                      group bg-gradient-to-r from-pastelteal via-pastellav to-pastelindigo dark:from-cyan-800/60 dark:via-purple-900/50 dark:to-[#222b4f] 
                      rounded-full px-5 py-2 font-mono text-base sm:text-lg font-bold text-slate-800 dark:text-white shadow hover:scale-105 
                      transition-transform duration-200 border-2 border-transparent hover:border-cyan-300 dark:hover:border-indigo-400 relative cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-cyan-300
                      before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/60 before:to-white/0 before:opacity-0 group-hover:before:opacity-10
                      after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-r after:from-blue-100/20 after:to-purple-100/10 after:opacity-0 group-active:after:opacity-20
                      `}
                    style={{ transitionProperty: "all" }}
                  >
                    #{tag}
                    {copiedIdx === i && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white/90 text-cyan-700 rounded border font-semibold font-sans text-xs shadow animate-bounce-hover select-none z-40">✅ Copied</span>
                    )}
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                type="button"
                className="bg-neutral-200 dark:bg-gray-900 text-gray-800 dark:text-cyan-100 px-6 py-2 rounded-full mt-1 font-semibold hover:scale-105 hover:shadow-lg transition-all flex items-center gap-2"
                onClick={() => copyHashtags(hashtags)}
              >
                <ClipboardList className="text-xl" />
                <span>Copy All</span>
              </Button>
            </div>
          )}
          {/* Tips Toggle Section */}
          <div className="mt-8 text-center">
            <button
              type="button"
              className="text-gray-500 dark:text-cyan-300 underline underline-offset-4 decoration-wavy font-semibold transition-transform hover:text-blue-600 hover:dark:text-purple-300 hover:scale-110 focus:outline-none focus:ring-1 px-3 py-1 animate-bounce-hover"
              onClick={() => setShowTips(v => !v)}
              style={{ textDecorationThickness: "2px" }}
            >
              {showTips ? "Hide" : "💡 Tips for Better Hashtags"}
            </button>
            {showTips && (
              <ul className="mt-4 list-disc list-inside text-cyan-700 dark:text-cyan-200/80 text-base animate-fade-in-up max-w-lg mx-auto text-left font-sans">
                {tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
      <style>
        {`
          .glass-panel {
            backdrop-filter: blur(28px) saturate(130%);
            -webkit-backdrop-filter: blur(28px) saturate(130%);
            background: rgba(243,245,251,0.58);
          }
          .dark .glass-panel {
            background: rgba(24,19,38,0.76);
          }
          .glass-input {
            background: rgba(249, 250, 255, 0.6);
          }
          .dark .glass-input {
            background: rgba(25,16,39,0.38);
          }
        `}
      </style>
    </>
  );
}
