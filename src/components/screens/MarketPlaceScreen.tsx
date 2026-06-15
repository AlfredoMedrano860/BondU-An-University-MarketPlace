import { useTranslation } from "react-i18next";
import ProductGrid from "../templates/ProductGrid";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import { useMarketplaceProducts } from "../../hooks/useMarketplaceProducts";

/**
 * Props de MarketPlaceScreen.
 */
interface MarketPlaceScreenProps {
  /** Usuario autenticado; sus productos se excluyen del listado. */
  currentUser: UserProfile;
  /** Término de búsqueda activo. Por defecto `""`. */
  searchTerm?: string;
  /** Actualiza el término de búsqueda en el padre (pasar `""` lo limpia). */
  onSearch?: (term: string) => void;
  /** Abre el detalle de un producto. */
  onViewProduct: (product: Product) => void;
}

/**
 * Pantalla del marketplace con listado filtrable de productos de otros usuarios.
 *
 * Delega suscripción, filtrado y manejo de favoritos a {@link useMarketplaceProducts}.
 *
 * @param currentUser - Usuario autenticado cuyos productos se excluyen.
 * @param searchTerm - Término activo para filtrar por nombre.
 * @param onSearch - Actualiza el término en el padre.
 * @param onViewProduct - Abre el detalle de un producto.
 */
function MarketPlaceScreen({ currentUser, searchTerm = "", onSearch, onViewProduct }: MarketPlaceScreenProps) {
  const { t } = useTranslation();
  const { displayProducts, handleToggleFavorite } = useMarketplaceProducts(currentUser.id, searchTerm);

  return (
    <div className="h-full bg-beige overflow-y-auto no-scrollbar pb-28">
      {searchTerm && (
        <div className="px-6 sm:px-10 md:px-16 lg:px-20 pt-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {t("marketplace.resultsFor")} <strong className="color-secondary">"{searchTerm}"</strong>
          </span>
          <button onClick={() => onSearch?.("")} className="text-xs color-primary font-semibold underline">
            {t("marketplace.clear")}
          </button>
        </div>
      )}
      {displayProducts.length === 0
        ? <EmptyState message={searchTerm ? t("marketplace.noResultsFor", { term: searchTerm }) : t("marketplace.noProducts")} />
        : <ProductGrid
            products={displayProducts}
            onBuy={onViewProduct}
            onToggleFavorite={handleToggleFavorite}
          />
      }
    </div>
  );
}

export default MarketPlaceScreen;
