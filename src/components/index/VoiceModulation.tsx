
import React from "react";
import { Mic, Volume2, TrendingUp, Clock, Sparkles } from "lucide-react";

const voiceHacks = [
  { title: "Slow down when saying something important", icon: Volume2 },
  { title: "Raise pitch slightly when you're enthusiastic", icon: TrendingUp },
  { title: "Lower your voice for dramatic impact", icon: Volume2 },
  { title: "Use pauses to build tension", icon: Clock },
  { title: "Smile while talking — it changes your tone!", icon: Sparkles }
];

const VoiceModulation = () => (
  <section id="voice-modulation" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="animate-fade-in-left">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
          <Mic className="w-8 h-8 text-purple-300" />
          Talk Like a Pro — Voice Modulation Hacks
        </h2>
        <div className="space-y-4">
          {voiceHacks.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm animate-slide-in-right glow-hover-card" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-white dark:text-gray-200 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="animate-fade-in-right">
        <div className="relative p-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm glow-hover-card">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-2xl animate-pulse"></div>
          <Mic className="w-32 h-32 text-white/30 mx-auto animate-bounce-slow" />
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 bg-white/50 rounded-full animate-sound-wave" style={{ height: `${20 + Math.random() * 40}px`, animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VoiceModulation;
