import { Trash2, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import AppButton from "../ui/AppButton";
import FavoriteButton from "../ui/FavoriteButton";
import CircleButton from "../ui/CircleButton";
import CardLayout from "../layout/CardLayout";
import type { Product } from "../data/Product";

/**
 * Props de ProductCard.
 */
interface ProductCardProps {
  /** Producto a mostrar. */
  product: Product;
  /** Se ejecuta al hacer clic en el botón principal (Comprar o Editar). */
  onBuy: (product: Product) => void;
  /** Se ejecuta al hacer clic en el botón de favorito o eliminar. */
  onToggleFavorite: (product: Product) => void;
  /** Texto del botón principal. Por defecto usa la traducción de `product.buy`. */
  buttonLabel?: string;
  /** Si `true`, muestra el botón de eliminar en lugar del de favorito. */
  isOwner?: boolean;
  /** Se ejecuta al marcar el producto como vendido. Solo visible cuando `isOwner` es `true`. */
  onSell?: (product: Product) => void;
}

/**
 * Tarjeta de producto para el grid del marketplace y del perfil.
 *
 * Muestra imagen, nombre, precio y estado del producto. Si `isOwner` es `true`,
 * el botón de la esquina superior derecha elimina el producto; de lo contrario
 * permite marcarlo como favorito. Usado en {@link ProductGrid} y {@link ProfileProducts}.
 *
 * @param product - Producto a mostrar.
 * @param onBuy - Handler del botón principal.
 * @param onToggleFavorite - Handler del botón de favorito o eliminar.
 * @param buttonLabel - Etiqueta del botón principal.
 * @param isOwner - Si `true`, activa el modo de gestión del propietario.
 */
function ProductCard({ product, onBuy, onToggleFavorite, buttonLabel, isOwner = false, onSell }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <CardLayout>

      {/* Área imagen */}
      <div className="relative w-full aspect-square bg-neutral-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute top-2 right-2">
          {isOwner ? (
            <CircleButton size="sm" variant="danger" onClick={() => onToggleFavorite(product)} className="hover:scale-110">
              <Trash2 size={13} stroke="white" strokeWidth={2.2} />
            </CircleButton>
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
        {isOwner && onSell ? (
          <div className="flex gap-2">
            <AppButton variant="aux" text={buttonLabel ?? t("product.buy")} onClick={() => onBuy(product)} className="flex-1" />
            <button
              type="button"
              onClick={() => onSell(product)}
              className="flex-1 h-10 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center gap-1 hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-sm"
            >
              <BadgeCheck size={14} strokeWidth={2.2} />
              {t("myProducts.markSold")}
            </button>
          </div>
        ) : (
          <AppButton variant="aux" text={buttonLabel ?? t("product.buy")} onClick={() => onBuy(product)} />
        )}
      </div>

    </CardLayout>
  );
}

export default ProductCard;
