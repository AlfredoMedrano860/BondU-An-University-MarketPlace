import avatarImg from "../../assets/imgs/IconoPerfil.png";

export interface Review {
  id: number;
  userId: number; // ID del usuario que recibe la reseña
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

/**
 * Reseñas de muestra para desarrollo.
 * Reemplazar con datos reales del backend cuando esté disponible.
 */
export const reviews: Review[] = [
  {
    id: 1,
    userId: 1,
    name: "Sophia Kane",
    avatar: avatarImg,
    rating: 4,
    text: "Muy buen vendedor, llegó a tiempo y el producto estaba tal cual."
  },
  {
    id: 2,
    userId: 1,
    name: "Aaron Mayorga",
    avatar: avatarImg,
    rating: 5,
    text: "Excelente comunicación y producto en perfectas condiciones."
  },
  {
    id: 3,
    userId: 1,
    name: "Alfredo Medrano",
    avatar: avatarImg,
    rating: 3,
    text: "Todo bien, aunque el envío tardó un poco más de lo esperado."
  }
];

/**
 * Obtiene todas las reseñas de un usuario específico.
 * @param userId - ID del usuario
 * @returns Array de reseñas del usuario
 */
export function getReviewsByUser(userId: number): Review[] {
  return reviews.filter(review => review.userId === userId);
}
