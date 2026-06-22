import { useState } from "react";
import { Star } from "lucide-react";
import { starReviews } from "../data/Review";

/**
 * Props de StarPicker.
 */
interface StarPickerProps {
  /** Puntuación seleccionada actualmente (0 = ninguna). */
  rating: number;
  /** Se ejecuta al seleccionar una estrella con su valor. */
  onChange: (rating: number) => void;
}

/**
 * Selector interactivo de estrellas para formularios de reseña.
 *
 * Gestiona el hover internamente para previsualizar la puntuación.
 * La estrella activa se rellena según el cursor o la selección actual.
 * Usado en {@link ReviewForm}.
 *
 * @param rating - Puntuación seleccionada.
 * @param onChange - Callback con la nueva puntuación al hacer clic.
 */
export default function StarPicker({ rating, onChange }: StarPickerProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {starReviews.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110 active:scale-95 duration-100"
        >
          <Star
            size={20}
            strokeWidth={1.5}
            stroke="var(--color-primary)"
            fill={star <= (hover || rating) ? "var(--color-primary)" : "none"}
          />
        </button>
      ))}
    </div>
  );
}
