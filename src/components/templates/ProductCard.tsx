import AuxiliaryButton from "../ui/AuxiliaryButton";
import FavoriteButton from "../ui/FavoriteButton";
import type { Product } from "../data/Product";

/**
 * Props de ProductCard.
 * @see Product
 */
interface ProductCardProps {
  /** Producto a mostrar. */
  product: Product;
  /** Se ejecuta al presionar COMPRAR con el producto seleccionado. */
  onBuy: (product: Product) => void;
  /** Se ejecuta al presionar la estrella para marcar o desmarcar como favorito. */
  onToggleFavorite: (product: Product) => void;
}

/**
 * Card de un producto en la grilla del marketplace.
 *
 * Muestra imagen, nombre, precio y dos acciones: marcar como favorito
 * con {@link FavoriteButton} y comprar con {@link AuxiliaryButton}.
 * Resalta el borde al hacer hover.
 *
 * @param product - Producto a mostrar.
 * @param onBuy - Se ejecuta al presionar COMPRAR con el producto seleccionado.
 * @param onToggleFavorite - Se ejecuta al presionar la estrella.
 */
function ProductCard({ product, onBuy, onToggleFavorite }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-3xl p-4 flex flex-col items-center border border-transparent hover:border-[hsl(54,80%,63%)] transition relative">

      {/* Botón favorito */}
      <div className="absolute top-2 right-2">
        <FavoriteButton isFavorite={product.isFavorite} onClick={() => onToggleFavorite(product)} />
      </div>

      {/* Imagen */}
      <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full object-cover"/>
      </div>

      {/* Nombre y precio */}
      <div className="w-full flex justify-between items-center mt-0.5">
        <h3 className="text-lg font-semibold text-black">{product.name}</h3>
        <span className="text-[hsl(54,80%,63%)] font-bold">${product.price}</span>
      </div>

      {/* Botón comprar */}
      <AuxiliaryButton text="COMPRAR" onClick={() => onBuy(product)} />

    </div>
  );
}

export default ProductCard;