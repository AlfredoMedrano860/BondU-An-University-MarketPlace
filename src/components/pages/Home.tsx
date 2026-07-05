import { useTranslation } from "react-i18next";
import FeaturedBanner from "../templates/FeaturedBanner";
import ProductGrid from "../templates/ProductGrid";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import { useHomeProducts } from "../../hooks/useHomeProducts";

/**
 * Props de Home.
 */
interface HomeProps {
  /** Navega a otra pantalla por nombre. */
  onNavigate: (screen: string) => void;
  /** Abre el detalle de un producto. */
  onViewProduct: (product: Product) => void;
  /** Usuario autenticado; sus productos se excluyen del listado. */
  currentUser: UserProfile;
}

/**
 * Pantalla principal con el banner destacado y una grilla de productos.
 *
 * Delega la carga de productos y el manejo de favoritos a {@link useHomeProducts}.
 *
 * @param onNavigate - Navega a otra pantalla.
 * @param onViewProduct - Abre el detalle de un producto.
 * @param currentUser - Usuario autenticado.
 */
function Home({ onNavigate, onViewProduct, currentUser }: HomeProps) {
  const { t } = useTranslation();
  const { products, handleToggleFavorite } = useHomeProducts(currentUser.id);

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

export default Home;
