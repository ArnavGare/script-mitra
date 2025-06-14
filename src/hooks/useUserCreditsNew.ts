import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Fix the type for user credits
type UsersCreditsRow = Database["public"]["Tables"]["users_credits"]["Row"];

// Fetches row for currently logged-in user
export function useUserCreditsNew(userId: string | null) {
  const queryClient = useQueryClient();

  // Keep the queryKey strongly typed as before
  const queryKey = ["users-credits", userId] as const;

  const fetchCredits = async (): Promise<UsersCreditsRow | null> => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from("users_credits")
      // Include `user_id` to satisfy the full type
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
      const { error } = await supabase.rpc("deduct_credit_for_user", { _user_id: userId });
      if (error) throw error;
    },
    onSuccess: () => {
      // Use the exact queryKey reference with correct typing
      queryClient.invalidateQueries({ queryKey });
    }
  });

  // Tell useQuery what data to expect (fixing type inference!)
  const query = useQuery<UsersCreditsRow | null>({
    queryKey,
    queryFn: fetchCredits,
    enabled: !!userId,
    refetchInterval: 30000,
  });

  return { ...query, deductCredit };
}
