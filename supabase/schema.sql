-- OVERSEAS commerce schema
-- Apply this to the dedicated OVERSEAS Supabase project.
-- Public catalog reads are allowed; orders and customer data remain private.

create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  image_url text,
  badge text not null default 'CORE',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null,
  sku text not null unique,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  created_at timestamptz not null default now(),
  unique(product_id, size)
);

create table if not exists public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  city text,
  country text default 'Ghana',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  phone text,
  shipping_name text not null,
  shipping_address text not null,
  city text not null,
  country text not null default 'Ghana',
  status text not null default 'pending'
    check (status in ('pending','confirmed','processing','shipped','delivered','cancelled')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','pending','paid','failed','refunded')),
  currency text not null default 'GHS',
  subtotal numeric(12,2) not null check (subtotal >= 0),
  shipping_amount numeric(12,2) not null default 0 check (shipping_amount >= 0),
  total numeric(12,2) not null check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  product_name text not null,
  size text,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0)
);

create index if not exists product_variants_product_id_idx on public.product_variants(product_id);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "public can read active products" on public.products;
create policy "public can read active products"
  on public.products for select
  to anon, authenticated
  using (active = true);

drop policy if exists "public can read active variants" on public.product_variants;
create policy "public can read active variants"
  on public.product_variants for select
  to anon, authenticated
  using (exists (
    select 1 from public.products p
    where p.id = product_id and p.active = true
  ));

drop policy if exists "customers can read own profile" on public.customer_profiles;
create policy "customers can read own profile"
  on public.customer_profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "customers can insert own profile" on public.customer_profiles;
create policy "customers can insert own profile"
  on public.customer_profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "customers can update own profile" on public.customer_profiles;
create policy "customers can update own profile"
  on public.customer_profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "customers can read own orders" on public.orders;
create policy "customers can read own orders"
  on public.orders for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "customers can read own order items" on public.order_items;
create policy "customers can read own order items"
  on public.order_items for select
  to authenticated
  using (exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = (select auth.uid())
  ));

-- Admin policies use auth.app_metadata, which users cannot edit themselves.
drop policy if exists "admins can manage products" on public.products;
create policy "admins can manage products"
  on public.products for all
  to authenticated
  using ((select auth.jwt()->'app_metadata'->>'role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "admins can manage variants" on public.product_variants;
create policy "admins can manage variants"
  on public.product_variants for all
  to authenticated
  using ((select auth.jwt()->'app_metadata'->>'role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "admins can manage profiles" on public.customer_profiles;
create policy "admins can manage profiles"
  on public.customer_profiles for all
  to authenticated
  using ((select auth.jwt()->'app_metadata'->>'role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "admins can manage orders" on public.orders;
create policy "admins can manage orders"
  on public.orders for all
  to authenticated
  using ((select auth.jwt()->'app_metadata'->>'role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "admins can manage order items" on public.order_items;
create policy "admins can manage order items"
  on public.order_items for all
  to authenticated
  using ((select auth.jwt()->'app_metadata'->>'role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
