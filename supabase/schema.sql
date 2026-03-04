-- ============================================
-- PRODUCTAPP — Schema SQL
-- Supabase (PostgreSQL)
-- ============================================

-- 1. Tabla de productos
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  image_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. Índices
create index if not exists idx_products_user_id on public.products(user_id);
create index if not exists idx_products_created_at on public.products(created_at desc);

-- 3. Función para actualizar updated_at automáticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger
create trigger on_products_updated
  before update on public.products
  for each row
  execute function public.handle_updated_at();

-- 4. Row-Level Security (RLS)
alter table public.products enable row level security;

-- Política: los usuarios solo pueden ver sus propios productos
create policy "Users can view own products"
  on public.products for select
  using (auth.uid() = user_id);

-- Política: los usuarios solo pueden insertar sus propios productos
create policy "Users can insert own products"
  on public.products for insert
  with check (auth.uid() = user_id);

-- Política: los usuarios solo pueden actualizar sus propios productos
create policy "Users can update own products"
  on public.products for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Política: los usuarios solo pueden eliminar sus propios productos
create policy "Users can delete own products"
  on public.products for delete
  using (auth.uid() = user_id);

-- 5. Storage bucket para imágenes de productos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Política de storage: usuarios autenticados pueden subir imágenes
create policy "Authenticated users can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- Política de storage: cualquiera puede ver imágenes (bucket público)
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Política de storage: usuarios autenticados pueden actualizar sus imágenes
create policy "Authenticated users can update images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

-- Política de storage: usuarios autenticados pueden eliminar imágenes
create policy "Authenticated users can delete images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
