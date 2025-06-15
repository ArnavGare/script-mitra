
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAppAccessGate() {
  const [accessChecked, setAccessChecked] = useState(false);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let ignore = false;
    let subscription: any;

    const checkAccess = async () => {
      // Get session
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser);

      if (!currentUser) {
        setAllowed(false);
        setAccessChecked(true);
        return;
      }

      // Query allowed_users table for email
      const { data, error } = await supabase
        .from("allowed_users")
        .select("email,active")
        .eq("email", currentUser.email)
        .maybeSingle();

      if (error) {
        setAllowed(false);
      } else {
        setAllowed(data?.active === true);
      }
      setAccessChecked(true);
    };

    // Listen for auth changes to refresh access
    subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAllowed(null);
      setAccessChecked(false);
      setTimeout(() => checkAccess(), 0);
    });

    checkAccess();

    return () => {
      if (subscription && subscription.data?.subscription) {
        subscription.data.subscription.unsubscribe();
      }
    };
  }, []);

  return { allowed, user, accessChecked };
}
