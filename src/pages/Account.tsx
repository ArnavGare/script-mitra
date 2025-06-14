
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useUserCreditsNew } from "@/hooks/useUserCreditsNew";
import {
  User,
  AtSign,
  CalendarCheck,
  BadgeDollarSign,
  BadgeCheck,
  LogOut,
  SquarePen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function Account() {
  const navigate = useNavigate();
  const { user, isLoading } = useSupabaseUser();
  const { data: dbData, isLoading: loadingCredits } = useUserCreditsNew(user?.id || null);

  // If user not logged in, redirect.
  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (!user) return null; // Show nothing while redirecting

  // Profile fields
  const fullName = user.user_metadata?.name || "User";
  const email = user.email;
  const signupDate = formatDate(user.created_at);
  const credits = loadingCredits ? null : dbData?.credits_remaining ?? 0;
  const planType = dbData?.plan_type || "Free";
  
  // (Optional) Handler for logout
  const handleLogout = async () => {
    const { error } = await import("@/integrations/supabase/client").then(mod => mod.supabase.auth.signOut());
    if (!error) navigate("/auth/login", { replace: true });
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-blue-200/40 to-white dark:from-gray-900 dark:via-blue-900/40 dark:to-black px-2 py-10">
        <Card className="w-full max-w-3xl glassmorphic-card border-none shadow-2xl animate-fade-in-up">
          <CardContent className="p-6 md:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-900 dark:text-white fade-in">
                Welcome, <span className="font-extrabold">{fullName}</span>
              </h1>
              <div className="text-lg text-muted-foreground mb-2">
                <span>Here&apos;s your account overview</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left: Profile details */}
              <div className="space-y-8 flex flex-col">
                {/* Full Name */}
                <div className="flex items-center gap-4 fade-in animate-fade-in-up">
                  <User className="w-6 h-6 text-blue-800 dark:text-blue-200" />
                  <div>
                    <div className="font-semibold text-lg text-slate-800 dark:text-white">{fullName}</div>
                    <div className="text-xs text-muted-foreground">Full Name</div>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center gap-4 fade-in animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <AtSign className="w-6 h-6 text-blue-800 dark:text-blue-200" />
                  <div>
                    <div className="font-medium text-base">{email}</div>
                    <div className="text-xs text-muted-foreground">Email Address</div>
                  </div>
                </div>
                {/* Signup Date */}
                <div className="flex items-center gap-4 fade-in animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <CalendarCheck className="w-6 h-6 text-blue-800 dark:text-blue-200" />
                  <div>
                    <div className="text-base">{signupDate}</div>
                    <div className="text-xs text-muted-foreground">Joined On</div>
                  </div>
                </div>
                {/* Plan Type */}
                <div className="flex items-center gap-4 fade-in animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <BadgeCheck className="w-6 h-6 text-blue-800 dark:text-blue-200" />
                  <div>
                    <div className="font-semibold capitalize text-base">{planType}</div>
                    <div className="text-xs text-muted-foreground">Subscription Plan</div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 fade-in animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => { /* Placeholder: Edit profile */ }}
                  >
                    <SquarePen className="w-4 h-4" /> Edit Profile
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </Button>
                </div>
              </div>
              {/* Right: Credits, Call to action */}
              <div className="flex flex-col items-center justify-center gap-6 fade-in animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                {/* Remaining Credits */}
                <div className="flex flex-col items-center">
                  <div className="pb-1 text-xs text-muted-foreground">Credits Remaining</div>
                  <div className="relative">
                    <span className="absolute left-3 top-3">
                      <BadgeDollarSign className="w-7 h-7 text-amber-400/90" />
                    </span>
                    <div className="text-5xl md:text-6xl leading-none font-black tracking-tight rounded-xl bg-gradient-to-r from-blue-300/30 via-purple-200/30 to-blue-600/30 shadow-lg px-10 py-6 pl-16 pr-7 dark:bg-gradient-to-r dark:from-blue-800/20 dark:via-fuchsia-900/10 dark:to-blue-900/30 border border-blue-300/60 dark:border-blue-800/50 select-none glassmorphic-numbox">
                      {loadingCredits ? <span className="animate-pulse">...</span> : credits}
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-light text-blue-900 dark:text-blue-100 flex flex-row items-center gap-1">
                    <span>Use wisely — this is your script currency 💡</span>
                  </div>
                  <Button
                    className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500/90 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 animate-fade-in-up"
                    onClick={() => navigate("/pricing")}
                  >
                    Buy More Credits
                  </Button>
                </div>

                {/* (Optional) CREDITS HISTORY can go here in future */}
                {/* <div className="w-full mt-3">
                  <Card className="bg-white/60 border border-blue-200/40 shadow px-6 py-4 rounded-xl">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <History className="w-4 h-4" /> Credit History
                    </div>
                    <div className="text-xs text-muted-foreground">Coming soon…</div>
                  </Card>
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
