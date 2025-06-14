
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
        className="block text-left text-base font-semibold mb-2 text-gray-700 dark:text-gray-200 font-sans"
      >
        Paste your video script here
      </label>
      <Textarea
        id="script-input"
        className="glass-input w-full font-sans text-lg min-h-[128px] max-h-72 px-6 py-4 rounded-xl shadow backdrop-blur-lg transition-border focus:border-cyan-400 bg-white/40 dark:bg-black/40 border border-white/30 dark:border-gray-800/80 placeholder-gray-400 placeholder-opacity-70 focus:ring-2 focus:ring-cyan-500"
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
        autoFocus
        disabled={isLoading}
        spellCheck
      />
      <Button
        size="lg"
        type="submit"
        disabled={isLoading}
        className="group w-full rounded-full py-3 text-xl font-semibold font-display bg-gradient-cyan-purple shadow-smooth text-white hover:scale-[1.03] hover:shadow-lg transition-all duration-200 ring-1 ring-blue-200/20 dark:ring-blue-900/40"
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
