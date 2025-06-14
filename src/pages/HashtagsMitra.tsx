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
        <div className="w-full max-w-[900px] mx-auto p-px rounded-2xl bg-gradient-to-b from-white/20 to-transparent">
          <section className="w-full h-full bg-white/60 dark:bg-black/70 px-5 sm:px-9 pt-10 pb-8 rounded-[15px] shadow-smooth relative z-10 border-white/10 dark:border-white/10 backdrop-blur-xl saturate-150">
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
