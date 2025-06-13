
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, RotateCcw, Sparkles, Users, Brain, Clock, Moon, Sun, Plus, Zap } from "lucide-react";
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

  return (
    <div className={`min-h-screen premium-gradient-bg transition-all duration-700 ${isDarkMode ? 'dark' : ''}`}>
      {/* Premium Animated Background */}
      <div className="absolute inset-0 premium-animated-bg opacity-30 dark:opacity-20"></div>
      
      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 premium-glass-overlay"></div>
      
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="icon"
          className="premium-toggle-btn rounded-full border-2 backdrop-blur-md bg-white/80 dark:bg-black/30 hover:bg-white/95 dark:hover:bg-black/40 transition-all duration-500 border-white/30 dark:border-white/20 shadow-2xl hover:shadow-xl hover:scale-110"
        >
          {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </Button>
      </div>

      {/* Premium Header Section */}
      <div className="relative z-10 text-center pt-16 pb-12 px-4">
        <div className="premium-hero-animation">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6 tracking-tight">
            Script Mitra
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full premium-shine"></div>
          <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Your AI-Powered Partner for Premium Video Scripts
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Crafted for Financial Creators Who Demand Excellence
          </p>
        </div>
        
        {/* Premium Feature highlights */}
        <div className="flex justify-center items-center gap-12 mt-12 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3 premium-feature-card">
            <Brain className="w-6 h-6 text-blue-500" />
            <span className="font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center gap-3 premium-feature-card">
            <Clock className="w-6 h-6 text-purple-500" />
            <span className="font-medium">60-180 Seconds</span>
          </div>
          <div className="flex items-center gap-3 premium-feature-card">
            <Users className="w-6 h-6 text-emerald-500" />
            <span className="font-medium">Finance Focused</span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
        {/* Premium Form Card */}
        <Card className="premium-glass-card backdrop-blur-xl bg-white/90 dark:bg-slate-900/70 border-0 shadow-[0_32px_64px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_64px_-8px_rgba(0,0,0,0.4)] rounded-3xl mb-12 premium-card-hover">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Topic Selection */}
                <div className="space-y-3 premium-form-group">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Choose a Topic
                  </Label>
                  <Select value={formData.topic} onValueChange={handleTopicChange}>
                    <SelectTrigger className="premium-select h-14 border-2 border-slate-200/60 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl bg-white/80 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-medium backdrop-blur-sm">
                      <SelectValue placeholder="Select your topic..." />
                    </SelectTrigger>
                    <SelectContent className="premium-dropdown rounded-2xl border-2 border-slate-200/60 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl">
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic} className="premium-option rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {topic === "Custom Topic" && <Plus className="w-4 h-4" />}
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Custom Topic Input */}
                  {showCustomTopic && (
                    <div className="mt-4 premium-slide-in">
                      <Input
                        placeholder="Enter your custom topic..."
                        value={formData.customTopic}
                        onChange={(e) => setFormData({...formData, customTopic: e.target.value})}
                        className="premium-input h-14 border-2 border-slate-200/60 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl bg-white/80 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-medium backdrop-blur-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Style Selection */}
                <div className="space-y-3 premium-form-group">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    Choose Script Style
                  </Label>
                  <Select value={formData.style} onValueChange={(value) => setFormData({...formData, style: value})}>
                    <SelectTrigger className="premium-select h-14 border-2 border-slate-200/60 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-2xl bg-white/80 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-medium backdrop-blur-sm">
                      <SelectValue placeholder="Select your style..." />
                    </SelectTrigger>
                    <SelectContent className="premium-dropdown rounded-2xl border-2 border-slate-200/60 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl">
                      {styles.map((style) => (
                        <SelectItem key={style} value={style} className="premium-option rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-300 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Selection */}
                <div className="space-y-3 premium-form-group">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    Select Language
                  </Label>
                  <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                    <SelectTrigger className="premium-select h-14 border-2 border-slate-200/60 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-2xl bg-white/80 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-medium backdrop-blur-sm">
                      <SelectValue placeholder="Select language..." />
                    </SelectTrigger>
                    <SelectContent className="premium-dropdown rounded-2xl border-2 border-slate-200/60 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl">
                      {languages.map((language) => (
                        <SelectItem key={language} value={language} className="premium-option rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-300 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Length Selection */}
                <div className="space-y-3 premium-form-group">
                  <Label className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    Choose Video Length
                  </Label>
                  <Select value={formData.length} onValueChange={(value) => setFormData({...formData, length: value})}>
                    <SelectTrigger className="premium-select h-14 border-2 border-slate-200/60 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-400 rounded-2xl bg-white/80 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-medium backdrop-blur-sm">
                      <SelectValue placeholder="Select duration..." />
                    </SelectTrigger>
                    <SelectContent className="premium-dropdown rounded-2xl border-2 border-slate-200/60 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl">
                      {lengths.map((length) => (
                        <SelectItem key={length} value={length} className="premium-option rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-all duration-300 text-slate-800 dark:text-slate-200 font-medium py-3">
                          {length}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Premium Submit and Reset Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="premium-primary-btn flex-1 h-16 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl backdrop-blur-sm"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      <div className="premium-spinner w-6 h-6 border-3 border-white border-t-transparent rounded-full"></div>
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
                  className="premium-secondary-btn h-16 px-10 text-xl font-bold border-2 border-slate-300/60 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-500 hover:scale-[1.02] bg-white/60 dark:bg-slate-800/30 backdrop-blur-sm shadow-lg hover:shadow-xl"
                >
                  <RotateCcw className="w-6 h-6 mr-3" />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Premium Script Output Area */}
        {script && (
          <Card className="premium-glass-card backdrop-blur-xl bg-white/90 dark:bg-slate-900/70 border-0 shadow-[0_32px_64px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_64px_-8px_rgba(0,0,0,0.4)] rounded-3xl premium-output-animation">
            <CardContent className="p-10">
              <h3 className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-8 flex items-center gap-4">
                <div className="premium-glow-icon">
                  <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                Your Generated Script
              </h3>
              
              <div className="premium-script-container bg-gradient-to-br from-slate-50/80 via-white/60 to-blue-50/40 dark:from-slate-800/50 dark:via-slate-900/40 dark:to-blue-900/20 rounded-3xl p-8 mb-8 border border-slate-200/60 dark:border-slate-700/50 shadow-inner backdrop-blur-sm">
                <ScrollArea className="h-96 w-full pr-6">
                  <div className="text-slate-800 dark:text-slate-300 font-medium text-lg leading-relaxed font-sf-pro">
                    {formatScriptWithColors(script)}
                  </div>
                </ScrollArea>
              </div>

              {/* Premium Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={handleCopy}
                  className="premium-success-btn flex-1 h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-2xl backdrop-blur-sm font-bold text-lg"
                >
                  <Copy className="w-6 h-6 mr-3" />
                  Copy Script
                </Button>
                
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  className="premium-download-btn flex-1 h-14 border-2 border-slate-300/60 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-500 hover:scale-[1.02] bg-white/60 dark:bg-slate-800/30 backdrop-blur-sm shadow-lg hover:shadow-xl font-bold text-lg"
                >
                  <Download className="w-6 h-6 mr-3" />
                  Download as .txt
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Premium Footer */}
        <div className="text-center mt-16">
          <div className="premium-footer-glow">
            <p className="text-slate-600 dark:text-slate-400 text-xl font-light">
              Crafted for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Financial Creators</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
