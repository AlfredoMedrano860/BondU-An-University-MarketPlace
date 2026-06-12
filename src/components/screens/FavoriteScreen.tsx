import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import AppHeader from "../templates/AppHeader";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";
import ProductScreen from "./ProductScreen";
import EmptyState from "../ui/EmptyState";
import { getFavorites, toggleFavorite } from "../data/ProductStore";

interface FavoriteScreenProps {
  onNavigate: (screen: string) => void;
  currentUser: UserProfile;
  onSearch: (term: string) => void;
}

function FavoriteScreen({ onNavigate, currentUser, onSearch }: FavoriteScreenProps) {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Product[]>(getFavorites());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      <AppHeader currentUser={currentUser} onSearch={onSearch} />

      {/* ── CONTENIDO ── */}
      {favorites.length === 0
        ? <EmptyState message={t("favorites.noFavorites")} />
        : <ProductGrid
            products={favorites}
            onBuy={setSelectedProduct}
            onToggleFavorite={handleToggleFavorite}
            onViewAll={() => onNavigate("marketplace")}
          />
      }

      {/* ── NAVEGACIÓN ── */}
      <BottomNav onNavigate={onNavigate} currentScreen="favorite" />

    </div>
  );
}

export default FavoriteScreen;
