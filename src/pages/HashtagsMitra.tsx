import React, { useState, useEffect } from "react";
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
import StructuredOutput from "@/components/hashtags-mitra/StructuredOutput";
const WEBHOOK_URL = "https://arnavgare01.app.n8n.cloud/webhook/97113ca3-e1f0-4004-930c-add542e8b8c5";
interface StructuredResponse {
  title?: string;
  caption?: string;
  hashtags?: string;
  description?: string;
}
const STORAGE_KEY = 'captions_mitra_latest';

export default function HashtagsMitra() {
  const [input, setInput] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
  const [structuredOutput, setStructuredOutput] = useState<StructuredResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);
  const [outputText, setOutputText] = useState(""); // <--- New state for displaying raw output
  const {
    copy,
    copiedIdx
  } = useCopyToClipboard();
  const placeholder = useRotatingPlaceholder();

  // Restore captions/structured output from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.input !== undefined) setInput(parsed.input);
        if (parsed.captions) setCaptions(parsed.captions);
        if (parsed.structuredOutput) setStructuredOutput(parsed.structuredOutput);
        if (parsed.outputText !== undefined) setOutputText(parsed.outputText);
      } catch (e) {
        // Ignore invalid data
      }
    }
  }, []);

  // Save latest output to localStorage on each result change
  useEffect(() => {
    // Only persist if there is meaningful output
    if (captions.length > 0 || structuredOutput || outputText) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          input,
          captions,
          structuredOutput,
          outputText,
        })
      );
    }
  }, [input, captions, structuredOutput, outputText]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter your script first!");
      return;
    }
    setIsLoading(true);
    setCaptions([]);
    setStructuredOutput(null);
    setWebhookResponse(null);
    setOutputText(""); // Reset output text

    try {
      console.log("Sending script to webhook:", input);

      // Send the script to the webhook
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          script: input,
          type: "captions"
        })
      });
      if (!res.ok) {
        throw new Error(`Webhook responded with status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Webhook response:", data);

      // Store the full webhook response for debugging
      setWebhookResponse(data);

      // Check if we have structured output (title, caption, hashtags, description)
      if (data.title || data.caption || data.hashtags || data.description) {
        console.log("Setting structured output:", data);
        setStructuredOutput({
          title: data.title,
          caption: data.caption,
          hashtags: data.hashtags,
          description: data.description
        });
        setCaptions([]); // clear captions when structuredOutput is set
        let rawOut = "";
        if (data.title) rawOut += `Title: ${data.title}\n\n`;
        if (data.caption) rawOut += `Caption: ${data.caption}\n\n`;
        if (data.hashtags) rawOut += `Hashtags: ${data.hashtags}\n\n`;
        if (data.description) rawOut += `Description: ${data.description}\n\n`;
        setOutputText(rawOut.trim());
        toast.success("Content generated successfully!");
      } else {
        // Fall back to original captions list format
        let finalCaptions: string[] = [];
        if (data.output && typeof data.output === "string") {
          finalCaptions = data.output.split(/\n/).map(s => s.trim()).filter(Boolean).filter(caption => caption.length > 10);
        } else if (Array.isArray(data.captions)) {
          finalCaptions = data.captions;
        } else if (Array.isArray(data.text)) {
          finalCaptions = data.text;
        } else if (typeof data === "string") {
          finalCaptions = data.split(/\n/).map(s => s.trim()).filter(Boolean).filter(caption => caption.length > 10);
        }
        setCaptions(finalCaptions);
        setStructuredOutput(null); // clear structured when captions are set
        if (finalCaptions.length > 0) {
          setOutputText(finalCaptions.join('\n\n'));
          toast.success(`Generated ${finalCaptions.length} captions!`);
        } else if (typeof data === "string" && data.trim() !== "") {
          setOutputText(data);
        } else {
          setOutputText(""); // nothing to show
          toast.error("No captions found in response. Please check your script and try again.");
          console.log("Full webhook response for debugging:", data);
        }
      }
    } catch (err) {
      console.error("Error generating captions:", err);
      setOutputText(""); // Clear on error
      toast.error("Unable to generate captions. Please try again.");
    }
    setIsLoading(false);
  }
  return <>
      {/* Notion-style dark mode gradient + edge glow - dark mode only */}
      <div className="dark:block hidden">
        <NotionDarkBg />
      </div>
      {/* More visible Grid Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 w-full h-full -z-10 overflow-hidden" style={{
      background: "radial-gradient(circle, #38e0ff66 1.6px, transparent 1.8px), " + "linear-gradient(to right, #fff0 1px, #44f0ffaa 1.1px), " + "linear-gradient(to bottom, #fff0 1px, #44f0ffaa 1.1px)",
      backgroundSize: "38px 38px",
      opacity: 0.85
    }} />
      <MotionGridBg />
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-2 transition-colors duration-500 overflow-x-hidden">
        <div className="w-full max-w-[900px] mx-auto p-px rounded-2xl bg-gradient-to-b from-white/20 to-transparent">
          <GlowHoverCard className="w-full h-full px-5 sm:px-9 pt-10 pb-8 rounded-[15px] shadow-smooth relative z-10 border-white/10 dark:border-white/10 backdrop-blur-xl saturate-150">
            {/* Fly-in headline */}
            <div className="flex justify-center mb-7 select-none">
              <div className="relative inline-block w-full max-w-2xl">
                <h1
                  className="
                    text-[2.8rem]
                    sm:text-6xl
                    md:text-7xl
                    font-extrabold
                    font-playfair
                    tracking-tight
                    text-white
                    headline-glow
                    shadow-lg
                    text-center
                    px-2
                    py-4
                    rounded-2xl
                    border border-white/30 dark:border-blue-300/20
                    transition-all duration-300
                    ring-[3px] ring-cyan-200/40 dark:ring-cyan-300/30
                    mb-1
                    drop-shadow-[0_8px_28px_rgba(120,130,255,0.20)]
                    animate-fade-in
                  "
                  style={{
                    textShadow: `
                      0 8px 48px #4f95ff33,
                      0 0px 28px #009fea23
                    `,
                    // Remove gradient background and text clipping to make text solid white
                    // backgroundClip: "text",
                    // WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 3px 30px #38e0ff60)"
                  }}
                >
                  Captions Mitra
                </h1>
                <div className="w-full flex justify-center">
                  <span
                    className="
                      text-lg
                      sm:text-2xl
                      font-medium
                      font-sans
                      text-white/95
                      dark:text-cyan-100/90
                      mt-2
                      tracking-tight
                      px-3
                      rounded-full
                      bg-gradient-to-r from-cyan-400/30 via-white/10 to-purple-300/15
                      shadow
                      animate-fade-in
                    "
                  >Generate shareworthy captions & content instantly</span>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 z-[-1] rounded-2xl blur-2xl opacity-60"
                  style={{
                    background: "radial-gradient(ellipse at 46% 59%,#1189e899 45%,#a855f780 65%,#f1f5fd00 90%)"
                  }}
                />
              </div>
            </div>
            
            <ScriptForm input={input} setInput={setInput} handleGenerate={handleGenerate} isLoading={isLoading} placeholder={placeholder} />

            {/* Always show the output box */}
            
            
            <TipCarousel className="my-7" />
            
            {/* Display structured output if available */}
            {structuredOutput && <StructuredOutput data={structuredOutput} copy={copy} copiedIdx={copiedIdx} />}
            
            {/* Fall back to caption list if no structured output */}
            {!structuredOutput && captions.length > 0 && <CaptionList captions={captions} copy={copy} copiedIdx={copiedIdx} />}
            
            {/* Debug information (remove in production) */}
            {webhookResponse && process.env.NODE_ENV === 'development'}
            
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
    </>;
}
