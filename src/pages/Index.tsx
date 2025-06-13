
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, RotateCcw, Sparkles, Users, Brain, Clock, Moon, Sun, Plus, Video, Mic, TrendingUp, Star, FileText, Camera, Volume2, Eye, Play, MessageCircle, BarChart3, Award, Gift } from "lucide-react";
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
    element.download = `scriptmitra-${formData.topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
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
          <div key={index} className="mb-3">
            <span className="text-orange-600 dark:text-orange-400 font-bold text-base">
              {line.replace('Hook:', 'Hook:')}
            </span>
          </div>
        );
      } else if (line.trim().startsWith('Body:')) {
        return (
          <div key={index} className="mb-3">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-base">
              {line.replace('Body:', 'Body:')}
            </span>
          </div>
        );
      } else if (line.trim().startsWith('CTA:')) {
        return (
          <div key={index} className="mb-3">
            <span className="text-green-600 dark:text-green-400 font-bold text-base">
              {line.replace('CTA:', 'CTA:')}
            </span>
          </div>
        );
      } else if (line.trim()) {
        return (
          <div key={index} className="mb-2 leading-relaxed text-sm">
            {line}
          </div>
        );
      } else {
        return <div key={index} className="mb-2"></div>;
      }
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/30 dark:to-purple-900/30 animate-gradient-x"></div>
      </div>
      
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="icon"
          className="rounded-full border-2 backdrop-blur-sm bg-white/80 dark:bg-black/20 hover:bg-white/90 dark:hover:bg-black/30 transition-all duration-300 border-white/30 dark:border-white/20"
        >
          {isDarkMode ? <Sun className="h-4 w-4 text-gray-900" /> : <Moon className="h-4 w-4 text-gray-900" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center pt-8 pb-6 px-4">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-white to-blue-100 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                ScriptMitra
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 dark:text-gray-300 relative inline-block">
              Your AI Partner for Video Scripts
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/60 to-blue-200 dark:from-blue-400 dark:to-blue-600 rounded-full animate-pulse"></div>
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="flex justify-center items-center gap-6 mt-6 text-sm text-white/80 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-white dark:text-blue-500" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white dark:text-blue-500" />
              <span>60-180 Seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white dark:text-blue-500" />
              <span>Finance Focused</span>
            </div>
          </div>
        </div>

        {/* Script Generator Form */}
        <div className="max-w-3xl mx-auto px-4 pb-8">
          <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-xl rounded-xl mb-6 animate-fade-in transition-all duration-500">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Topic Selection */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                      Choose a Topic
                    </Label>
                    <Select value={formData.topic} onValueChange={handleTopicChange}>
                      <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                        <SelectValue placeholder="Select your topic..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                        {topics.map((topic) => (
                          <SelectItem key={topic} value={topic} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                            {topic === "Custom Topic" && <Plus className="w-4 h-4" />}
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Custom Topic Input */}
                    {showCustomTopic && (
                      <div className="mt-2 animate-fade-in">
                        <Input
                          placeholder="Enter your custom topic..."
                          value={formData.customTopic}
                          onChange={(e) => setFormData({...formData, customTopic: e.target.value})}
                          className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200"
                        />
                      </div>
                    )}
                  </div>

                  {/* Style Selection */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                      Script Style
                    </Label>
                    <Select value={formData.style} onValueChange={(value) => setFormData({...formData, style: value})}>
                      <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                        <SelectValue placeholder="Select your style..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                        {styles.map((style) => (
                          <SelectItem key={style} value={style} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language Selection */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                      Language
                    </Label>
                    <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                      <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                        <SelectValue placeholder="Select language..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                        {languages.map((language) => (
                          <SelectItem key={language} value={language} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Length Selection */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                      Duration
                    </Label>
                    <Select value={formData.length} onValueChange={(value) => setFormData({...formData, length: value})}>
                      <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                        <SelectValue placeholder="Select duration..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                        {lengths.map((length) => (
                          <SelectItem key={length} value={length} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                            {length}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit and Reset Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-md"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Generating Script...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Generate Script
                      </div>
                    )}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="h-11 px-6 text-base font-semibold border-2 border-blue-400/60 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50/80 dark:hover:bg-blue-950 rounded-lg transition-all duration-300 hover:scale-[1.02] bg-white/60 dark:bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Script Output Area */}
          {script && (
            <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-xl rounded-xl animate-fade-in transition-all duration-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  Your Generated Script
                </h3>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/60 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 mb-4 border border-blue-200/60 dark:border-blue-800/50 shadow-inner">
                  <ScrollArea className="h-80 w-full pr-4">
                    <div className="text-gray-800 dark:text-gray-300 font-medium text-sm leading-relaxed">
                      {formatScriptWithColors(script)}
                    </div>
                  </ScrollArea>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleCopy}
                    className="flex-1 h-10 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-md"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Script
                  </Button>
                  
                  <Button 
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1 h-10 border-2 border-blue-400/60 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50/80 dark:hover:bg-blue-950 rounded-lg transition-all duration-300 hover:scale-[1.02] bg-white/60 dark:bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download as .txt
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Section 1: Video Making Tips */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <Video className="w-8 h-8 text-blue-300" />
              Smart Video-Making Tips for Financial Advisors
            </h2>
            <p className="text-lg text-white/80 dark:text-gray-300">Master the art of creating engaging financial content</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Camera, tip: "Use a clean, natural background with good lighting" },
              { icon: Eye, tip: "Always frame your face at eye level — adds trust" },
              { icon: Clock, tip: "Keep videos short (60-90s) unless you're storytelling" },
              { icon: Play, tip: "Start with a hook that solves a pain point" },
              { icon: Video, tip: "Record in portrait mode for Reels/Shorts" },
              { icon: Sparkles, tip: "Use trending hashtags and engaging thumbnails" }
            ].map((item, index) => (
              <Card key={index} className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
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
        </div>

        {/* Section 2: Voice Modulation */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                <Mic className="w-8 h-8 text-purple-300" />
                Talk Like a Pro — Voice Modulation Hacks
              </h2>
              
              <div className="space-y-4">
                {[
                  { title: "Slow down when saying something important", icon: Volume2 },
                  { title: "Raise pitch slightly when you're enthusiastic", icon: TrendingUp },
                  { title: "Lower your voice for dramatic impact", icon: Volume2 },
                  { title: "Use pauses to build tension", icon: Clock },
                  { title: "Smile while talking — it changes your tone!", icon: Sparkles }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm animate-slide-in-right" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                      <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-white dark:text-gray-200 font-medium">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-fade-in-right">
              <div className="relative p-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm">
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
        </div>

        {/* Section 3: Social Media Growth */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-300" />
              Social Media Growth Blueprint
            </h2>
            <p className="text-lg text-white/80 dark:text-gray-300">Your step-by-step guide to social media success</p>
          </div>

          <div className="space-y-6">
            {[
              { step: 1, title: "Pick 1-2 content pillars", desc: "e.g., financial tips, client stories", icon: Brain },
              { step: 2, title: "Be consistent", desc: "post 3x a week minimum", icon: Clock },
              { step: 3, title: "Engage in comments, DMs", desc: "build community", icon: MessageCircle },
              { step: 4, title: "Use trending audios", desc: "and short captions", icon: Volume2 },
              { step: 5, title: "Track analytics", desc: "double down on what works", icon: BarChart3 }
            ].map((item, index) => (
              <Card key={index} className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300 animate-slide-in-left group" style={{ animationDelay: `${index * 0.1}s` }}>
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
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Need Content Ideas? Use ScriptMitra!
            </Button>
          </div>
        </div>

        {/* Section 4: Testimonials */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-yellow-300" />
              What Other Advisors Are Saying
            </h2>
            <p className="text-lg text-white/80 dark:text-gray-300">Real feedback from financial professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rahul Sharma", role: "Financial Advisor", feedback: "ScriptMitra helped me create 50+ engaging videos. My client engagement increased by 300%!", rating: 5 },
              { name: "Priya Patel", role: "Investment Consultant", feedback: "The AI-generated scripts are spot-on for my Hindi audience. Saves me hours every week!", rating: 5 },
              { name: "Arjun Singh", role: "Mutual Fund Distributor", feedback: "Best tool for financial content creators. The voice modulation tips are gold!", rating: 5 }
            ].map((testimonial, index) => (
              <Card key={index} className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
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
        </div>

        {/* Section 5: Resources */}
        <div className="max-w-6xl mx-auto px-4 py-12 pb-16">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <Gift className="w-8 h-8 text-pink-300" />
              Free Tools for Financial Creators
            </h2>
            <p className="text-lg text-white/80 dark:text-gray-300">Download these resources to boost your content game</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Content Planning Sheet", desc: "30-day content calendar template", icon: FileText },
              { title: "Instagram Hashtag Cheatsheet", desc: "200+ finance hashtags for better reach", icon: Award },
              { title: "30 Video Script Hooks PDF", desc: "Ready-to-use hooks for your videos", icon: Download }
            ].map((resource, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700 rounded-xl hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-300 hover:scale-105 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center w-full">
                  <div className="mb-3 flex justify-center">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-full group-hover:bg-pink-200 dark:group-hover:bg-pink-800/70 transition-colors duration-300">
                      <resource.icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{resource.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/20 dark:border-gray-700">
          <p className="text-white/80 dark:text-gray-400 text-lg">
            Made for <span className="font-semibold text-white dark:text-blue-400">Financial Creators</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
