insert into specification_groups
(name, description, sort_order)
values

('General', 'General information', 1),

('Flavor', 'Flavor characteristics', 2),

('Roasting', 'Roasting information', 3),

('Packaging', 'Packaging details', 4)

on conflict (name) do nothing;