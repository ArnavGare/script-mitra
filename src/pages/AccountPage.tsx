
import React from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";
import { useLastGenerations } from "@/hooks/useLastGenerations";
import { useLoginActivity } from "@/hooks/useLoginActivity";
import { useDailyQuotaCooldown } from "@/hooks/useDailyQuotaCooldown";

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
      <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#151924] dark:to-[#19182c] py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-7">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center font-inter">Account</h1>
          
          {/* Authentication Details */}
          <Card className="mb-5 p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/60 shadow-md backdrop-blur">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Authentication Details</span>
            </div>
            {isLoading ? (
              <div className="text-cyan-600">Loading...</div>
            ) : user ? (
              <div>
                <div className="mt-2 text-base"><span className="font-medium">Email:</span> {user.email}</div>
              </div>
            ) : (
              <div className="text-red-600">Not logged in</div>
            )}
          </Card>

          {/* Generations Quota Info */}
          <Card className="mb-5 p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/60 shadow-md backdrop-blur">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Today's Generations Usage</span>
            </div>
            {quotaLoading ? (
              <div className="text-cyan-600">Loading quota...</div>
            ) : quotaError ? (
              <div className="text-red-600">Error: {quotaError}</div>
            ) : (
              <ul className="mt-2 text-base space-y-1">
                <li>
                  <span className="font-medium">Script generations left:&nbsp;</span>
                  <span>{10 - script.count} / 10</span>
                  {script.disabled && (<span className="ml-2 text-xs text-red-500">(Limit reached)</span>)}
                </li>
                <li>
                  <span className="font-medium">Caption generations left:&nbsp;</span>
                  <span>{10 - caption.count} / 10</span>
                  {caption.disabled && (<span className="ml-2 text-xs text-red-500">(Limit reached)</span>)}
                </li>
                <li className="text-sm mt-2 text-sky-800 dark:text-sky-200">
                  <span>Reset in: </span>
                  <span className="font-mono">{timeToReset}</span>
                  <span className="ml-2 text-xs text-gray-500">(at midnight)</span>
                </li>
              </ul>
            )}
          </Card>

          {/* Recent Login Activity */}
          <Card className="p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/60 shadow-md backdrop-blur">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Recent Login Activity</span>
            </div>
            {loginsLoading ? (
              <div className="text-cyan-600">Loading...</div>
            ) : logins && logins.length > 0 ? (
              <ul className="mt-2 text-base">
                {logins.map((l) => (
                  <li key={l.id} className="flex gap-2 justify-between py-1 border-b last:border-none border-gray-200 dark:border-cyan-900/40">
                    <span>{new Date(l.logged_in_at).toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400">{l.device || l.ip_address || "Unknown device"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No login activity found.</div>
            )}
          </Card>

          {/* Last 5 Generations */}
          <Card className="p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/60 shadow-md backdrop-blur">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Last 5 Generations</span>
            </div>
            {gensLoading ? (
              <div className="text-cyan-600">Loading...</div>
            ) : generations && generations.length > 0 ? (
              <ul className="mt-2 text-base">
                {generations.map((gen) => (
                  <li key={gen.id} className="flex flex-col sm:flex-row justify-between py-1 border-b last:border-none border-gray-200 dark:border-cyan-900/40">
                    <span>
                      <span className="inline-block rounded px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 mr-2">
                        {gen.type === "script" ? "Script" : "Hashtag"}
                      </span>
                      {gen.title}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {new Date(gen.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No recent generations.</div>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
