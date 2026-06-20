import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import ProductGrid from "../templates/ProductGrid";
import EmptyState from "../ui/EmptyState";
import { getFavorites } from "../data/ProductStore";
import { useFavoriteToggle } from "../../hooks/useFavoriteToggle";

import CloseOrDelete from "../templates/CloseOrDelete";

interface FavoriteScreenProps {
  /** Abre el detalle de un producto. */
  onViewProduct: (product: Product) => void;
}

/**
 * Pantalla que muestra los productos marcados como favoritos.
 *
 * Mantiene su propio estado local de favoritos y lo refresca tras cada toggle.
 *
 * @param onViewProduct - Abre el detalle de un producto.
 */
function FavoriteScreen({ onViewProduct }: FavoriteScreenProps) {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Product[]>(getFavorites);
  const handleToggleFavorite = useFavoriteToggle(() => setFavorites(getFavorites()));

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
