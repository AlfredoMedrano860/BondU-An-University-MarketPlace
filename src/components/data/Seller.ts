import type { User } from "./User";

/**
 * Información de contacto personalizada de un usuario.
 * El teléfono no vive aquí — usa `User.phone` directamente.
 * Usado por {@link Seller} y {@link UserProfile}.
 */
export interface ContactInfo {
  /** Descripción o biografía visible en el perfil. */
  bio: string;
  /** Usuario de Instagram. */
  instagram?: string;
  /** Usuario de Telegram. */
  telegram?: string;
}

/**
 * Vendedor de un producto en el marketplace.
 * Extiende {@link User} con datos de reputación.
 */
export interface Seller extends User {
  /** Calificación promedio del vendedor entre 0 y 5. */
  rating: number;
  /** Número total de reseñas recibidas. */
  reviews: number;
  /** Número de ventas realizadas. */
  sales: number;
  /** Información de contacto personalizada del vendedor. */
  contact?: ContactInfo;
}
