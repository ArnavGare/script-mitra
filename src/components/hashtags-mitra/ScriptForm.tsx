
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface ScriptFormProps {
  input: string;
  setInput: (value: string) => void;
  handleGenerate: (e: React.FormEvent) => void;
  isLoading: boolean;
  placeholder: string;
}

export default function ScriptForm({ input, setInput, handleGenerate, isLoading, placeholder }: ScriptFormProps) {
  return (
    <form onSubmit={handleGenerate} className="w-full flex flex-col gap-7">
      <label
        htmlFor="script-input"
        className="block text-left text-base font-semibold mb-2 text-slate-200 tracking-wide font-sans"
        style={{ textShadow: '0 1.3px 4px #28295c40' }}
      >
        Paste your video script here
      </label>
      <Textarea
        id="script-input"
        className={`
          w-full font-sans text-lg min-h-[128px] max-h-72 px-6 py-4
          rounded-xl shadow-[0_2px_24px_0_#76dfeb11]
          backdrop-blur-xl
          bg-white/20 dark:bg-[#17192b33]
          border border-cyan-300/20 dark:border-violet-300/30
          placeholder:text-slate-400/70 dark:placeholder:text-slate-400/60
          focus:ring-2 focus:ring-cyan-300/50 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900
          focus:border-cyan-200 dark:focus:border-cyan-300
          transition-all duration-300 ease-in-out
          outline-none
          transition-shadow
          hover:shadow-[0_0_16px_1.5px_#4ee0ff99,0_6px_36px_0_#b7b6ff20]
        `}
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
        autoFocus
        disabled={isLoading}
        spellCheck
        style={{
          background:
            "linear-gradient(97deg,rgba(255,255,255,0.20) 0%,rgba(61,218,223,0.06) 100%)",
          boxShadow:
            "0 2px 22px 0 #3fd2ef33, 0 1.5px 5px #b6d6ff12"
        }}
      />
      <Button
        size="lg"
        type="submit"
        disabled={isLoading}
        className="
          group w-full rounded-full py-3 text-xl font-semibold font-display 
          bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500
          shadow-smooth text-white
          hover:scale-[1.03] hover:shadow-[0_1.5px_24px_0_rgba(61,218,223,0.18)]
          transition-all duration-200
          ring-1 ring-blue-200/20 dark:ring-blue-900/40
        "
        style={{
          boxShadow: '0 2.5px 24px 0 #63f9ff55, 0 2.5px 16px 0 #a06fff33',
        }}
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
  );
}

