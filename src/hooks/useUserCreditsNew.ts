
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fetches row for currently logged-in user
export function useUserCreditsNew(userId: string | null) {
  const queryClient = useQueryClient();

  // Explicitly type as readonly tuple, and assign with `as const`
  const queryKey = ["users-credits", userId] as const;

  const fetchCredits = async () => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from("users_credits")
      .select("email, credits_remaining, plan_type, last_refill_date")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  // Deduct one credit
  const deductCredit = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("No user");
      const { error } = await supabase.rpc("deduct_credit_for_user", { _user_id: userId });
      if (error) throw error;
    },
    onSuccess: () => {
      // Use the exact queryKey reference
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const query = useQuery({
    queryKey,
    queryFn: fetchCredits,
    enabled: !!userId,
    refetchInterval: 30000,
  });

  return { ...query, deductCredit };
}

