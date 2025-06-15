
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

// Options for type: "script" | "captions"
export function useDailyQuotaCooldown(type: "script" | "captions") {
  const [isChecking, setIsChecking] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [cooldownSecs, setCooldownSecs] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [logsToday, setLogsToday] = useState(0);

  const cooldownRef = useRef<NodeJS.Timeout | null>(null);

  // Called to re-check after each generation or auth change
  const refresh = useCallback(async () => {
    setIsChecking(true);

    // Get user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) {
      setIsBlocked(true);
      setCooldownSecs(0);
      setLimitReached(false);
      setIsChecking(false);
      return;
    }

    // Start of today in UTC
    const todayMidnight = new Date();
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const todayISO = todayMidnight.toISOString();

    // 1. Count logs for today
    const { count, error } = await supabase
      .from("usage_logs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("type", type)
      .gte("created_at", todayISO);

    setLogsToday(count || 0);

    if ((count || 0) >= 10) {
      setIsBlocked(true);
      setLimitReached(true);
      setCooldownSecs(0);
      setIsChecking(false);
      return;
    }

    // 2. Fetch most recent log for this user & type
    const { data: [lastLog] = [] } = await supabase
      .from("usage_logs")
      .select("created_at")
      .eq("user_id", user.id)
      .eq("type", type)
      .order("created_at", { ascending: false })
      .limit(1);

    let cooldown = 0;
    if (lastLog?.created_at) {
      const lastTS = new Date(lastLog.created_at).getTime();
      const now = Date.now();
      const delta = Math.floor((now - lastTS) / 1000);
      cooldown = Math.max(0, 60 - delta);
    }
    setCooldownSecs(cooldown);
    setIsBlocked(cooldown > 0);
    setLimitReached(false);
    setIsChecking(false);

    // Start timer if necessary
    if (cooldown > 0) {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
      cooldownRef.current = setInterval(() => {
        setCooldownSecs(cur => {
          if (cur <= 1) {
            clearInterval(cooldownRef.current!);
            setIsBlocked(false);
            return 0;
          }
          return cur - 1;
        });
      }, 1000);
    } else if (cooldownRef.current) {
      clearInterval(cooldownRef.current);
    }
  }, [type]);

  // On mount & on type/user change
  useEffect(() => {
    refresh();
    // Listen for auth state changes and refresh
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => refresh(), 0);
    });
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
      listener?.subscription?.unsubscribe?.();
    };
    // We intentionally don't add refresh as a dep (would rerun constantly)
  }, [type]);

  // Call after successful generation
  const logGeneration = useCallback(async () => {
    // Get user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) return;
    await supabase
      .from("usage_logs")
      .insert([{ user_id: user.id, type }]);
    // Immediate cooldown after logging
    setCooldownSecs(60);
    setIsBlocked(true);
    setLimitReached(false);

    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldownSecs(cur => {
        if (cur <= 1) {
          clearInterval(cooldownRef.current!);
          setIsBlocked(false);
          return 0;
        }
        return cur - 1;
      });
    }, 1000);

    refresh();
  }, [type, refresh]);

  // For UI/UX
  let buttonText = "";
  if (isChecking) buttonText = "Loading...";
  else if (limitReached) buttonText = "Daily Limit Reached";
  else if (isBlocked && cooldownSecs > 0) buttonText = `Please wait ${cooldownSecs}s`;
  else buttonText = "";

  return {
    isBlocked,
    isChecking,
    cooldownSecs,
    limitReached,
    logsToday,
    refresh,
    logGeneration,
    buttonText,
  };
}
