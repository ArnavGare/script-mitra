
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Returns {credits: number|null, isLoading, refetch}
export function useUserCredits(userId: string | null) {
  const fetchCredits = async () => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw error;
    return data ? data.credits : null;
  };

  const query = useQuery({
    queryKey: ["user-credits", userId],
    queryFn: fetchCredits,
    enabled: !!userId,
    refetchInterval: 30000,
  });

  return query;
}
