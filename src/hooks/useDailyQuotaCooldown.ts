
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

// Helper: get local midnight in ISO string (for SQL)
function todayMidnightISO() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
}

type UsageType = "script" | "caption";

type QuotaData = {
  script: {
    todayCount: number;
    lastGeneratedAt: string | null;
  };
  caption: {
    todayCount: number;
    lastGeneratedAt: string | null;
  };
  loading: boolean;
  error?: string | null;
};

export function useDailyQuotaCooldown() {
  const { user } = useSupabaseUser();
  const [data, setData] = useState<QuotaData>({
    script: { todayCount: 0, lastGeneratedAt: null },
    caption: { todayCount: 0, lastGeneratedAt: null },
    loading: true,
  });
  const [cooldownEnd, setCooldownEnd] = useState<Date | null>(null);
  const [now, setNow] = useState(new Date());

  const timer = useRef<number | null>(null);

  // Refresh timer
  useEffect(() => {
    timer.current = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  // Query counts & cooldown
  const refresh = useCallback(async () => {
    if (!user?.id) {
      setData(d => ({ ...d, loading: false, error: null }));
      setCooldownEnd(null);
      return;
    }
    setData(d => ({ ...d, loading: true }));
    try {
      const midnight = todayMidnightISO();

      // Get all logs from today for this user (both types)
      const { data: logs, error } = await supabase
        .from("usage_logs")
        .select("type, created_at")
        .eq("user_id", user.id)
        .gte("created_at", midnight);

      if (error) throw error;

      let scriptCount = 0;
      let scriptLast: string | null = null;
      let captionCount = 0;
      let captionLast: string | null = null;
      let maxLast: string | null = null;

      logs.forEach((log: { type: string; created_at: string }) => {
        if (log.type === "script") {
          scriptCount += 1;
          if (!scriptLast || log.created_at > scriptLast) scriptLast = log.created_at;
        } else if (log.type === "caption") {
          captionCount += 1;
          if (!captionLast || log.created_at > captionLast) captionLast = log.created_at;
        }
        if (!maxLast || log.created_at > maxLast) maxLast = log.created_at;
      });

      // Cooldown: if most recent log < 60s ago, start countdown
      let cooldown: Date | null = null;
      if (maxLast) {
        const last = new Date(maxLast);
        const cd = new Date(last.getTime() + 60 * 1000);
        if (cd > new Date()) cooldown = cd;
      }
      setCooldownEnd(cooldown);

      setData({
        script: { todayCount: scriptCount, lastGeneratedAt: scriptLast },
        caption: { todayCount: captionCount, lastGeneratedAt: captionLast },
        loading: false,
      });
    } catch (error: any) {
      setData(d => ({ ...d, loading: false, error: error.message || "Failed to check quotas" }));
    }
  }, [user?.id]);

  // Initial & periodic refresh
  useEffect(() => {
    refresh();
    // Fast poll after every minute just in case
    const id = setInterval(() => refresh(), 10000);
    return () => clearInterval(id);
  }, [refresh]);

  // Log a generation (adds usage log for the given type, then re-check all)
  const logGeneration = useCallback(
    async (type: UsageType) => {
      if (!user?.id) {
        setData(d => ({ ...d, error: "No user ID" }));
        return;
      }
      const { error } = await supabase.from("usage_logs").insert({
        user_id: user.id,
        type,
      });
      if (error) {
        setData(d => ({ ...d, error: error.message || "Failed to log usage" }));
        return;
      }
      await refresh();
    },
    [user?.id, refresh]
  );

  // Quota/cooldown logic
  const cooldownActive = cooldownEnd && cooldownEnd > now;
  const cooldownSeconds = cooldownActive
    ? Math.ceil((cooldownEnd.getTime() - now.getTime()) / 1000)
    : 0;

  // Quota reach logic (10/day)
  const scriptDisabled = data.script.todayCount >= 10 || cooldownActive;
  const captionDisabled = data.caption.todayCount >= 10 || cooldownActive;

  // Tooltip/feedback/messages
  const scriptTooltip =
    data.script.todayCount >= 10
      ? "Daily script quota reached. Resets at 00:00."
      : cooldownActive
      ? `Wait ${cooldownSeconds}s…`
      : "";

  const captionTooltip =
    data.caption.todayCount >= 10
      ? "Daily captions quota reached. Resets at 00:00."
      : cooldownActive
      ? `Wait ${cooldownSeconds}s…`
      : "";

  return {
    loading: data.loading,
    error: data.error,
    script: {
      count: data.script.todayCount,
      disabled: scriptDisabled,
      tooltip: scriptTooltip,
    },
    caption: {
      count: data.caption.todayCount,
      disabled: captionDisabled,
      tooltip: captionTooltip,
    },
    cooldownActive,
    cooldownSeconds,
    logGeneration,
    refresh,
  };
}
