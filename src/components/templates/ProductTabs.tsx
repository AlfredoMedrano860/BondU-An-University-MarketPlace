import type { Product } from "../data/Product";
import { productTabs } from "../data/Navigation";
import SellerTab from "./SellerTab";
import ShareTab from "./ShareTab";

/**
 * Props de ProductTabs.
 * @see Product
 */
interface ProductTabsProps {
  /** Producto del que se muestra la información. */
  product: Product;
  /** Índice del tab actualmente activo. */
  selectedTab: number;
  /** Se ejecuta al seleccionar un tab con su índice. */
  onSelectTab: (index: number) => void;
}

/**
 * Tabs de detalle de un producto.
 *
 * Muestra tres tabs definidos en {@link productTabs}:
 * - **Información** (0): descripción del producto.
 * - **Vendedor** (1): datos del vendedor con {@link SellerTab}.
 * - **Compartir** (2): opciones para compartir con {@link ShareTab}.
 *
 * @param product - Producto del que se muestra la información.
 * @param selectedTab - Índice del tab actualmente activo.
 * @param onSelectTab - Se ejecuta al seleccionar un tab con su índice.
 */
function ProductTabs({ product, selectedTab, onSelectTab }: ProductTabsProps) {
  return (
    <div>

      {/* ── NAVEGACIÓN DE TABS ── tab activo subrayado en color primario */}
      <div className="flex justify-between mb-5">
        {productTabs.map((tab, i) => {
          const tabClass = selectedTab === i ? "color-primary underline underline-offset-4" : "color-inactive";
          return (
            <button
              key={i}
              onClick={() => onSelectTab(i)}
              className={`text-17px transition-colors pb-1 ${tabClass}`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── CONTENIDO ── cambia según el tab seleccionado */}
      <div className="text-[16px] color-inactive leading-8 text-justify">

        {/* Información */}
        {selectedTab === 0 && <p>{product.description || "Sin descripción"}</p>}

        {/* Vendedor */}
        {selectedTab === 1 && (
          <div>
            <p>Vendedor verificado.</p>
            <SellerTab seller={product.seller} />
          </div>
        )}

        {/* Compartir */}
        {selectedTab === 2 && <ShareTab productId={product.id} />}

      </div>
    </div>
  );
}

export default ProductTabs;