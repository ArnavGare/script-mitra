import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileText, BookOpen, ClipboardList, Tags, Image as ImageIcon, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";
import OGFlyInText from "@/components/OGFlyInText";

// Product data
const products = [
  {
    title: "30 Viral Hooks for Mutual Fund Reels",
    desc: "Swipe-worthy hooks to instantly boost reel engagement.",
    tag: "PDF",
    category: "Hooks",
    img: null,
    icon: FileText,
    popular: true
  },
  {
    title: "Insurance Objection Handling Cheat Sheet",
    desc: "Overcome 10+ common client objections with ease.",
    tag: "PDF",
    category: "Scripts",
    img: null,
    icon: ClipboardList,
    popular: true
  },
  {
    title: "Notion Dashboard: Monthly Financial Content Planner",
    desc: "Plan, draft & track your social posts in one master dashboard.",
    tag: "Notion Template",
    category: "Templates",
    img: null,
    icon: BookOpen,
    popular: true
  },
  {
    title: "Copy-Paste CTA Bank for Finance Creators",
    desc: "A curated vault of call-to-action lines for your posts.",
    tag: "Text File",
    category: "Scripts",
    img: null,
    icon: Tags,
    popular: false
  },
  {
    title: "Ultimate Finance Reels Checklist",
    desc: "Step-by-step checklist to make every reel a superhit.",
    tag: "Checklist",
    category: "Workflows",
    img: null,
    icon: ClipboardList,
    popular: true
  }
];

const categories = [
  "All",
  "Templates",
  "Hooks",
  "Scripts",
  "Workflows",
  "PDFs"
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtered product list (for UI, not full filtering logic)
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(
        (p) =>
          p.category.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === "PDFs" && p.tag === "PDF")
      );

  // Popular picks
  const popularResources = products.filter((p) => p.popular);

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative pt-12 pb-2 min-h-[225px] flex items-center justify-center w-full bg-gradient-to-br from-[#181d2b] via-[#221f32] to-[#22184a]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Blurry accent gradients */}
          <div className="absolute top-0 left-1/3 bg-gradient-to-tr from-blue-500/60 via-purple-500/50 to-cyan-400/30 blur-3xl w-72 h-36 rounded-full opacity-60" />
          <div className="absolute bottom-0 right-[-60px] bg-purple-400/30 blur-2xl w-60 h-20 rounded-full opacity-70" />
          <div className="absolute left-0 bottom-0 bg-cyan-400/20 blur-2xl w-48 h-24 rounded-full opacity-60" />
        </div>
        <div className="relative z-10 flex flex-col items-center px-6 text-center w-full">
          <h1 className="font-playfair font-bold text-3xl md:text-5xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-200 to-white shadow-lg drop-shadow-lg headline-glow">
            <OGFlyInText>
              The Store – Tools to Power Your Financial Content Journey
            </OGFlyInText>
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-white/85 mb-3 font-inter bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm shadow transition-all">
            Curated templates, guides & resources to elevate your financial marketing game.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-5xl mx-auto w-full mt-8 px-4">
        <div className="flex flex-wrap gap-3 items-center justify-center pb-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "rounded-full px-5 font-medium text-sm transition-shadow duration-200",
                selectedCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-lg"
                  : "bg-white/20 border-cyan-100/15 text-blue-800 dark:text-white hover:bg-blue-100/60"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Popular Picks */}
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🌟</span>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white font-playfair">
            Popular Picks
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {popularResources.map((prod, i) => (
            <ProductCard key={prod.title} item={prod} delay={i * 0.04} />
          ))}
        </div>
      </section>

      {/* Digital Product Library – All Products */}
      <section className="max-w-6xl mx-auto w-full px-4">
        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white font-playfair mb-2 ml-1">
          Digital Library
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {filteredProducts.map((prod, i) => (
            <ProductCard key={prod.title} item={prod} delay={i * 0.03} />
          ))}
        </div>
      </section>

      {/* Footer Callout */}
      <footer className="w-full max-w-2xl mx-auto mt-20 mb-10 px-5">
        <div className="rounded-2xl bg-gradient-to-tr from-blue-50/70 via-purple-50/60 to-white/90 dark:from-[#0f1332] dark:to-[#181d2b] border border-blue-100/60 dark:border-blue-800/50 text-center py-6 px-8 shadow-lg backdrop-blur flex flex-col items-center space-y-2">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            More tools dropping soon — stay tuned for updates and exclusive launches.
          </span>
        </div>
      </footer>
    </>
  );
}

// -- Product Card subcomponent --
function ProductCard({ item, delay }: { item: any, delay: number }) {
  // Choose color scheme based on tag/category
  const tagColor = {
    "PDF": "bg-purple-500/90 text-white",
    "Notion Template": "bg-blue-600/90 text-white",
    "Checklist": "bg-gradient-to-r from-pink-500/90 to-pink-400/80 text-white",
    "Text File": "bg-cyan-500/90 text-white",
    "Scripts": "bg-green-600/90 text-white",
    "Hooks": "bg-cyan-600/90 text-white",
    "Workflows": "bg-purple-400/90 text-white",
  }[item.tag] || "bg-gray-300 text-gray-700";

  return (
    <div
      className={clsx(
        "group relative flex flex-col items-center justify-between h-full min-h-[230px] bg-white/80 dark:bg-gray-800/70 border border-blue-100 dark:border-blue-800 rounded-2xl shadow-smooth hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden",
        "backdrop-blur-md"
      )}
      style={{ animation: "fade-in 0.36s", animationDelay: `${delay}s` }}
      tabIndex={0}
    >
      {/* Icon or Image */}
      <div className="mt-6 mb-3 flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100/80 to-purple-100/70 dark:from-blue-800/60 dark:to-purple-800/50">
        {item.icon ? (
          <item.icon className="w-8 h-8 text-blue-600 dark:text-purple-200 drop-shadow" />
        ) : (
          <ImageIcon className="w-8 h-8 text-blue-400 dark:text-purple-300" />
        )}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-5 w-full">
        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg text-center mb-1 font-inter">
          {item.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-200 text-xs md:text-sm font-medium text-center mb-2">
          {item.desc}
        </p>
        <div className="flex gap-2 justify-center mb-4">
          <span className={clsx(
            "text-xs font-semibold uppercase py-1 px-3 rounded-full shadow-md transition-all",
            tagColor
          )}>
            {item.tag}
          </span>
        </div>
      </div>
      {/* CTA Preview Button */}
      <div className="w-full px-6 pb-5 flex justify-center">
        <Button
          variant="outline"
          className="w-full rounded-xl border-blue-200 dark:border-blue-700 hover:border-blue-400 group-hover:bg-blue-50/80 dark:group-hover:bg-blue-900/70 text-blue-800 dark:text-white font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105"
        >
          <span>Preview</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      {/* Glow effect on card hover */}
      <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 w-36 h-10 rounded-full blur-2xl bg-gradient-to-r from-blue-400/50 via-purple-400/40 to-cyan-300/50 opacity-0 group-hover:opacity-80 transition group-hover:scale-110 animate-fade-in" />
    </div>
  );
}
