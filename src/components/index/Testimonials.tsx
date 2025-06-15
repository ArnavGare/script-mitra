
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageCircle } from "lucide-react";

const testimonials = [
  { name: "Rahul Sharma", role: "Financial Advisor", feedback: "ScriptMitra helped me create 50+ engaging videos. My client engagement increased by 300%!", rating: 5 },
  { name: "Priya Patel", role: "Investment Consultant", feedback: "The AI-generated scripts are spot-on for my Hindi audience. Saves me hours every week!", rating: 5 },
  { name: "Arjun Singh", role: "Mutual Fund Distributor", feedback: "Best tool for financial content creators. The voice modulation tips are gold!", rating: 5 }
];

const Testimonials = () => (
  <section id="testimonials" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-24">
    <div className="text-center mb-8 animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
        <MessageCircle className="w-8 h-8 text-yellow-300" />
        What Other Advisors Are Saying
      </h2>
      <p className="text-lg text-white/80 dark:text-gray-300">Real feedback from financial professionals</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up glow-hover-card" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                {testimonial.name.charAt(0)}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-4 italic">"{testimonial.feedback}"</p>
            <div className="text-sm">
              <p className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default Testimonials;
