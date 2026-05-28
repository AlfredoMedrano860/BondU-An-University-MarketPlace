import { useState } from "react";
import AppHeader from "../templates/AppHeader";
import FeaturedBanner from "../templates/FeaturedBanner";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";
import ProductScreen from "./ProductScreen";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import { getProducts, toggleFavorite } from "../data/ProductStore";

/**
 * Props de HomeScreen.
 * @see UserProfile
 */
interface HomeScreenProps {
  /** Navega a otra pantalla por nombre. */
  onNavigate: (screen: string) => void;
  /** Usuario actualmente autenticado. */
  currentUser: UserProfile;
}

/**
 * Pantalla principal de la aplicación.
 *
 * Muestra el banner destacado y la grilla de productos disponibles.
 * Si no hay productos muestra {@link EmptyState}.
 * Al seleccionar un producto navega a {@link ProductScreen}.
 *
 * @param onNavigate - Navega a otra pantalla por nombre.
 * @param currentUser - Usuario actualmente autenticado.
 */
function HomeScreen({ onNavigate, currentUser }: HomeScreenProps) {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Invierte el estado de favorito de un producto y sincroniza el estado local.
   * @param product - Producto al que se le cambia el estado.
   */
  const handleToggleFavorite = (product: Product) => {
    toggleFavorite(product.id);
    setProducts(getProducts());
  };

  if (selectedProduct) {
    return <ProductScreen product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar pb-55">

      {/* ── HEADER ── */}
      <AppHeader currentUser={currentUser} />

      {/* ── BANNER DESTACADO ── */}
      <FeaturedBanner />

      {/* ── CONTENIDO ── grilla de productos o estado vacío */}
      {products.length === 0
        ? <EmptyState message="No hay productos disponibles" />
        : <ProductGrid
            products={products}
            onBuy={setSelectedProduct}
            onToggleFavorite={handleToggleFavorite}
          />
      }

      {/* ── NAVEGACIÓN ── */}
      <BottomNav onNavigate={onNavigate} currentScreen="home" />

    </div>
  );
}

export default HomeScreen;