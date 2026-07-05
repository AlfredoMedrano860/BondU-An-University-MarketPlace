import { Star } from "lucide-react";
import { starReviews } from "../data/Review";

/**
 * Props de StarRating.
 */
interface StarRatingProps {
  /** Puntuación de 0 a 5 (se redondea al entero más cercano para rellenar las estrellas). */
  rating: number;
  /** Cantidad de reseñas a mostrar entre paréntesis. Si se omite no se muestra. */
  reviews?: number;
  /** Tamaño de cada estrella en píxeles. Por defecto `20`. */
  size?: number;
}

/**
 * Muestra una fila de 5 estrellas con la puntuación promedio.
 * Opcionalmente muestra el valor numérico y la cantidad de reseñas.
 * Usado en {@link Profile}, {@link SellerTab} y {@link ReviewCard}.
 *
 * @param rating - Puntuación de 0 a 5.
 * @param reviews - Cantidad de reseñas (opcional).
 * @param size - Tamaño en píxeles de cada estrella. Por defecto `20`.
 */
function StarRating({ rating, reviews, size = 20 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {starReviews.map((star) => (
        <Star
          key={star}
          size={size}
          strokeWidth={1.5}
          stroke="var(--color-primary)"
          fill={star <= Math.round(rating) ? "var(--color-primary)" : "none"}
        />
      ))}
      {reviews !== undefined && (
        <span className="text-[14px] text-[hsl(26,11%,38%)] ml-1">
          {rating.toFixed(1)} ({reviews})
        </span>
      )}
    </div>
  );
}

export default StarRating;