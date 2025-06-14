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
            w-full max-w-[800px] mx-auto animate-fade-in
            relative group transition-all duration-300
          `}
        >
          <section
            className={`
              w-full px-5 sm:px-10 pt-10 pb-8 rounded-2xl
              relative z-10 backdrop-blur-3xl
              border border-cyan-200/28 dark:border-violet-300/18
              bg-[linear-gradient(124deg,rgba(44,62,122,0.44)_12%,rgba(41,54,99,0.66)_63%,rgba(60,91,148,0.54)_100%)]
              shadow-[0_8px_64px_1.5px_rgba(63,242,255,0.08),0_1.5px_8px_0_rgba(113,86,255,0.07)]
              transition-all duration-300
              group-hover:shadow-[0_0_22px_2px_#47fdff80,0_6px_64px_0_#b07fff66,0_2px_8px_0_rgba(87,96,210,0.18)]
              group-hover:border-cyan-300/95
              before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:border-2 before:border-transparent before:transition-all before:duration-300
              group-hover:before:border-cyan-400/70
            `}
            style={{
              boxShadow:
                "0 12px 60px 0 rgba(69,180,255,0.15), 0 1.5px 4px rgba(87,96,210,0.05), 0 0 4px #66fcff40",
              background: "linear-gradient(120deg,rgba(54,77,147,0.48) 10%,rgba(41,54,99,0.72) 63%,rgba(60,91,148,0.54) 100%)",
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
            background: rgba(249, 250, 255, 0.58) !important;
          }
          .dark .glass-input {
            background: rgba(28,23,44,0.28) !important;
          }
        `}
      </style>
    </>
  );
}
