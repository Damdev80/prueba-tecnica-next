# ProductApp

Aplicación web de gestión de productos construida con **Next.js 16**, **TypeScript**, **Supabase** y **Tailwind CSS**.

## Funcionalidades

- **Autenticación**: Login y registro con email/contraseña (Supabase Auth)
- **Rutas protegidas**: Middleware que protege el dashboard y redirige usuarios no autenticados
- **CRUD de productos**: Crear, leer, editar y eliminar productos
- **Carga de imágenes**: Subida de imágenes a Supabase Storage con preview y eliminación automática
- **Dashboard con métricas**: Estadísticas del inventario, gráficas de precios (Recharts)
- **Row-Level Security**: Cada usuario solo accede a sus propios productos
- **Tema claro/oscuro**: Toggle de tema con `next-themes`
- **Validación**: Schemas con Zod para formularios de auth y productos
- **UI**: Componentes de shadcn/ui (Button, Card, Dialog, Chart, Sheet, etc.)

## Stack tecnológico

| Tecnología     | Uso                              |
| -------------- | -------------------------------- |
| Next.js 16     | Framework (App Router, Turbopack)|
| TypeScript     | Tipado estático                  |
| Supabase       | Auth, Base de datos, Storage     |
| Tailwind CSS 4 | Estilos                          |
| shadcn/ui      | Componentes UI                   |
| Zod            | Validación de formularios        |
| Recharts       | Gráficas del dashboard           |
| Motion         | Animaciones scroll               |

## Requisitos previos

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Un proyecto en [Supabase](https://supabase.com)

## Configuración

### 1. Clonar el repositorio

```bash
git clone <https://github.com/Damdev80/prueba-tecnica-next>
cd prueba-tecnica
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copiar el archivo de ejemplo y reemplazar con tus credenciales:

```bash
cp .env.local.example .env.local
```

Editar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

> Estas credenciales se obtienen en **Supabase → Project Settings → API**.

### 4. Configurar la base de datos

Ejecutar el script SQL en el **SQL Editor** de Supabase:

```bash
# El archivo está en:
supabase/schema.sql
```

Este script crea:
- Tabla `products` con campos: id, user_id, name, description, price, image_url, timestamps
- Índices para optimización de consultas
- Trigger para `updated_at` automático
- Políticas RLS (Row-Level Security) para aislamiento por usuario
- Bucket de Storage `product-images` con políticas de acceso

### 5. Habilitar autenticación

En Supabase Dashboard:
1. Ir a **Authentication → Providers**
2. Asegurarse de que **Email** esté habilitado
3. (Opcional) Desactivar "Confirm email" en **Auth → Settings** para desarrollo

### 6. Ejecutar en desarrollo

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
app/
  page.tsx                           # Landing page
  layout.tsx                         # Root layout (ThemeProvider, Toaster)
  (auth)/
    layout.tsx                       # Layout split para auth
    auth/login/page.tsx              # Página de login
    auth/register/page.tsx           # Página de registro
  (dashboard)/
    layout.tsx                       # Layout con sidebar
    dashboard/
      page.tsx                       # Dashboard con métricas y gráficas
      products/
        page.tsx                     # Lista de productos
        new/page.tsx                 # Crear producto
        [id]/edit/page.tsx           # Editar producto

components/
  dashboard/                         # Sidebar, MobileSidebar, ProductPriceChart
  products/                          # ProductForm, ProductGrid, DeleteProductButton
  motion/                            # Componentes de animación reutilizables
  layout/                            # LogoutButton
  ui/                                # Componentes shadcn/ui

services/
  auth.service.ts                    # Server actions de autenticación
  products.service.ts                # Server actions CRUD de productos

lib/
  supabase/client.ts                 # Cliente Supabase (browser)
  supabase/server.ts                 # Cliente Supabase (server)
  validations/auth.ts                # Schemas Zod para auth
  validations/product.ts             # Schema Zod para productos

middleware.ts                        # Protección de rutas
supabase/schema.sql                  # Script SQL completo
types/database.ts                    # Tipos generados de Supabase
```

## Scripts disponibles

```bash
pnpm dev        # Servidor de desarrollo (Turbopack)
pnpm build      # Build de producción
pnpm start      # Servidor de producción
pnpm lint       # Linter
```
