import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import AuxiliaryButton from "../ui/AuxiliaryButton";
import FavoriteButton from "../ui/FavoriteButton";
import CardLayout from "../layout/CardLayout";
import type { Product } from "../data/Product";

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  buttonLabel?: string;
  isOwner?: boolean;
}

function ProductCard({ product, onBuy, onToggleFavorite, buttonLabel, isOwner = false }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <CardLayout>

      {/* Área imagen */}
      <div className="relative w-full aspect-square bg-neutral-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute top-2 right-2">
          {isOwner ? (
            <button
              onClick={() => onToggleFavorite(product)}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-red-500 active:opacity-70 transition-opacity"
            >
              <Trash2 size={13} stroke="white" strokeWidth={2.2} />
            </button>
          ) : (
            <FavoriteButton isFavorite={product.isFavorite} onClick={() => onToggleFavorite(product)} />
          )}
        </div>
        <img src={product.image} alt={product.name} className="w-4/5 h-4/5 object-contain" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 px-1 pb-1">
        <h3 className="text-base font-bold text-black leading-tight line-clamp-2 min-h-10">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold color-primary">${product.price}</span>
          <span className="text-xs text-gray-500 bg-neutral-200 px-2.5 py-0.5 rounded-full">{product.state}</span>
        </div>
        <AuxiliaryButton text={buttonLabel ?? t("product.buy")} onClick={() => onBuy(product)} />
      </div>

    </CardLayout>
  );
}

export default ProductCard;
