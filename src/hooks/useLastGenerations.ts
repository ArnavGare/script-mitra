
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Generation = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  created_at: string;
};

export function useLastGenerations(userId: string | null | undefined) {
  return useQuery({
    queryKey: ["last-generations", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("generations")
        .select("id, type, title, description, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as Generation[];
    },
  });
}
