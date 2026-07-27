-- ==========================================================
-- KOPI GIRIMURTI DATABASE
-- Migration 001 - Foundation
-- ==========================================================

------------------------------------------------------------
-- UUID Extension
------------------------------------------------------------

create extension if not exists pgcrypto;

------------------------------------------------------------
-- ENUM : Buyer Type
------------------------------------------------------------

do $$
begin
    if not exists (
        select 1
        from pg_type
        where typname = 'buyer_type'
    ) then

        create type buyer_type as enum (
            'individual',
            'coffee_shop',
            'cafe',
            'distributor',
            'reseller',
            'exporter',
            'government',
            'hotel',
            'restaurant',
            'other'
        );

    end if;
end $$;

------------------------------------------------------------
-- ENUM : Purchase Status
------------------------------------------------------------

do $$
begin
    if not exists (
        select 1
        from pg_type
        where typname = 'purchase_status'
    ) then

        create type purchase_status as enum (
            'pending',
            'verified',
            'contacted',
            'negotiation',
            'quotation_sent',
            'approved',
            'completed',
            'rejected'
        );

    end if;
end $$;

------------------------------------------------------------
-- Function : Auto Update updated_at
------------------------------------------------------------

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;