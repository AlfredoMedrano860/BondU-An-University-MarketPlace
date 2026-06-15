import { Heart } from "lucide-react";

/**
 * Props de FavoriteButton.
 */
interface FavoriteButtonProps {
  /** Indica si el producto está marcado como favorito. */
  isFavorite: boolean;
  /** Se ejecuta al presionar el botón para invertir el estado. */
  onClick: () => void;
}

/**
 * Botón de favorito con estrella.
 *
 * La estrella aparece rellena cuando el producto es favorito y vacía cuando no.
 * Usado en {@link ProductCard} en la esquina superior derecha del card.
 *
 * @param isFavorite - Indica si el producto está marcado como favorito.
 * @param onClick - Se ejecuta al presionar el botón para invertir el estado.
 */
function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <button onClick={onClick} className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 bg-aux hover:scale-110 active:scale-95">
      <Heart size={14} stroke="white" strokeWidth={2.5} fill={isFavorite ? "white" : "none"} />
    </button>
  );
}

export default FavoriteButton;