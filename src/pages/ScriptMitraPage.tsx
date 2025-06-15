
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, RotateCcw, Sparkles, Brain, Users, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScriptGenerationTips from "@/components/ScriptGenerationTips";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";
import OGFlyInText from "@/components/OGFlyInText";

// Storage keys for localStorage
const SCRIPT_STORAGE_KEY = "mitra_script_data";
const EXPIRY_MINUTES = 45; // How long script stays in memory

export default function ScriptMitraPage() {
  const [formData, setFormData] = useState({
    topic: "",
    customTopic: "",
    style: "",
    language: "",
    length: "",
  });
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCustomTopic, setShowCustomTopic] = useState(false);
  const { toast } = useToast();
  const { user, isLoading: userLoading } = useSupabaseUser();
  const navigate = useNavigate();

  // Restore script/form from localStorage on load
  useEffect(() => {
    try {
      const dataRaw = localStorage.getItem(SCRIPT_STORAGE_KEY);
      if (dataRaw) {
        const { script, formData, savedAt } = JSON.parse(dataRaw);
        // Check expiry (default ~45 min)
        if (
          typeof savedAt === "number" &&
          Date.now() - savedAt < EXPIRY_MINUTES * 60 * 1000 &&
          script
        ) {
          setScript(script);
          setFormData(formData || {
            topic: "",
            customTopic: "",
            style: "",
            language: "",
            length: "",
          });
          setShowCustomTopic((formData && formData.topic === "Custom Topic") ?? false);
        } else {
          localStorage.removeItem(SCRIPT_STORAGE_KEY);
        }
      }
    } catch {}
    // eslint-disable-next-line
  }, []);

  const topics = [
    "Mutual Fund Basics",
    "SIP Ka Magic",
    "Retirement Planning",
    "Term Insurance Facts",
    "ULIP vs SIP",
    "Loan ka Gyaan",
    "Tax Saving Tips",
    "Custom Topic",
  ];

  const styles = [
    "Educational",
    "Story/Narrative",
    "Conversational",
    "Funny/Reel Style",
    "Dramatic/Emotional",
    "Latest Financial News",
  ];

  const languages = ["English", "Hindi", "Hinglish", "Marathi"];

  const lengths = ["60 sec", "120 sec", "180 sec"];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleTopicChange = (value: string) => {
    setFormData({ ...formData, topic: value });
    if (value === "Custom Topic") {
      setShowCustomTopic(true);
    } else {
      setShowCustomTopic(false);
      setFormData({ ...formData, topic: value, customTopic: "" });
    }
  };

  // Save script and form in localStorage
  function persistScriptMemory(scriptStr: string, formDataObj: typeof formData) {
    try {
      localStorage.setItem(
        SCRIPT_STORAGE_KEY,
        JSON.stringify({
          script: scriptStr,
          formData: formDataObj,
          savedAt: Date.now(),
        })
      );
    } catch {}
  }

  // Remove script from memory
  function clearScriptMemory() {
    localStorage.removeItem(SCRIPT_STORAGE_KEY);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userLoading) return;
    if (!user?.id) {
      toast({
        title: "Please Login",
        description: "Sign in to generate scripts and manage credits.",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }

    const finalTopic =
      formData.topic === "Custom Topic" ? formData.customTopic : formData.topic;

    if (!finalTopic || !formData.style || !formData.language || !formData.length) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before generating your script.",
        variant: "destructive",
      });
      return;
    }

    if (formData.topic === "Custom Topic" && !formData.customTopic.trim()) {
      toast({
        title: "Custom Topic Required",
        description: "Please enter your custom topic.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://arnavgare01.app.n8n.cloud/webhook/1986a54c-73ce-4f24-a35b-0a9bae4b4950",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: finalTopic,
            style: formData.style,
            language: formData.language,
            length: formData.length,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch failed. Status:", response.status, "Error body:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setScript(result.output || "");
      // Save in localStorage
      persistScriptMemory(result.output || "", formData);

      toast({
        title: "Script Generated!",
        description: "Your personalized video script is ready to use.",
      });
    } catch (error) {
      console.error("Error generating script:", error);

      toast({
        title: "Generation Failed",
        description:
          "Unable to generate script. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
    // Remove script from memory when copied
    clearScriptMemory();
    toast({
      title: "Copied!",
      description: "Script copied to clipboard successfully.",
    });
    setScript("");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([script], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `scriptmitra-${formData.topic.toLowerCase().replace(/\s+/g, "-")}.txt`;
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
    clearScriptMemory();
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
    <>
      <Header />
      <div className="min-h-screen transition-all duration-500 relative">
        {/* ----- Animated Premium Background (matches landing page) ----- */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#131832] via-[#121728] to-[#312d4e] dark:from-[#080818] dark:via-[#111235] dark:to-[#24245a] overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/30 dark:to-purple-900/30 animate-gradient-x"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-float-delayed"></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute top-1/6 w-2 h-2 bg-white/20 rounded-full animate-drift" style={{ animationDelay: '0s', animationDuration: '25s' }}></div>
            <div className="absolute top-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-drift" style={{ animationDelay: '5s', animationDuration: '30s' }}></div>
            <div className="absolute top-1/2 w-1.5 h-1.5 bg-purple-300/25 rounded-full animate-drift" style={{ animationDelay: '10s', animationDuration: '20s' }}></div>
            <div className="absolute top-2/3 w-1 h-1 bg-cyan-300/30 rounded-full animate-drift" style={{ animationDelay: '15s', animationDuration: '35s' }}></div>
            <div className="absolute top-1/5 left-1/5">
              <div className="w-1 h-1 bg-white/30 rounded-full animate-orbit" style={{ animationDelay: '0s' }}></div>
            </div>
            <div className="absolute bottom-1/5 right-1/5">
              <div className="w-0.5 h-0.5 bg-blue-300/40 rounded-full animate-orbit" style={{ animationDelay: '12s', animationDuration: '20s' }}></div>
            </div>
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
        </div>
        {/* -------------------------------------------------------- */}

        {/* Main Content */}
        <div className="relative z-10">
          <section className="max-w-3xl mx-auto px-4 pb-8 mt-12">
            <div className="mb-4 flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-2 headline-glow">
                <OGFlyInText>
                  <span role="img" aria-label="script-mitra">🎬</span>
                  Script Mitra – Generate AI-Powered Video Scripts Instantly
                </OGFlyInText>
              </h1>
            </div>
            <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-xl rounded-xl mb-6 transition-all duration-500 glow-hover-card">
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
                        <div className="mt-2">
                          <Input
                            placeholder="Enter your custom topic..."
                            value={formData.customTopic}
                            onChange={(e) => setFormData({ ...formData, customTopic: e.target.value })}
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
                      <Select value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
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
                      <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
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
                      <Select value={formData.length} onValueChange={(value) => setFormData({ ...formData, length: value })}>
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
                      className="notion-button-primary flex-1 h-11 text-base font-semibold"
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
                      className="notion-button-secondary h-11 px-6 text-base font-semibold bg-black text-white border-black hover:bg-black focus:bg-black hover:text-white focus:text-white dark:bg-gray-900 dark:text-white dark:border-blue-800"
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
              <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-xl rounded-xl transition-all duration-500 glow-hover-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    Your Generated Script
                  </h3>
                  <ScriptGenerationTips />
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/60 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 mb-4 border border-blue-200/60 dark:border-blue-800/50 shadow-inner">
                    <ScrollArea className="h-80 w-full pr-4">
                      <div className="text-gray-800 dark:text-gray-300 font-medium text-sm leading-relaxed">
                        {formatScriptWithColors(script)}
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleCopy}
                      className="notion-button-primary flex-1 h-10 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Script
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="notion-button-secondary flex-1 h-10 bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 dark:bg-gray-900 dark:border-blue-800 dark:text-blue-100 dark:hover:bg-blue-800/70"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download as .txt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
