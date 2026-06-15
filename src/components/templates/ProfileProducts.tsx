import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import { toggleFavorite } from "../data/ProductStore";
import EmptyState from "../ui/EmptyState";
import ProductCard from "./ProductCard";

/**
 * Props de ProfileProducts.
 */
interface ProfileProductsProps {
  /** Lista de productos del usuario del perfil. */
  userProducts: Product[];
  /** Indica si el perfil pertenece al usuario autenticado. */
  isOwnProfile: boolean;
  /** Se ejecuta al hacer clic en Editar (perfil propio). */
  onEdit: (product: Product) => void;
  /** Se ejecuta al hacer clic en Comprar (perfil ajeno). */
  onBuyProduct: (product: Product) => void;
  /** Se ejecuta al eliminar un producto (perfil propio). */
  onDelete: (product: Product) => void;
}

/**
 * Muestra la pestaña de productos del perfil de un usuario.
 *
 * Si no hay productos muestra un estado vacío. Adapta el botón y el handler
 * de cada tarjeta según si es perfil propio o ajeno.
 * Usado en {@link ProfileInfo}.
 *
 * @param userProducts - Productos del usuario a mostrar.
 * @param isOwnProfile - Si `true`, muestra opciones de edición y eliminación.
 * @param onEdit - Handler de edición del producto.
 * @param onBuyProduct - Handler de compra del producto.
 * @param onDelete - Handler de eliminación del producto.
 */
export default function ProfileProducts({ userProducts, isOwnProfile, onEdit, onBuyProduct, onDelete }: ProfileProductsProps) {
  const { t } = useTranslation();

  if (userProducts.length === 0) {
    return <EmptyState message={t("profile.noProducts")} />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 pb-6">
      {userProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isOwner={isOwnProfile}
          onBuy={isOwnProfile ? onEdit : onBuyProduct}
          onToggleFavorite={isOwnProfile ? onDelete : (p) => toggleFavorite(p.id)}
          buttonLabel={isOwnProfile ? t("myProducts.edit") : t("product.buy")}
        />
      ))}
    </div>
  );
}
