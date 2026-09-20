insert into public.products (slug, name, category, description, price, image_url, badge)
values
('global-tee','Global Tee','Tees','A heavyweight everyday tee carrying the first OVERSEAS graphic language.',250,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85','NEW'),
('unity-tee','Unity Tee','Tees','Minimal front branding with a statement back graphic.',200,'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85','CORE'),
('classic-cap','Classic Cap','Caps','Structured six-panel cap finished with the OVERSEAS mark.',200,'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=85','CORE'),
('heritage-bandana','Heritage Bandana','Accessories','A graphic bandana built around the symbols of the movement.',120,'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85','LIMITED'),
('foreign-boys-hoodie','Foreign Boys Hoodie','Hoodies','Heavy fleece hoodie made for late nights, long flights and city streets.',420,'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85','DROP 01'),
('overseas-essential','Overseas Essential','Tees','The essential everyday uniform for the community.',220,'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85','ESSENTIAL')
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  image_url = excluded.image_url,
  badge = excluded.badge,
  updated_at = now();

insert into public.product_variants (product_id, size, sku, stock_quantity)
select p.id, v.size, upper(replace(p.slug,'-','')) || '-' || upper(v.size), 25
from public.products p
cross join lateral unnest(
  case
    when p.category = 'Caps' or p.category = 'Accessories' then array['OS']
    else array['S','M','L','XL','2XL']
  end
) as v(size)
on conflict (sku) do nothing;
