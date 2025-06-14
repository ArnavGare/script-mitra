
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Provides {user, isLoading}
export function useSupabaseUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading: loading };
}
