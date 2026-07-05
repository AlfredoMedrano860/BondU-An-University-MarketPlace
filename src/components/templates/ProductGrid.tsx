import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import type { Product } from "../data/Product";

/**
 * Props de ProductGrid.
 */
interface ProductGridProps {
  /** Lista de productos a mostrar en la grilla. */
  products: Product[];
  /** Se ejecuta al pulsar "Comprar" en una tarjeta. */
  onBuy: (product: Product) => void;
  /** Alterna el estado de favorito de un producto. */
  onToggleFavorite: (product: Product) => void;
  /** Si se provee, muestra el botón "Ver Todos" y lo ejecuta al pulsarlo. */
  onViewAll?: () => void;
}

/**
 * Grilla responsiva de productos recientes.
 *
 * Renderiza una lista de {@link ProductCard} en un grid de 2 a 4 columnas
 * dependiendo del ancho de pantalla. Opcionalmente muestra un botón "Ver todos".
 * Usado en {@link Home}, {@link MarketPlace} y {@link Favorite}.
 *
 * @param products - Productos a mostrar.
 * @param onBuy - Handler del botón Comprar.
 * @param onToggleFavorite - Handler de favorito.
 * @param onViewAll - Navega a la vista completa del marketplace.
 */
function ProductGrid({ products, onBuy, onToggleFavorite, onViewAll }: ProductGridProps) {
  const { t } = useTranslation();

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="color-secondary text-2xl font-bold">{t("home.recentlyAdded")}</h2>
        {onViewAll && (
          <button type="button" onClick={onViewAll} className="color-primary font-semibold text-sm">
            {t("home.viewAll")}
          </button>
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
