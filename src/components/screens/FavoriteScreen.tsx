import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import ProductGrid from "../templates/ProductGrid";
import EmptyState from "../ui/EmptyState";
import { favoritesService } from "../../services/favorites";
import { productsService } from "../../services/products";
import { apiProductToProduct } from "../../utils/adapters";
import { useFavoriteToggle } from "../../hooks/useFavoriteToggle";

interface FavoriteScreenProps {
  onViewProduct: (product: Product) => void;
  currentUser: UserProfile;
}

function FavoriteScreen({ onViewProduct, currentUser }: FavoriteScreenProps) {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Product[]>([]);

  const load = useCallback(async () => {
    try {
      const [apiFavorites, apiAllProducts] = await Promise.all([
        favoritesService.getByUser(currentUser.id),
        productsService.getAll(),
      ]);
      const favIds = new Set(apiFavorites.map(f => f.product_id));
      const favProducts = apiAllProducts
        .filter(p => favIds.has(p.product_id))
        .map(p => apiProductToProduct(p, favIds));
      setFavorites(favProducts);
    } catch {
      setFavorites([]);
    }
  }, [currentUser.id]);

  useEffect(() => { load(); }, [load]);

  const handleToggleFavorite = useFavoriteToggle(currentUser.id, load);

  return (
    <div className="h-full bg-beige overflow-y-auto no-scrollbar pb-28">
      {favorites.length === 0
        ? <EmptyState message={t("favorites.noFavorites")} />
        : <ProductGrid
            products={favorites}
            onBuy={onViewProduct}
            onToggleFavorite={handleToggleFavorite}
          />
      }
    </div>
  );
}

export default FavoriteScreen;
