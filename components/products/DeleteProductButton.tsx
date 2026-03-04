"use client";

import { deleteProduct } from "@/services/products.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function DeleteProductButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deleteProduct(productId);

    if (result?.error) {
      alert(result.error);
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex-1 text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="size-3" />
          Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="size-5 text-destructive" />
          </div>
          <DialogTitle className="text-center">Eliminar producto</DialogTitle>
          <DialogDescription className="text-center">
            Esta acción no se puede deshacer. El producto y su imagen serán eliminados permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1" disabled={loading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
