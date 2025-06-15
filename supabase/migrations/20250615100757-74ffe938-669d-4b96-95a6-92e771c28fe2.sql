
-- Create the bucket for digital product files if not exists
insert into storage.buckets (id, name, public)
values ('product_files', 'product_files', true)
on conflict (id) do nothing;
