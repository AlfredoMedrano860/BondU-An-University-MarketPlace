import type { Seller } from "./Seller";

/**
 * Producto publicado en el marketplace.
 * @see Seller
 */
export interface Product {
  /** Identificador único del producto (UUID del backend). */
  id: string;
  /** Nombre del producto. */
  name: string;
  /** Precio del producto en dólares. */
  price: number;
  /** Condición del producto (Nuevo / Usado / Detalle). */
  state: string;
  /** URL de la imagen principal, equivalente a `gallery[0]`. */
  image: string;
  /** Lista de URLs de imágenes del producto. */
  gallery: string[];
  /** Descripción detallada del producto. */
  description: string;
  /** Vendedor que publicó el producto. */
  seller: Seller;
  /** Indica si el usuario lo marcó como favorito. */
  isFavorite: boolean;
  /** Disponibilidad del producto (Disponible / Vendido). No confundir con `state`, que es su condición física. */
  status: string;
}
