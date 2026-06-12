import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../ui/BackButton";
import MyProductCard from "../templates/MyProductCard";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import { getProductsByUser, removeProduct, subscribeProducts } from "../data/ProductStore";

interface MyProductsScreenProps {
  userId: number;
  onBack: () => void;
}

function MyProductsScreen({ userId, onBack }: MyProductsScreenProps) {
  const { t } = useTranslation();
  const [userProducts, setUserProducts] = useState<Product[]>(getProductsByUser(userId));

  useEffect(() => {
    const unsub = subscribeProducts(() => setUserProducts(getProductsByUser(userId)));
    return unsub;
  }, [userId]);

  const handleRemove = (productId: number) => {
    removeProduct(productId);
  };

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">

      <div className="absolute top-10 left-3">
        <BackButton onClick={onBack} />
      </div>
      <div className="bg-primary px-6 pt-15 pb-16 text-center shadow-md">
        <h1 className="text-white text-xl font-bold">{t("myProducts.title")}</h1>
      </div>

      <div className="px-6 sm:px-10 md:px-16 lg:px-20 -mt-8 pb-10">
        {userProducts.length === 0
          ? <EmptyState message={t("myProducts.empty")} />
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
              {userProducts.map((product) => (
                <MyProductCard key={product.id} product={product} onRemove={handleRemove} />
              ))}
            </div>
        }
      </div>

    </div>
  );
}

export default MyProductsScreen;
