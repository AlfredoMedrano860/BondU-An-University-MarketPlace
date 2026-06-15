import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import type { Product } from "../data/Product";

interface ProductGridProps {
  products: Product[];
  onBuy: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onViewAll?: () => void;
}

function ProductGrid({ products, onBuy, onToggleFavorite, onViewAll }: ProductGridProps) {
  const { t } = useTranslation();

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="color-secondary text-2xl font-bold">{t("home.recentlyAdded")}</h2>
        {onViewAll && (
          <button onClick={onViewAll} className="color-primary font-semibold text-sm">{t("home.viewAll")}</button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={onBuy} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
