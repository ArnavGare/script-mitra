
import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Search, Download } from "lucide-react";

const elegantBg =
  "bg-neutral-50 dark:bg-[#17181c]"; // Luxuriously minimal background

// Product dataset (8 items, varied tags/types)
const products = [
  {
    title: "30 Viral Script Hooks",
    desc: "Instantly boost engagement with proven hooks for Reels & Shorts.",
    tag: "PDF",
    type: "Download",
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    category: "Scripts",
  },
  {
    title: "200 Hashtags for Advisors",
    desc: "Curated hashtags to maximize your reach and visibility.",
    tag: "Excel",
    type: "Free",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    category: "Templates",
  },
  {
    title: "Content Calendar Template",
    desc: "Plan and organize your posts for a month's growth.",
    tag: "Google Sheet",
    type: "Free",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    category: "Templates",
  },
  {
    title: "Instagram Growth Guide",
    desc: "Step-by-step blueprint for explosive organic growth.",
    tag: "PDF",
    type: "Premium",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80",
    category: "Guides",
  },
  {
    title: "Reels Editing Pack",
    desc: "Video LUTs and presets for cinematic finance reels.",
    tag: "Preset Pack",
    type: "Premium",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    category: "Tools",
  },
  {
    title: "Caption Mastery Cheat Sheet",
    desc: "Bite-sized formulas for high converting, memorable captions.",
    tag: "PDF",
    type: "Free",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    category: "Scripts",
  },
  {
    title: "Lead Magnet Funnel Template",
    desc: "Convert followers into leads with this Notion funnel system.",
    tag: "Notion",
    type: "Premium",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    category: "Templates",
  },
  {
    title: "Sales Script Builder",
    desc: "Interactive Google Sheet to structure perfect sales calls.",
    tag: "Google Sheet",
    type: "Free",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80",
    category: "Tools",
  },
];

const categories = [
  "All",
  "Free",
  "Premium",
  "Templates",
  "Scripts",
  "Guides",
  "Tools",
];

function goldGlow() {
  return "from-[#e8c57b88] to-[#ffe9b355]";
}

// Card transition animation classes
const animationClasses =
  "animate-fade-in-up will-change-transform motion-safe:transition-all duration-300";
// Glass/luxury card style
const cardBase =
  "group flex flex-col bg-white/85 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-md hover:shadow-2xl shadow-[#e8c57b1b] hover:scale-[1.035] ring-1 ring-transparent hover:ring-[#e9cf97]/40 hover:border-[#e9cf97]/25 transition-all hover:z-10 focus-within:ring-2";

// Tag color mapping
const tagColors: Record<string, string> = {
  PDF: "bg-gradient-to-r from-[#e8c57b] to-[#f7ddb3] text-neutral-900 shadow-gold/30",
  "Google Sheet": "bg-gradient-to-r from-[#e3eaf0] to-[#f7fafe] text-neutral-700",
  Notion: "bg-gradient-to-r from-[#cecbe9] to-[#f7f5fb] text-neutral-800",
  Excel: "bg-gradient-to-r from-[#afd9bb] to-[#dbf4e2] text-[#1d4b27]",
  "Preset Pack": "bg-gradient-to-r from-[#b3c9e8] to-[#e4e9f9] text-[#264e7a]",
  Free: "bg-gradient-to-tr from-[#f3fee7] to-[#e6fffa] text-neutral-700 border border-[#aee68e]",
  Premium:
    "bg-gradient-to-tr from-[#262619] to-[#90845e] text-[#f3efeb] border border-[#af9961]/80",
};

// Type button color mapping
const ctaColors: Record<string, string> = {
  Buy: "bg-gradient-to-r from-[#bfa850]/90 to-[#fff5d6]/95 hover:from-[#d5c07b] hover:to-[#ffeead] text-neutral-900",
  Download:
    "bg-gradient-to-r from-[#abb5be] to-[#f6f8fb] hover:from-[#e9ecef] hover:to-[#edf7fe] text-neutral-900",
  Free: "bg-gradient-to-r from-[#bee3ab]/80 to-[#e9fce6]/90 text-neutral-900",
  Premium: "bg-gradient-to-r from-[#656162]/90 to-[#b3aa76]/90 text-white",
};

function filterFn(search: string, cat: string, arr: typeof products) {
  let list = [...arr];
  if (cat && cat !== "All") {
    if (cat === "Free" || cat === "Premium") {
      list = list.filter((p) => p.type === cat);
    } else {
      list = list.filter((p) => p.category === cat);
    }
  }
  if (search.trim() !== "") {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase())
    );
  }
  return list;
}

export default function StorePage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");
  const visibleProducts = useMemo(
    () => filterFn(search, selectedCat, products),
    [search, selectedCat]
  );

  return (
    <div className={clsx(elegantBg, "min-h-screen w-full pb-12")}>
      <Header />
      {/* Banner */}
      <div className="w-full text-center py-4 bg-gradient-to-r from-[#fffbe9] via-[#f6f5f1] to-[#f2eee8] dark:bg-[#17181c] flex justify-center items-center shadow-sm border-b border-neutral-200/60 dark:border-neutral-800/30">
        <span className="text-[1.12rem] md:text-xl font-semibold font-sans text-neutral-900 dark:text-white tracking-tight flex gap-1 items-center">
          <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-[#e8c57b44] to-[#fffbe944] mr-2 text-[#ad9951] font-bold text-lg">
            ✨
          </span>
          Build Your Digital Empire – Start with These Free & Premium Tools.
        </span>
      </div>

      {/* Filter + Search */}
      <section className="max-w-4xl mx-auto px-5 pt-10 pb-3 flex flex-col gap-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCat === cat ? "default" : "outline"}
              size="sm"
              className={clsx(
                "rounded-full font-semibold px-5 py-1 bg-white text-neutral-900 dark:text-white border border-neutral-200/75 hover:shadow-lg shadow-muted transition",
                selectedCat === cat &&
                  "bg-gradient-to-r from-[#fffbe0] to-[#ead87c] text-neutral-900 shadow-lg border-[#e3ce8c]/80"
              )}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        {/* Search */}
        <div className="relative w-full max-w-xs mx-auto">
          <input
            type="text"
            className="w-full py-2 pl-10 pr-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-[#ead87c]/40 focus:outline-none shadow"
            placeholder="Search templates, scripts, guides…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
            style={{ fontFamily: "Inter, 'SF Pro Display', system-ui, sans-serif" }}
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
            size={18}
          />
        </div>
      </section>
      {/* Product Grid */}
      <main className="w-full max-w-6xl mx-auto px-4">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          style={{
            fontFamily: "Inter, 'SF Pro Display', system-ui, sans-serif",
          }}
        >
          {/* Empty state */}
          {visibleProducts.length === 0 && (
            <div className="col-span-3 text-center text-lg text-neutral-400 py-24">
              No products found.
            </div>
          )}
          {visibleProducts.map((p, i) => (
            <ProductCard key={p.title} data={p} delay={i * 0.08} />
          ))}
        </div>
      </main>

      {/* Soft footer */}
      <footer className="mx-auto w-full max-w-2xl mt-14 px-6 text-center">
        <div className="rounded-2xl bg-gradient-to-r from-[#fffbe9]/80 to-[#f8f8f8]/90 border border-[#efe5b6] text-neutral-700 dark:text-white p-7 shadow flex flex-col items-center">
          <span className="text-base font-semibold">
            🚀 More tools & resources dropping soon — check back for exclusive launches!
          </span>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({
  data,
  delay = 0,
}: {
  data: typeof products[number];
  delay?: number;
}) {
  const tagStyle =
    tagColors[data.tag] ||
    "bg-gradient-to-r from-neutral-300 to-neutral-200 text-neutral-800";
  const buttonCta =
    data.type === "Download"
      ? "Download"
      : data.type === "Free"
      ? "Get Free"
      : data.type === "Premium"
      ? "Buy"
      : "Preview";
  const ctaStyle =
    ctaColors[buttonCta] ||
    "bg-gradient-to-r from-[#f3f4f6] to-[#ffeebb] text-neutral-900";

  return (
    <div
      tabIndex={0}
      className={clsx(
        cardBase,
        animationClasses,
        "overflow-hidden min-h-[260px] transition-transform"
      )}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {/* Image/Icon */}
      <div className="w-full h-36 rounded-t-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff6d3] to-[#f4f4f4] dark:from-[#222327] dark:to-[#181818] border-b border-neutral-200/60 dark:border-neutral-800/60 relative">
        {data.img ? (
          <img
            src={data.img}
            alt={data.title}
            className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-110"
            style={{ minHeight: 108, maxHeight: 156 }}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-24 w-24 text-[2.8rem] opacity-50">
            {/* Blank */}
          </div>
        )}
        <span className={clsx("absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold drop-shadow", tagStyle)}>
          {data.tag}
        </span>
      </div>
      <div className="flex-1 flex flex-col items-start justify-between px-6 py-4 gap-2">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-0 truncate tracking-tight font-sans">{data.title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-300 font-medium truncate" style={{ letterSpacing: 0.01 }}>{data.desc}</p>
        <div className="mt-3 w-full">
          <Button
            className={clsx(
              "w-full rounded-xl py-2 font-bold text-base shadow hover:shadow-lg transition",
              ctaStyle
            )}
            size="sm"
            variant="default"
          >
            {buttonCta === "Download" ? (
              <>
                <Download className="mr-1 h-5 w-5" /> Download
              </>
            ) : (
              buttonCta
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
