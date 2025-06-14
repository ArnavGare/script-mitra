
import React, { useState } from "react";

const scriptApiEndpoint = "https://arnavgare01.app.n8n.cloud/webhook-test/1986a54c-73ce-4f24-a35b-0a9bae4b4950";

export default function GenerateScripts() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [length, setLength] = useState("Short");
  const [tone, setTone] = useState("Friendly");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(scriptApiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language, length, tone }),
      });
      const data = await res.json();
      setResult(data?.script || "No script returned. Try again!");
    } catch {
      setResult("There was an error. Please try again!");
    }
    setLoading(false);
  };

  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center pb-14 bg-[#181f2e]">
      <form
        className="max-w-2xl w-full p-6 rounded-2xl bg-[#232044]/80 backdrop-blur shadow-xl neon-glow-panel mt-10 animate-fade-in-up"
        onSubmit={generateScript}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 neon-text">Generate Your Next Viral Script</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-1 text-[#a1a1fa] font-medium">Topic</label>
            <input
              className="w-full px-4 py-2 rounded-lg neon-input bg-[#161c30] border border-[#433ac2] focus:border-sky-400 text-white placeholder-[#93c5fd]/70"
              value={topic}
              required
              maxLength={70}
              onChange={e => setTopic(e.target.value)}
              placeholder="Eg. Mutual Funds for Beginners"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#a1a1fa] font-medium">Preferred Language</label>
            <input
              className="w-full px-4 py-2 rounded-lg neon-input bg-[#161c30] border border-[#433ac2] focus:border-blue-400 text-white placeholder-[#93c5fd]/70"
              value={language}
              maxLength={30}
              onChange={e => setLanguage(e.target.value)}
              placeholder="Eg. Hindi, English"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block mb-1 text-[#a1a1fa] font-medium">Video Length</label>
            <select
              className="w-full px-4 py-2 rounded-lg bg-[#161c30] border border-[#433ac2] focus:border-blue-400 text-white"
              value={length}
              onChange={e => setLength(e.target.value)}
            >
              <option>Short</option>
              <option>Medium</option>
              <option>Long</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-[#a1a1fa] font-medium">Tone</label>
            <select
              className="w-full px-4 py-2 rounded-lg bg-[#161c30] border border-[#433ac2] focus:border-sky-400 text-white"
              value={tone}
              onChange={e => setTone(e.target.value)}
            >
              <option>Friendly</option>
              <option>Educational</option>
              <option>Formal</option>
              <option>Motivational</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-3 rounded-xl neon-gradient-bg text-white font-bold text-xl shadow-cyan-500/30 transition-all duration-200 hover:scale-105 focus:outline-none ring-2 ring-[#312e81]/40 animate-bounce-slow"
        >
          {loading ? "Generating..." : "Generate Script"}
        </button>
      </form>
      <div className="mt-10 max-w-2xl w-full transition-all duration-500">
        {result && (
          <div className="p-6 md:p-8 rounded-xl bg-[#10192e]/90 neon-glow-panel shadow-xl text-white text-lg font-mono animate-fade-in-up"
            style={{ whiteSpace: "pre-line", minHeight: 80 }}>
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
