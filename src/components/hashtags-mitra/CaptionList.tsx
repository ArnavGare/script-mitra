
import React from 'react';
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { copyCaptions } from '@/lib/captions';

interface CaptionListProps {
  captions: string[];
  copy: (text: string, idx: number) => void;
  copiedIdx: number | null;
}

export default function CaptionList({ captions, copy, copiedIdx }: CaptionListProps) {
  if (captions.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-10 flex flex-col items-center gap-2 animate-fade-in">
      <div className="w-full text-center mb-2">
        <span className="text-lg font-semibold text-cyan-500 dark:text-cyan-200 tracking-wide font-display">Captions generated:</span>
      </div>
      <div className="flex flex-col justify-center gap-3 mb-3 max-w-2xl w-full">
        {captions.map((caption, i) => (
          <button
            key={`${caption}-${i}`}
            type="button"
            onClick={() => copy(caption, i)}
            className={`
              group bg-gradient-to-r from-pastelteal via-pastellav to-pastelindigo dark:from-cyan-800/60 dark:via-purple-900/50 dark:to-[#222b4f] 
              rounded-lg px-5 py-3 font-sans text-sm sm:text-base font-medium text-slate-800 dark:text-white shadow hover:scale-[1.02] 
              transition-transform duration-200 border-2 border-transparent hover:border-cyan-300 dark:hover:border-indigo-400 relative cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-cyan-300 text-left
              before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-white/60 before:to-white/0 before:opacity-0 group-hover:before:opacity-10
              after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-r after:from-blue-100/20 after:to-purple-100/10 after:opacity-0 group-active:after:opacity-20
              `}
            style={{ transitionProperty: "all" }}
          >
            {caption}
            {copiedIdx === i && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white/90 text-cyan-700 rounded border font-semibold font-sans text-xs shadow animate-bounce-hover select-none z-40">✅ Copied</span>
            )}
          </button>
        ))}
      </div>
      <Button
        size="sm"
        type="button"
        className="bg-neutral-200 dark:bg-gray-900 text-gray-800 dark:text-cyan-100 px-6 py-2 rounded-full mt-1 font-semibold hover:scale-105 hover:shadow-lg transition-all flex items-center gap-2"
        onClick={() => copyCaptions(captions)}
      >
        <ClipboardList className="text-xl" />
        <span>Copy All</span>
      </Button>
    </div>
  );
}
