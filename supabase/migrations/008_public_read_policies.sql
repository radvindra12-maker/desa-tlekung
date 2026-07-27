------------------------------------------------------------
-- PRODUCTS
------------------------------------------------------------

alter table products enable row level security;

create policy "Public can view products"
on products
for select
to anon
using (true);

------------------------------------------------------------
-- PRODUCT CATEGORIES
------------------------------------------------------------

alter table product_categories enable row level security;

create policy "Public can view categories"
on product_categories
for select
to anon
using (true);

------------------------------------------------------------
-- PRODUCT VARIANT TYPES
------------------------------------------------------------

alter table product_variant_types enable row level security;

create policy "Public can view variant types"
on product_variant_types
for select
to anon
using (true);

------------------------------------------------------------
-- PRODUCT VARIANTS
------------------------------------------------------------

alter table product_variants enable row level security;

create policy "Public can view variants"
on product_variants
for select
to anon
using (true);

------------------------------------------------------------
-- PRODUCT IMAGES
------------------------------------------------------------

alter table product_images enable row level security;

create policy "Public can view images"
on product_images
for select
to anon
using (true);

------------------------------------------------------------
-- SPECIFICATION GROUPS
------------------------------------------------------------

alter table specification_groups enable row level security;

create policy "Public can view specification groups"
on specification_groups
for select
to anon
using (true);

------------------------------------------------------------
-- SPECIFICATION DEFINITIONS
------------------------------------------------------------

alter table specification_definitions enable row level security;

create policy "Public can view specification definitions"
on specification_definitions
for select
to anon
using (true);

------------------------------------------------------------
-- PRODUCT SPECIFICATION VALUES
------------------------------------------------------------

alter table product_specification_values enable row level security;

create policy "Public can view specification values"
on product_specification_values
for select
to anon
using (true);