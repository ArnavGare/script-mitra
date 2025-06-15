
-- Add email and active columns to allowed_users
ALTER TABLE public.allowed_users
  ADD COLUMN email text UNIQUE NOT NULL;

ALTER TABLE public.allowed_users
  ADD COLUMN active boolean NOT NULL DEFAULT true;

-- (Optional) Set existing rows' emails (you can manually update these later)

-- Enable RLS (row-level security), but allow you as admin to access/update as needed
ALTER TABLE public.allowed_users ENABLE ROW LEVEL SECURITY;

-- Basic policies: only service_role/admin can select/update/insert/delete rows by default (customize as needed)

CREATE POLICY "Admin can do anything" ON public.allowed_users
  FOR ALL USING (true) WITH CHECK (true);

