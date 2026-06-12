import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";

import CommentHeader from "./CommentHeader";
import EmptyState from "../ui/EmptyState";
import MyProductCard from "./MyProductCard";
import ReviewCard from "./ReviewCard";
import { getProductsByUser, removeProduct, subscribeProducts } from "../data/ProductStore";
import { sellerReviews } from "../data/Review";
import type { Review } from "../data/Review";

export type Choice = "contacto" | "productos" | "reseñas";

interface ProfileInfoProps {
  choice: Choice;
  currentUser: UserProfile;
}

export function ProfileInfo({ currentUser, choice }: ProfileInfoProps) {
  const { t } = useTranslation();
  const [userProducts, setUserProducts] = useState<Product[]>(getProductsByUser(currentUser.id));

  useEffect(() => {
    const unsub = subscribeProducts(() => setUserProducts(getProductsByUser(currentUser.id)));
    return unsub;
  }, [currentUser.id]);

  const handleRemove = (productId: number) => {
    removeProduct(productId);
  };

  return (
    <div>
      {choice === "contacto" && (
        <div className="bg-white px-6 pt-4 pb-4 rounded-2xl m-4 flex items-center justify-center">
          <p className="m-1 text-[20px] text-gray-600">
            {t("profile.contactMessage")}
          </p>
        </div>
      )}

      {choice === "productos" && (
        <div className="px-5 pb-6">
          {userProducts.length === 0 ? (
            <EmptyState message={t("profile.noProducts")} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {userProducts.map((product) => (
                <MyProductCard key={product.id} product={product} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>
      )}

      {choice === "reseñas" && (
        <div className="w-full px-4">
          <CommentHeader name={currentUser.username} avatar={currentUser.avatar} />
          {sellerReviews.map((r: Review) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
