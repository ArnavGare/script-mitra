
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type LoginActivity = {
  id: string;
  device: string | null;
  ip_address: string | null;
  logged_in_at: string;
};

export function useLoginActivity(userId: string | null | undefined) {
  return useQuery({
    queryKey: ["login-activity", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("login_activity")
        .select("device, ip_address, logged_in_at, id")
        .eq("user_id", userId)
        .order("logged_in_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as LoginActivity[];
    },
  });
}
