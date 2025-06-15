
import { useState } from "react";

export function useGeneratedScripts() {
  const [scriptInput, setScriptInput] = useState("");
  const [generatedScripts, setGeneratedScripts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function handleGenerateScript(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedScripts([
        `Generated script from: "${scriptInput}"`,
      ]);
      setIsLoading(false);
    }, 1000);
  }

  function handleCopyToClipboard(idx: number) {
    if (!generatedScripts[idx]) return;
    navigator.clipboard.writeText(generatedScripts[idx]);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1200);
  }

  return {
    scriptInput,
    setScriptInput,
    generatedScripts,
    isLoading,
    handleGenerateScript,
    handleCopyToClipboard,
    copiedIndex,
  };
}
