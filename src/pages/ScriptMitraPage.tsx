
import React from "react";
import Header from "@/components/Header";
import { useGeneratedScripts } from "@/hooks/useGeneratedScripts";

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
      <main className="min-h-screen py-10 bg-gradient-to-br from-[#f3f6fd] via-[#f5f8fa] to-[#d5e0f3] dark:from-[#131832] dark:via-[#121728] dark:to-[#312d4e]">
        <section className="max-w-xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 dark:text-white mb-2">
              Script Mitra
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 font-sf-pro">
              Instantly generate high-performing finance/economy YouTube Shorts scripts.
            </p>
          </div>
          <form
            onSubmit={handleGenerateScript}
            className="bg-white dark:bg-[#1d2239] rounded-xl shadow-xl p-6 mb-8"
          >
            <label htmlFor="script-input" className="block font-medium mb-2 text-gray-700 dark:text-gray-200">
              Enter Your Video Topic or Idea
            </label>
            <textarea
              id="script-input"
              className="w-full min-h-[110px] md:min-h-[120px] rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-[#20263d] px-3 py-2 mb-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g. Why does inflation matter? Or: The untold story of Indian stock market crash"
              value={scriptInput}
              onChange={e => setScriptInput(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="submit"
              className="notion-button-primary w-full mt-1"
              disabled={isLoading || !scriptInput.trim()}
            >
              {isLoading ? "Generating Script..." : "Generate Script"}
            </button>
          </form>
          {/* Generated Scripts */}
          {generatedScripts.length > 0 && (
            <div className="space-y-6">
              {generatedScripts.map((script, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#232842] rounded-xl shadow-lg px-5 py-4 transition duration-150"
                >
                  <pre className="whitespace-pre-wrap mb-2 text-[15px] font-sf-pro text-gray-900 dark:text-gray-200">
                    {script}
                  </pre>
                  <button
                    className="text-blue-600 dark:text-blue-400 underline text-sm font-medium hover:text-blue-800 transition"
                    onClick={() => handleCopyToClipboard(idx)}
                  >
                    {copiedIndex === idx ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
        <div className="pt-10 pb-2"></div>
      </main>
    </>
  );
}
