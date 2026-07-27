-- ==========================================================
-- Migration 002 - Master Products
-- Part 1 : Product Categories
-- ==========================================================

create table if not exists product_categories (

    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    slug text not null unique,

    description text,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

create trigger trg_product_categories_updated_at
before update on product_categories
for each row
execute function set_updated_at();

create index idx_product_categories_slug
on product_categories(slug);

------------------------------------------------------------
-- PRODUCTS
------------------------------------------------------------

create table if not exists products (

    id uuid primary key default gen_random_uuid(),

    category_id uuid not null
        references product_categories(id)
        on delete cascade,

    name text not null,

    slug text not null unique,

    scientific_name text,

    short_description text,

    description text,

    is_featured boolean not null default false,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

create trigger trg_products_updated_at
before update on products
for each row
execute function set_updated_at();

create index idx_products_category
on products(category_id);

create index idx_products_slug
on products(slug);

create index idx_products_featured
on products(is_featured);

------------------------------------------------------------
-- PRODUCT VARIANT TYPES
------------------------------------------------------------

create table if not exists product_variant_types (

    id uuid primary key default gen_random_uuid(),

    product_id uuid not null
        references products(id)
        on delete cascade,

    name text not null,

    description text,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

create trigger trg_product_variant_types_updated_at
before update on product_variant_types
for each row
execute function set_updated_at();

create index idx_variant_types_product
on product_variant_types(product_id);

------------------------------------------------------------
-- PRODUCT VARIANTS
------------------------------------------------------------

create table if not exists product_variants (

    id uuid primary key default gen_random_uuid(),

    variant_type_id uuid not null
        references product_variant_types(id)
        on delete cascade,

    sku text unique,

    weight_value numeric(10,2) not null,

    weight_unit text not null,

    minimum_order numeric(10,2),

    is_price_on_request boolean not null default true,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint chk_weight_positive
        check (weight_value > 0),

    constraint chk_minimum_order_positive
        check (
            minimum_order is null
            or minimum_order > 0
        )

);

create trigger trg_product_variants_updated_at
before update on product_variants
for each row
execute function set_updated_at();

create index idx_product_variants_variant_type
on product_variants(variant_type_id);

create index idx_product_variants_sku
on product_variants(sku);

------------------------------------------------------------
-- SPECIFICATION GROUPS
------------------------------------------------------------

create table if not exists specification_groups (

    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    description text,

    sort_order integer not null default 1,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

create trigger trg_specification_groups_updated_at
before update on specification_groups
for each row
execute function set_updated_at();

create index idx_specification_groups_sort
on specification_groups(sort_order);

------------------------------------------------------------
-- SPECIFICATION DEFINITIONS
------------------------------------------------------------

create table if not exists specification_definitions (

    id uuid primary key default gen_random_uuid(),

    group_id uuid not null
        references specification_groups(id)
        on delete cascade,

    name text not null,

    description text,

    data_type text not null default 'text',

    unit text,

    sort_order integer not null default 1,

    is_required boolean not null default false,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint chk_specification_data_type
    check (
        data_type in (
            'text',
            'number',
            'boolean',
            'date'
        )
    )

);

create trigger trg_specification_definitions_updated_at
before update on specification_definitions
for each row
execute function set_updated_at();

create index idx_specification_definitions_group
on specification_definitions(group_id);

create index idx_specification_definitions_sort
on specification_definitions(sort_order);

------------------------------------------------------------
-- PRODUCT SPECIFICATION VALUES
------------------------------------------------------------

create table if not exists product_specification_values (

    id uuid primary key default gen_random_uuid(),

    variant_id uuid not null
        references product_variants(id)
        on delete cascade,

    definition_id uuid not null
        references specification_definitions(id)
        on delete cascade,

    value text not null,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint uq_variant_definition
        unique (variant_id, definition_id)

);

create trigger trg_product_specification_values_updated_at
before update on product_specification_values
for each row
execute function set_updated_at();

create index idx_product_specification_values_variant
on product_specification_values(variant_id);

create index idx_product_specification_values_definition
on product_specification_values(definition_id);

------------------------------------------------------------
-- PRODUCT IMAGES
------------------------------------------------------------

create table if not exists product_images (

    id uuid primary key default gen_random_uuid(),

    variant_type_id uuid not null
        references product_variant_types(id)
        on delete cascade,

    storage_path text not null,

    alt_text text,

    caption text,

    sort_order integer not null default 1,

    is_cover boolean not null default false,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

create trigger trg_product_images_updated_at
before update on product_images
for each row
execute function set_updated_at();

create index idx_product_images_variant_type
on product_images(variant_type_id);

create index idx_product_images_cover
on product_images(is_cover);