
import React from "react";

interface ScriptEntryFormProps {
  scriptInput: string;
  setScriptInput: (val: string) => void;
  isLoading?: boolean;
  handleGenerateScript: (e: React.FormEvent) => void;
}

const ScriptEntryForm: React.FC<ScriptEntryFormProps> = ({
  scriptInput,
  setScriptInput,
  isLoading,
  handleGenerateScript,
}) => (
  <form onSubmit={handleGenerateScript} className="mb-6">
    <textarea
      value={scriptInput}
      onChange={e => setScriptInput(e.target.value)}
      placeholder="Enter your script idea..."
      className="w-full p-3 rounded border mt-4 mb-2"
      rows={5}
      disabled={isLoading}
    />
    <button
      type="submit"
      className="bg-primary text-white px-6 py-2 rounded mt-2"
      disabled={isLoading}
    >
      {isLoading ? "Generating..." : "Generate Script"}
    </button>
  </form>
);

export default ScriptEntryForm;
