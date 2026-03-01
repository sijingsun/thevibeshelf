-- VibeStack Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Boards
create table if not exists public.boards (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  is_public boolean default true not null,
  cloned_from uuid references public.boards(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Columns
create table if not exists public.columns (
  id uuid default uuid_generate_v4() primary key,
  board_id uuid references public.boards(id) on delete cascade not null,
  title text not null,
  position integer not null default 0,
  color text default '#fbbf24',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Resources (cards)
create table if not exists public.resources (
  id uuid default uuid_generate_v4() primary key,
  column_id uuid references public.columns(id) on delete cascade not null,
  board_id uuid references public.boards(id) on delete cascade not null,
  added_by uuid references public.profiles(id) on delete set null,
  title text not null,
  url text not null,
  description text,
  favicon_url text,
  tags text[] default '{}',
  upvote_count integer default 0 not null,
  position integer not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Upvotes
create table if not exists public.upvotes (
  id uuid default uuid_generate_v4() primary key,
  resource_id uuid references public.resources(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(resource_id, user_id)
);

-- Board Contributors
create table if not exists public.board_contributors (
  id uuid default uuid_generate_v4() primary key,
  board_id uuid references public.boards(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(board_id, user_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_boards_owner_id on public.boards(owner_id);
create index if not exists idx_boards_is_public on public.boards(is_public);
create index if not exists idx_columns_board_id on public.columns(board_id);
create index if not exists idx_columns_position on public.columns(board_id, position);
create index if not exists idx_resources_column_id on public.resources(column_id);
create index if not exists idx_resources_board_id on public.resources(board_id);
create index if not exists idx_resources_position on public.resources(column_id, position);
create index if not exists idx_upvotes_resource_id on public.upvotes(resource_id);
create index if not exists idx_upvotes_user_id on public.upvotes(user_id);
create index if not exists idx_board_contributors_board_id on public.board_contributors(board_id);
create index if not exists idx_profiles_username on public.profiles(username);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  base_username text;
  final_username text;
  counter integer := 0;
begin
  -- Generate username from email
  base_username := lower(split_part(new.email, '@', 1));
  base_username := regexp_replace(base_username, '[^a-z0-9_]', '_', 'g');
  final_username := base_username;

  -- Ensure uniqueness
  while exists (select 1 from public.profiles where username = final_username) loop
    counter := counter + 1;
    final_username := base_username || counter::text;
  end loop;

  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    final_username,
    coalesce(new.raw_user_meta_data->>'full_name', final_username),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger: create profile on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Toggle upvote (atomic)
create or replace function public.toggle_upvote(
  p_resource_id uuid,
  p_user_id uuid
)
returns json
language plpgsql
security definer set search_path = public
as $$
declare
  v_exists boolean;
  v_new_count integer;
begin
  -- Check if upvote exists
  select exists(
    select 1 from public.upvotes
    where resource_id = p_resource_id and user_id = p_user_id
  ) into v_exists;

  if v_exists then
    -- Remove upvote
    delete from public.upvotes
    where resource_id = p_resource_id and user_id = p_user_id;

    update public.resources
    set upvote_count = greatest(0, upvote_count - 1),
        updated_at = now()
    where id = p_resource_id
    returning upvote_count into v_new_count;

    return json_build_object('upvoted', false, 'count', v_new_count);
  else
    -- Add upvote
    insert into public.upvotes (resource_id, user_id)
    values (p_resource_id, p_user_id);

    update public.resources
    set upvote_count = upvote_count + 1,
        updated_at = now()
    where id = p_resource_id
    returning upvote_count into v_new_count;

    return json_build_object('upvoted', true, 'count', v_new_count);
  end if;
end;
$$;

-- Deep clone a board (copies columns + resources)
create or replace function public.clone_board(
  p_board_id uuid,
  p_new_owner_id uuid,
  p_new_title text
)
returns uuid
language plpgsql
security definer set search_path = public
as $$
declare
  v_new_board_id uuid;
  v_col record;
  v_new_col_id uuid;
begin
  -- Insert new board
  insert into public.boards (owner_id, title, description, is_public, cloned_from)
  select p_new_owner_id, p_new_title, description, true, p_board_id
  from public.boards
  where id = p_board_id
  returning id into v_new_board_id;

  -- Clone each column
  for v_col in
    select * from public.columns where board_id = p_board_id order by position
  loop
    insert into public.columns (board_id, title, position, color)
    values (v_new_board_id, v_col.title, v_col.position, v_col.color)
    returning id into v_new_col_id;

    -- Clone resources in this column
    insert into public.resources (
      column_id, board_id, added_by, title, url, description,
      favicon_url, tags, upvote_count, position
    )
    select
      v_new_col_id, v_new_board_id, p_new_owner_id,
      title, url, description, favicon_url, tags, 0, position
    from public.resources
    where column_id = v_col.id
    order by position;
  end loop;

  return v_new_board_id;
end;
$$;

-- Updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply updated_at triggers
drop trigger if exists handle_updated_at on public.profiles;
create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_updated_at on public.boards;
create trigger handle_updated_at before update on public.boards
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_updated_at on public.columns;
create trigger handle_updated_at before update on public.columns
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_updated_at on public.resources;
create trigger handle_updated_at before update on public.resources
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.boards enable row level security;
alter table public.columns enable row level security;
alter table public.resources enable row level security;
alter table public.upvotes enable row level security;
alter table public.board_contributors enable row level security;

-- PROFILES
create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- BOARDS
create policy "Public boards are viewable by everyone" on public.boards
  for select using (
    is_public = true or
    owner_id = auth.uid() or
    exists (
      select 1 from public.board_contributors
      where board_id = id and user_id = auth.uid()
    )
  );

create policy "Authenticated users can create boards" on public.boards
  for insert with check (auth.uid() = owner_id);

create policy "Owners can update their boards" on public.boards
  for update using (owner_id = auth.uid());

create policy "Owners can delete their boards" on public.boards
  for delete using (owner_id = auth.uid());

-- COLUMNS
create policy "Columns inherit board visibility" on public.columns
  for select using (
    exists (
      select 1 from public.boards b
      where b.id = board_id and (
        b.is_public = true or
        b.owner_id = auth.uid() or
        exists (
          select 1 from public.board_contributors bc
          where bc.board_id = b.id and bc.user_id = auth.uid()
        )
      )
    )
  );

create policy "Board owners and contributors can manage columns" on public.columns
  for all using (
    exists (
      select 1 from public.boards b
      where b.id = board_id and (
        b.owner_id = auth.uid() or
        exists (
          select 1 from public.board_contributors bc
          where bc.board_id = b.id and bc.user_id = auth.uid()
        )
      )
    )
  );

-- RESOURCES
create policy "Resources inherit board visibility" on public.resources
  for select using (
    exists (
      select 1 from public.boards b
      where b.id = board_id and (
        b.is_public = true or
        b.owner_id = auth.uid() or
        exists (
          select 1 from public.board_contributors bc
          where bc.board_id = b.id and bc.user_id = auth.uid()
        )
      )
    )
  );

create policy "Board owners and contributors can manage resources" on public.resources
  for all using (
    exists (
      select 1 from public.boards b
      where b.id = board_id and (
        b.owner_id = auth.uid() or
        exists (
          select 1 from public.board_contributors bc
          where bc.board_id = b.id and bc.user_id = auth.uid()
        )
      )
    )
  );

-- UPVOTES
create policy "Upvotes are viewable by everyone" on public.upvotes
  for select using (true);

create policy "Authenticated users can manage their upvotes" on public.upvotes
  for all using (auth.uid() = user_id);

-- BOARD CONTRIBUTORS
create policy "Board contributors are viewable by board members" on public.board_contributors
  for select using (
    exists (
      select 1 from public.boards b
      where b.id = board_id and (
        b.is_public = true or
        b.owner_id = auth.uid()
      )
    )
  );

create policy "Board owners can manage contributors" on public.board_contributors
  for all using (
    exists (
      select 1 from public.boards
      where id = board_id and owner_id = auth.uid()
    )
  );
