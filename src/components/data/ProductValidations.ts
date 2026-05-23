import type { NewProductInput } from "./ProductStore";

export function validateProduct(input: NewProductInput): string | null {
  if (!input.name.trim())                               return "El nombre es obligatorio.";
  if (!input.price || input.price <= 0)                 return "El precio debe ser mayor a 0.";
  if (input.gallery.length === 0 || !input.gallery[0]) return "Agregá al menos una imagen al producto.";
  return null;
}