-- ==========================================================
-- Migration 013 - Purchase Requests
-- ==========================================================

------------------------------------------------------------
-- PURCHASE REQUESTS
------------------------------------------------------------

create table if not exists purchase_requests (

    id uuid primary key default gen_random_uuid(),

    customer_name text not null,

    company_name text,

    email text not null,

    phone text not null,

    buyer_type buyer_type not null default 'individual',

    province_code text not null,
    province_name text,

    city_code text not null,
    city_name text,

    district_code text not null,
    district_name text,

    village_code text not null,
    village_name text,

    postal_code text not null,

    full_address text not null,

    monthly_estimation text,

    note text,

    status purchase_status not null default 'pending',

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

create trigger trg_purchase_requests_updated_at
before update on purchase_requests
for each row
execute function set_updated_at();

create index idx_purchase_requests_status
on purchase_requests(status);

create index idx_purchase_requests_email
on purchase_requests(email);

create index idx_purchase_requests_created_at
on purchase_requests(created_at);

------------------------------------------------------------
-- PURCHASE REQUEST ITEMS
------------------------------------------------------------

create table if not exists purchase_request_items (

    id uuid primary key default gen_random_uuid(),

    purchase_request_id uuid not null
        references purchase_requests(id)
        on delete cascade,

    product_id uuid not null
        references products(id)
        on delete restrict,

    variant_id uuid not null
        references product_variants(id)
        on delete restrict,

    product_name text not null,

    variant_name text not null,

    thumbnail text,

    quantity numeric(10,2) not null,

    price numeric(15,2),

    price_on_request boolean not null default true,

    created_at timestamptz not null default now(),

    constraint chk_purchase_item_quantity_positive
        check (quantity > 0)

);

create index idx_purchase_request_items_request
on purchase_request_items(purchase_request_id);

create index idx_purchase_request_items_product
on purchase_request_items(product_id);

create index idx_purchase_request_items_variant
on purchase_request_items(variant_id);

------------------------------------------------------------
-- UPDATED AT TRIGGER
------------------------------------------------------------

create trigger trg_purchase_request_items_updated_at
before update on purchase_request_items
for each row
execute function set_updated_at();

------------------------------------------------------------
-- ROW LEVEL SECURITY
------------------------------------------------------------

alter table purchase_requests enable row level security;

alter table purchase_request_items enable row level security;

------------------------------------------------------------
-- PUBLIC INSERT
------------------------------------------------------------

create policy "public can create purchase requests"
on purchase_requests
for insert
to anon
with check (true);

create policy "public can create purchase request items"
on purchase_request_items
for insert
to anon
with check (true);

------------------------------------------------------------
-- PUBLIC READ
------------------------------------------------------------

create policy "public can read own purchase request"
on purchase_requests
for select
to anon
using (true);

create policy "public can read purchase request items"
on purchase_request_items
for select
to anon
using (true);