
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, ClipboardList, Tags, Image as ImageIcon, ArrowRight, Download, File as FileIcon } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";
import OGFlyInText from "@/components/OGFlyInText";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// CATEGORY MAPPING for filter usability
const categories = ["All", "Templates", "Hooks", "Scripts", "Workflows", "PDFs"];
const iconMap: Record<string, React.ElementType> = {
  PDF: FileText,
  "Notion Template": BookOpen,
  Checklist: ClipboardList,
  "Text File": Tags,
  Scripts: Tags,
  Hooks: ClipboardList,
  Workflows: ClipboardList,
};

function getCategoryFromTag(tag?: string | null) {
  if (!tag) return "";
  if (tag.toLowerCase().includes("template")) return "Templates";
  if (tag.toLowerCase().includes("pdf")) return "PDFs";
  if (tag.toLowerCase().includes("script")) return "Scripts";
  if (tag.toLowerCase().includes("workflow")) return "Workflows";
  if (tag.toLowerCase().includes("hook")) return "Hooks";
  return "";
}

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 1. Load products from database
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["store-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // 2. Load download counts for all products
  const { data: downloadsData } = useQuery({
    queryKey: ["downloads-counts"],
    queryFn: async () => {
      if (!products) return {};
      if (products.length === 0) return {};
      // Get counts for all product ids in a single request
      const ids = products.map((p) => p.id);
      const { data, error } = await supabase
        .from("product_downloads")
        .select("product_id, count:product_id")
        .in("product_id", ids);
      if (error) return {};
      // Return { [product_id]: count }
      const counts: Record<string, number> = {};
      data?.forEach((row: any) => {
        counts[row.product_id] = (counts[row.product_id] || 0) + 1;
      });
      return counts;
    },
    // Only fetch when products is loaded
    enabled: !!products && products.length > 0,
  });

  // 3. Filtered product list
  let filteredProducts = products || [];
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) =>
        (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()) ||
        (selectedCategory === "PDFs" && p.tag === "PDF")
    );
  }

  // 4. Find popular picks
  const popularResources = (products || []).filter((p: any) => !!p.popular);

  if (error) return <div className="text-red-500">Error loading products</div>;

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative pt-12 pb-2 min-h-[225px] flex items-center justify-center w-full bg-gradient-to-br from-[#181d2b] via-[#221f32] to-[#22184a] mx-0 my-0 px-[173px] rounded-sm py-[23px]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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

      {!isLoading && (
        <>
          {/* Popular Picks */}
          <section className="max-w-5xl mx-auto w-full px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌟</span>
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white font-playfair">
                Popular Picks
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {popularResources.map((prod: any, i: number) => (
                <ProductCard
                  key={prod.id}
                  item={prod}
                  delay={i * 0.04}
                  downloadCount={downloadsData?.[prod.id] || 0}
                />
              ))}
            </div>
          </section>

          {/* Digital Product Library – All Products */}
          <section className="max-w-6xl mx-auto w-full px-4">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white font-playfair mb-2 ml-1">
              Digital Library
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
              {filteredProducts.map((prod: any, i: number) => (
                <ProductCard
                  key={prod.id}
                  item={prod}
                  delay={i * 0.03}
                  downloadCount={downloadsData?.[prod.id] || 0}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {isLoading && <div className="px-8 py-20 text-center text-xl">Loading products…</div>}

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

// -- Product Card Subcomponent --
function ProductCard({
  item,
  delay,
  downloadCount,
}: {
  item: any;
  delay: number;
  downloadCount: number;
}) {
  const [downloading, setDownloading] = React.useState(false);

  // Choose color scheme based on tag/category
  const tagColor = {
    PDF: "bg-purple-500/90 text-white",
    "Notion Template": "bg-blue-600/90 text-white",
    Checklist: "bg-gradient-to-r from-pink-500/90 to-pink-400/80 text-white",
    "Text File": "bg-cyan-500/90 text-white",
    Scripts: "bg-green-600/90 text-white",
    Hooks: "bg-cyan-600/90 text-white",
    Workflows: "bg-purple-400/90 text-white",
  }[item.tag] || "bg-gray-300 text-gray-700";

  const fileType = item.file_type || (item.tag || "").toLowerCase() || "file";
  const fileExt = item.file_name ? item.file_name.split(".").pop()?.toUpperCase() : undefined;

  // Download function: gets signed URL, logs download, triggers browser download
  const handleDownload = async () => {
    if (!item.file_path) return toast({ title: "Download not available", description: "File path missing." });
    setDownloading(true);

    try {
      // 1. Get signed download URL
      const { data, error } = await supabase.storage
        .from("product_files")
        .createSignedUrl(item.file_path, 60);
      if (error || !data?.signedUrl) throw new Error("Could not get signed download URL.");

      // 2. Log in downloads table (anonymous is allowed)
      await supabase.from("product_downloads").insert({
        product_id: item.id,
        user_id: null, // Set actual user id if you have auth context
      });

      // 3. Trigger the download
      const a = document.createElement("a");
      a.href = data.signedUrl;
      a.download = item.file_name || item.title;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast({ title: "Download started", description: item.title + " file is being downloaded." });
    } catch (e: any) {
      toast({
        title: "Download failed",
        description: e.message || "Download error.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  // Icon based on tag or fallback
  const IconComp =
    iconMap[item.tag as string] ||
    (fileType.toLowerCase() === "pdf"
      ? FileText
      : fileType.toLowerCase().includes("notion")
      ? BookOpen
      : FileIcon);

  return (
    <div
      className={clsx(
        "group relative flex flex-col items-center justify-between h-full min-h-[230px] bg-white/80 dark:bg-gray-800/70 border border-blue-100 dark:border-blue-800 rounded-2xl shadow-smooth hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden",
        "backdrop-blur-md"
      )}
      style={{
        animation: "fade-in 0.36s",
        animationDelay: `${delay}s`,
      }}
      tabIndex={0}
    >
      {/* Icon or Image */}
      <div className="mt-6 mb-3 flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100/80 to-purple-100/70 dark:from-blue-800/60 dark:to-purple-800/50 relative">
        <IconComp className="w-9 h-9 text-blue-600 dark:text-purple-200 drop-shadow" />
        {/* File Extension Badge */}
        {fileExt && (
          <span className="absolute -bottom-2 right-0 bg-slate-800 text-white rounded-full text-xs px-2 py-[2px] shadow border border-slate-400/30">
            {fileExt}
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-5 w-full">
        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg text-center mb-1 font-inter">
          {item.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-200 text-xs md:text-sm font-medium text-center mb-2">
          {item.description}
        </p>
        <div className="flex gap-2 justify-center mb-4">
          <span className={clsx("text-xs font-semibold uppercase py-1 px-3 rounded-full shadow-md transition-all", tagColor)}>
            {item.tag}
          </span>
        </div>
      </div>
      {/* Download & Download count */}
      <div className="w-full px-6 pb-5 flex flex-col gap-2 items-center">
        <Button
          variant="outline"
          className="w-full rounded-xl border-blue-200 dark:border-blue-700 hover:border-blue-400 group-hover:bg-blue-50/80 dark:group-hover:bg-blue-900/70 text-blue-800 dark:text-white font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105"
          onClick={handleDownload}
          disabled={downloading || !item.file_path}
        >
          <Download className="h-4 w-4" />
          <span>{downloading ? "Preparing…" : "Download"}</span>
        </Button>
        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-white/70">
          <ArrowRight className="h-3 w-3 text-cyan-500/80" />
          {downloadCount > 0 ? (
            <>
              <span className="font-semibold">{downloadCount}</span>
              <span>downloads</span>
            </>
          ) : (
            <span>No downloads yet</span>
          )}
        </div>
      </div>
      {/* Glow effect on card hover */}
      <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 w-36 h-10 rounded-full blur-2xl bg-gradient-to-r from-blue-400/50 via-purple-400/40 to-cyan-300/50 opacity-0 group-hover:opacity-80 transition group-hover:scale-110 animate-fade-in" />
    </div>
  );
}
