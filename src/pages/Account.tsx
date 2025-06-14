
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useUserCreditsNew } from "@/hooks/useUserCreditsNew";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const fullName = user.user_metadata?.name || "User";
  const email = user.email;
  const signupDate = formatDate(user.created_at);
  const credits = loadingCredits ? null : dbData?.credits_remaining ?? 0;
  const planType = dbData?.plan_type || "Free";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-blue-200/40 to-white dark:from-gray-900 dark:via-blue-900/40 dark:to-black px-2 py-10">
      <Card className="w-full max-w-md glassmorphic-card border-none shadow-2xl animate-fade-in-up">
        <CardContent className="p-6 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-900 dark:text-white fade-in">
              My Account
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <div className="animate-fade-in text-center">
              <div className="font-semibold text-lg text-slate-800 dark:text-white">{fullName}</div>
              <div className="text-xs text-muted-foreground">Full Name</div>
            </div>
            <div className="animate-fade-in fade-in" style={{ animationDelay: "0.07s" }}>
              <div className="font-medium text-base text-center">{email}</div>
              <div className="text-xs text-muted-foreground text-center">Email Address</div>
            </div>
            <div className="animate-fade-in fade-in" style={{ animationDelay: "0.14s" }}>
              <div className="text-center">{signupDate}</div>
              <div className="text-xs text-muted-foreground text-center">Joined On</div>
            </div>
            <div className="animate-fade-in fade-in text-center" style={{ animationDelay: "0.21s" }}>
              <div className="mt-1 mb-0.5 text-xs text-muted-foreground">Credits Remaining</div>
              <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-blue-800 dark:text-blue-200 mb-1">
                {loadingCredits ? <span className="animate-pulse">...</span> : credits}
              </div>
            </div>
            <div className="animate-fade-in fade-in text-center" style={{ animationDelay: "0.28s" }}>
              <div className="font-semibold capitalize text-base">{planType}</div>
              <div className="text-xs text-muted-foreground">Plan</div>
            </div>
            <Button
              className="animate-fade-in fade-in mt-7 bg-gradient-to-r from-purple-600 to-blue-500/90 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all"
              style={{ animationDelay: "0.30s" }}
              onClick={() => navigate("/pricing")}
            >
              Buy More Credits
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
