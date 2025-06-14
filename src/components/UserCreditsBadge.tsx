
import React from "react";
import { useUserCredits } from "@/hooks/useUserCredits";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { Sparkles } from "lucide-react";

export default function UserCreditsBadge() {
  const { user } = useSupabaseUser();
  const { data, isLoading } = useUserCredits(user?.id || null);

  if (!user) return null;

  return (
    <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200 font-semibold flex items-center gap-2 text-sm shadow-md">
      <Sparkles className="w-4 h-4 text-yellow-500" />
      {isLoading ? "..." : `Credits Left: ${data ?? 0}`}
    </div>
  );
}
