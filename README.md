# OVERSEAS — Abrokyire Aba Ghana

A streetwear e-commerce storefront built from the customer's supplied OVERSEAS reference.

## Current build

- Next.js App Router + TypeScript
- Responsive black/cream editorial storefront
- Hero campaign section matching the supplied visual direction
- Product collections and product detail pages
- Story / Foreign Boys Clan section
- Lookbook and contact pages
- Ghanaian pricing in GHS
- Persistent shopping bag with localStorage
- Size selection, quantities and remove-from-bag
- Checkout UI and delivery form
- Supabase SSR client foundation
- Email magic-link account foundation
- Commerce database schema + seed catalog
- GitHub Actions build workflow

## Run locally

```bash
npm install
npm run dev
```

For Supabase-backed account features, copy `.env.example` to `.env.local` and provide:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Supabase's current Next.js guidance uses `@supabase/ssr` with browser/server clients and a Next.js 16 `proxy.ts` session refresh layer.

## Commerce database

The repository includes:

- `supabase/schema.sql` — products, variants, customer profiles, orders and order items with RLS
- `supabase/seed.sql` — initial OVERSEAS catalog and variant stock

The existing Supabase project connected to this workspace is used by another application, so the commerce schema is intentionally prepared but **not applied there**. A dedicated OVERSEAS Supabase project should be connected before the schema is deployed.

## Next production phases

1. Connect a dedicated OVERSEAS Supabase project.
2. Apply and verify the commerce schema and seed data.
3. Replace placeholder campaign/product imagery with the customer's approved assets.
4. Replace mock catalog reads with Supabase product/variant data.
5. Build admin inventory and order management.
6. Add Ghana payment and shipping integrations.
7. Add order confirmation, tracking and transactional email.
