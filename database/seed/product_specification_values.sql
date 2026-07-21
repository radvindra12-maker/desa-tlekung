------------------------------------------------------------
-- PRODUCT SPECIFICATION VALUES
------------------------------------------------------------

insert into product_specification_values
(
    variant_id,
    definition_id,
    value
)

select

    pv.id,
    sd.id,

    v.spec_value

from product_variants pv

cross join (

values

('Origin','Tlekung'),
('Altitude','1200'),
('Process','Honey'),
('Variety','Typica'),
('Aroma','Floral'),
('Sweetness','High'),
('Body','Medium'),
('Acidity','Bright'),
('Cup Notes','Brown Sugar, Citrus'),
('Roast Level','Green'),
('Packaging Type','Pouch')

) as v(definition_name,spec_value)

join specification_definitions sd
    on sd.name = v.definition_name

where pv.sku in
(
    'GB-250',
    'GB-500',
    'GB-1000'
)

and not exists (

    select 1

    from product_specification_values psv

    where psv.variant_id = pv.id
    and psv.definition_id = sd.id

);