
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Eye, Clock, Play, Video, Sparkles } from "lucide-react";

const tips = [
  { icon: Camera, tip: "Use a clean, natural background with good lighting" },
  { icon: Eye, tip: "Always frame your face at eye level — adds trust" },
  { icon: Clock, tip: "Keep videos short (60-90s) unless you're storytelling" },
  { icon: Play, tip: "Start with a hook that solves a pain point" },
  { icon: Video, tip: "Record in portrait mode for Reels/Shorts" },
  { icon: Sparkles, tip: "Use trending hashtags and engaging thumbnails" }
];

const VideoMakingTips = () => (
  <section id="video-tips" className="max-w-6xl mx-auto px-4 py-20 mt-20 scroll-mt-24 relative z-10">
    <div className="text-center mb-16 animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
        <Video className="w-8 h-8 text-blue-300" />
        Smart Video-Making Tips for Financial Advisors
      </h2>
      <p className="text-lg text-white/80 dark:text-gray-300">Master the art of creating engaging financial content</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tips.map((item, index) => (
        <Card key={index} className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up group glow-hover-card" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-200 font-medium">{item.tip}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default VideoMakingTips;
