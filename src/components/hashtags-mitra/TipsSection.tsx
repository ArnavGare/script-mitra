
import React, { useState } from 'react';

const tips = [
  "Be specific about your niche (e.g. 'personal finance for millennials').",
  "Use emotion-focused language (joy, fear, curiosity, etc.).",
  "Mention target audience or platform in your script.",
  "Add trending keywords or phrases as context.",
  "Keep your script concise for better hashtag detection."
];

export default function TipsSection() {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="mt-8 text-center">
      <button
        type="button"
        className="text-gray-500 dark:text-cyan-300 underline underline-offset-4 decoration-wavy font-semibold transition-transform hover:text-blue-600 hover:dark:text-purple-300 hover:scale-110 focus:outline-none focus:ring-1 px-3 py-1 animate-bounce-hover"
        onClick={() => setShowTips(v => !v)}
        style={{ textDecorationThickness: "2px" }}
      >
        {showTips ? "Hide" : "💡 Tips for Better Hashtags"}
      </button>
      {showTips && (
        <ul className="mt-4 list-disc list-inside text-cyan-700 dark:text-cyan-200/80 text-base animate-fade-in-up max-w-lg mx-auto text-left font-sans">
          {tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
