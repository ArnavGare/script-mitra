
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Expects you to pass in a child route page
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checking, setChecking] = React.useState(true);
  const [session, setSession] = React.useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setChecking(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!checking && !session) {
      toast({
        title: "Please log in to access this page.",
        variant: "destructive",
      });
      navigate("/auth/login", { replace: true });
    }
    // eslint-disable-next-line
  }, [checking, session, navigate]);

  if (checking) return null; // Could be a loading spinner

  if (!session) return null; // Will redirect soon

  return <>{children}</>;
}
