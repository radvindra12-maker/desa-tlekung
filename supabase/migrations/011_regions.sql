-- ==========================================================
-- KOPI GIRIMURTI DATABASE
-- Migration 011 - Regions
-- ==========================================================

------------------------------------------------------------
-- Regions
------------------------------------------------------------

create table regions (
    code text primary key,

    parent_code text
        references regions(code)
        on delete restrict,

    level smallint not null,

    name text not null,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

------------------------------------------------------------
-- Indexes
------------------------------------------------------------

create index idx_regions_parent_code
on regions(parent_code);

create index idx_regions_level
on regions(level);

------------------------------------------------------------
-- Updated At Trigger
------------------------------------------------------------

create trigger trg_regions_updated_at
before update on regions
for each row
execute function set_updated_at();

------------------------------------------------------------
-- Seed
------------------------------------------------------------

-- GENERATED INSERTS