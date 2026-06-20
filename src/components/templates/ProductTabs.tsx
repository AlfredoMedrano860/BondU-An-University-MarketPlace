import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import type { Seller } from "../data/Seller";
import SellerTab from "./SellerTab";
import ShareTab from "./ShareTab";

/**
 * Props de ProductTabs.
 */
interface ProductTabsProps {
  /** Producto cuyo detalle se muestra. */
  product: Product;
  /** Índice de la pestaña activa (0 = Información, 1 = Vendedor, 2 = Compartir). */
  selectedTab: number;
  /** Se ejecuta al cambiar de pestaña. */
  onSelectTab: (index: number) => void;
  /** Se ejecuta al hacer clic en el perfil del vendedor dentro de la pestaña Vendedor. */
  onViewSellerProfile?: (seller: Seller) => void;
}

/**
 * Sistema de pestañas para el detalle de un producto.
 *
 * Renderiza tres pestañas: Información, Vendedor y Compartir.
 * Cada pestaña delega el contenido a su componente correspondiente.
 * Usado en {@link ProductScreen}.
 *
 * @param product - Producto cuyos datos se muestran.
 * @param selectedTab - Índice de la pestaña activa.
 * @param onSelectTab - Cambia la pestaña activa.
 * @param onViewSellerProfile - Navega al perfil del vendedor.
 */
function ProductTabs({ product, selectedTab, onSelectTab, onViewSellerProfile }: ProductTabsProps) {
  const { t } = useTranslation();
  const tabLabels = [t("product.tabs.info"), t("product.tabs.seller"), t("product.tabs.share")];

  return (
    <div>

      <div className="flex mb-5">
        {tabLabels.map((tabLabel, tabIndex) => (
          <button
            key={tabLabel}
            onClick={() => onSelectTab(tabIndex)}
            className={`relative px-5 py-3 text-sm font-semibold transition-colors rounded-t-sm ${
              selectedTab === tabIndex
                ? "color-primary"
                : "text-gray-500 hover:bg-neutral-100 hover:text-gray-700"
            }`}
          >
            {tabLabel}
            {selectedTab === tabIndex && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="text-[16px] color-inactive leading-8 text-justify">

        {selectedTab === 0 && <p>{product.description || t("product.noDescription")}</p>}

        {selectedTab === 1 && (
          <div>
            <p>{t("product.verifiedSeller")}</p>
            <SellerTab seller={product.seller} onViewProfile={() => onViewSellerProfile?.(product.seller)} />
          </div>
        )}

        {selectedTab === 2 && <ShareTab productId={product.id} />}

      </div>
    </div>
  );
}

export default ProductTabs;
