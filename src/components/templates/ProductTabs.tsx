import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import NavigationTabs from "../ui/NavigationTabs";
import type { Seller } from "../data/Seller";
import { computeRating } from "../data/Review";
import { usersService } from "../../services/users";
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
 * Usado en {@link ProductPage}.
 *
 * @param product - Producto cuyos datos se muestran.
 * @param selectedTab - Índice de la pestaña activa.
 * @param onSelectTab - Cambia la pestaña activa.
 * @param onViewSellerProfile - Navega al perfil del vendedor.
 */
function ProductTabs({ product, selectedTab, onSelectTab, onViewSellerProfile }: ProductTabsProps) {
  const { t } = useTranslation();
  const [seller, setSeller] = useState<Seller>(product.seller);
  const tabLabels = [t("product.tabs.info"), t("product.tabs.seller"), t("product.tabs.share")];

  // Carga la calificación real del vendedor al abrir la pestaña Vendedor.
  // La calificación se calcula a partir de las reseñas reales (más confiable
  // que las estadísticas agregadas, que el backend no siempre recalcula).
  useEffect(() => {
    if (selectedTab !== 1) return;
    Promise.all([
      usersService.getReviews(product.seller.id).catch(() => []),
      usersService.getStats(product.seller.id).catch(() => null),
    ]).then(([apiReviews, stats]) => {
      setSeller(Object.assign({}, product.seller, {
        rating: computeRating(apiReviews.map(r => ({ rating: Number(r.rating) }))),
        reviews: apiReviews.length,
        sales: stats?.sales_count ?? 0,
      }));
    });
  }, [selectedTab, product.seller.id]);

  return (
    <div>

      <NavigationTabs labels={tabLabels} selected={selectedTab} onSelect={onSelectTab} className="mb-5" />

      <div className="text-[16px] color-inactive leading-8 text-justify">

        {selectedTab === 0 && <p>{product.description || t("product.noDescription")}</p>}

        {selectedTab === 1 && (
          <div>
            <p>{t("product.verifiedSeller")}</p>
            <SellerTab seller={seller} onViewProfile={onViewSellerProfile ? () => onViewSellerProfile(seller) : undefined} />
          </div>
        )}

        {selectedTab === 2 && <ShareTab productId={product.id} />}

      </div>
    </div>
  );
}

export default ProductTabs;
