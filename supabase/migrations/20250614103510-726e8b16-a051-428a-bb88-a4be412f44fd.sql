
-- 1. Create the users_credits table
CREATE TABLE public.users_credits (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  credits_remaining INTEGER NOT NULL DEFAULT 100,
  plan_type TEXT NOT NULL DEFAULT 'Free', -- Valid values: 'Free', 'Creator', 'Pro'
  last_refill_date TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security to enforce per-user access
ALTER TABLE public.users_credits ENABLE ROW LEVEL SECURITY;

-- 3. Only allow users to view/update/insert/delete their own credits
CREATE POLICY "Select own credits" ON public.users_credits
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Update own credits" ON public.users_credits
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Insert own credits" ON public.users_credits
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Delete own credits" ON public.users_credits
  FOR DELETE USING (user_id = auth.uid());

-- 4. Trigger: auto-create users_credits row on user signup
CREATE OR REPLACE FUNCTION public.create_user_credits_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users_credits (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS after_auth_user_created ON auth.users;

CREATE TRIGGER after_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_user_credits_on_signup();
