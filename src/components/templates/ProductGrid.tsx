import ProductCard from "./ProductCard";
import type { Product } from "../data/Product";

/**
 * Props de ProductGrid.
 * @see Product
 */
interface ProductGridProps {
  /** Lista de productos a mostrar en la grilla. */
  products: Product[];
  /** Se ejecuta al presionar COMPRAR en un {@link ProductCard}. */
  onBuy: (product: Product) => void;
  /** Se ejecuta al presionar la estrella en un {@link ProductCard}. */
  onToggleFavorite: (product: Product) => void;
}

/**
 * Grilla de productos en dos columnas.
 *
 * Componente de presentación puro — solo renderiza los productos recibidos
 * sin filtrar ni consultar el store directamente.
 * Cada item se muestra con {@link ProductCard}.
 *
 * @param products - Lista de productos a mostrar en la grilla.
 * @param onBuy - Se ejecuta al presionar COMPRAR en un ProductCard.
 * @param onToggleFavorite - Se ejecuta al presionar la estrella en un ProductCard.
 */
function ProductGrid({ products, onBuy, onToggleFavorite }: ProductGridProps) {
  return (
    <div className="px-6 mt-6">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={onBuy} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;