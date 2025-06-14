
-- Redefine the grant_initial_credits function to set a fixed search_path

CREATE OR REPLACE FUNCTION public.grant_initial_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits, updated_at)
  VALUES (NEW.id, 100, now());
  RETURN NEW;
END;
$$;
