import { useTranslation } from "react-i18next";
import type { Review } from "../data/Review";
import type { UserProfile } from "../data/UserProfile";
import EmptyState from "../ui/EmptyState";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

/**
 * Props de ProfileReviews.
 */
interface ProfileReviewsProps {
  /** Lista de reseñas recibidas por el usuario del perfil. */
  reviews: Review[];
  /** Indica si el perfil pertenece al usuario autenticado. */
  isOwnProfile: boolean;
  /** Usuario autenticado que puede escribir una reseña. Solo aplica en perfiles ajenos. */
  reviewer?: UserProfile;
  /** ID del vendedor que recibirá la reseña. */
  sellerId: number;
  /** Se ejecuta al hacer clic en el avatar de un reseñador para ver su perfil. */
  onViewReviewer?: (reviewerId: number) => void;
}

/**
 * Muestra la pestaña de reseñas del perfil de un usuario.
 *
 * En el perfil propio muestra un estado vacío si no hay reseñas.
 * En perfiles ajenos, muestra el formulario de reseña al final si se pasa `reviewer`.
 * Usado en {@link ProfileInfo}.
 *
 * @param reviews - Reseñas a mostrar.
 * @param isOwnProfile - Controla la visibilidad del formulario y el estado vacío.
 * @param reviewer - Usuario autenticado que redactará la reseña.
 * @param sellerId - ID del vendedor receptor de la reseña.
 * @param onViewReviewer - Navega al perfil del reseñador al hacer clic en su avatar.
 */
export default function ProfileReviews({ reviews, isOwnProfile, reviewer, sellerId, onViewReviewer }: ProfileReviewsProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full px-4">
      {reviews.length === 0 && isOwnProfile && (
        <EmptyState message={t("profile.noReviews")} />
      )}
      {reviews.map((r) => (
        <ReviewCard
          key={r.id}
          review={r}
          onViewProfile={() => onViewReviewer?.(r.reviewerId)}
        />
      ))}
      {!isOwnProfile && reviewer && (
        <ReviewForm reviewer={reviewer} sellerId={sellerId} />
      )}
    </div>
  );
}
