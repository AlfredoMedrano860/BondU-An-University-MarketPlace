import { useState } from "react";
import AppHeader from "../templates/AppHeader";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";
import ProductScreen from "./ProductScreen";
import type { Product } from "../data/Product";

interface MarketPlaceScreenProps {
  onNavigate: (screen: string) => void;
}

function MarketPlaceScreen({ onNavigate }: MarketPlaceScreenProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (selectedProduct) {
    return (
      <ProductScreen product={selectedProduct} onBack={() => setSelectedProduct(null)} />
    );
  }

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar pb-55">
      <AppHeader />
      <ProductGrid onBuy={setSelectedProduct} />
      <BottomNav onNavigate={onNavigate} currentScreen="marketplace" />
    </div>
  );
}

export default MarketPlaceScreen;