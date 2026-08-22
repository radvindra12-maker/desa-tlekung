-- ==========================================================
-- Migration 015 - Admin Push Webhook Hardening
-- ==========================================================

create extension if not exists pg_net;

------------------------------------------------------------
-- REQUIRED SERVER-SIDE PRIVILEGES
------------------------------------------------------------

grant select
on public.admin_users
to service_role;

grant select
on public.admin_push_subscriptions
to service_role;

grant select, insert, update, delete
on public.admin_push_subscriptions
to authenticated;

------------------------------------------------------------
-- ADMIN PUSH WEBHOOK FUNCTION
------------------------------------------------------------

create or replace function public.notify_admin_new_purchase_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  webhook_url text;
  webhook_secret text;
  vercel_bypass_secret text;
  request_body jsonb;
begin

  ----------------------------------------------------------
  -- Load secrets from Supabase Vault.
  -- Secret values are intentionally NOT stored in Git.
  ----------------------------------------------------------

  select decrypted_secret
  into webhook_url
  from vault.decrypted_secrets
  where name = 'admin_push_webhook_url'
  limit 1;

  select decrypted_secret
  into webhook_secret
  from vault.decrypted_secrets
  where name = 'admin_push_webhook_secret'
  limit 1;

  select decrypted_secret
  into vercel_bypass_secret
  from vault.decrypted_secrets
  where name = 'vercel_automation_bypass_secret'
  limit 1;

  ----------------------------------------------------------
  -- Push notification must never block purchase creation.
  ----------------------------------------------------------

  if webhook_url is null
     or webhook_secret is null
     or vercel_bypass_secret is null then

    raise warning
      'Admin push webhook configuration is incomplete. Purchase request remains created.';

    return new;
  end if;

  ----------------------------------------------------------
  -- Webhook payload.
  ----------------------------------------------------------

  request_body := jsonb_build_object(
    'type', 'INSERT',
    'table', 'purchase_requests',
    'schema', 'public',
    'record', jsonb_build_object(
      'id', new.id,
      'full_name', new.full_name,
      'email', new.email,
      'phone', new.phone,
      'organization', new.organization,
      'status', new.status,
      'estimated_total', new.estimated_total,
      'created_at', new.created_at
    ),
    'old_record', null
  );

  ----------------------------------------------------------
  -- Async request to Vercel webhook.
  ----------------------------------------------------------

  perform net.http_post(
    url := webhook_url,
    body := request_body,
    headers := jsonb_build_object(
      'Content-Type',
      'application/json',
      'x-vercel-protection-bypass',
      vercel_bypass_secret,
      'x-webhook-secret',
      webhook_secret
    ),
    timeout_milliseconds := 5000
  );

  return new;

exception
  when others then
    raise warning
      'Failed to schedule admin push notification: %',
      sqlerrm;

    return new;
end;
$$;

------------------------------------------------------------
-- PURCHASE REQUEST INSERT TRIGGER
------------------------------------------------------------

drop trigger if exists
  trg_purchase_requests_admin_push
on public.purchase_requests;

create trigger
  trg_purchase_requests_admin_push
after insert on public.purchase_requests
for each row
execute function public.notify_admin_new_purchase_request();
