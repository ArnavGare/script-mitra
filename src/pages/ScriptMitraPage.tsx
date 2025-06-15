
import React from "react";
import Header from "@/components/Header";
import ScriptEntryForm from "@/components/script-mitra/ScriptEntryForm";
import GeneratedScripts from "@/components/script-mitra/GeneratedScripts";
import { useGeneratedScripts } from "@/hooks/useGeneratedScripts";
import OGFlyInText from "@/components/OGFlyInText";

export default function ScriptMitraPage() {
  const {
    scriptInput,
    setScriptInput,
    generatedScripts,
    isLoading,
    handleGenerateScript,
    handleCopyToClipboard,
    copiedIndex,
  } = useGeneratedScripts();

  return (
    <>
      <Header />
      <main className="min-h-screen py-10">
        <section className="max-w-3xl mx-auto px-4">
          <div className="relative z-10">
            <div className="flex justify-center pt-10 pb-5">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair text-center headline-glow">
                <OGFlyInText>
                  Script Mitra – Generate High-Performing Finance Scripts Instantly
                </OGFlyInText>
              </h1>
            </div>

            <ScriptEntryForm
              scriptInput={scriptInput}
              setScriptInput={setScriptInput}
              isLoading={isLoading}
              handleGenerateScript={handleGenerateScript}
            />

            <GeneratedScripts
              generatedScripts={generatedScripts}
              handleCopyToClipboard={handleCopyToClipboard}
              copiedIndex={copiedIndex}
            />
          </div>
        </section>
      </main>
    </>
  );
}
