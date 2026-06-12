import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppHeader from "../templates/AppHeader";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";
import ProductScreen from "./ProductScreen";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";
import { getProducts, toggleFavorite, subscribeProducts } from "../data/ProductStore";
import { normalize } from "../../utils/string";

interface MarketPlaceScreenProps {
  onNavigate: (screen: string) => void;
  currentUser: UserProfile;
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

function MarketPlaceScreen({ onNavigate, currentUser, searchTerm = "", onSearch }: MarketPlaceScreenProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const unsub = subscribeProducts(() => setProducts(getProducts()));
    return unsub;
  }, []);

  const handleToggleFavorite = (product: Product) => {
    toggleFavorite(product.id);
  };

  if (selectedProduct) {
    return <ProductScreen product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  const otherUsersProducts = products.filter(p => p.seller.id !== currentUser.id);

  const displayProducts = searchTerm.trim()
    ? otherUsersProducts.filter((p) => normalize(p.name).includes(normalize(searchTerm)))
    : otherUsersProducts;

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar pb-55">

      {/* ── HEADER ── */}
      <AppHeader currentUser={currentUser} onSearch={onSearch} />

      {/* ── FILTRO ACTIVO ── */}
      {searchTerm && (
        <div className="px-6 sm:px-10 md:px-16 lg:px-20 pt-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {t("marketplace.resultsFor")} <strong className="color-secondary">"{searchTerm}"</strong>
          </span>
          <button
            onClick={() => onSearch?.("")}
            className="text-xs color-primary font-semibold underline"
          >
            {t("marketplace.clear")}
          </button>
        </div>
      )}

      {/* ── CONTENIDO ── */}
      {displayProducts.length === 0
        ? <EmptyState message={searchTerm ? t("marketplace.noResultsFor", { term: searchTerm }) : t("marketplace.noProducts")} />
        : <ProductGrid
            products={displayProducts}
            onBuy={setSelectedProduct}
            onToggleFavorite={handleToggleFavorite}
          />
      }

      {/* ── NAVEGACIÓN ── */}
      <BottomNav onNavigate={onNavigate} currentScreen="marketplace" />

    </div>
  );
}

export default MarketPlaceScreen;
