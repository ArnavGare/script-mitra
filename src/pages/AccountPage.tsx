import React from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { User, CalendarCheck, BadgeCheck, BarChart2, ShieldCheck, Timer, UserCircle2, KeyRound, Settings2 } from "lucide-react";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";
import { useLastGenerations } from "@/hooks/useLastGenerations";
import { useLoginActivity } from "@/hooks/useLoginActivity";
import { useDailyQuotaCooldown } from "@/hooks/useDailyQuotaCooldown";
import DailyQuotaBox from "@/components/DailyQuotaBox";

export default function AccountPage() {
  const { user, isLoading } = useSupabaseUser();
  const navigate = useNavigate();

  // fetch real login activity and generations
  const { data: generations, isLoading: gensLoading } = useLastGenerations(user?.id);
  const { data: logins, isLoading: loginsLoading } = useLoginActivity(user?.id);

  // Quota/cooldown
  const { loading: quotaLoading, error: quotaError, script, caption } = useDailyQuotaCooldown();

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

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth/login");
    }
  }, [isLoading, user, navigate]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pastelmint/80 via-pastellav/70 to-pastelblue/60 dark:from-[#181e2e] dark:via-[#19182c] dark:to-[#1C2344] py-8 px-2 sm:px-4">
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
          {/* Enhanced Title */}
          <div className="text-center py-2 mt-2">
            <h1 className="text-4xl font-extrabold font-playfair headline-glow mb-3 flex items-center justify-center gap-2">
              <UserCircle2 className="text-cyan-400 size-10 animate-float" /> My Account
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-300 max-w-xl mx-auto">All your user info, quota usage, and account activity — all in one beautiful place!</p>
          </div>

          {/* Daily Quota Box */}
          <div className="flex justify-center">
            <DailyQuotaBox />
          </div>

          {/* Authentication Details */}
          <Card className="mb-3 animate-fade-in shadow-smooth border border-pastelindigo/40 dark:border-[#232244]/70 p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-[#363553]/60 pb-2">
              <BadgeCheck className="text-sky-500" />
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Authentication</span>
            </div>
            {isLoading ? (
              <div className="text-cyan-800 mt-2">Loading...</div>
            ) : user ? (
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <div className="text-base flex items-center gap-2">
                  <KeyRound className="size-5 text-emerald-500" />
                  <span className="font-medium text-gray-700 dark:text-pastelmint">Email:</span>
                  <span className="px-2 py-0.5 rounded text-sm bg-blue-100 dark:bg-[#293584] text-blue-900 dark:text-blue-200">{user.email}</span>
                </div>
              </div>
            ) : (
              <div className="text-red-600 mt-2">Not logged in</div>
            )}
          </Card>

          {/* Generations Quota Info */}
          <Card className="mb-3 animate-fade-in shadow-smooth border border-pastelindigo/40 dark:border-[#232244]/70 p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/80 backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-[#363553]/70 pb-2 mb-1">
              <BarChart2 className="text-fuchsia-500" />
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Daily Quota</span>
            </div>
            {quotaLoading ? (
              <div className="text-cyan-700 mt-3">Loading quota...</div>
            ) : quotaError ? (
              <div className="text-red-600 mt-3">Error: {quotaError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-3 bg-gradient-to-tr from-emerald-100/70 via-blue-100/60 to-violet-100/50 dark:from-[#1d2f3e]/80 dark:to-[#2a2347]/70 rounded-xl py-4 px-4 shadow">
                  <span className="inline-flex items-center gap-2">
                    <CalendarCheck className="text-emerald-500 size-6" />
                    <span className="font-semibold text-gray-800 dark:text-white">Script Left</span>
                  </span>
                  <span className={`ml-auto text-lg font-bold ${script.count >= 10 ? "text-red-500" : "text-emerald-600 dark:text-emerald-300"}`}>
                    {10 - script.count} <span className="text-xs text-gray-400">/10</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-tr from-pastelblue/80 via-pastellav/70 to-pastelindigo/40 dark:from-[#381d5e]/80 dark:to-[#254e65]/60 rounded-xl py-4 px-4 shadow">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck className="text-fuchsia-500 size-6" />
                    <span className="font-semibold text-gray-800 dark:text-white">Caption Left</span>
                  </span>
                  <span className={`ml-auto text-lg font-bold ${caption.count >= 10 ? "text-red-500" : "text-fuchsia-600 dark:text-fuchsia-300"}`}>
                    {10 - caption.count} <span className="text-xs text-gray-400">/10</span>
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 mt-4 text-sm text-slate-700 dark:text-slate-300">
              <Timer className="size-4 text-cyan-400" />
              <span>Quota resets in&nbsp;</span>
              <span className="font-mono font-semibold">{timeToReset}</span>
              <span className="ml-1 text-xs text-gray-400 italic">(at midnight)</span>
            </div>
          </Card>

          {/* Recent Login Activity */}
          <Card className="mb-3 animate-fade-in shadow-smooth border border-pastelindigo/40 dark:border-[#232244]/70 p-6 rounded-2xl bg-white/80 dark:bg-[#21233c]/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-[#363553]/60 pb-2 mb-1">
              <ShieldCheck className="text-sky-500" />
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Recent Logins</span>
            </div>
            {loginsLoading ? (
              <div className="text-cyan-600 mt-2">Loading...</div>
            ) : logins && logins.length > 0 ? (
              <ul className="mt-2 text-base divide-y divide-gray-100 dark:divide-cyan-900/30">
                {logins.slice(0, 5).map((l) => (
                  <li key={l.id} className="flex gap-2 justify-between py-1">
                    <span className="flex-1 min-w-0 truncate">{new Date(l.logged_in_at).toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{l.device || l.ip_address || "Unknown device"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 mt-2">No login activity found.</div>
            )}
          </Card>

          {/* Last 5 Generations */}
          <Card className="animate-fade-in shadow-smooth border border-pastelindigo/40 dark:border-[#232244]/70 p-6 rounded-2xl bg-white/85 dark:bg-[#232244]/85 backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-[#363553]/60 pb-2 mb-1">
              <BarChart2 className="text-indigo-500" />
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Last 5 Generations</span>
            </div>
            {gensLoading ? (
              <div className="text-cyan-600 mt-2">Loading...</div>
            ) : generations && generations.length > 0 ? (
              <ul className="mt-2 text-base divide-y divide-gray-100 dark:divide-cyan-900/20">
                {generations.slice(0, 5).map((gen) => (
                  <li key={gen.id} className="flex flex-col sm:flex-row justify-between py-1">
                    <span>
                      <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold mr-2
                        ${gen.type === "script"
                        ? "bg-emerald-200/40 text-emerald-800 dark:bg-emerald-700/60 dark:text-emerald-100"
                        : "bg-indigo-200/50 text-indigo-800 dark:bg-indigo-700/70 dark:text-indigo-100"}
                      `}>
                        {gen.type === "script" ? "Script" : "Hashtag"}
                      </span>
                      {gen.title}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {new Date(gen.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 mt-2">No recent generations.</div>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
