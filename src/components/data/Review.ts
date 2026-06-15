import reviewerAvatar from "../../assets/imgs/IconoPerfil.png";

/**
 * Reseña escrita por un comprador sobre un vendedor.
 */
export interface Review {
  /** Identificador único de la reseña. */
  id: number;
  /** ID del usuario que escribió la reseña. */
  reviewerId: number;
  /** Nombre visible del reseñador. */
  name: string;
  /** URL del avatar del reseñador. */
  avatar: string;
  /** Puntuación del 1 al 5. */
  rating: number;
  /** Texto opcional de la reseña. */
  text: string;
}

/** Mapa de reseñas indexadas por ID de vendedor. Dato de prueba; reemplazar con backend. */
const reviewsBySellerId: Record<number, Review[]> = {
  1: [
    { id: 3, reviewerId: 2, name: "Camila Rojas",    avatar: reviewerAvatar, rating: 3, text: "Todo bien, aunque el envío tardó un poco más de lo esperado." },
  ],
  2: [
    { id: 4, reviewerId: 3, name: "Diego Herrera",   avatar: reviewerAvatar, rating: 5, text: "Vendedora muy amable, el artículo llegó en excelente estado." },
    { id: 5, reviewerId: 1, name: "Alfredo Medrano", avatar: reviewerAvatar, rating: 4, text: "Buena experiencia, respondió rápido y coordinó bien la entrega." },
    { id: 6, reviewerId: 4, name: "Valentina Cruz",  avatar: reviewerAvatar, rating: 5, text: "Todo perfecto, lo recomiendo sin dudar." },
  ],
  3: [
    { id: 8, reviewerId: 2, name: "Camila Rojas",    avatar: reviewerAvatar, rating: 4, text: "Buen vendedor, el artículo estaba en buen estado." },
  ],
  4: [
    { id: 10, reviewerId: 3, name: "Diego Herrera",  avatar: reviewerAvatar, rating: 5, text: "Increíble vendedora, súper detallista con el empaque." },
    { id: 11, reviewerId: 1, name: "Alfredo Medrano",avatar: reviewerAvatar, rating: 5, text: "Producto impecable y atención de primera." },
  ],
};

/**
 * Retorna todas las reseñas de un vendedor incluyendo las propias.
 * @param sellerId - ID del vendedor.
 * @returns Lista de reseñas del vendedor.
 */
export function getSellerReviews(sellerId: number): Review[] {
  return reviewsBySellerId[sellerId] ?? [];
}

/**
 * Retorna las reseñas de un vendedor excluyendo las que él mismo escribió.
 * @param sellerId - ID del vendedor.
 * @returns Lista de reseñas visibles públicamente.
 */
export function getVisibleReviews(sellerId: number): Review[] {
  return (reviewsBySellerId[sellerId] ?? [])
    .filter(r => r.reviewerId !== sellerId);
}

/**
 * Calcula el promedio de puntuación de una lista de reseñas.
 * @param reviews - Lista de reseñas a promediar.
 * @returns Promedio de 0 a 5, o `0` si la lista está vacía.
 */
export function computeRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

let nextReviewId = 100;
const reviewSubscribers: (() => void)[] = [];

/**
 * Agrega una reseña a un vendedor y notifica a los suscriptores.
 * @param sellerId - ID del vendedor que recibe la reseña.
 * @param review - Datos de la reseña sin el `id` (se asigna automáticamente).
 */
export function addReview(sellerId: number, review: Omit<Review, "id">): void {
  if (!reviewsBySellerId[sellerId]) reviewsBySellerId[sellerId] = [];
  reviewsBySellerId[sellerId].push({ ...review, id: nextReviewId++ });
  reviewSubscribers.forEach(fn => fn());
}

/**
 * Suscribe un callback que se llama cada vez que cambia alguna reseña.
 * Usado en {@link useProfileData}.
 *
 * @param fn - Callback sin argumentos que indica que hubo cambios.
 * @returns Función para cancelar la suscripción.
 */
export function subscribeReviews(fn: () => void): () => void {
  reviewSubscribers.push(fn);
  return () => {
    const i = reviewSubscribers.indexOf(fn);
    if (i !== -1) reviewSubscribers.splice(i, 1);
  };
}
