import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, RotateCcw, Sparkles, Users, Brain, Clock, Moon, Sun, Plus } from "lucide-react";
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
    element.download = `scriptcraft-${formData.topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
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

  return (
    <div className={`min-h-screen light-gradient-background dark:gradient-background transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      {/* Moving Gradient Background */}
      <div className="absolute inset-0 light-gradient-animation dark:gradient-animation opacity-40 dark:opacity-30"></div>
      
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="icon"
          className="rounded-full border-2 backdrop-blur-sm bg-white/70 dark:bg-black/20 hover:bg-white/90 dark:hover:bg-black/30 transition-all duration-300 border-blue-200/50 dark:border-blue-700/50"
        >
          {isDarkMode ? <Sun className="h-5 w-5 text-gray-900" /> : <Moon className="h-5 w-5 text-gray-900" />}
        </Button>
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center pt-12 pb-8 px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white dark:text-white mb-4">
            <span className="bg-gradient-to-r from-white to-blue-100 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              ScriptCraft AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 dark:text-gray-300 relative inline-block">
            Effortless Video Scripts for Finance Creators
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/60 to-blue-200 dark:from-blue-400 dark:to-blue-600 rounded-full animate-pulse"></div>
          </p>
        </div>
        
        {/* Feature highlights */}
        <div className="flex justify-center items-center gap-8 mt-8 text-sm text-white/80 dark:text-gray-400">
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

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-12">
        {/* Form Card */}
        <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-2xl shadow-blue-900/20 dark:shadow-blue-900/50 rounded-2xl mb-8 animate-fade-in transition-all duration-500">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Topic Selection */}
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    Choose a Topic
                  </Label>
                  <Select value={formData.topic} onValueChange={handleTopicChange}>
                    <SelectTrigger className="elegant-select h-12 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                      <SelectValue placeholder="Select your topic..." />
                    </SelectTrigger>
                    <SelectContent className="elegant-select-content rounded-xl border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic} className="rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                          {topic === "Custom Topic" && <Plus className="w-4 h-4" />}
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Custom Topic Input */}
                  {showCustomTopic && (
                    <div className="mt-3 animate-fade-in">
                      <Input
                        placeholder="Enter your custom topic..."
                        value={formData.customTopic}
                        onChange={(e) => setFormData({...formData, customTopic: e.target.value})}
                        className="h-12 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* Style Selection */}
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    Choose Script Style
                  </Label>
                  <Select value={formData.style} onValueChange={(value) => setFormData({...formData, style: value})}>
                    <SelectTrigger className="elegant-select h-12 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                      <SelectValue placeholder="Select your style..." />
                    </SelectTrigger>
                    <SelectContent className="elegant-select-content rounded-xl border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                      {styles.map((style) => (
                        <SelectItem key={style} value={style} className="rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    Select Language
                  </Label>
                  <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                    <SelectTrigger className="elegant-select h-12 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                      <SelectValue placeholder="Select language..." />
                    </SelectTrigger>
                    <SelectContent className="elegant-select-content rounded-xl border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                      {languages.map((language) => (
                        <SelectItem key={language} value={language} className="rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Length Selection */}
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    Choose Video Length
                  </Label>
                  <Select value={formData.length} onValueChange={(value) => setFormData({...formData, length: value})}>
                    <SelectTrigger className="elegant-select h-12 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                      <SelectValue placeholder="Select duration..." />
                    </SelectTrigger>
                    <SelectContent className="elegant-select-content rounded-xl border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                      {lengths.map((length) => (
                        <SelectItem key={length} value={length} className="rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                          {length}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit and Reset Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="elegant-button flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Generating Script...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      Generate Script
                    </div>
                  )}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="elegant-button h-14 px-8 text-lg font-semibold border-2 border-blue-400/60 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50/80 dark:hover:bg-blue-950 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-white/60 dark:bg-transparent"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Script Output Area */}
        {script && (
          <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-2xl shadow-blue-900/20 dark:shadow-blue-900/50 rounded-2xl animate-fade-in transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                Your Generated Script
              </h3>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/60 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 mb-6 border border-blue-200/60 dark:border-blue-800/50 shadow-inner">
                <ScrollArea className="h-96 w-full pr-4">
                  <div className="text-gray-800 dark:text-gray-300 font-medium text-base leading-relaxed font-sf-pro space-y-4 whitespace-pre-wrap">
                    {script}
                  </div>
                </ScrollArea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleCopy}
                  className="elegant-button flex-1 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Script
                </Button>
                
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  className="elegant-button flex-1 h-12 border-2 border-blue-400/60 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50/80 dark:hover:bg-blue-950 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-white/60 dark:bg-transparent"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download as .txt
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/80 dark:text-gray-400 text-lg">
            Made for <span className="font-semibold text-white dark:text-blue-400">Financial Creators</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
