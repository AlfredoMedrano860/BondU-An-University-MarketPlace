import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";
import { useProfileData } from "../../hooks/useProfileData";
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
  onViewReviewer?: (reviewerId: number) => void;
}

/**
 * Sistema de pestañas del perfil: Contacto, Productos y Reseñas.
 *
 * Gestiona el índice de pestaña activa internamente y delega los datos
 * a {@link useProfileData}. Usado en {@link ProfileScreen}.
 */
function ProfileTabs({ currentUser, isOwnProfile = true, reviewer, onEdit, onBuyProduct, onViewReviewer }: ProfileTabsProps) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const { userProducts, reviews, handleDelete, handleSell } = useProfileData(currentUser.id);
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
            onDelete={handleDelete}
            onSell={isOwnProfile ? handleSell : undefined}
          />
        )}
        {selectedTab === 2 && (
          <ProfileReviews
            reviews={reviews}
            isOwnProfile={isOwnProfile}
            reviewer={reviewer}
            sellerId={currentUser.id}
            onViewReviewer={onViewReviewer}
          />
        )}
      </div>
    </>
  );
}

export default ProfileTabs;
