import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FeaturedBanner from "../templates/FeaturedBanner";
import ProductGrid from "../templates/ProductGrid";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import { productsService } from "../../services/products";
import { favoritesService } from "../../services/favorites";
import { apiProductToProduct } from "../../utils/adapters";
import { useFavoriteToggle } from "../../hooks/useFavoriteToggle";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onViewProduct: (product: Product) => void;
  currentUser: UserProfile;
}

function HomeScreen({ onNavigate, onViewProduct, currentUser }: HomeScreenProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  const load = useCallback(async () => {
    try {
      const [apiProducts, apiFavorites] = await Promise.all([
        productsService.getAll(),
        favoritesService.getByUser(currentUser.id),
      ]);

      const favIds = new Set(apiFavorites.map(f => f.product_id));
      const others = apiProducts
        .filter(p => p.seller_id !== currentUser.id)
        .map(p => apiProductToProduct(p, favIds));

      setProducts(others);
    } catch {
      // silently fail
    }
  }, [currentUser.id]);

  useEffect(() => { load(); }, [load]);

  const handleToggleFavorite = useFavoriteToggle(currentUser.id, load);

  return (
    <div className="h-full bg-beige overflow-y-auto no-scrollbar pb-28">
      <FeaturedBanner />
      {products.length === 0 ? (
        <EmptyState message={t("home.noProducts")} />
      ) : (
        <ProductGrid
          products={products}
          onBuy={onViewProduct}
          onToggleFavorite={handleToggleFavorite}
          onViewAll={() => onNavigate("marketplace")}
        />
      )}
    </div>
  );
}

export default HomeScreen;
