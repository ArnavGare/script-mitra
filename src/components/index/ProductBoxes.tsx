import React from "react";
import { Link } from "react-router-dom";

// Only style change: icon and text remain same.
const PRODUCTS = [
  {
    name: "Script Mitra",
    desc: "AI Video Script Generator",
    color: "from-[#0ea5e9] to-[#6366f1]",
    url: "/scriptmitra",
    icon: "📝"
  },
  {
    name: "Hashtag Mitra",
    desc: "Hashtag Research & Trends",
    color: "from-[#14dfaa] to-[#12b8ff]",
    url: "/hashtagmitra",
    icon: "🏷️"
  },
  {
    name: "Store",
    desc: "Ready-Made Resources for Creators",
    color: "from-[#eab308] to-[#a855f7]",
    url: "/store",
    icon: "🛒"
  }
];

const ProductBoxes = () => (
  <section className="max-w-4xl mx-auto px-4 pb-8">
    <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
      {PRODUCTS.map((product, idx) => (
        <Link
          key={product.name}
          to={product.url}
          className={`
            relative premium-glassbox transition-transform duration-300 ease-[cubic-bezier(.44,.12,.48,1.07)]
            px-8 py-7 min-w-[210px] rounded-[2rem]
            flex flex-col items-center gap-2
            group cursor-pointer
            animate-fade-in-up
            shadow-2xl border border-white/15
            ring-1 ring-white/10
            hover:scale-[1.07] hover:shadow-[0_2px_42px_0_#7399ffe4,0_2px_24px_0_#00eceec0]
            hover:border-[#5af8ff55]
            hover:z-10
            will-change-transform
          `}
          style={{ animationDelay: `${idx * 0.08}s` }}
        >
          {/* Animated glass border glow */}
          <span className={`
            absolute inset-0 rounded-[2rem] pointer-events-none z-0
            transition-all duration-300
            bg-gradient-to-tr ${product.color}
            opacity-0 blur-lg scale-[1.04]
            group-hover:opacity-50 group-hover:scale-105
            group-hover:filter-bright
          `}></span>
          {/* Card glass background */}
          <span
            className={`
              absolute inset-0 rounded-[2rem]
              bg-white/20 dark:bg-slate-900/25
              backdrop-blur-[14px]
              border border-white/10
              pointer-events-none z-0
            `}
          />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[2.15rem] drop-shadow font-bold mb-2 select-none group-hover:scale-110 transition-transform duration-300">
              {product.icon}
            </span>
            <span className="font-semibold text-lg tracking-wide text-slate-800 dark:text-white/90 drop-shadow-slate-100">{product.name}</span>
            <span className="mt-1 text-xs font-normal text-slate-700 dark:text-white/70 opacity-80">{product.desc}</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default ProductBoxes;
