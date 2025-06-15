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
const WEBHOOK_URL = "https://arnavgare01.app.n8n.cloud/webhook-test/97113ca3-e1f0-4004-930c-add542e8b8c5";
interface StructuredResponse {
  title?: string;
  caption?: string;
  hashtags?: string;
  description?: string;
}
const STORAGE_KEY = 'captions_mitra_latest';

// Add this cleanText utility at the top of the file (after imports)
function cleanText(text?: string) {
  if (!text) return "";
  // Remove leading/trailing asterisks, numbered list marks, any markdown bold/italic, leading whitespace/newlines
  return text
    .replace(/\*\*/g, "")         // Remove all double asterisks
    .replace(/\*/g, "")           // Remove single asterisks
    .replace(/^(\d+\.)\s*/gm, "") // Remove numbered list prefixes
    .replace(/^#+\s*/gm, "")      // Remove Markdown headers
    .replace(/[`_]/g, "")         // Remove backticks and underscores
    .replace(/^[\s\r\n]+|[\s\r\n]+$/g, ""); // Trim leading/trailing space and newlines
}

// Add this new function below cleanText
function getStructuredSections(data: StructuredResponse) {
  // Only include non-empty sections, maintaining the reference order
  const entries = [
    { label: "Video Title", key: "title", content: data.title },
    { label: "Video Caption", key: "caption", content: data.caption },
    { label: "Hashtags", key: "hashtags", content: data.hashtags },
    { label: "Video Description", key: "description", content: data.description }
  ];
  return entries.filter(e => e.content && String(e.content).trim() !== "");
}

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

      // --- MODIFIED SECTION FOR ATTRACTIVE, CLEAN OUTPUT ---
      // Check if we have structured output (title, caption, hashtags, description)
      if (data.title || data.caption || data.hashtags || data.description) {
        setStructuredOutput({
          // Clean markdown from all fields
          title: cleanText(data.title),
          caption: cleanText(data.caption),
          hashtags: cleanText(data.hashtags),
          description: cleanText(data.description)
        });
        setCaptions([]); // clear captions when structuredOutput is set
        let rawOut = "";
        if (data.title) rawOut += `Title: ${cleanText(data.title)}\n\n`;
        if (data.caption) rawOut += `Caption: ${cleanText(data.caption)}\n\n`;
        if (data.hashtags) rawOut += `Hashtags: ${cleanText(data.hashtags)}\n\n`;
        if (data.description) rawOut += `Description: ${cleanText(data.description)}\n\n`;
        setOutputText(rawOut.trim());
        toast.success("Content generated successfully!");
      } else {
        // Fall back to original captions list format
        let finalCaptions: string[] = [];
        if (data.output && typeof data.output === "string") {
          finalCaptions = data.output.split(/\n/).map(s => cleanText(s)).filter(Boolean).filter(caption => caption.length > 10);
        } else if (Array.isArray(data.captions)) {
          finalCaptions = data.captions.map(cleanText);
        } else if (Array.isArray(data.text)) {
          finalCaptions = data.text.map(cleanText);
        } else if (typeof data === "string") {
          finalCaptions = data.split(/\n/).map(s => cleanText(s)).filter(Boolean).filter(caption => caption.length > 10);
        }
        setCaptions(finalCaptions);
        setStructuredOutput(null); // clear structured when captions are set
        if (finalCaptions.length > 0) {
          setOutputText(finalCaptions.join('\n\n'));
          toast.success(`Generated ${finalCaptions.length} captions!`);
        } else if (typeof data === "string" && data.trim() !== "") {
          setOutputText(cleanText(data));
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
            
            {/* Attractive output layout: "Title: Content" card style, for structured output only */}
            {structuredOutput && (
              <div className="w-full my-9 space-y-6 animate-fade-in">
                {getStructuredSections(structuredOutput).map((section, idx) => (
                  <div
                    key={section.key}
                    className={`
                      rounded-xl border bg-gradient-to-br from-[#0ea5e975]/70 to-[#6d28d95d]/70 shadow-md p-4 sm:p-6
                      flex flex-col gap-1
                      transition-transform duration-300
                      text-white
                    `}
                    style={{
                      animation: `fadeInUp 0.85s cubic-bezier(.40,.8,.25,1.1) both`,
                      animationDelay: `${idx * 0.10 + 0.15}s`,
                      background: idx % 2 === 0
                        ? "linear-gradient(90deg, #145888e7, #2557a4c7 80%)"
                        : "linear-gradient(90deg, #7a39abdd, #394e99cc 90%)",
                      borderColor: idx % 2 === 0 ? "#2dd4f4bb" : "#a78bfa88"
                    }}
                  >
                    <span className="font-semibold text-base sm:text-lg mb-1" style={{
                      color: "#CFFAFE",
                      letterSpacing: 0.1
                    }}>{section.label}:</span>
                    <div
                      className={`
                        whitespace-pre-line font-sans text-[15px] sm:text-base font-normal leading-snug
                        ${section.key === "hashtags" ? "break-words" : ""}
                        text-white
                      `}
                      style={{
                        background:
                          section.key === "hashtags"
                            ? "rgba(24,24,26,0.10)"
                            : "none",
                        borderRadius: section.key === "hashtags" ? 6 : 0,
                        padding: section.key === "hashtags" ? "7px 9px" : 0
                      }}
                    >
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Fallback to classic caption list if not structured */}
            {!structuredOutput && captions.length > 0 && (
              <CaptionList captions={captions} copy={copy} copiedIdx={copiedIdx} />
            )}
            
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
