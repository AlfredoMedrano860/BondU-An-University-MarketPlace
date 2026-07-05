import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";
import type { Review } from "../data/Review";
import NavigationTabs from "../ui/NavigationTabs";
import ProfileContact from "./ProfileContact";
import ProfileProducts from "./ProfileProducts";
import ProfileReviews from "./ProfileReviews";

const noop = () => {};

/**
 * Props de ProfileTabs.
 */
interface ProfileTabsProps {
  /** Usuario cuyo perfil se muestra. */
  currentUser: UserProfile;
  /** Indica si el perfil pertenece al usuario autenticado. Por defecto `true`. */
  isOwnProfile?: boolean;
  /** Usuario autenticado que puede dejar reseñas. Solo aplica en perfiles ajenos. */
  reviewer?: UserProfile;
  /** Se ejecuta al editar un producto (perfil propio). */
  onEdit: (product: Product) => void;
  /** Se ejecuta al comprar un producto (perfil ajeno). */
  onBuyProduct?: (product: Product) => void;
  /** Se ejecuta al hacer clic en el avatar de un reseñador. */
  onViewReviewer?: (reviewerId: string) => void;
  /** Productos publicados por el usuario del perfil. */
  userProducts: Product[];
  /** Reseñas recibidas por el usuario del perfil. */
  reviews: Review[];
  /** Se ejecuta al eliminar un producto (perfil propio). */
  onDelete: (p: Product) => void;
  /** Se ejecuta al marcar un producto como vendido (perfil propio). */
  onSell?: (p: Product) => void;
  /** Se ejecuta al marcar/desmarcar un producto como favorito (perfil ajeno). */
  onToggleFavorite?: (p: Product) => void;
  /** Se ejecuta al agregar una reseña nueva, para refrescar los datos del perfil. */
  onReviewAdded?: () => void;
}

/**
 * Sistema de pestañas del perfil: Contacto, Productos y Reseñas.
 *
 * Gestiona el índice de pestaña activa internamente; los datos (productos,
 * reseñas) se reciben ya cargados desde {@link Profile} (vía {@link useProfileData}).
 *
 * @param currentUser - Usuario cuyo perfil se muestra.
 * @param isOwnProfile - Si el perfil pertenece al usuario autenticado.
 * @param reviewer - Usuario autenticado que puede dejar reseñas (perfil ajeno).
 * @param onEdit - Se ejecuta al editar un producto (perfil propio).
 * @param onBuyProduct - Se ejecuta al comprar un producto (perfil ajeno).
 * @param onViewReviewer - Navega al perfil de un reseñador.
 * @param userProducts - Productos publicados por el usuario del perfil.
 * @param reviews - Reseñas recibidas por el usuario del perfil.
 * @param onDelete - Se ejecuta al eliminar un producto (perfil propio).
 * @param onSell - Se ejecuta al marcar un producto como vendido (perfil propio).
 * @param onToggleFavorite - Se ejecuta al marcar/desmarcar un favorito (perfil ajeno).
 * @param onReviewAdded - Se ejecuta al agregar una reseña nueva.
 */
function ProfileTabs({ currentUser, isOwnProfile = true, reviewer, onEdit, onBuyProduct, onViewReviewer, userProducts, reviews, onDelete, onSell, onToggleFavorite, onReviewAdded }: ProfileTabsProps) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabLabels = [t("profile.contact"), t("profile.products"), t("profile.reviews")];

  return (
    <>
      <div className="bg-white">
        <div className="max-w-6xl mx-auto">
          <NavigationTabs labels={tabLabels} selected={selectedTab} onSelect={setSelectedTab} className="px-4 md:px-16 lg:px-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-16 lg:px-20 py-8">
        {selectedTab === 0 && <ProfileContact currentUser={currentUser} />}
        {selectedTab === 1 && (
          <ProfileProducts
            userProducts={userProducts}
            isOwnProfile={isOwnProfile}
            onEdit={onEdit}
            onBuyProduct={onBuyProduct ?? noop}
            onDelete={onDelete}
            onSell={isOwnProfile ? onSell : undefined}
            onToggleFavorite={onToggleFavorite ?? noop}
          />
        )}
        {selectedTab === 2 && (
          <ProfileReviews
            reviews={reviews}
            isOwnProfile={isOwnProfile}
            reviewer={reviewer}
            sellerId={currentUser.id}
            onViewReviewer={onViewReviewer}
            onReviewAdded={onReviewAdded}
          />
        )}
      </div>
    </>
  );
}

export default ProfileTabs;
