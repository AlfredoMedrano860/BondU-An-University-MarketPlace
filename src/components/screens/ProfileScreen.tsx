import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import BackButton from "../ui/BackButton";
import CircleButton from "../ui/CircleButton";
import StarRating from "../ui/StarRating";
import ProfileTabs from "../templates/ProfileTabs";
import ProductScreen from "./ProductScreen";
import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";
import { computeRating } from "../data/Review";
import { useProfileData } from "../../hooks/useProfileData";

interface ProfileScreenProps {
  currentUser: UserProfile;
  onBack: () => void;
  onEdit: (product: Product) => void;
  onEditProfile?: () => void;
  isOwnProfile?: boolean;
  reviewer?: UserProfile;
  onBuyProduct?: (product: Product) => void;
  onViewReviewer?: (reviewerId: string) => void;  // ← era number, ahora string
}

export default function ProfileScreen({ currentUser, onBack, onEdit, onEditProfile, isOwnProfile = true, reviewer, onBuyProduct, onViewReviewer }: ProfileScreenProps) {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Hook que carga productos, reseñas y ventas del API
  const { userProducts, reviews, salesCount, handleDelete, handleSell, reload } = useProfileData(currentUser.id);

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
        onBuyProduct={onBuyProduct ?? setSelectedProduct}
        onViewReviewer={onViewReviewer}
        onDelete={handleDelete}
        onSell={isOwnProfile ? handleSell : undefined}
        onReviewAdded={reload}
      />

    </div>
  );
}