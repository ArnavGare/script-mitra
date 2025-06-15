
-- Create table for tracking generations
CREATE TABLE public.usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('script', 'caption')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view only their own logs
CREATE POLICY "Users can view their usage logs"
  ON public.usage_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own usage logs
CREATE POLICY "Users can insert their own usage logs"
  ON public.usage_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
