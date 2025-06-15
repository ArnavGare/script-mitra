
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Book, Film, Repeat, Brain } from "lucide-react";

export default function ScriptMitraInfoBoxes() {
  return (
    <div className="flex flex-col gap-7 my-12">

      {/* How Script Mitra Works */}
      <Card className="bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-purple-600 dark:text-purple-400 text-2xl">
              <Film />
            </span>
            How Script Mitra Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-6 md:grid-cols-3 text-base">
            <li className="flex flex-col items-start">
              <span className="text-2xl mb-1">📚</span>
              <span className="font-semibold mb-1">Select Your Topic</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Choose from ready-made financial categories like SIPs, Insurance, Tax Planning, Market Trends, and more.
              </span>
            </li>
            <li className="flex flex-col items-start">
              <span className="text-2xl mb-1">🎭</span>
              <span className="font-semibold mb-1">Pick Style &amp; Language</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Whether you want it to be Informative, Storytelling, or Conversational — just pick and go. Also supports multiple Indian languages.
              </span>
            </li>
            <li className="flex flex-col items-start">
              <span className="text-2xl mb-1">⚡</span>
              <span className="font-semibold mb-1">Get Script Instantly</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                AI generates your complete script with hooks, body, and CTA — optimized for Reels, Shorts &amp; YouTube.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Why Financial Creators Love Script Mitra */}
      <Card className="bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400 text-2xl">
              {/* Lightning bolt as inline SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="inline"><path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z"/></svg>
            </span>
            Why Financial Creators Love Script Mitra
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 md:grid-cols-2 text-base">
            <li className="flex items-start gap-2">
              <span className="text-2xl mt-0.5">⚡</span>
              <span><span className="font-semibold">Instant Results:</span> No more writer’s block — get powerful scripts in seconds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl mt-0.5">🧠</span>
              <span><span className="font-semibold">Tailored for Finance:</span> Content made by AI trained on finance best practices.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl mt-0.5">📱</span>
              <span><span className="font-semibold">Platform Ready:</span> Optimized for Instagram, YouTube, WhatsApp &amp; more.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl mt-0.5">🔄</span>
              <span><span className="font-semibold">Reusable Structure:</span> Edit, remix, or expand for multiple use cases.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Tips to Make the Most of Your Scripts */}
      <Card className="bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400 text-2xl"><Book /></span>
            Tips to Make the Most of Your Scripts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-2 text-gray-800 dark:text-gray-200 text-base">
            <li>Use a strong visual hook in the first 3 seconds.</li>
            <li>Add personal stories to enhance relatability.</li>
            <li>Pair your scripts with trending sounds &amp; transitions.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
