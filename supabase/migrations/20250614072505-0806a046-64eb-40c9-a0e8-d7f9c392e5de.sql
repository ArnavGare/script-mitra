
-- 1. Table to track credits per user.
CREATE TABLE public.user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Trigger function: Give new users 100 free credits.
CREATE OR REPLACE FUNCTION public.grant_initial_credits()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits, updated_at)
  VALUES (NEW.id, 100, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger: Run on new user signup
CREATE TRIGGER trigger_grant_initial_credits
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_initial_credits();

-- 4. Enable RLS for user_credits table.
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- 5. Allow user to select their own credits.
CREATE POLICY "User can view own credits"
ON public.user_credits
FOR SELECT
USING (user_id = auth.uid());

-- 6. Allow user to update only their own credits (minus 1 for generation, upgrades will use service key)
CREATE POLICY "User can update own credits"
ON public.user_credits
FOR UPDATE
USING (user_id = auth.uid());

