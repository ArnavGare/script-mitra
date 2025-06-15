
import Header from "@/components/Header";
import { Gift, FileText, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StorePage() {
  const handleStoreItemClick = (itemTitle: string) => {
    alert(`${itemTitle} will be available for download soon. Stay tuned!`);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center gap-2">
          <span role="img" aria-label="store">🛍️</span>
          Creator Store – Ready-Made Resources to Save Time & Boost Output
        </h1>
        <p className="text-lg text-white/80 text-center mb-8 max-w-2xl">Download these resources to boost your content game</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { title: "Content Planning Sheet", desc: "30-day content calendar template", icon: FileText },
            { title: "Instagram Hashtag Cheatsheet", desc: "200+ finance hashtags for better reach", icon: Award },
            { title: "30 Video Script Hooks PDF", desc: "Ready-to-use hooks for your videos", icon: Download }
          ].map((resource, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleStoreItemClick(resource.title)}
              className="notion-button h-auto p-6 hover:transform hover:scale-105 transition-all duration-300 glow-hover-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center w-full">
                <div className="mb-3 flex justify-center">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-full group-hover:bg-pink-200 dark:group-hover:bg-pink-800/70 transition-colors duration-300">
                    <resource.icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{resource.desc}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
