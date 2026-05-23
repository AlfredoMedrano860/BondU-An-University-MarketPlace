import { useState } from "react";
import AppHeader from "../templates/AppHeader";
import FeaturedBanner from "../templates/FeaturedBanner";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";
import ProductScreen from "./ProductScreen";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  currentUser: UserProfile;
}

function HomeScreen({ onNavigate, currentUser }: HomeScreenProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (selectedProduct) {
    return <ProductScreen product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar pb-55">
      <AppHeader currentUser={currentUser} />
      <FeaturedBanner />
      <ProductGrid onBuy={setSelectedProduct} />
      <BottomNav onNavigate={onNavigate} currentScreen="home" />
    </div>
  );
}

export default HomeScreen;