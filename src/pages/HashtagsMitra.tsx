
import React, { useState } from "react";
import Header from "@/components/Header";
import { toast } from "sonner";
import MotionGridBg from "@/components/MotionGridBg";
import TipCarousel from "@/components/TipCarousel";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useRotatingPlaceholder } from "@/hooks/useRotatingPlaceholder";
import Hero from "@/components/hashtags-mitra/Hero";
import ScriptForm from "@/components/hashtags-mitra/ScriptForm";
import CaptionList from "@/components/hashtags-mitra/CaptionList";
import TipsSection from "@/components/hashtags-mitra/TipsSection";
import NotionDarkBg from "@/components/hashtags-mitra/NotionDarkBg";
import OGFlyInText from "@/components/OGFlyInText";
import GlowHoverCard from "@/components/GlowHoverCard";

const WEBHOOK_URL = "https://arnavgare01.app.n8n.cloud/webhook-test/1986a54c-73ce-4f24-a35b-0a9bae4b4950";

export default function HashtagsMitra() {
  const [input, setInput] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
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
    setCaptions([]);
    try {
      // Send the script to the webhook as required
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: input, type: "captions" }),
      });
      if (!res.ok) throw new Error("Could not generate captions");
      const data = await res.json();

      let finalCaptions: string[] = [];
      if (data.output && typeof data.output === "string") {
        finalCaptions = data.output
          .split(/\n/)
          .map(s => s.trim())
          .filter(Boolean)
          .filter(caption => caption.length > 10); // Filter out very short text
      } else if (Array.isArray(data.captions)) {
        finalCaptions = data.captions;
      } else if (Array.isArray(data.text)) {
        finalCaptions = data.text;
      }

      setCaptions(finalCaptions);

      if (!finalCaptions.length) {
        toast.error("No captions found. Try revising your script!");
      }
    } catch (err) {
      toast.error("Unable to generate captions. Please try again.");
    }
    setIsLoading(false);
  }

  return (
    <>
      {/* Notion-style dark mode gradient + edge glow - dark mode only */}
      <div className="dark:block hidden">
        <NotionDarkBg />
      </div>
      {/* More visible Grid Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 w-full h-full -z-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle, #38e0ff66 1.6px, transparent 1.8px), " +
            "linear-gradient(to right, #fff0 1px, #44f0ffaa 1.1px), " +
            "linear-gradient(to bottom, #fff0 1px, #44f0ffaa 1.1px)",
          backgroundSize: "38px 38px",
          opacity: 0.85,
        }}
      />
      <MotionGridBg />
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-2 transition-colors duration-500 overflow-x-hidden">
        <div className="w-full max-w-[900px] mx-auto p-px rounded-2xl bg-gradient-to-b from-white/20 to-transparent">
          <GlowHoverCard className="w-full h-full px-5 sm:px-9 pt-10 pb-8 rounded-[15px] shadow-smooth relative z-10 border-white/10 dark:border-white/10 backdrop-blur-xl saturate-150">
            {/* Fly-in headline */}
            <div className="flex justify-center mb-3">
              <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-2 headline-glow font-playfair relative">
                <OGFlyInText>
                  <span role="img" aria-label="captions-mitra">📝</span>
                  Captions Mitra – Generate Engaging Captions for Your Content
                </OGFlyInText>
              </h1>
            </div>
            <ScriptForm
              input={input}
              setInput={setInput}
              handleGenerate={handleGenerate}
              isLoading={isLoading}
              placeholder={placeholder}
            />
            <TipCarousel className="my-7" />
            <CaptionList captions={captions} copy={copy} copiedIdx={copiedIdx} />
            <TipsSection />
          </GlowHoverCard>
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
