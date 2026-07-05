import { z } from "zod";

/**
 * Valida el formulario de publicación/edición de un producto.
 * Usado en {@link useAddProductForm}.
 */
export const productSchema = z.object({
  name: z.string().min(3, "addProduct.errors.nameTooShort"),
  // price viene como string del input, se valida que sea número positivo
  price: z.string()
    .min(1, "addProduct.errors.priceRequired")
    .refine(
      (v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0,
      { message: "addProduct.errors.priceInvalid" }
    ),
  state: z.string().min(1, "addProduct.errors.conditionRequired"),
  description: z.string().optional(),
});
