import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import BackButton from "../ui/BackButton";
import CircleButton from "../ui/CircleButton";
import StarRating from "../ui/StarRating";
import { ProfileInfo } from "../templates/ProfileInfo";
import type { ProfileChoice } from "../data/Navigation";
import ProductScreen from "./ProductScreen";
import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";
import { getVisibleReviews, computeRating, subscribeReviews } from "../data/Review";

/** Props del componente {@link ProfileScreen}. */
interface ProfileScreenProps {
  /** Usuario cuyo perfil se muestra. */
  currentUser: UserProfile;
  /** Navega hacia atrás desde el perfil. */
  onBack: () => void;
  /** Inicia la edición de un producto del perfil. */
  onEdit: (product: Product) => void;
  /** Abre la pantalla de edición del perfil propio. Solo se pasa cuando `isOwnProfile` es `true`. */
  onEditProfile?: () => void;
  /** Indica si el perfil mostrado pertenece al usuario autenticado. Por defecto `true`. */
  isOwnProfile?: boolean;
  /** Usuario autenticado que puede dejar reseñas. Solo se pasa en perfiles ajenos. */
  reviewer?: UserProfile;
  /** Navega al detalle de un producto. Si no se pasa, el producto se abre en pantalla completa inline. */
  onBuyProduct?: (product: Product) => void;
  /** Abre el perfil del autor de una reseña. */
  onViewReviewer?: (reviewerId: number) => void;
}

/**
 * Pantalla de perfil de usuario.
 *
 * Muestra un banner, avatar, estadísticas (ventas / reseñas) y tres pestañas:
 * Contacto, Productos y Reseñas. Cuando `isOwnProfile` es `true` muestra el
 * botón de configuración en el banner. Suscribe al store de reseñas para
 * reflejar cambios en tiempo real.
 */
export default function ProfileScreen({ currentUser, onBack, onEdit, onEditProfile, isOwnProfile = true, reviewer, onBuyProduct, onViewReviewer }: ProfileScreenProps) {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<ProfileChoice>("contacto");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userReviews, setUserReviews] = useState(() => getVisibleReviews(currentUser.id));

  useEffect(() => {
    const unsub = subscribeReviews(() => setUserReviews(getVisibleReviews(currentUser.id)));
    return unsub;
  }, [currentUser.id]);

  const seller = useMemo(() => ({
    ...currentUser,
    rating:  computeRating(userReviews),
    reviews: userReviews.length,
    sales:   currentUser.sales ?? 0,
  }), [currentUser, userReviews]);

  const tabs: { key: ProfileChoice; label: string }[] = [
    { key: "contacto",  label: t("profile.contact")  },
    { key: "productos", label: t("profile.products") },
    { key: "reseñas",  label: t("profile.reviews")   },
  ];

  if (selectedProduct && !onBuyProduct) {
    return (
      <ProductScreen
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

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

          {/* MOBILE */}
          <div className="md:hidden flex flex-col items-center px-4 pb-6">
            <div className="-mt-14 relative z-10">
              <img
                src={seller.avatar}
                alt={seller.username}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>
            <h1 className="mt-3 text-2xl font-bold color-secondary">{seller.username}</h1>
            <div className="mt-2">
              <StarRating rating={seller.rating} reviews={seller.reviews} />
            </div>
            <div className="flex gap-12 mt-4 text-center">
              <div>
                <p className="text-xl font-bold">{seller.sales}</p>
                <p className="text-sm text-gray-500">{t("profile.sales")}</p>
              </div>
              <div>
                <p className="text-xl font-bold">{seller.reviews}</p>
                <p className="text-sm text-gray-500">{t("profile.reviews")}</p>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-end gap-6 px-10 md:px-16 lg:px-20">
            <div className="-mt-20 shrink-0 relative z-10">
              <img
                src={seller.avatar}
                alt={seller.username}
                className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div className="flex-1 pb-5 pt-3">
              <h1 className="text-3xl font-bold color-secondary">{seller.username}</h1>
              <div className="mt-1">
                <StarRating rating={seller.rating} reviews={seller.reviews} />
              </div>
              <div className="flex gap-8 mt-2 text-sm text-gray-600">
                <span><strong className="text-black">{seller.sales}</strong> {t("profile.sales")}</span>
                <span><strong className="text-black">{seller.reviews}</strong> {t("profile.reviews")}</span>
              </div>
            </div>
          </div>

          <div className="flex px-4 md:px-16 lg:px-20 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setChoice(tab.key)}
                className={`relative px-5 py-3 text-sm font-semibold transition-colors rounded-t-sm ${
                  choice === tab.key
                    ? "color-primary"
                    : "text-gray-500 hover:bg-neutral-100 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {choice === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                )}
              </button>
            ))}
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-16 lg:px-20 py-8">
        <ProfileInfo
          choice={choice}
          currentUser={currentUser}
          isOwnProfile={isOwnProfile}
          reviewer={reviewer}
          onEdit={onEdit}
          onBuyProduct={onBuyProduct ?? setSelectedProduct}
          onViewReviewer={onViewReviewer}
        />
      </div>

    </div>
  );
}
