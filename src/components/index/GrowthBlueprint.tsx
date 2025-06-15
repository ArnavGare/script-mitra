
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Clock, MessageCircle, Volume2, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { step: 1, title: "Pick 1-2 content pillars", desc: "e.g., financial tips, client stories", icon: Brain },
  { step: 2, title: "Be consistent", desc: "post 3x a week minimum", icon: Clock },
  { step: 3, title: "Engage in comments, DMs", desc: "build community", icon: MessageCircle },
  { step: 4, title: "Use trending audios", desc: "and short captions", icon: Volume2 },
  { step: 5, title: "Track analytics", desc: "double down on what works", icon: BarChart3 }
];

const GrowthBlueprint = () => (
  <section id="grow-social" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-24">
    <div className="text-center mb-8 animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
        <TrendingUp className="w-8 h-8 text-green-300" />
        Social Media Growth Blueprint
      </h2>
      <p className="text-lg text-white/80 dark:text-gray-300">Your step-by-step guide to social media success</p>
    </div>
    <div className="space-y-6">
      {steps.map((item, index) => (
        <Card key={index} className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300 animate-slide-in-left group glow-hover-card" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/70 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">{item.step}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
              <div className="flex-shrink-0">
                <item.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="text-center mt-8">
      <Button className="notion-button-primary px-8 py-3 text-lg font-semibold" asChild>
        <a href="/scriptmitra">Need Content Ideas? Use ScriptMitra!</a>
      </Button>
    </div>
  </section>
);

export default GrowthBlueprint;
