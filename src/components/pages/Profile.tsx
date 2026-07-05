import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import BackButton from "../ui/BackButton";
import CircleButton from "../ui/CircleButton";
import StarRating from "../ui/StarRating";
import ProfileTabs from "../templates/ProfileTabs";
import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";
import { computeRating } from "../data/Review";
import { useProfileData } from "../../hooks/useProfileData";

/**
 * Props de Profile.
 */
interface ProfileProps {
  /** Usuario cuyo perfil se muestra. */
  currentUser: UserProfile;
  /** Navega hacia atrás. */
  onBack: () => void;
  /** Se ejecuta al editar un producto (perfil propio). */
  onEdit: (product: Product) => void;
  /** Navega a la pantalla de edición de perfil. Solo aplica en perfil propio. */
  onEditProfile?: () => void;
  /** Indica si el perfil pertenece al usuario autenticado. Por defecto `true`. */
  isOwnProfile?: boolean;
  /** Usuario autenticado que puede dejar reseñas. Solo aplica en perfiles ajenos. */
  reviewer?: UserProfile;
  /** Se ejecuta al comprar un producto (perfil ajeno). */
  onBuyProduct?: (product: Product) => void;
  /** Se ejecuta al hacer clic en el avatar de un reseñador. */
  onViewReviewer?: (reviewerId: string) => void;
}

/**
 * Pantalla de perfil de un usuario, propio o ajeno.
 *
 * Muestra avatar, calificación, ventas y reseñas en un encabezado responsive
 * (apilado en móvil, en fila en desktop), y delega el contenido de las
 * pestañas (Contacto/Productos/Reseñas) a {@link ProfileTabs}. Los datos
 * (productos, reseñas, ventas) se cargan vía {@link useProfileData}.
 *
 * @param currentUser - Usuario cuyo perfil se muestra.
 * @param onBack - Navega hacia atrás.
 * @param onEdit - Se ejecuta al editar un producto (perfil propio).
 * @param onEditProfile - Navega a editar perfil (perfil propio).
 * @param isOwnProfile - Si el perfil pertenece al usuario autenticado.
 * @param reviewer - Usuario autenticado que puede dejar reseñas (perfil ajeno).
 * @param onBuyProduct - Se ejecuta al comprar un producto (perfil ajeno).
 * @param onViewReviewer - Navega al perfil de un reseñador.
 */
export default function Profile({ currentUser, onBack, onEdit, onEditProfile, isOwnProfile = true, reviewer, onBuyProduct, onViewReviewer }: ProfileProps) {
  const { t } = useTranslation();

  // Hook que carga productos, reseñas y ventas del API
  const { userProducts, reviews, salesCount, handleDelete, handleSell, handleToggleFavorite, reload } = useProfileData(currentUser.id, reviewer?.id);

  return (
    <div className="min-h-screen bg-neutral-100">

      <div className="relative h-44 md:h-60 bg-primary">
        <div className="absolute top-6 left-0 z-10">
          <BackButton onClick={onBack} />
        </div>
        {isOwnProfile && onEditProfile && (
          <div className="absolute top-6 right-4 z-10">
            <CircleButton variant="ghost" onClick={onEditProfile}>
              <Settings size={22} color="white" strokeWidth={1.8} />
            </CircleButton>
          </div>
        )}
      </div>

      <div className="bg-white">
        <div className="max-w-6xl mx-auto">

          {/* MÓVIL */}
          <div className="md:hidden flex flex-col items-center px-4 pb-6">
            <div className="-mt-14 relative z-10">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>
            <h1 className="mt-3 text-2xl font-bold color-secondary">{currentUser.username}</h1>
            <div className="mt-2">
              <StarRating rating={computeRating(reviews)} reviews={reviews.length} />
            </div>
            <div className="flex gap-12 mt-4 text-center">
              <div>
                <p className="text-xl font-bold">{salesCount}</p>
                <p className="text-sm text-gray-500">{t("profile.sales")}</p>
              </div>
              <div>
                <p className="text-xl font-bold">{reviews.length}</p>
                <p className="text-sm text-gray-500">{t("profile.reviews")}</p>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-end gap-6 px-10 md:px-16 lg:px-20">
            <div className="-mt-20 shrink-0 relative z-10">
              <img src={currentUser.avatar} alt={currentUser.username} className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover"/>
            </div>
            <div className="flex-1 pb-5 pt-3">
              <h1 className="text-3xl font-bold color-secondary">{currentUser.username}</h1>
              <div className="mt-1">
                <StarRating rating={computeRating(reviews)} reviews={reviews.length} />
              </div>
              <div className="flex gap-8 mt-2 text-sm text-gray-600">
                <span><span className="font-bold text-black">{salesCount}</span> {t("profile.sales")}</span>
                <span><span className="font-bold text-black">{reviews.length}</span> {t("profile.reviews")}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ProfileTabs
        currentUser={currentUser}
        isOwnProfile={isOwnProfile}
        reviewer={reviewer}
        userProducts={userProducts}
        reviews={reviews}
        onEdit={onEdit}
        onBuyProduct={onBuyProduct}
        onViewReviewer={onViewReviewer}
        onDelete={handleDelete}
        onSell={isOwnProfile ? handleSell : undefined}
        onToggleFavorite={handleToggleFavorite}
        onReviewAdded={reload}
      />

    </div>
  );
}
