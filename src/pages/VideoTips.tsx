
import { Sparkles, Video, Mic, ShieldCheck } from "lucide-react";

const sections = [
  {
    icon: <Video className="w-7 h-7 text-cyan-300" />,
    title: "Engaging Social Media Videos",
    tips: [
      "Start with a strong hook in the first 3 seconds.",
      "Use storytelling or relatable problems.",
      "Keep a fast pace, use text overlays & jump cuts.",
      "End with a CTA or memorable line.",
    ]
  },
  {
    icon: <Mic className="w-7 h-7 text-purple-300" />,
    title: "Voice Modulation & Expression",
    tips: [
      "Vary pitch and tone for emphasis.",
      "Pause before key points, use energy in your delivery.",
      "Smile while speaking – it makes your tone warmer on audio & video.",
      "Record in a quiet environment with a crisp mic.",
    ]
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-blue-400" />,
    title: "Common Mistakes & How to Fix Them",
    tips: [
      "Overloading slides with too much info – keep it visual.",
      "Monotonous delivery – bring life to your words.",
      "Ignoring platform-specific trends.",
      "Forgetting call to action (CTA) at the end.",
    ]
  }
];

export default function VideoTips() {
  return (
    <main className="flex flex-col items-center justify-start min-h-[80vh] px-5 py-14 bg-[#181f2e]">
      <h1 className="text-3xl md:text-4xl font-extrabold neon-text text-center mb-12">
        Video Creation Tips for Financial Creators
      </h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-[#232044]/90 neon-glow-panel rounded-2xl shadow-lg p-7 md:p-8 w-full max-w-md animate-fade-in-up transition-transform hover:scale-105 hover:shadow-cyan-400/30 group"
          >
            <span className="mb-4 bg-[#181f2e] p-3 rounded-full neon-gradient-bg shadow-lg animate-pulse">
              {sec.icon}
            </span>
            <h2 className="font-bold text-lg md:text-xl text-[#5eeeff] neon-text mb-2 text-center">{sec.title}</h2>
            <ul className="space-y-2 mt-1">
              {sec.tips.map((tip, i) => (
                <li key={i} className="flex items-start space-x-2 group-hover:animate-fade-in-up">
                  <Sparkles className="w-4 h-4 text-purple-300 mt-1" />
                  <span className="text-[#b1b5dd] font-medium">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
