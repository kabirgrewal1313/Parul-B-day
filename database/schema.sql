-- Parul's Story — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor → New query

-- ---------------------------------------------------------------------------
-- Memories table (friend submissions + admin moderation)
-- ---------------------------------------------------------------------------

create table if not exists public.memories (
  id bigint generated always as identity primary key,
  name text not null check (char_length(trim(name)) > 0),
  message text not null check (char_length(trim(message)) > 0),
  image_url text,
  storage_path text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists memories_approved_created_at_idx
  on public.memories (approved, created_at desc);

alter table public.memories enable row level security;

-- Public visitors can read approved memories only
create policy "Anyone can read approved memories"
  on public.memories
  for select
  using (approved = true);

-- Service role (FastAPI backend) bypasses RLS.
-- If you later call Supabase directly from the browser, add insert policies there.

-- ---------------------------------------------------------------------------
-- Storage bucket for uploaded memory images
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'memory-images',
  'memory-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Anyone can view images in the public bucket
create policy "Public read memory images"
  on storage.objects
  for select
  using (bucket_id = 'memory-images');

-- Uploads go through the FastAPI backend using the service role key.
-- Optional: allow authenticated users to upload directly from the browser
-- create policy "Authenticated users can upload memory images"
--   on storage.objects
--   for insert
--   to authenticated
--   with check (bucket_id = 'memory-images');

-- ---------------------------------------------------------------------------
-- Optional seed data (remove if you only want live submissions)
-- ---------------------------------------------------------------------------

-- insert into public.memories (name, message, image_url, approved)
-- values (
--   'Sample Friend',
--   'Happy 21st, Parul! This is a test memory.',
--   null,
--   true
-- );
