import { useState } from "react";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import AppHeader from "../templates/AppHeader";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";
import ProductScreen from "./ProductScreen";
import EmptyState from "../ui/EmptyState";
import { getFavorites, toggleFavorite } from "../data/ProductStore";

/**
 * Props de FavoriteScreen.
 * @see UserProfile
 */
interface FavoriteScreenProps {
  /** Navega a otra pantalla por nombre. */
  onNavigate: (screen: string) => void;
  /** Usuario actualmente autenticado. */
  currentUser: UserProfile;
}

/**
 * Pantalla de productos marcados como favoritos.
 *
 * Muestra los productos que el usuario ha guardado con la estrella.
 * Si no hay favoritos, muestra {@link EmptyState}.
 * Al seleccionar un producto navega a {@link ProductScreen}.
 *
 * @param onNavigate - Navega a otra pantalla por nombre.
 * @param currentUser - Usuario actualmente autenticado.
 */
function FavoriteScreen({ onNavigate, currentUser }: FavoriteScreenProps) {
  const [favorites, setFavorites] = useState<Product[]>(getFavorites());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Invierte el estado de favorito de un producto y sincroniza el estado local.
   * @param product - Producto al que se le cambia el estado.
   */
  const handleToggleFavorite = (product: Product) => {
    toggleFavorite(product.id);
    setFavorites(getFavorites());
  };

  if (selectedProduct) {
    return <ProductScreen product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar pb-55">

      {/* ── HEADER ── */}
      <AppHeader currentUser={currentUser} />

      {/* ── CONTENIDO ── grilla de favoritos o estado vacío */}
      {favorites.length === 0
        ? <EmptyState message="No tienes favoritos aún" />
        : <ProductGrid
            products={favorites}
            onBuy={setSelectedProduct}
            onToggleFavorite={handleToggleFavorite}
          />
      }

      {/* ── NAVEGACIÓN ── */}
      <BottomNav onNavigate={onNavigate} currentScreen="favorite" />

    </div>
  );
}

export default FavoriteScreen;