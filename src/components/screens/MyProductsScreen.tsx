import { useTranslation } from "react-i18next";
import ScreenLayout from "../layout/ScreenLayout";
import ProductCard from "../templates/ProductCard";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import { useMyProducts } from "../../hooks/useMyProducts";

/**
 * Props de MyProductsScreen.
 */
interface MyProductsScreenProps {
  /** ID del usuario cuyos productos se muestran. */
  userId: string;
  /** Navega hacia atrás. */
  onBack: () => void;
  /** Abre el formulario de edición para el producto seleccionado. */
  onEdit: (product: Product) => void;
}

/**
 * Pantalla que lista los productos publicados por el usuario autenticado.
 *
 * Delega suscripción y eliminación a {@link useMyProducts}.
 *
 * @param userId - ID del usuario cuyos productos se muestran.
 * @param onBack - Navega hacia atrás.
 * @param onEdit - Abre el formulario de edición del producto.
 */
function MyProductsScreen({ userId, onBack, onEdit }: MyProductsScreenProps) {
  const { t } = useTranslation();
  const { userProducts, handleDelete, handleSell } = useMyProducts(userId);

  return (
    <ScreenLayout title={t("myProducts.title")} onBack={onBack}>
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 mt-6 pb-10">
        {userProducts.length === 0
          ? <EmptyState message={t("myProducts.empty")} />
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isOwner
                  onBuy={onEdit}
                  onToggleFavorite={handleDelete}
                  onSell={handleSell}
                  buttonLabel={t("myProducts.edit")}
                />
              ))}
            </div>
        }
      </div>
    </ScreenLayout>
  );
}

export default MyProductsScreen;
