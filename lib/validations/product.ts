import { z } from 'zod';

export const productSchema = z.object({
    name: z
        .string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede superar los 100 caracteres'),
    description: z
        .string()
        .max(500, 'La descripción no puede superar los 500 caracteres')
        .nullable()
        .optional(),
    price: z
        .number({ error: 'El precio debe ser un número' })
        .min(0, 'El precio no puede ser negativo')
        .max(999999.99, 'El precio es demasiado alto'),
    image_url: z.string().url().nullable().optional(),
})

export const createProductSchema = productSchema
export const updateProductSchema = productSchema.partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>