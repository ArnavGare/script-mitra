
-- Remove existing policies if they target anonymous/public (optional, for cleanup)
-- DROP POLICY IF EXISTS "User can view own credits" ON public.user_credits;
-- DROP POLICY IF EXISTS "User can update own credits" ON public.user_credits;

-- Strict RLS policies for authenticated users only:

-- Allow authenticated users to select THEIR credits
CREATE POLICY "Allow authenticated users to select user credits" 
ON public.user_credits 
FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Allow authenticated users to insert THEIR credits if needed (extra: typically managed by triggers)
CREATE POLICY "Allow authenticated users to insert user credits" 
ON public.user_credits 
FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Allow authenticated users to update THEIR credits
CREATE POLICY "Allow authenticated users to update user credits" 
ON public.user_credits 
FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Allow authenticated users to delete THEIR credits (optional, you might NOT want this!)
CREATE POLICY "Allow authenticated users to delete user credits" 
ON public.user_credits 
FOR DELETE 
TO authenticated 
USING (user_id = auth.uid());
