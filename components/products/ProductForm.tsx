"use client";

import { createProduct, updateProduct } from "@/services/products.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2, Upload, ImageIcon, ArrowLeft } from "lucide-react";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(product?.image_url || null);

  const isEditing = !!product;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    if (isEditing && product.image_url) {
      formData.set("currentImageUrl", product.image_url);
    }

    const result = isEditing
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Back + title */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="size-8" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            {isEditing ? "Editar producto" : "Nuevo producto"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isEditing ? "Modifica los datos de tu producto" : "Completa los campos para agregar un producto"}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            {/* Image section */}
            <div className="space-y-3">
              <Label htmlFor="image">Imagen</Label>
              {preview ? (
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-muted group">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                    <label
                      htmlFor="image"
                      className="cursor-pointer opacity-0 group-hover:opacity-100 transition bg-background/90 text-foreground text-xs font-medium px-3 py-1.5 rounded-md"
                    >
                      Cambiar imagen
                    </label>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center aspect-[16/9] rounded-xl border-2 border-dashed border-border hover:border-accent/50 bg-muted/30 cursor-pointer transition group"
                >
                  <ImageIcon className="size-8 text-muted-foreground mb-2 group-hover:text-accent transition" />
                  <span className="text-sm text-muted-foreground">Click para subir imagen</span>
                  <span className="text-xs text-muted-foreground/60 mt-0.5">PNG, JPG, WEBP</span>
                </label>
              )}
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <Separator />

            {/* Fields */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={product?.name || ""}
                placeholder="Ej: Camiseta deportiva"
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={product?.description || ""}
                placeholder="Describe tu producto..."
                maxLength={500}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio (CO) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                defaultValue={product?.price || ""}
                placeholder="0.00"
                min={0}
                max={999999.99}
                step={0.01}
              />
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1 sm:flex-none">
                {loading && <Loader2 className="animate-spin" />}
                {loading
                  ? isEditing ? "Guardando..." : "Creando..."
                  : isEditing ? "Guardar cambios" : "Crear producto"
                }
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/products">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
