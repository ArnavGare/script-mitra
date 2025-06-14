
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
          w-full font-sans text-[1.18rem] min-h-[124px] max-h-72 px-5 py-4
          rounded-xl border-[1.7px]
          border-cyan-100/30 dark:border-violet-400/20
          placeholder:text-slate-400/70 dark:placeholder:text-slate-400/60
          bg-white/15 dark:bg-[#17192b22]
          shadow-[0_2px_29px_0_#7afff622]
          backdrop-blur-[7px] glass-input transition-all duration-300
          hover:shadow-[0_0_16px_2px_#3efbff60,0_4px_28px_0_#b6aaff18]
          focus:shadow-[0_0_24px_2.5px_#73fcff89,0_0px_32px_0_#e7c7ff26]
          focus:border-cyan-200/80 focus:ring-2 focus:ring-cyan-200/60
          hover:border-cyan-300/65 focus-visible:outline-none
          disabled:bg-white/15 disabled:border-cyan-100/20
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
            "linear-gradient(96deg,rgba(255,255,255,0.12) 0%,rgba(61,218,223,0.09) 70%)",
          boxShadow:
            "0 2px 22px 0 #61efff21, 0 1.5px 4.5px #b7aaff1a"
        }}
      />
      <Button
        size="lg"
        type="submit"
        disabled={isLoading}
        className="
          group w-full rounded-full py-3 text-xl font-bold font-display
          bg-gradient-to-r from-[#2ee0fe] via-[#7e9afc] to-[#be82fe]
          shadow-[0_2.5px_40px_0_#38fff955,0_3px_18px_0_#a06fff33]
          text-white border-[1.5px] border-cyan-100/40
          hover:scale-[1.03] hover:shadow-[0_4.5px_38px_0_rgba(70,249,255,0.19),0_7px_46px_0_#b7aaff3d]
          hover:border-cyan-400/60
          transition-all duration-200
          ring-1 ring-blue-200/20 dark:ring-blue-900/40
        "
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
