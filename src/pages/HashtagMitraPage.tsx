import React, { useState } from "react";
import Header from "@/components/Header";
import ScriptForm from "@/components/hashtags-mitra/ScriptForm";
import HashtagList from "@/components/hashtags-mitra/HashtagList";
import OGFlyInText from "@/components/OGFlyInText";

export default function HashtagMitraPage() {
  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHashtags([]);
    // Simulate API call - replace with your logic
    setTimeout(() => {
      // Fake hashtags for demo, replace with actual fetch
      setHashtags(["finance", "investing", "wealth", "advisor", "automation"]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(`#${text}`);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-10">
        <section className="max-w-2xl mx-auto px-4 pb-6">
          <div className="flex justify-center mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-2 headline-glow">
              <OGFlyInText>
                <span role="img" aria-label="hashtag-mitra">#️⃣</span>
                Hashtag Mitra – Discover Trending, High-Performing Hashtags
              </OGFlyInText>
            </h1>
          </div>
          <ScriptForm
            input={input}
            setInput={setInput}
            handleGenerate={handleGenerate}
            isLoading={isLoading}
            placeholder="Paste your script here, or describe your post…"
          />
          <HashtagList hashtags={hashtags} copy={handleCopy} copiedIdx={copiedIdx} />
        </section>
      </main>
    </>
  );
}
