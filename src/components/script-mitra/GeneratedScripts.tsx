
import React from "react";

interface GeneratedScriptsProps {
  generatedScripts: string[];
  handleCopyToClipboard: (idx: number) => void;
  copiedIndex: number | null;
}

const GeneratedScripts: React.FC<GeneratedScriptsProps> = ({
  generatedScripts,
  handleCopyToClipboard,
  copiedIndex,
}) => {
  if (!generatedScripts?.length) return null;
  return (
    <div className="mt-6 space-y-4">
      {generatedScripts.map((script, idx) => (
        <div key={idx} className="p-4 bg-white rounded shadow">
          <div className="whitespace-pre-line mb-2">{script}</div>
          <button
            onClick={() => handleCopyToClipboard(idx)}
            className="text-blue-600 underline"
          >
            {copiedIndex === idx ? "Copied!" : "Copy"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GeneratedScripts;
