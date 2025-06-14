
export default function Store() {
  return (
    <main className="flex flex-col items-center min-h-[80vh] py-14 px-4 bg-[#181f2e]">
      <h1 className="text-3xl md:text-4xl font-extrabold neon-text text-center mb-10">
        Script Mitra Store
      </h1>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hooks Pack */}
        <div className="rounded-xl neon-glow-panel bg-[#232044]/85 p-7 shadow-xl flex flex-col items-start group hover:scale-105 transition">
          <span className="mb-2 py-0.5 px-3 text-xs font-semibold rounded-full neon-gradient-bg text-white shadow">Most Popular</span>
          <h2 className="text-xl font-bold neon-text mb-2">Ultimate Hooks Pack</h2>
          <p className="font-medium text-[#b1b5dd] mb-3">100+ viral video hooks for finance & business content. Ready-to-use, edited for trust & conversion.</p>
          <button className="mt-auto px-7 py-2.5 neon-gradient-bg rounded-lg text-white font-bold shadow-lg text-base transition-all hover:scale-105 animate-pulse">Download (Free)</button>
        </div>
        {/* Hashtag Sheets */}
        <div className="rounded-xl neon-glow-panel bg-[#232044]/85 p-7 shadow-xl flex flex-col items-start group hover:scale-105 transition">
          <span className="mb-2 py-0.5 px-3 text-xs font-semibold rounded-full bg-[#3b82f6]/80 text-white shadow">Free</span>
          <h2 className="text-xl font-bold neon-text mb-2">Hashtag Sheets</h2>
          <p className="font-medium text-[#b1b5dd] mb-3">Curated hashtag lists for Instagram, YouTube & Twitter. Maximize reach for Indian finance niche.</p>
          <button className="mt-auto px-7 py-2.5 neon-gradient-bg rounded-lg text-white font-bold shadow-lg text-base transition-all hover:scale-105 animate-pulse">Download</button>
        </div>
        {/* Content Calendars */}
        <div className="rounded-xl neon-glow-panel bg-[#232044]/85 p-7 shadow-xl flex flex-col items-start group hover:scale-105 transition">
          <span className="mb-2 py-0.5 px-3 text-xs font-semibold rounded-full bg-[#d946ef]/80 text-white shadow">Premium</span>
          <h2 className="text-xl font-bold neon-text mb-2">2024 Content Calendars</h2>
          <p className="font-medium text-[#b1b5dd] mb-3">Monthly & weekly planners with trending topics, hooks & reminders. For unstoppable consistency.</p>
          <button className="mt-auto px-7 py-2.5 neon-gradient-bg rounded-lg text-white font-bold shadow-lg text-base transition-all hover:scale-105 animate-pulse">Buy Now (₹199)</button>
        </div>
        {/* Premium Script Templates */}
        <div className="rounded-xl neon-glow-panel bg-[#232044]/85 p-7 shadow-xl flex flex-col items-start group hover:scale-105 transition">
          <span className="mb-2 py-0.5 px-3 text-xs font-semibold rounded-full bg-[#c084fc]/80 text-white shadow">Premium</span>
          <h2 className="text-xl font-bold neon-text mb-2">Premium Script Templates</h2>
          <p className="font-medium text-[#b1b5dd] mb-3">Done-for-you script templates for different video styles & financial niches. AI-refined for 2024 formats.</p>
          <button className="mt-auto px-7 py-2.5 neon-gradient-bg rounded-lg text-white font-bold shadow-lg text-base transition-all hover:scale-105 animate-pulse">Buy Now (₹299)</button>
        </div>
      </div>
    </main>
  );
}
