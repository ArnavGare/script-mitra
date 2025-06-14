
import React from "react";
import { useUserCredits } from "@/hooks/useUserCredits";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { Sparkles, User as UserIcon } from "lucide-react";

export default function UserCreditsBadge() {
  const { user } = useSupabaseUser();
  const { data, isLoading } = useUserCredits(user?.id || null);

  if (!user) return null;

  return (
    <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200 font-semibold flex items-center gap-3 text-sm shadow-md">
      <Sparkles className="w-4 h-4 text-yellow-500" />
      {isLoading ? "..." : `Credits Left: ${data ?? 0}`}
      <span className="flex items-center gap-1 pl-2 pr-2 border-l border-blue-200 dark:border-blue-700 text-slate-700 dark:text-blue-100 font-medium truncate max-w-[160px]">
        <UserIcon className="w-4 h-4 text-blue-500 dark:text-blue-200" />
        <span className="truncate">{user.email}</span>
      </span>
    </div>
  );
}
