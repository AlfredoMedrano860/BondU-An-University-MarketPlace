/** Valores de puntuación disponibles en una reseña. */
export const starReviews = [1, 2, 3, 4, 5];

/**
 * Reseña escrita por un comprador sobre un vendedor.
 */
export interface Review {
  /** Identificador único de la reseña. */
  id: string;
  /** ID del usuario que escribió la reseña. */
  reviewerId: string;
  /** Nombre visible del reseñador. */
  name: string;
  /** URL del avatar del reseñador. */
  avatar: string;
  /** Puntuación del 1 al 5. */
  rating: number;
  /** Texto opcional de la reseña. */
  text: string;
}

/**
 * Calcula el promedio de puntuación de una lista de reseñas.
 * Acepta cualquier objeto con `rating` (no solo {@link Review} completos),
 * para poder promediar también reseñas crudas del backend sin mapearlas antes.
 * @param reviews - Lista de reseñas a promediar.
 * @returns Promedio de 0 a 5, o `0` si la lista está vacía.
 */
export function computeRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
