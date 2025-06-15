import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import GlowHoverCard from "@/components/GlowHoverCard";

interface ScriptFormProps {
  input: string;
  setInput: (value: string) => void;
  handleGenerate: (e: React.FormEvent) => void;
  isLoading: boolean;
  placeholder: string;
  buttonTextOverride?: string;
  limitReached?: boolean;
}

export default function ScriptForm({
  input,
  setInput,
  handleGenerate,
  isLoading,
  placeholder, // not used
  buttonTextOverride,
  limitReached
}: ScriptFormProps) {

  const handlePaste = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInput(text);
    } catch (err) {
      // Optional: Notify user, but silent fail for now
    }
  };

  return (
    <form onSubmit={handleGenerate} className="w-full flex flex-col gap-7">
      <GlowHoverCard className="w-full">
        <div className="relative w-full">
          <Textarea
            id="script-input"
            placeholder="Paste your video script here"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={6}
            autoFocus
            disabled={isLoading}
            spellCheck
            className="w-full font-sans text-lg min-h-[128px] max-h-72 px-6 py-4 rounded-xl shadow-inner backdrop-blur-sm border border-slate-300/40 dark:border-slate-800/60 placeholder-gray-500/80 dark:placeholder-gray-400/70 focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:border-cyan-300 dark:focus:border-cyan-400 transition-all duration-300 ease-in-out bg-slate-800"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="absolute bottom-3 right-5 h-7 px-3 py-1 text-xs rounded bg-cyan-500/90 text-white hover:bg-cyan-600/90 focus:ring-2 focus:ring-cyan-300 font-medium transition"
            onClick={handlePaste}
            disabled={isLoading}
            tabIndex={-1}
            style={{lineHeight: "1.10rem"}}
          >
            Paste
          </Button>
        </div>
      </GlowHoverCard>
      <Button
        size="lg"
        type="submit"
        disabled={isLoading}
        className="group w-full font-display bg-gradient-cyan-purple shadow-smooth text-white hover:scale-[1.03] hover:shadow-lg transition-all duration-200 ring-1 ring-blue-200/20 dark:ring-blue-900/40 font-medium text-left text-2xl mx-0 my-0 -bottom-1/3 py-[26px] rounded-2xl relative"
        data-tooltip-id={limitReached ? "daily-limit-tooltip" : undefined}
        data-tooltip-content={limitReached ? "You’ve reached today’s 10× captions limit. Resets at midnight." : undefined}
      >
        {isLoading && buttonTextOverride ?
          (<span className="flex items-center gap-2">
            {buttonTextOverride}
          </span>)
          : (
            <>
              <Sparkles className="text-yellow-400" />
              <span className="ml-1">Generate Captions</span>
            </>
          )
        }
      </Button>
      {limitReached &&
        <div
          className="text-red-500 mt-2 rounded text-center text-base font-semibold bg-red-100 dark:bg-red-800/30 px-4 py-2"
        >
          You’ve reached today’s <b>10× captions</b> limit.<br />Resets at midnight.
        </div>
      }
    </form>
  );
}
