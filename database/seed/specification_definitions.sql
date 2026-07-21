insert into specification_definitions
(
    group_id,
    name,
    data_type,
    unit,
    sort_order,
    is_required
)

select
    sg.id,
    v.name,
    v.data_type,
    v.unit,
    v.sort_order,
    v.is_required

from (

values

-- GENERAL
('General','Origin','text',null,1,true),
('General','Altitude','number','mdpl',2,true),
('General','Process','text',null,3,true),
('General','Variety','text',null,4,false),

-- FLAVOR
('Flavor','Aroma','text',null,1,false),
('Flavor','Sweetness','text',null,2,false),
('Flavor','Body','text',null,3,false),
('Flavor','Acidity','text',null,4,false),
('Flavor','Cup Notes','text',null,5,false),

-- ROASTING
('Roasting','Roast Level','text',null,1,false),

-- PACKAGING
('Packaging','Packaging Type','text',null,1,false)

) AS v
(
    group_name,
    name,
    data_type,
    unit,
    sort_order,
    is_required
)

join specification_groups sg
on sg.name = v.group_name

where not exists (

    select 1

    from specification_definitions sd

    where sd.group_id = sg.id
    and sd.name = v.name

);