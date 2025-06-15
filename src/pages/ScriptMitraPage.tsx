import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";
import OGFlyInText from "@/components/OGFlyInText";
import ScriptMitraForm from "./scriptmitra/ScriptMitraForm";
import ScriptMitraScriptBox from "./scriptmitra/ScriptMitraScriptBox";
import ScriptMitraInfoBoxes from "./scriptmitra/ScriptMitraInfoBoxes";
import { loadScriptMemory, saveScriptMemory, clearScriptMemory } from "./scriptmitra/ScriptMitraMemory";
import { Button } from "@/components/ui/button";

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

  // ---- PAGE RENDER ----
  return (
    <>
      <Header />
      <div className="min-h-screen transition-all duration-500 relative">
        {/* Animated Background */}
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
        <div className="relative z-10">
          {/* HERO SECTION */}
          <section className="max-w-3xl mx-auto px-4 pb-10 mt-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair headline-glow mb-3">
              <OGFlyInText>
                <span role="img" aria-label="script-mitra">🎬</span>{" "}
                Script Mitra — AI Video Script Generator
              </OGFlyInText>
            </h1>
            <p className="text-lg md:text-2xl text-[#0ca67c] dark:text-[#7efae2] font-semibold mb-5 animate-fade-in-up">
              Craft high-converting, attention-grabbing video scripts in seconds — tailored for financial creators, advisors, and educators.
            </p>
            <Button
              size="lg"
              className="mx-auto font-semibold notion-button-primary shadow-xl px-7 mb-3 animate-fade-in-up"
              onClick={() => {
                const el = document.getElementById("scriptmitra-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span role="img" aria-label="">🔹</span> Generate My Script Now →
            </Button>
          </section>

          {/* FORM + SCRIPT BOX COMPONENTS */}
          <section id="scriptmitra-form" className="max-w-3xl mx-auto px-4 py-6 mb-6">
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

          {/* INFO BOXES - All details are now below the generation box */}
          <div className="max-w-3xl mx-auto px-4">
            <ScriptMitraInfoBoxes />
          </div>

          {/* HOW IT WORKS */}
          <section className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-center mb-7 animate-3d-fly-in">
              <OGFlyInText>How Script Mitra Works</OGFlyInText>
            </h2>
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div>
                <div className="text-3xl mb-2">📚</div>
                <p className="font-semibold text-base mb-1">Select Your Topic</p>
                <p className="text-sm text-white/80 dark:text-gray-300 min-h-[60px]">
                  Choose from ready-made financial categories like SIPs, Insurance, Tax Planning, Market Trends, and more.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎭</div>
                <p className="font-semibold text-base mb-1">Pick Style &amp; Language</p>
                <p className="text-sm text-white/80 dark:text-gray-300 min-h-[60px]">
                  Whether you want it to be Informative, Storytelling, or Conversational — just pick and go. Also supports multiple Indian languages.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <p className="font-semibold text-base mb-1">Get Script Instantly</p>
                <p className="text-sm text-white/80 dark:text-gray-300 min-h-[60px]">
                  AI generates your complete script with hooks, body, and CTA — optimized for Reels, Shorts &amp; YouTube.
                </p>
              </div>
            </div>
          </section>

          {/* BENEFITS */}
          <section className="max-w-2xl mx-auto px-4 py-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-center mb-6 animate-3d-fly-in">
              <OGFlyInText>Why Financial Creators Love Script Mitra</OGFlyInText>
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="text-2xl mt-0.5">⚡</span>
                <span>
                  <span className="font-semibold">Instant Results:</span> No more writer’s block — get powerful scripts in seconds.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-2xl mt-0.5">🧠</span>
                <span>
                  <span className="font-semibold">Tailored for Finance:</span> Content made by AI trained on finance best practices.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-2xl mt-0.5">📱</span>
                <span>
                  <span className="font-semibold">Platform Ready:</span> Optimized for Instagram, YouTube, WhatsApp &amp; more.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-2xl mt-0.5">🔄</span>
                <span>
                  <span className="font-semibold">Reusable Structure:</span> Edit, remix, or expand for multiple use cases.
                </span>
              </li>
            </ul>
          </section>

          {/* PRO TIPS */}
          <section className="max-w-2xl mx-auto px-4 py-6">
            <h3 className="text-xl md:text-2xl font-bold font-playfair text-center mb-5 animate-3d-fly-in">
              <OGFlyInText>Tips to Make the Most of Your Scripts</OGFlyInText>
            </h3>
            <ul className="space-y-2 text-sm text-white/90 dark:text-gray-200 text-center">
              <li>Use a strong visual hook in the first 3 seconds.</li>
              <li>Add personal stories to enhance relatability.</li>
              <li>Pair your scripts with trending sounds &amp; transitions.</li>
            </ul>
          </section>

          {/* FINAL CTA */}
          <section className="max-w-2xl mx-auto text-center px-4 pb-12 pt-4">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair headline-glow mb-4 animate-3d-fly-in">
              <OGFlyInText>Ready to Create Magnetic Financial Videos?</OGFlyInText>
            </h2>
            <Button
              size="lg"
              className="notion-button-primary shadow-xl px-7 font-semibold animate-fade-in-up"
              onClick={() => {
                const el = document.getElementById("scriptmitra-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span role="img" aria-label="">🔹</span> Start Generating Scripts Now →
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}
