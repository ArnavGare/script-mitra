
import React from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";

// Placeholder for last login timestamps (in production, this must be fetched from server/logs)
const mockLogins = [
  { date: "2025-06-15 11:01:43", device: "MacBook Chrome" },
  { date: "2025-06-14 10:12:23", device: "iPhone Safari" },
  { date: "2025-06-13 17:05:08", device: "Windows Edge" },
];

// Placeholder for "generations" (replace with real data if available)
const mockGenerations = [
  { title: "Sales Pitch Script", date: "2025-06-14" },
  { title: "Instagram Reel Content", date: "2025-06-13" },
  { title: "Monthly Content Plan", date: "2025-06-12" },
  { title: "Objection Handling Guide", date: "2025-06-11" },
  { title: "Lead Magnet Prompt", date: "2025-06-10" },
];

export default function AccountPage() {
  const { user, isLoading } = useSupabaseUser();
  const navigate = useNavigate();

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
                <div className="mt-1 text-base"><span className="font-medium">User ID:</span> {user.id}</div>
              </div>
            ) : (
              <div className="text-red-600">Not logged in</div>
            )}
          </Card>

          {/* Recent Login Activity */}
          <Card className="p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/60 shadow-md backdrop-blur">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Recent Login Activity</span>
            </div>
            <ul className="mt-2 text-base">
              {mockLogins.map((l, idx) => (
                <li key={idx} className="flex justify-between py-1 border-b last:border-none border-gray-200 dark:border-cyan-900/40">
                  <span>{l.date}</span>
                  <span className="text-gray-500 dark:text-gray-400">{l.device}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Last 5 Generations */}
          <Card className="p-6 rounded-2xl bg-white/70 dark:bg-[#232244]/60 shadow-md backdrop-blur">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Last 5 Generations</span>
            </div>
            <ul className="mt-2 text-base">
              {mockGenerations.map((gen, idx) => (
                <li key={idx} className="flex justify-between py-1 border-b last:border-none border-gray-200 dark:border-cyan-900/40">
                  <span>{gen.title}</span>
                  <span className="text-gray-500 dark:text-gray-400">{gen.date}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
}
