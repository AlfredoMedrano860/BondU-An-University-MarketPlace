import { Star } from "lucide-react";

/** Color primario de la aplicación. @see _colors.css */
const PRIMARY_COLOR = "hsl(67, 100%, 35%)";

const stars = [1, 2, 3, 4, 5];

/**
 * Props de StarRating.
 */
interface StarRatingProps {
  /** Calificación del vendedor entre 0 y 5. */
  rating: number;
  /** Número total de reseñas del vendedor. */
  reviews: number;
}

/**
 * Calificación por estrellas de un vendedor.
 *
 * Muestra 5 estrellas rellenas según el rating redondeado,
 * seguidas del valor numérico y la cantidad de reseñas.
 * Usado en {@link SellerTab}.
 *
 * @param rating - Calificación del vendedor entre 0 y 5.
 * @param reviews - Número total de reseñas del vendedor.
 */
function StarRating({ rating, reviews }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          size={20}
          strokeWidth={1.5}
          stroke={PRIMARY_COLOR}
          fill={star <= Math.round(rating) ? PRIMARY_COLOR : "none"}
        />
      ))}
      <span className="text-[14px] text-[hsl(26,11%,38%)] ml-1">
        {rating.toFixed(1)} ({reviews})
      </span>
    </div>
  );
}

export default StarRating;