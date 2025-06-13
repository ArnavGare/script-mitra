import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, RotateCcw, Sparkles, Users, Brain, Clock, Moon, Sun, Plus, Zap, Lightbulb, Video, Mic, TrendingUp, Star, FileText, ArrowUp, Twitter, Instagram, Linkedin, Camera, Volume2, Target, BarChart3, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    topic: "",
    customTopic: "",
    style: "",
    language: "",
    length: ""
  });
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCustomTopic, setShowCustomTopic] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();

  const topics = [
    "Mutual Fund Basics",
    "SIP Ka Magic", 
    "Retirement Planning",
    "Term Insurance Facts",
    "ULIP vs SIP",
    "Loan ka Gyaan",
    "Tax Saving Tips",
    "Custom Topic"
  ];

  const styles = [
    "Educational",
    "Story/Narrative",
    "Conversational", 
    "Funny/Reel Style",
    "Dramatic/Emotional"
  ];

  const languages = [
    "English",
    "Hindi",
    "Hinglish"
  ];

  const lengths = [
    "60 sec",
    "120 sec", 
    "180 sec"
  ];

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleTopicChange = (value: string) => {
    setFormData({...formData, topic: value});
    if (value === "Custom Topic") {
      setShowCustomTopic(true);
    } else {
      setShowCustomTopic(false);
      setFormData({...formData, topic: value, customTopic: ""});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalTopic = formData.topic === "Custom Topic" ? formData.customTopic : formData.topic;
    
    if (!finalTopic || !formData.style || !formData.language || !formData.length) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before generating your script.",
        variant: "destructive"
      });
      return;
    }

    if (formData.topic === "Custom Topic" && !formData.customTopic.trim()) {
      toast({
        title: "Custom Topic Required",
        description: "Please enter your custom topic.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://arnavgare01.app.n8n.cloud/webhook/1986a54c-73ce-4f24-a35b-0a9bae4b4950', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: finalTopic,
          style: formData.style,
          language: formData.language,
          length: formData.length
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setScript(result.output || '');
      
      toast({
        title: "Script Generated!",
        description: "Your personalized video script is ready to use.",
      });
    } catch (error) {
      console.error('Error generating script:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate script. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard successfully.",
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([script], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `script-mitra-${formData.topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Script downloaded as text file.",
    });
  };

  const handleReset = () => {
    setFormData({ topic: "", customTopic: "", style: "", language: "", length: "" });
    setScript("");
    setShowCustomTopic(false);
    toast({
      title: "Reset Complete",
      description: "Form cleared and ready for new script generation.",
    });
  };

  const formatScriptWithColors = (scriptText: string) => {
    return scriptText.split('\n').map((line, index) => {
      if (line.trim().startsWith('Hook:')) {
        return (
          <div key={index} className="mb-6 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 premium-card-shadow animate-slide-up">
            <span className="text-orange-600 dark:text-orange-400 font-bold text-xl flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {line.replace('Hook:', 'Hook:')}
            </span>
          </div>
        );
      } else if (line.trim().startsWith('Body:')) {
        return (
          <div key={index} className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500 premium-card-shadow animate-slide-up">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xl flex items-center gap-2">
              <Brain className="w-5 h-5" />
              {line.replace('Body:', 'Body:')}
            </span>
          </div>
        );
      } else if (line.trim().startsWith('CTA:')) {
        return (
          <div key={index} className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-green-500 premium-card-shadow animate-slide-up">
            <span className="text-green-600 dark:text-green-400 font-bold text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {line.replace('CTA:', 'CTA:')}
            </span>
          </div>
        );
      } else if (line.trim()) {
        return (
          <div key={index} className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300 animate-fade-in" style={{animationDelay: `${index * 50}ms`}}>
            {line}
          </div>
        );
      } else {
        return <div key={index} className="mb-2"></div>;
      }
    });
  };

  const videoTips = [
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      tip: "Use a clean, natural background with good lighting"
    },
    {
      icon: <Camera className="w-8 h-8 text-blue-500" />,
      tip: "Always frame your face at eye level — adds trust"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      tip: "Keep videos short (60-90s) unless you're storytelling"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      tip: "Start with a hook that solves a pain point"
    },
    {
      icon: <Video className="w-8 h-8 text-green-500" />,
      tip: "Record in portrait mode for Reels/Shorts"
    },
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      tip: "Focus on one key message per video"
    }
  ];

  const voiceTips = [
    {
      icon: <Volume2 className="w-6 h-6 text-blue-500" />,
      title: "Slow down when saying something important",
      description: "Key points need emphasis through pacing"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "Raise pitch slightly when you're enthusiastic",
      description: "Energy translates through vocal variation"
    },
    {
      icon: <Mic className="w-6 h-6 text-purple-500" />,
      title: "Lower your voice for dramatic impact",
      description: "Creates authority and draws attention"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "Use pauses to build tension",
      description: "Strategic silence is powerful"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Smile while talking — it changes your tone!",
      description: "Warmth comes through in your voice"
    }
  ];

  const growthSteps = [
    {
      step: "Step 1",
      title: "Pick 1-2 content pillars",
      description: "e.g., financial tips, client stories",
      icon: <Target className="w-8 h-8 text-blue-500" />
    },
    {
      step: "Step 2",
      title: "Be consistent",
      description: "Post 3x a week minimum",
      icon: <Calendar className="w-8 h-8 text-green-500" />
    },
    {
      step: "Step 3",
      title: "Engage in comments, DMs",
      description: "Build community",
      icon: <MessageSquare className="w-8 h-8 text-purple-500" />
    },
    {
      step: "Step 4",
      title: "Use trending audios",
      description: "Short captions work best",
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />
    },
    {
      step: "Step 5",
      title: "Track analytics",
      description: "Double down on what works",
      icon: <BarChart3 className="w-8 h-8 text-red-500" />
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Financial Advisor, Mumbai",
      content: "Script Mitra has transformed my social media presence. My engagement increased by 300% in just 2 months!",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "Investment Consultant, Delhi",
      content: "The AI-generated scripts are so natural and engaging. My clients love the content quality now.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Anita Desai",
      role: "Insurance Expert, Bangalore",
      content: "From struggling with content to creating viral videos. This tool is a game-changer for financial advisors.",
      rating: 5,
      avatar: "AD"
    }
  ];

  const resources = [
    {
      title: "Content Planning Sheet",
      description: "30-day content calendar template",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Instagram Hashtag Cheatsheet",
      description: "200+ finance-specific hashtags",
      icon: <Instagram className="w-6 h-6" />
    },
    {
      title: "30 Video Script Hooks PDF",
      description: "Proven opening lines that convert",
      icon: <FileText className="w-6 h-6" />
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark animated-dark-bg' : 'blue-motion-bg'}`}>
      
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="icon"
          className="rounded-full border-2 backdrop-blur-md bg-white/80 dark:bg-black/30 hover:bg-white/95 dark:hover:bg-black/40 transition-all duration-500 border-white/30 dark:border-white/20 shadow-lg hover:shadow-xl hover:scale-110"
        >
          {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </Button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="icon"
            className="rounded-full border-2 backdrop-blur-md bg-white/80 dark:bg-black/30 hover:bg-white/95 dark:hover:bg-black/40 transition-all duration-500 border-white/30 dark:border-white/20 shadow-lg hover:shadow-xl hover:scale-110"
          >
            <ArrowUp className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </Button>
        </div>
      )}

      {/* Header Section */}
      <div className="relative z-10 text-center pt-16 pb-12 px-4">
        <div className="fade-in">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6 tracking-tight">
            Script Mitra
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Your AI-Powered Partner for Premium Video Scripts
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Crafted for Financial Creators Who Demand Excellence
          </p>
        </div>
        
        {/* Feature highlights */}
        <div className="flex justify-center items-center gap-12 mt-12 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <Brain className="w-6 h-6 text-blue-500" />
            <span className="font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <Clock className="w-6 h-6 text-blue-500" />
            <span className="font-medium">60-180 Seconds</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <Users className="w-6 h-6 text-blue-500" />
            <span className="font-medium">Finance Focused</span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
        {/* Form Card */}
        <Card className="clean-glass-card rounded-3xl mb-12 clean-card-hover">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Topic Selection */}
                <div className="space-y-3 fade-in">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Choose a Topic
                  </Label>
                  <Select value={formData.topic} onValueChange={handleTopicChange}>
                    <SelectTrigger className="clean-select h-14 rounded-2xl text-slate-800 dark:text-slate-200 font-medium">
                      <SelectValue placeholder="Select your topic..." />
                    </SelectTrigger>
                    <SelectContent className="clean-dropdown rounded-2xl shadow-xl">
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic} className="rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {topic === "Custom Topic" && <Plus className="w-4 h-4" />}
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Custom Topic Input */}
                  {showCustomTopic && (
                    <div className="mt-4 slide-in">
                      <Input
                        placeholder="Enter your custom topic..."
                        value={formData.customTopic}
                        onChange={(e) => setFormData({...formData, customTopic: e.target.value})}
                        className="clean-input h-14 rounded-2xl text-slate-800 dark:text-slate-200 font-medium"
                      />
                    </div>
                  )}
                </div>

                {/* Style Selection */}
                <div className="space-y-3 fade-in">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Choose Script Style
                  </Label>
                  <Select value={formData.style} onValueChange={(value) => setFormData({...formData, style: value})}>
                    <SelectTrigger className="clean-select h-14 rounded-2xl text-slate-800 dark:text-slate-200 font-medium">
                      <SelectValue placeholder="Select your style..." />
                    </SelectTrigger>
                    <SelectContent className="clean-dropdown rounded-2xl shadow-xl">
                      {styles.map((style) => (
                        <SelectItem key={style} value={style} className="rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Selection */}
                <div className="space-y-3 fade-in">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Select Language
                  </Label>
                  <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                    <SelectTrigger className="clean-select h-14 rounded-2xl text-slate-800 dark:text-slate-200 font-medium">
                      <SelectValue placeholder="Select language..." />
                    </SelectTrigger>
                    <SelectContent className="clean-dropdown rounded-2xl shadow-xl">
                      {languages.map((language) => (
                        <SelectItem key={language} value={language} className="rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Length Selection */}
                <div className="space-y-3 fade-in">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Choose Video Length
                  </Label>
                  <Select value={formData.length} onValueChange={(value) => setFormData({...formData, length: value})}>
                    <SelectTrigger className="clean-select h-14 rounded-2xl text-slate-800 dark:text-slate-200 font-medium">
                      <SelectValue placeholder="Select duration..." />
                    </SelectTrigger>
                    <SelectContent className="clean-dropdown rounded-2xl shadow-xl">
                      {lengths.map((length) => (
                        <SelectItem key={length} value={length} className="rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {length}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit and Reset Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="clean-primary-btn flex-1 h-16 text-xl font-bold text-white rounded-2xl shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Script...
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Sparkles className="w-6 h-6" />
                      Generate Script
                    </div>
                  )}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="h-16 px-10 text-xl font-bold border-2 border-blue-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-300 bg-white/60 dark:bg-slate-800/30 shadow-lg hover:shadow-xl"
                >
                  <RotateCcw className="w-6 h-6 mr-3" />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Script Output Area */}
        {script && (
          <Card className="clean-glass-card rounded-3xl slide-up mb-20">
            <CardContent className="p-10">
              <h3 className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-8 flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                Your Generated Script
              </h3>
              
              <div className="bg-gradient-to-br from-blue-50/80 via-white/60 to-blue-50/40 dark:from-slate-800/50 dark:via-slate-900/40 dark:to-blue-900/20 rounded-3xl p-8 mb-8 border border-blue-200/60 dark:border-slate-700/50 shadow-inner">
                <ScrollArea className="h-96 w-full pr-6">
                  <div className="text-slate-800 dark:text-slate-300 font-medium text-lg leading-relaxed font-sf-pro">
                    {formatScriptWithColors(script)}
                  </div>
                </ScrollArea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={handleCopy}
                  className="flex-1 h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-lg"
                >
                  <Copy className="w-6 h-6 mr-3" />
                  Copy Script
                </Button>
                
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  className="flex-1 h-14 border-2 border-blue-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-300 bg-white/60 dark:bg-slate-800/30 shadow-lg hover:shadow-xl font-bold text-lg"
                >
                  <Download className="w-6 h-6 mr-3" />
                  Download as .txt
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Section 1: Video Making Tips */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
              🎥 Smart Video-Making Tips
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-light max-w-3xl mx-auto">
              for Financial Advisors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTips.map((tip, index) => (
              <Card key={index} className="clean-glass-card rounded-2xl clean-card-hover fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    {tip.icon}
                  </div>
                  <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                    {tip.tip}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Voice Modulation */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
              🗣️ Talk Like a Pro
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-light max-w-3xl mx-auto">
              Voice Modulation Hacks
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {voiceTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-6 p-6 rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm clean-card-hover slide-in" style={{animationDelay: `${index * 150}ms`}}>
                  <div>
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center items-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800/50 dark:to-purple-800/50 flex items-center justify-center">
                <Mic className="w-32 h-32 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Social Media Growth */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
              🚀 Social Media Growth
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-light max-w-3xl mx-auto">
              Blueprint
            </p>
          </div>
          
          <div className="space-y-8">
            {growthSteps.map((step, index) => (
              <Card key={index} className="clean-glass-card rounded-2xl clean-card-hover slide-up" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-8">
                    <div>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                          {step.step}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-lg text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
              Need Content Ideas?
            </p>
            <Button className="clean-primary-btn h-14 px-8 text-lg font-bold text-white rounded-2xl shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Use Script Mitra!
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
              💬 What Other Advisors
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-light max-w-3xl mx-auto">
              Are Saying
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="clean-glass-card rounded-2xl clean-card-hover fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Resources */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
              📥 Free Tools
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-light max-w-3xl mx-auto">
              for Financial Creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Button key={index} variant="outline" className="h-32 p-8 border-2 border-blue-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-300 bg-white/60 dark:bg-slate-800/30 shadow-lg hover:shadow-xl fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    {resource.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                  <p className="text-sm opacity-80">{resource.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-950 dark:to-blue-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4">Script Mitra</h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Empowering financial advisors with AI-generated premium video scripts for social media success.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <div className="space-y-3">
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Home</p>
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Generate Scripts</p>
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Growth Tips</p>
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Contact</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Resources</h4>
              <div className="space-y-3">
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Video Tips</p>
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Voice Guide</p>
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Growth Blueprint</p>
                <p className="text-slate-300 hover:text-white transition-colors cursor-pointer">Free Downloads</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400 text-lg">
              Made with 💖 using AI & Automations by Script Mitra Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
