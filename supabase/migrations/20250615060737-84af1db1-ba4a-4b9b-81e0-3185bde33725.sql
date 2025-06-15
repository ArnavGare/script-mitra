
-- Table for user generations (script/hashtag generations)
CREATE TABLE public.generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('script', 'hashtag')),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- RLS for generations (users can only access their own generations)
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can see their own generations"
  ON public.generations
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "User can insert their own generations"
  ON public.generations
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Table to track login activity
CREATE TABLE public.login_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  device TEXT,
  ip_address TEXT,
  logged_in_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- RLS for login_activity (users can only access their own)
ALTER TABLE public.login_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can see their own login activity"
  ON public.login_activity
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "User can insert their own login activity"
  ON public.login_activity
  FOR INSERT
  WITH CHECK (user_id = auth.uid());
