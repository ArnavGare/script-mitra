
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Download, File as FileIcon, FileText, BookOpen, ClipboardList, Tags } from "lucide-react";
import { useProductDownload } from "@/hooks/useProductDownload";

const iconMap: Record<string, React.ElementType> = {
  PDF: FileText,
  "Notion Template": BookOpen,
  Checklist: ClipboardList,
  "Text File": Tags,
  Scripts: Tags,
  Hooks: ClipboardList,
  Workflows: ClipboardList,
};

function getLogoBgStyle(tag: string) {
  switch (tag) {
    case "PDF":
      return "from-purple-400/70 to-fuchsia-600/90";
    case "Notion Template":
      return "from-blue-500/80 to-blue-800/70";
    case "Checklist":
      return "from-pink-400/90 to-rose-400/80";
    case "Text File":
      return "from-cyan-400/80 to-blue-300/50";
    case "Scripts":
      return "from-green-400/80 to-emerald-600/70";
    case "Hooks":
      return "from-cyan-700/80 to-cyan-400/30";
    case "Workflows":
      return "from-purple-500/60 to-purple-300/80";
    default:
      return "from-gray-200/90 to-slate-400/80";
  }
}

export function ProductCard({
  item,
  delay,
  downloadCount,
}: {
  item: any;
  delay: number;
  downloadCount: number;
}) {
  const [downloading, setDownloading] = React.useState(false);
  const { downloadFile } = useProductDownload();

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

  const IconComp =
    iconMap[item.tag as string] ||
    (fileType.toLowerCase() === "pdf"
      ? FileText
      : fileType.toLowerCase().includes("notion")
      ? BookOpen
      : FileIcon);

  const onDownload = async () => {
    setDownloading(true);
    await downloadFile(item, {
      onSuccess: () => setDownloading(false),
      onError: () => setDownloading(false),
    });
  };

  return (
    <div
      className="group relative flex flex-col items-center justify-between h-full min-h-[230px] bg-white/80 dark:bg-gray-800/70 border border-blue-100 dark:border-blue-800 rounded-2xl shadow-smooth hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
      style={{ animation: "fade-in 0.36s", animationDelay: `${delay}s` }}
      tabIndex={0}
    >
      {/* Fancy Icon or Image */}
      <div className="relative flex items-center justify-center mt-7 mb-3 w-20 h-20 rounded-2xl overflow-visible z-10">
        {/* Soft glow blob */}
        <span
          className={`
            absolute -inset-3 z-0 rounded-2xl blur-[22px] opacity-70 pointer-events-none
            bg-gradient-to-br ${getLogoBgStyle(item.tag)}
            animate-float-delayed
            group-hover:opacity-90 transition-all
          `}
        />
        {/* Gradient background for icon */}
        <span
          className={`
            absolute inset-0 z-1 rounded-2xl
            bg-gradient-to-br ${getLogoBgStyle(item.tag)}
            opacity-90
            shadow-2xl
            border border-white/30
            group-hover:scale-105 transition-transform
          `}
        />
        {/* Main icon */}
        <span className="relative z-10 flex items-center justify-center w-full h-full">
          <IconComp className="w-10 h-10 text-white drop-shadow-lg" />
        </span>
        {fileExt && (
          <span className="absolute -bottom-2 right-2 z-20 bg-black/90 text-white font-bold rounded-full text-xs px-2 py-[2px] shadow border border-white/20 select-none">
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
          <span className={`text-xs font-semibold uppercase py-1 px-3 rounded-full shadow-md transition-all ${tagColor}`}>
            {item.tag}
          </span>
        </div>
      </div>
      {/* Download & Download count */}
      <div className="w-full px-6 pb-5 flex flex-col gap-2 items-center">
        <Button
          variant="outline"
          className="w-full rounded-xl border-blue-200 dark:border-blue-700 hover:border-blue-400 group-hover:bg-blue-50/80 dark:group-hover:bg-blue-900/70 text-blue-800 dark:text-white font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105"
          onClick={onDownload}
          disabled={downloading || (!item.file_path && item.title.trim().toLowerCase() !== "30 viral script hooks")}
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

