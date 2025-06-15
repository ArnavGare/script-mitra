
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";
import OGFlyInText from "@/components/OGFlyInText";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ProductCard } from "@/components/ProductCard";

// CATEGORY MAPPING for filter usability
const categories = ["All", "Templates", "Hooks", "Scripts", "Workflows", "PDFs"];

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
