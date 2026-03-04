"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProductById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autenticado" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File | null;

  let image_url: string | null = null;

  // Subir imagen si existe
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      return { error: `Error al subir imagen: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    image_url = urlData.publicUrl;
  }

  const { error } = await supabase.from("products").insert({
    name,
    description: description || null,
    price,
    image_url,
    user_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autenticado" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File | null;
  const currentImageUrl = formData.get("currentImageUrl") as string | null;

  let image_url: string | null = currentImageUrl;

  // Subir nueva imagen si se seleccionó una
  if (imageFile && imageFile.size > 0) {
    // Eliminar imagen anterior si existe
    if (currentImageUrl) {
      const oldPath = currentImageUrl.split("/product-images/")[1];
      if (oldPath) {
        await supabase.storage.from("product-images").remove([oldPath]);
      }
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      return { error: `Error al subir imagen: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    image_url = urlData.publicUrl;
  }

  const { error } = await supabase
    .from("products")
    .update({
      name,
      description: description || null,
      price,
      image_url,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  // Obtener producto para eliminar su imagen
  const { data: product } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  // Eliminar imagen del storage
  if (product?.image_url) {
    const path = product.image_url.split("/product-images/")[1];
    if (path) {
      await supabase.storage.from("product-images").remove([path]);
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
}
