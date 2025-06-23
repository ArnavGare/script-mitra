
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseUser } from './useSupabaseUser';

interface QuotaState {
  disabled: boolean;
  tooltip: string;
}

export function useDailyQuotaCooldown() {
  const [loading, setLoading] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [script, setScript] = useState<QuotaState>({ disabled: false, tooltip: "" });
  const [caption, setCaption] = useState<QuotaState>({ disabled: false, tooltip: "" });
  
  const { user } = useSupabaseUser();

  // Check current quota status on mount and user change
  useEffect(() => {
    if (user?.id) {
      refresh();
    }
  }, [user?.id]);

  // Cooldown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (cooldownActive && cooldownSeconds > 0) {
      interval = setInterval(() => {
        setCooldownSeconds(prev => {
          if (prev <= 1) {
            setCooldownActive(false);
            setScript({ disabled: false, tooltip: "" });
            setCaption({ disabled: false, tooltip: "" });
            return 0;
          }
          
          // Update tooltips with new format
          const newTooltip = `Wait ${prev - 1} seconds for next generation`;
          setScript(prev => ({ ...prev, tooltip: newTooltip }));
          setCaption(prev => ({ ...prev, tooltip: newTooltip }));
          
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldownActive, cooldownSeconds]);

  const refresh = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('daily_generations')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false });

      if (error) throw error;

      const now = new Date();
      const scriptGenerations = data?.filter(g => g.type === 'script') || [];
      const captionGenerations = data?.filter(g => g.type === 'caption') || [];

      // Check if user is in cooldown for scripts
      const lastScriptGen = scriptGenerations[0];
      if (lastScriptGen) {
        const lastGenTime = new Date(lastScriptGen.created_at);
        const timeDiff = now.getTime() - lastGenTime.getTime();
        const cooldownMs = 60 * 1000; // 60 seconds
        
        if (timeDiff < cooldownMs) {
          const remainingSeconds = Math.ceil((cooldownMs - timeDiff) / 1000);
          setScript({ 
            disabled: true, 
            tooltip: `Wait ${remainingSeconds} seconds for next generation`
          });
          setCooldownActive(true);
          setCooldownSeconds(remainingSeconds);
        }
      }

      // Check if user is in cooldown for captions  
      const lastCaptionGen = captionGenerations[0];
      if (lastCaptionGen) {
        const lastGenTime = new Date(lastCaptionGen.created_at);
        const timeDiff = now.getTime() - lastGenTime.getTime();
        const cooldownMs = 60 * 1000; // 60 seconds
        
        if (timeDiff < cooldownMs) {
          const remainingSeconds = Math.ceil((cooldownMs - timeDiff) / 1000);
          setCaption({ 
            disabled: true, 
            tooltip: `Wait ${remainingSeconds} seconds for next generation`
          });
          setCooldownActive(true);
          setCooldownSeconds(Math.max(cooldownSeconds, remainingSeconds));
        }
      }

    } catch (err) {
      console.error('Error checking quota:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const logGeneration = async (type: 'script' | 'caption') => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('daily_generations')
        .insert({
          user_id: user.id,
          type: type,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      // Start cooldown
      setCooldownActive(true);
      setCooldownSeconds(60);
      
      if (type === 'script') {
        setScript({ 
          disabled: true, 
          tooltip: "Wait 60 seconds for next generation"
        });
      } else {
        setCaption({ 
          disabled: true, 
          tooltip: "Wait 60 seconds for next generation"
        });
      }

    } catch (err) {
      console.error('Error logging generation:', err);
    }
  };

  return {
    loading,
    script,
    caption,
    cooldownActive,
    cooldownSeconds,
    logGeneration,
    refresh,
    error
  };
}
