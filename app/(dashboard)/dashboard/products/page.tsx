import { getProducts } from "@/services/products.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "@/components/products/DeleteProductButton";
import { ProductGrid, ProductGridItem } from "@/components/products/ProductGrid";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ImageOff, Package, ArrowLeft } from "lucide-react";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Mis productos</h2>
            <p className="text-sm text-muted-foreground">
              {products.length} producto{products.length !== 1 ? "s" : ""} registrado{products.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/products/new">
            <Plus className="size-4" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="size-14 rounded-xl bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Package className="size-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              No tienes productos aún
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Agrega tu primer producto con nombre, precio, descripción e imagen
            </p>
            <Button size="sm" asChild>
              <Link href="/dashboard/products/new">
                <Plus className="size-4" />
                Crear producto
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductGridItem key={product.id}>
              <Card className="overflow-hidden group hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <ImageOff className="size-8" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-sm font-bold text-accent shrink-0">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>

                  {product.description && (
                    <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed flex-1">
                      {product.description}
                    </p>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-8" asChild>
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Pencil className="size-3" />
                        Editar
                      </Link>
                    </Button>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </CardContent>
              </Card>
            </ProductGridItem>
          ))}
        </ProductGrid>
      )}
    </div>
  );
}
