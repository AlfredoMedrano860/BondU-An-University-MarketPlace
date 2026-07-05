import { Trash2, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import AppButton from "../ui/AppButton";
import CircleButton from "../ui/CircleButton";
import CardLayout from "../ui/CardLayout";
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
 * permite marcarlo como favorito. Cuando `product.status` es `"Vendido"`, se
 * muestra una etiqueta sobre la imagen y el botón de comprar queda deshabilitado
 * (y el de "marcar vendido" se oculta, para el dueño). Usado en {@link ProductGrid}
 * y {@link ProfileProducts}.
 *
 * @param product - Producto a mostrar.
 * @param onBuy - Handler del botón principal.
 * @param onToggleFavorite - Handler del botón de favorito o eliminar.
 * @param buttonLabel - Etiqueta del botón principal.
 * @param isOwner - Si `true`, activa el modo de gestión del propietario.
 * @param onSell - Marca el producto como vendido. Solo se usa si `isOwner` es `true`.
 */
function ProductCard({ product, onBuy, onToggleFavorite, buttonLabel, isOwner = false, onSell }: ProductCardProps) {
  const { t } = useTranslation();
  const isSold = product.status === "Vendido";

  return (
    <CardLayout>

      {/* Área imagen */}
      <div className="relative w-full aspect-square bg-neutral-100 rounded-2xl flex items-center justify-center overflow-hidden">
        {isSold && (
          <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded-full">
            {t("product.sold")}
          </span>
        )}
        <div className="absolute top-2 right-2">
          {isOwner ? (
            <CircleButton size="sm" variant="danger" onClick={() => onToggleFavorite(product)} className="hover:scale-110">
              <Trash2 size={13} stroke="white" strokeWidth={2.2} />
            </CircleButton>
          ) : (
            <CircleButton size="sm" variant="aux" onClick={() => onToggleFavorite(product)} className="hover:scale-110">
              <Heart size={14} stroke="white" strokeWidth={2.5} fill={product.isFavorite ? "white" : "none"} />
            </CircleButton>
          )}
        </div>
        <img src={product.image} alt={product.name} className={`w-4/5 h-4/5 object-contain ${isSold ? "opacity-50" : ""}`} />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 px-1 pb-1">
        <h3 className="text-base font-bold text-black leading-tight line-clamp-2 min-h-10">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold color-primary">${product.price}</span>
          <span className="text-xs text-gray-500 bg-neutral-200 px-2.5 py-0.5 rounded-full">{t(`filters.states.${product.state}`)}</span>
        </div>
        {isOwner && onSell ? (
          <div className="flex gap-2">
            <AppButton variant="aux" text={buttonLabel ?? t("product.buy")} onClick={() => onBuy(product)} className="flex-1" />
            {!isSold && (
              <AppButton variant="aux" text={t("myProducts.markSold")} onClick={() => onSell(product)} className="flex-1" />
            )}
          </div>
        ) : (
          <AppButton variant="aux" text={isSold ? t("product.sold") : (buttonLabel ?? t("product.buy"))} onClick={() => onBuy(product)} disabled={isSold} />
        )}
      </div>

    </CardLayout>
  );
}

export default ProductCard;
