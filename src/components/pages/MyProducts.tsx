import { useTranslation } from "react-i18next";
import BannerHeaderLayout from "../layout/BannerHeaderLayout";
import ProfileProducts from "../templates/ProfileProducts";
import type { Product } from "../data/Product";
import { useMyProducts } from "../../hooks/useMyProducts";

const noop = () => {};

/**
 * Props de MyProducts.
 */
interface MyProductsProps {
  /** ID del usuario cuyos productos se muestran (UUID del backend). */
  userId: string;
  /** Navega hacia atrás. */
  onBack: () => void;
  /** Abre el formulario de edición para el producto seleccionado. */
  onEdit: (product: Product) => void;
}

/**
 * Pantalla que lista los productos publicados por el usuario autenticado.
 *
 * Delega la carga y las acciones a {@link useMyProducts}, y el renderizado
 * de la grilla a {@link ProfileProducts} (siempre en modo `isOwnProfile`).
 *
 * @param userId - ID del usuario cuyos productos se muestran.
 * @param onBack - Navega hacia atrás.
 * @param onEdit - Abre el formulario de edición del producto.
 */
function MyProducts({ userId, onBack, onEdit }: MyProductsProps) {
  const { t } = useTranslation();
  const { userProducts, handleDelete, handleSell } = useMyProducts(userId);

  return (
    <BannerHeaderLayout title={t("myProducts.title")} onBack={onBack}>
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 mt-6 pb-10">
        <ProfileProducts
          userProducts={userProducts}
          isOwnProfile
          onEdit={onEdit}
          onBuyProduct={noop}
          onDelete={handleDelete}
          onSell={handleSell}
          onToggleFavorite={noop}
        />
      </div>
    </BannerHeaderLayout>
  );
}

export default MyProducts;
