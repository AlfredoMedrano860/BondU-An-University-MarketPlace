import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import ProductGrid from "../templates/ProductGrid";
import EmptyState from "../ui/EmptyState";
import { useFavoriteProducts } from "../../hooks/useFavoriteProducts";

/**
 * Props de Favorite.
 */
interface FavoriteProps {
  /** Abre el detalle de un producto. */
  onViewProduct: (product: Product) => void;
  /** Usuario autenticado cuyos favoritos se muestran. */
  currentUser: UserProfile;
}

/**
 * Pantalla con la grilla de productos marcados como favoritos.
 *
 * Delega la carga de favoritos y el manejo de la lista a {@link useFavoriteProducts}.
 *
 * @param onViewProduct - Abre el detalle de un producto.
 * @param currentUser - Usuario autenticado.
 */
function Favorite({ onViewProduct, currentUser }: FavoriteProps) {
  const { t } = useTranslation();
  const { favorites, handleToggleFavorite } = useFavoriteProducts(currentUser.id);

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

export default Favorite;
