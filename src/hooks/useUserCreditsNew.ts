import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Fix the type for user credits
type UsersCreditsRow = Database["public"]["Tables"]["users_credits"]["Row"];

// Fetches row for currently logged-in user
export function useUserCreditsNew(userId: string | null) {
  const queryClient = useQueryClient();

  const queryKey = ["users-credits", userId] as const;

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
      // Invalidate all queries with the "users-credits" key - partial key match
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "users-credits"
      });
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
