
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-16 md:py-28 bg-[#181f2e]">
      <h1 className="text-4xl md:text-6xl font-black neon-text text-center mb-6" style={{ fontFamily: "'Space Grotesk', Poppins, sans-serif" }}>
        Welcome to Script Mitra
      </h1>
      <p className="text-lg md:text-2xl text-[#b1b5dd] text-center max-w-2xl mb-8 font-medium">
        The next-gen AI platform empowering Indian financial & business creators.<br />
        Instantly generate viral script ideas, unlock premium tools, and 10x your content game.
      </p>
      <ul className="grid gap-5 md:grid-cols-3 mb-10 w-full max-w-3xl">
        <li className="rounded-2xl neon-gradient-bg text-center py-6 px-2 shadow-md animate-fade-in-up">
          <span className="block text-2xl font-bold text-white mb-2">AI-Powered Script Generation</span>
          <span className="text-[#b1b5dd] text-sm">Craft killer scripts & hooks for your next video — in seconds.</span>
        </li>
        <li className="rounded-2xl bg-[#232044]/90 backdrop-blur px-2 py-6 text-center shadow-md animate-fade-in-up neon-glow-panel">
          <span className="block text-2xl font-bold text-white mb-2">Made for Indian Creators 🇮🇳</span>
          <span className="text-[#b1b5dd] text-sm">Panels, templates & tools tailored for India's financial audiences.</span>
        </li>
        <li className="rounded-2xl neon-gradient-bg text-center py-6 px-2 shadow-md animate-fade-in-up">
          <span className="block text-2xl font-bold text-white mb-2">Grow Your Audience</span>
          <span className="text-[#b1b5dd] text-sm">Unlock growth hacks, content resources & premium scripts.</span>
        </li>
      </ul>
      <Link
        to="/generate-scripts"
        className="inline-flex items-center gap-3 px-8 py-4 mt-2 font-bold text-lg neon-gradient-bg rounded-2xl shadow-lg animate-bounce-slow focus:outline-none hover:scale-105 transition-all duration-300"
      >
        🚀 Try Script Generation
      </Link>
    </main>
  )
}
