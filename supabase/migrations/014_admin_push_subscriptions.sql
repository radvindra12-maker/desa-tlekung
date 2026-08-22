-- ==========================================================
-- Migration 014 - Admin Push Subscriptions
-- ==========================================================

create table if not exists public.admin_push_subscriptions (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    endpoint text not null,

    p256dh text not null,

    auth text not null,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint admin_push_subscriptions_user_endpoint_key
        unique (user_id, endpoint)
);

create index if not exists
    idx_admin_push_subscriptions_user_id
on public.admin_push_subscriptions(user_id);

create index if not exists
    idx_admin_push_subscriptions_endpoint
on public.admin_push_subscriptions(endpoint);

alter table public.admin_push_subscriptions
enable row level security;

grant select, insert, update, delete
on public.admin_push_subscriptions
to authenticated;

drop policy if exists
    "Admins can view own push subscriptions"
on public.admin_push_subscriptions;

create policy
    "Admins can view own push subscriptions"
on public.admin_push_subscriptions
for select
to authenticated
using (
    user_id = auth.uid()
    and exists (
        select 1
        from public.admin_users
        where admin_users.user_id = auth.uid()
    )
);

drop policy if exists
    "Admins can insert own push subscriptions"
on public.admin_push_subscriptions;

create policy
    "Admins can insert own push subscriptions"
on public.admin_push_subscriptions
for insert
to authenticated
with check (
    user_id = auth.uid()
    and exists (
        select 1
        from public.admin_users
        where admin_users.user_id = auth.uid()
    )
);

drop policy if exists
    "Admins can update own push subscriptions"
on public.admin_push_subscriptions;

create policy
    "Admins can update own push subscriptions"
on public.admin_push_subscriptions
for update
to authenticated
using (
    user_id = auth.uid()
    and exists (
        select 1
        from public.admin_users
        where admin_users.user_id = auth.uid()
    )
)
with check (
    user_id = auth.uid()
    and exists (
        select 1
        from public.admin_users
        where admin_users.user_id = auth.uid()
    )
);

drop policy if exists
    "Admins can delete own push subscriptions"
on public.admin_push_subscriptions;

create policy
    "Admins can delete own push subscriptions"
on public.admin_push_subscriptions
for delete
to authenticated
using (
    user_id = auth.uid()
    and exists (
        select 1
        from public.admin_users
        where admin_users.user_id = auth.uid()
    )
);