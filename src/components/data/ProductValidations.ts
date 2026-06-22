import type { NewProductInput } from "./ProductStore";

/**
 * Valida los datos de un nuevo producto antes de publicarlo.
 *
 * Verifica que el nombre no esté vacío, el precio sea mayor a 0
 * y que tenga al menos una imagen en la galería.
 * Usada en {@link addProduct} del ProductStore.
 *
 * @param input - Datos del producto a validar.
 * @returns Mensaje de error si la validación falla, `null` si es válido.
 */
export function validateProduct(input: NewProductInput): string | null {
  if (!input.name.trim()) return "El nombre es obligatorio.";
  if (!input.price || input.price <= 0) return "El precio debe ser mayor a 0.";
  if (input.gallery.length === 0 || !input.gallery[0]) return "Agregá al menos una imagen al producto.";
  return null;
}