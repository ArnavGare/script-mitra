
import { useQuery, useMutation, useQueryClient, type InvalidateQueryFilters } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Fix the type for user credits
type UsersCreditsRow = Database["public"]["Tables"]["users_credits"]["Row"];

// Explicitly define queryKey type
type UserCreditsQueryKey = [string, string | null];

// Fetches row for currently logged-in user
export function useUserCreditsNew(userId: string | null) {
  const queryClient = useQueryClient();

  // queryKey should be typed explicitly everywhere
  const queryKey: UserCreditsQueryKey = ["users-credits", userId];

  const fetchCredits = async (): Promise<UsersCreditsRow | null> => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from("users_credits")
      .select("user_id, email, credits_remaining, plan_type, last_refill_date")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  // Deduct one credit
  const deductCredit = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("No user");
      // This assumes an RPC called 'deduct_credit_for_user' exists
      const { error } = await supabase.rpc("deduct_credit_for_user", { _user_id: userId });
      if (error) throw error;
    },
    onSuccess: () => {
      // Pass the queryKey object directly to invalidateQueries
      // This avoids the problematic explicit type annotation on an intermediate 'filters' variable
      queryClient.invalidateQueries({ queryKey: queryKey });
    }
  });

  // Tell useQuery what data to expect (fixing type inference!)
  const query = useQuery<UsersCreditsRow | null>({
    queryKey,
    queryFn: fetchCredits,
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return { ...query, deductCredit };
}

