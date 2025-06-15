
import React from "react";

const PRODUCTS = [
  { name: "Script Mitra", desc: "AI Video Script Generator", color: "from-[#0ea5e9] to-[#6366f1]", url: "/scriptmitra", icon: "📝" },
  { name: "Hashtag Mitra", desc: "Hashtag Research & Trends", color: "from-[#14dfaa] to-[#12b8ff]", url: "/hashtagmitra", icon: "🏷️" },
  { name: "Store", desc: "Ready-Made Resources for Creators", color: "from-[#eab308] to-[#a855f7]", url: "/store", icon: "🛒" }
];

const ProductBoxes = () => (
  <section className="max-w-4xl mx-auto px-4 pb-8">
    <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
      {PRODUCTS.map((product, idx) => (
        <a
          key={product.name}
          href={product.url}
          className={`px-6 py-4 min-w-[180px] rounded-2xl shadow-md focus:ring-2 focus:ring-offset-2 font-semibold bg-gradient-to-tr ${product.color} transition-all hover:scale-105 hover:shadow-xl text-white/90 text-lg flex flex-col items-center gap-1`}
          style={{ animationDelay: `${idx * 0.08}s` }}
        >
          <span className="text-2xl">{product.icon}</span>
          <span>{product.name}</span>
          <span className="text-xs font-normal text-white/75">{product.desc}</span>
        </a>
      ))}
    </div>
  </section>
);

export default ProductBoxes;
