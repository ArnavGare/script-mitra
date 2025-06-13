import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Index() {
  const [contentType, setContentType] = useState("");
  const [platform, setPlatform] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contentType || !platform || !topic || !duration) {
      alert("Please fill in all fields.");
      return;
    }

    setIsGenerating(true);
    setGeneratedScript("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentType, platform, topic, duration }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedScript(data.script);
    } catch (error) {
      console.error("Error generating script:", error);
      setGeneratedScript("Failed to generate script. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300 animated-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 animate-fade-in backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              AI-Powered Script Generation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in font-sf-pro tracking-tight">
              Script<span className="text-blue-600 dark:text-blue-400">Mitra</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up font-medium leading-relaxed">
              Generate premium video scripts for financial advisors in seconds. Perfect for Instagram Reels, YouTube Shorts, and social media content.
            </p>
          </div>

          {/* AI Script Generator */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200/30 dark:border-gray-600/30 p-6 animate-slide-up">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                🎬 AI Video Script Generator
              </h2>
              
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Content Type
                    </label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educational">📚 Educational Tips</SelectItem>
                        <SelectItem value="promotional">📢 Service Promotion</SelectItem>
                        <SelectItem value="storytelling">📖 Client Success Story</SelectItem>
                        <SelectItem value="trending">🔥 Market Trends</SelectItem>
                        <SelectItem value="qa">❓ Q&A Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Platform
                    </label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">📱 Instagram Reels</SelectItem>
                        <SelectItem value="youtube">🎥 YouTube Shorts</SelectItem>
                        <SelectItem value="linkedin">💼 LinkedIn Video</SelectItem>
                        <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                        <SelectItem value="facebook">👥 Facebook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    What topic do you want to create content about?
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'How to save money on taxes this year' or 'Why young professionals need life insurance'"
                    className="w-full h-20 px-3 py-2 border-2 border-blue-200/40 dark:border-gray-600/40 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none resize-none font-medium transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Duration
                  </label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">⚡ 30 seconds</SelectItem>
                      <SelectItem value="60">🎯 60 seconds</SelectItem>
                      <SelectItem value="90">📝 90 seconds</SelectItem>
                      <SelectItem value="120">📖 2 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generating Script...
                    </span>
                  ) : (
                    "✨ Generate Premium Script"
                  )}
                </button>
              </form>

              {/* Generated Script Display */}
              {generatedScript && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/30 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">Generated Script:</h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors font-medium"
                    >
                      📋 {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed font-medium bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                      {generatedScript}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Making Tips Section */}
          <section className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                🎥 Smart Video-Making Tips for Financial Advisors
              </h2>
              <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-medium">
                Professional techniques to make your financial content stand out
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: "💡", tip: "Use a clean, natural background with good lighting" },
                { icon: "👁️", tip: "Always frame your face at eye level — adds trust" },
                { icon: "⏱️", tip: "Keep videos short (60-90s) unless you're storytelling" },
                { icon: "🎯", tip: "Start with a hook that solves a pain point" },
                { icon: "📱", tip: "Record in portrait mode for Reels/Shorts" },
                { icon: "🎬", tip: "End with a clear call-to-action" }
              ].map((item, index) => (
                <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-5 rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Voice Modulation Section */}
          <section className="mb-16 animate-fade-in">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  🗣️ Talk Like a Pro — Voice Modulation Hacks
                </h2>
                <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-medium">
                  Master your voice to connect better with your audience
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  {[
                    "Slow down when saying something important",
                    "Raise pitch slightly when you're enthusiastic", 
                    "Lower your voice for dramatic impact",
                    "Use pauses to build tension",
                    "Smile while talking — it changes your tone!"
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🎤</div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Your voice is your most powerful tool for building trust and authority in finance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Growth Section */}
          <section className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                🚀 Social Media Growth Blueprint
              </h2>
              <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-medium">
                Proven strategies to grow your financial advisory practice online
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {[
                  { step: 1, title: "Pick 1-2 content pillars", desc: "e.g., financial tips, client stories" },
                  { step: 2, title: "Be consistent", desc: "post 3x a week minimum" },
                  { step: 3, title: "Engage in comments, DMs", desc: "build community" },
                  { step: 4, title: "Use trending audios", desc: "and short captions" },
                  { step: 5, title: "Track analytics", desc: "double down on what works" }
                ].map((item, index) => (
                  <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-5 rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  Need Content Ideas? Use ScriptMitra! 🎯
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                💬 What Other Advisors Are Saying
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Priya Sharma", role: "Financial Planner", feedback: "ScriptMitra helped me create 50+ engaging reels in just one month!", rating: 5 },
                { name: "Rohit Agarwal", role: "Investment Advisor", feedback: "My client engagement increased by 300% using these AI-generated scripts.", rating: 5 },
                { name: "Meera Patel", role: "Insurance Consultant", feedback: "Professional scripts that actually convert prospects into clients!", rating: 5 }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-4 font-medium italic">"{testimonial.feedback}"</p>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resources Section */}
          <section className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                📥 Free Tools for Financial Creators
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Content Planning Sheet", icon: "📋" },
                { title: "Instagram Hashtag Cheatsheet", icon: "#️⃣" },
                { title: "30 Video Script Hooks PDF", icon: "🎣" }
              ].map((resource, index) => (
                <button key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-4xl mb-3 group-hover:animate-bounce">{resource.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">Download Free</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-blue-200/30 dark:border-gray-600/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ScriptMitra</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">Your AI-powered partner for premium video content creation</p>
            
            <div className="flex justify-center gap-6 mb-6">
              {["Home", "Generate Scripts", "Growth Tips", "Contact"].map((link) => (
                <a key={link} href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  {link}
                </a>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 mb-4">
              {["📱", "🐦", "💼", "📧"].map((icon, index) => (
                <a key={index} href="#" className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <span className="text-lg">{icon}</span>
                </a>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Made with 💖 using AI & Automations
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50"
      >
        ↑
      </button>
    </div>
  );
}
