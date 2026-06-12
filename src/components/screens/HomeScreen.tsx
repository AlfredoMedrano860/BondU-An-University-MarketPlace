import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppHeader from "../templates/AppHeader";
import FeaturedBanner from "../templates/FeaturedBanner";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";
import ProductScreen from "./ProductScreen";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import { getProducts, toggleFavorite } from "../data/ProductStore";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  currentUser: UserProfile;
  onSearch: (term: string) => void;
}

function HomeScreen({ onNavigate, currentUser, onSearch }: HomeScreenProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      <AppHeader currentUser={currentUser} onSearch={onSearch} />

      {/* ── BANNER DESTACADO ── */}
      <FeaturedBanner />

      {/* ── CONTENIDO ── */}
      {products.length === 0
        ? <EmptyState message={t("home.noProducts")} />
        : <ProductGrid
            products={products}
            onBuy={setSelectedProduct}
            onToggleFavorite={handleToggleFavorite}
            onViewAll={() => onNavigate("marketplace")}
          />
      }

      {/* ── NAVEGACIÓN ── */}
      <BottomNav onNavigate={onNavigate} currentScreen="home" />

    </div>
  );
}

export default HomeScreen;
