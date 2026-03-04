import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Plus,
  DollarSign,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ImageOff,
  BarChart3,
  Tag,
} from "lucide-react";
import { ProductPriceChart } from "@/components/dashboard/ProductPriceChart";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: allProducts } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const products = allProducts || [];
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + Number(p.price), 0);
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;
  const maxPrice = totalProducts > 0 ? Math.max(...products.map(p => Number(p.price))) : 0;
  const mostExpensive = products.find(p => Number(p.price) === maxPrice);

  const recentProducts = products.slice(0, 5);
  const chartData = products.slice(0, 8).reverse().map(p => ({
    name: p.name,
    price: Number(p.price),
  }));

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{greeting()}</p>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            {user?.user_metadata?.name || user?.email}
          </h2>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/products/new">
            <Plus className="size-4" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Package className="size-5 text-accent" />
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold tracking-tight">{totalProducts}</p>
            <p className="text-xs text-muted-foreground mt-1">Productos registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <DollarSign className="size-5 text-accent" />
              </div>
              <Badge variant="secondary" className="text-xs">{totalProducts > 0 ? "activo" : "—"}</Badge>
            </div>
            <p className="text-2xl font-bold tracking-tight">${totalValue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Valor total del inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <BarChart3 className="size-5 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight">${avgPrice.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Precio promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Tag className="size-5 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight">${maxPrice.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {mostExpensive ? mostExpensive.name : "Precio más alto"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Recent products */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Price chart */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Precios por producto</CardTitle>
                <CardDescription className="text-xs mt-1">
                  Últimos {chartData.length} productos registrados
                </CardDescription>
              </div>
              <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart3 className="size-4 text-accent" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ProductPriceChart data={chartData} />
          </CardContent>
        </Card>

        {/* Recent products */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <CardTitle className="text-base">Recientes</CardTitle>
              </div>
              {totalProducts > 0 && (
                <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
                  <Link href="/dashboard/products">
                    Ver todos
                    <ArrowRight className="size-3" />
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-3">
            {recentProducts.length === 0 ? (
              <div className="py-8 text-center">
                <div className="size-11 rounded-xl bg-secondary mx-auto mb-3 flex items-center justify-center">
                  <Package className="size-5 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground mb-1 text-sm">Sin productos</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Crea tu primer producto
                </p>
                <Button size="sm" asChild>
                  <Link href="/dashboard/products/new">
                    <Plus className="size-3" />
                    Crear
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-0.5">
                {recentProducts.map((product, i) => (
                  <div key={product.id}>
                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className="group flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-secondary/60 transition"
                    >
                      <div className="relative size-9 rounded-lg bg-muted overflow-hidden shrink-0">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ImageOff className="size-3.5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          ${Number(product.price).toFixed(2)}
                        </p>
                      </div>
                      <ArrowRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition shrink-0" />
                    </Link>
                    {i < recentProducts.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
