import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";
import OGFlyInText from "@/components/OGFlyInText";
import ScriptMitraForm from "./scriptmitra/ScriptMitraForm";
import ScriptMitraScriptBox from "./scriptmitra/ScriptMitraScriptBox";
import { loadScriptMemory, saveScriptMemory, clearScriptMemory } from "./scriptmitra/ScriptMitraMemory";

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
  const [showCustomTopic, setShowCustomTopic] = useState(false);
  const { toast } = useToast();
  const { user, isLoading: userLoading } = useSupabaseUser();
  const navigate = useNavigate();

  // Restore script/form from localStorage on load
  useEffect(() => {
    const mem = loadScriptMemory();
    if (mem) {
      setScript(mem.script);
      setFormData(mem.formData || {
        topic: "",
        customTopic: "",
        style: "",
        language: "",
        length: "",
      });
      setShowCustomTopic((mem.formData && mem.formData.topic === "Custom Topic") ?? false);
    }
  }, []);

  const handleFormChange = (data: any) => setFormData(data);

  // Submit logic
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
      saveScriptMemory(result.output || "", formData);
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

  const handleCopy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
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
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#131832] via-[#121728] to-[#312d4e] dark:from-[#080818] dark:via-[#111235] dark:to-[#24245a] overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/30 dark:to-purple-900/30 animate-gradient-x"></div>
          <div className="absolute inset-0">
            {/* ... keep existing code (background blobs and animation code) ... */}
          </div>
        </div>
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
            <ScriptMitraForm
              topics={topics}
              styles={styles}
              languages={languages}
              lengths={lengths}
              formData={formData}
              showCustomTopic={showCustomTopic}
              isLoading={isLoading}
              onFormChange={handleFormChange}
              onShowCustomTopic={setShowCustomTopic}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
            <ScriptMitraScriptBox
              script={script}
              formData={formData}
              onCopy={handleCopy}
              onDownload={handleDownload}
              formatScriptWithColors={formatScriptWithColors}
            />
          </section>
        </div>
      </div>
    </>
  );
}
