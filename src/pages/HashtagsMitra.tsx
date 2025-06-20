
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";
import ScriptForm from "@/components/hashtags-mitra/ScriptForm";
import HashtagList from "@/components/hashtags-mitra/HashtagList";
import CaptionList from "@/components/hashtags-mitra/CaptionList";
import StructuredOutput from "@/components/hashtags-mitra/StructuredOutput";
import { useDailyQuotaCooldown } from "@/hooks/useDailyQuotaCooldown";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

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
      <div className="min-h-screen relative">
        {/* Background with blue gradient and grid pattern */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600">
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
        
        <div className="relative z-10">
          <section className="max-w-2xl mx-auto px-4 pt-20 pb-6">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-cyan-400 to-purple-500 p-1 rounded-2xl mb-6">
                <div className="bg-blue-900/80 backdrop-blur-sm px-8 py-4 rounded-xl">
                  <h1 className="text-5xl font-bold text-white font-playfair">
                    Captions Mitra
                  </h1>
                </div>
              </div>
              <p className="text-cyan-200 text-lg mb-8">
                Generate shareworthy captions & content instantly
              </p>
            </div>

            {/* Script Input Form */}
            <div className="mb-8">
              <div className="bg-blue-900/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6">
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="relative">
                    <textarea
                      placeholder="Paste your video script here"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={6}
                      disabled={isLoading}
                      className="w-full bg-blue-800/50 border border-cyan-400/30 rounded-xl px-4 py-3 text-white placeholder-cyan-300/70 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-none"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const text = await navigator.clipboard.readText();
                          if (text) setInput(text);
                        } catch (err) {
                          // Silent fail
                        }
                      }}
                      className="absolute bottom-3 right-3 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Paste
                    </button>
                  </div>
                  
                  {/* Cooldown/quota message */}
                  {getTooltipText() && (
                    <div className="text-center">
                      <span className="text-yellow-300 text-sm">{getTooltipText()}</span>
                    </div>
                  )}
                  
                  {/* Generate Button */}
                  <button
                    type="submit"
                    disabled={quotaCaption.disabled || isLoading}
                    className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold py-4 rounded-xl text-lg hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Generate Captions
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        ⚡ Generate Captions
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Quote */}
            <div className="text-center mb-8">
              <p className="text-white text-sm">
                "Specificity is your superpower. Pick a niche!" - Arnav G.
              </p>
            </div>

            {/* Tips Section */}
            <div className="text-center">
              <button 
                className="text-cyan-300 underline decoration-wavy underline-offset-4 hover:text-cyan-200 transition-colors"
              >
                💡 Tips for Better Hashtags
              </button>
            </div>

            {/* Results */}
            <HashtagList hashtags={hashtags} copy={copy} copiedIdx={copiedIdx} />
            <CaptionList captions={captions} copy={copy} copiedIdx={copiedIdx} />
            <StructuredOutput data={structuredData} copy={copy} copiedIdx={copiedIdx} />
          </section>
        </div>
      </div>
    </>
  );
}
