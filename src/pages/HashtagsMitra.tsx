import React, { useState } from "react";
import Header from "@/components/Header";
import { toast } from "sonner";
import MotionGridBg from "@/components/MotionGridBg";
import TipCarousel from "@/components/TipCarousel";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useRotatingPlaceholder } from "@/hooks/useRotatingPlaceholder";
import Hero from "@/components/hashtags-mitra/Hero";
import ScriptForm from "@/components/hashtags-mitra/ScriptForm";
import HashtagList from "@/components/hashtags-mitra/HashtagList";
import TipsSection from "@/components/hashtags-mitra/TipsSection";

export default function HashtagsMitra() {
  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { copy, copiedIdx } = useCopyToClipboard();
  const placeholder = useRotatingPlaceholder();

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
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
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-2 transition-colors duration-500 overflow-x-hidden">
        <div
          className={`
            w-full max-w-[900px] mx-auto rounded-2xl glass-premium-box bg-gradient-to-br from-[#181728c0] via-[#202044d9] to-[#232848e8] 
            border-2 border-cyan-300/30 dark:border-violet-400/25 
            backdrop-blur-3xl shadow-smooth
            p-1 animate-fade-in
            relative group transition-all duration-300
            hover:shadow-[0_0_30px_2px_#61efff44,0_6px_54px_0_#8b5cf633,0_1.5px_8px_0_rgba(87,96,210,0.13)]
            hover:border-cyan-300/70
          `}
          style={{
            boxShadow:
              "0 12px 48px 0 rgba(69,161,255,0.14), 0 1.5px 4px rgba(87, 96, 210, 0.08), 0 0.5px 2.5px #4ee0ffc3",
            background: "linear-gradient(123deg, rgba(67,52,117,0.72) 10%, rgba(41,54,99,0.84) 55%, rgba(60,91,148,0.74) 100%)"
          }}
        >
          <section
            className={`
              w-full bg-white/10 dark:bg-black/25 px-5 sm:px-10 pt-10 pb-8 rounded-[15px] shadow-smooth
              relative z-10 backdrop-blur-2xl border border-white/15 dark:border-white/10
              transition-all duration-200
              group-hover:bg-white/20 group-hover:dark:bg-[#22173248]
            `}
            style={{
              background: "linear-gradient(96deg,rgba(255,255,255,0.09) 0%,rgba(39,62,122,0.11) 100%)",
              boxShadow:
                "0 2px 36px 0 #82f7ff19,0 1.5px 4px #6083fd0b",
            }}
          >
            <Hero />
            <ScriptForm
              input={input}
              setInput={setInput}
              handleGenerate={handleGenerate}
              isLoading={isLoading}
              placeholder={placeholder}
            />
            <TipCarousel className="my-7" />
            <HashtagList hashtags={hashtags} copy={copy} copiedIdx={copiedIdx} />
            <TipsSection />
          </section>
        </div>
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
