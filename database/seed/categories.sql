insert into product_categories (name, slug, description)
values
(
    'Green Bean',
    'green-bean',
    'Unroasted coffee beans ready for roasting.'
),
(
    'Roasted Bean',
    'roasted-bean',
    'Freshly roasted whole coffee beans.'
),
(
    'Ground Coffee',
    'ground-coffee',
    'Ready-to-brew ground coffee.'
)
on conflict (slug) do nothing;