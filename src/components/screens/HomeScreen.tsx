import { useState } from "react";
import { useTranslation } from "react-i18next";
import FeaturedBanner from "../templates/FeaturedBanner";
import ProductGrid from "../templates/ProductGrid";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import { getProducts } from "../data/ProductStore";
import { useFavoriteToggle } from "../../hooks/useFavoriteToggle";

/**
 * Props de HomeScreen.
 */
interface HomeScreenProps {
  /** Navega a otra pantalla por nombre. */
  onNavigate: (screen: string) => void;
  /** Abre el detalle de un producto. */
  onViewProduct: (product: Product) => void;
  /** Usuario autenticado; sus propios productos se excluyen del listado. */
  currentUser: UserProfile;
}

/**
 * Pantalla de inicio con banner destacado y cuadrícula de productos recientes.
 *
 * Muestra los productos de otros usuarios y permite alternar favoritos.
 * No se suscribe al store: carga los productos una sola vez al montar.
 *
 * @param onNavigate - Navega a otra pantalla por nombre.
 * @param onViewProduct - Abre el detalle de un producto.
 * @param currentUser - Usuario autenticado cuyos productos se excluyen.
 */
function HomeScreen({ onNavigate, onViewProduct, currentUser }: HomeScreenProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(() =>
    getProducts().filter(p => p.seller.id !== currentUser.id)
  );
  const handleToggleFavorite = useFavoriteToggle(
    () => setProducts(getProducts().filter(p => p.seller.id !== currentUser.id))
  );

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
