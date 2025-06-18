
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/hashtags-mitra/Hero";
import ScriptForm from "@/components/hashtags-mitra/ScriptForm";
import HashtagList from "@/components/hashtags-mitra/HashtagList";
import CaptionList from "@/components/hashtags-mitra/CaptionList";
import StructuredOutput from "@/components/hashtags-mitra/StructuredOutput";
import TipsSection from "@/components/hashtags-mitra/TipsSection";
import NotionDarkBg from "@/components/hashtags-mitra/NotionDarkBg";
import MotionGridBg from "@/components/MotionGridBg";
import { useDailyQuotaCooldown } from "@/hooks/useDailyQuotaCooldown";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export default function HashtagsMitra() {
  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [structuredData, setStructuredData] = useState<{
    title?: string;
    caption?: string;
    hashtags?: string;
    description?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, isLoading: userLoading } = useSupabaseUser();
  const navigate = useNavigate();
  const { copy, copiedIdx } = useCopyToClipboard();

  const {
    loading: quotaLoading,
    script: quotaScript,
    caption: quotaCaption,
    cooldownActive,
    cooldownSeconds,
    logGeneration,
    refresh,
    error: quotaError,
  } = useDailyQuotaCooldown();

  // Create modified tooltip text for cooldown
  const getTooltipText = () => {
    if (quotaCaption.tooltip && cooldownSeconds > 0) {
      return `Wait ${cooldownSeconds} seconds for next generation`;
    }
    return quotaCaption.tooltip;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quotaCaption.disabled) return; // enforce quota/cooldown
    if (userLoading) return;
    if (!user?.id) {
      toast({
        title: "Please Login",
        description: "Sign in to generate captions and manage credits.",
        variant: "destructive"
      });
      navigate("/auth/login");
      return;
    }
    if (!input.trim()) {
      toast({
        title: "No Script Provided",
        description: "Please paste your video script to generate captions.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("https://arnavgare01.app.n8n.cloud/webhook/98b61f88-5d59-42c3-92d8-9c8bedb4abc4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          script: input
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      // Check if the user_id matches
      if (result.user_id && result.user_id === user.id) {
        if (result.hashtags && Array.isArray(result.hashtags)) {
          setHashtags(result.hashtags);
          setCaptions([]);
          setStructuredData({});
        } else if (result.captions && Array.isArray(result.captions)) {
          setCaptions(result.captions);
          setHashtags([]);
          setStructuredData({});
        } else if (result.title || result.caption || result.hashtags || result.description) {
          setStructuredData(result);
          setHashtags([]);
          setCaptions([]);
        } else {
          throw new Error("Unexpected response format");
        }
        toast({
          title: "Captions Generated!",
          description: "Your video captions are ready to use."
        });
        // Log usage and trigger cooldown
        await logGeneration("caption");
      } else {
        // Wait for the webhook to send another response with matching user_id
        console.log("User ID mismatch, waiting for correct response...");
      }
    } catch (error) {
      console.error("Error generating captions:", error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate captions. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen relative transition-all duration-500">
        <NotionDarkBg />
        <MotionGridBg />
        <div className="relative z-10">
          <section className="max-w-2xl mx-auto px-4 pt-16 pb-6">
            <Hero />
            <ScriptForm
              input={input}
              setInput={setInput}
              handleGenerate={handleGenerate}
              isLoading={quotaCaption.disabled || isLoading}
              placeholder="Paste your video script here"
              tooltip={getTooltipText()}
            />
            <HashtagList hashtags={hashtags} copy={copy} copiedIdx={copiedIdx} />
            <CaptionList captions={captions} copy={copy} copiedIdx={copiedIdx} />
            <StructuredOutput data={structuredData} copy={copy} copiedIdx={copiedIdx} />
            <TipsSection />
          </section>
        </div>
      </div>
    </>
  );
}
