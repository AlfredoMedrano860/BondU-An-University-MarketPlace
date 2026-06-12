import { useTranslation } from "react-i18next";
import AuxiliaryButton from "../ui/AuxiliaryButton";
import FavoriteButton from "../ui/FavoriteButton";
import type { Product } from "../data/Product";

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
}

function ProductCard({ product, onBuy, onToggleFavorite }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <div className="group bg-white rounded-3xl p-4 flex flex-col items-center border border-transparent hover:border-[hsl(54,80%,63%)] transition relative shadow-sm">

      <div className="absolute top-2 right-2">
        <FavoriteButton isFavorite={product.isFavorite} onClick={() => onToggleFavorite(product)} />
      </div>

      <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full object-cover"/>
      </div>

      <div className="w-full flex justify-between items-center mt-0.5">
        <h3 className="text-lg font-semibold text-black">{product.name}</h3>
        <span className="text-[hsl(54,80%,63%)] font-bold">${product.price}</span>
      </div>

      <AuxiliaryButton text={t("product.buy")} onClick={() => onBuy(product)} />

    </div>
  );
}

export default ProductCard;
