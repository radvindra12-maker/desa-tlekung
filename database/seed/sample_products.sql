------------------------------------------------------------
-- SAMPLE PRODUCT
------------------------------------------------------------

insert into products
(
    category_id,
    name,
    slug,
    scientific_name,
    short_description,
    description,
    is_featured
)

select

    pc.id,

    'Arabika Girimurti',

    'arabika-girimurti',

    'Coffea arabica',

    'Premium Arabica coffee from Tlekung Village.',

    'Arabika Girimurti is cultivated in the highlands of Tlekung Village and processed carefully to maintain its unique flavor profile.',

    true

from product_categories pc

where pc.slug = 'green-bean'

and not exists (

    select 1

    from products

    where slug = 'arabika-girimurti'

);

------------------------------------------------------------
-- VARIANT TYPE
------------------------------------------------------------

insert into product_variant_types
(
    product_id,
    name,
    description
)

select

    p.id,

    'Green Bean',

    'Unroasted coffee beans'

from products p

where p.slug = 'arabika-girimurti'

and not exists (

    select 1

    from product_variant_types

    where product_id = p.id

    and name = 'Green Bean'

);

------------------------------------------------------------
-- VARIANTS
------------------------------------------------------------

insert into product_variants
(
    variant_type_id,
    sku,
    weight_value,
    weight_unit,
    minimum_order
)

select
    vt.id,
    v.sku,
    v.weight,
    'gr',
    1

from product_variant_types vt

cross join (

values

('GB-250',250),
('GB-500',500),
('GB-1000',1000)

) AS v(sku,weight)

where vt.name='Green Bean'

and not exists (

    select 1

    from product_variants pv

    where pv.sku=v.sku

);