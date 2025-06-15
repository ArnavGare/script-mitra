
import React from "react";
import { BarChart2, CalendarCheck, BadgeCheck, Timer } from "lucide-react";
import { useDailyQuotaCooldown } from "@/hooks/useDailyQuotaCooldown";

const DailyQuotaBox: React.FC = () => {
  const { loading, error, script, caption } = useDailyQuotaCooldown();
  // Calculating time to next reset (midnight)
  const [timeToReset, setTimeToReset] = React.useState<string>("");

  React.useEffect(() => {
    // Midnight at user's local timezone
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Next midnight
    function updateReset() {
      const now = new Date();
      const diff = midnight.getTime() - now.getTime();
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeToReset(
          `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`
        );
      } else {
        setTimeToReset("resetting...");
      }
    }
    updateReset();
    const interval = setInterval(updateReset, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="
      flex flex-col min-w-[212px] max-w-xs
      bg-gradient-to-tr from-white/70 via-blue-50/40 to-violet-50/60 dark:from-[#232244]/80 dark:to-[#122f58]/80
      p-3 sm:p-4 rounded-2xl border border-pastelindigo/40 dark:border-[#232244]/70 shadow-lg
      animate-fade-in
      backdrop-blur-sm relative
    ">
      <div className="flex items-center gap-2 pb-1 border-b border-gray-100 dark:border-[#363553]/70 mb-1">
        <BarChart2 className="text-fuchsia-500 size-5" />
        <span className="font-semibold text-base text-gray-900 dark:text-white">Daily Quota</span>
      </div>
      {loading ? (
        <div className="text-cyan-700 mt-3">Loading quota...</div>
      ) : error ? (
        <div className="text-red-600 mt-3">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-1 mt-2">
          <div className="flex items-center space-x-2 bg-gradient-to-tr from-emerald-100/70 via-blue-100/60 to-violet-100/50 dark:from-[#1d2f3e]/80 dark:to-[#2a2347]/70 rounded-lg py-2 px-3 shadow">
            <CalendarCheck className="text-emerald-500 size-4" />
            <span className="font-semibold text-gray-800 dark:text-white text-sm">Script Left</span>
            <span className={`ml-auto text-sm font-bold ${script.count >= 10 ? "text-red-500" : "text-emerald-600 dark:text-emerald-300"}`}>
              {10 - script.count} <span className="text-xs text-gray-400">/10</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-tr from-pastelblue/80 via-pastellav/70 to-pastelindigo/40 dark:from-[#381d5e]/80 dark:to-[#254e65]/60 rounded-lg py-2 px-3 shadow">
            <BadgeCheck className="text-fuchsia-500 size-4" />
            <span className="font-semibold text-gray-800 dark:text-white text-sm">Caption Left</span>
            <span className={`ml-auto text-sm font-bold ${caption.count >= 10 ? "text-red-500" : "text-fuchsia-600 dark:text-fuchsia-300"}`}>
              {10 - caption.count} <span className="text-xs text-gray-400">/10</span>
            </span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-1 mt-2 text-xs text-slate-700 dark:text-slate-300">
        <Timer className="size-4 text-cyan-400" />
        <span>Resets in <span className="font-mono font-semibold">{timeToReset}</span></span>
      </div>
    </div>
  );
};

export default DailyQuotaBox;
