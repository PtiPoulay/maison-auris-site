# Maison Auris — Version connectée à Supabase

## Variables Vercel à ajouter

Dans Vercel > ton projet > Settings > Environment Variables :

```text
VITE_SUPABASE_URL=https://olhekfvwlfzdcnutjfm.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=ta_publishable_key
```

Puis clique sur Redeploy.

## Table Supabase attendue

Table : `products`

Colonnes :
- id
- name
- gender
- style
- strap
- price
- old_price
- badge
- image_url
- description
- is_active
- created_at

## Important

Cette version lit les produits depuis Supabase.
Pour modifier ou ajouter une montre, va directement dans Supabase > Table Editor > products.
