import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import type { Review } from "../components/data/Review";
import { getProductsByUser, removeProduct, subscribeProducts } from "../components/data/ProductStore";
import { getCurrentUser, updateUser } from "../components/data/AuthStore";
import { getVisibleReviews, subscribeReviews } from "../components/data/Review";
import { notify } from "../components/data/NotificationStore";

/**
 * Hook que carga los productos y reseñas de un perfil de usuario.
 *
 * Se suscribe a ambos stores y expone un manejador de eliminación de productos.
 * Usado en {@link ProfileInfo}.
 *
 * @param userId - ID del usuario cuyo perfil se está visualizando.
 * @returns `userProducts` — productos publicados por el usuario,
 * `reviews` — reseñas recibidas por el usuario,
 * `handleDelete` — elimina un producto y emite notificación de éxito.
 */
export function useProfileData(userId: number) {
  const { t } = useTranslation();
  const [userProducts, setUserProducts] = useState<Product[]>(() => getProductsByUser(userId));
  const [reviews, setReviews] = useState<Review[]>(() => getVisibleReviews(userId));

  useEffect(() => {
    const unsub = subscribeProducts(() => setUserProducts(getProductsByUser(userId)));
    return unsub;
  }, [userId]);

  useEffect(() => {
    const unsub = subscribeReviews(() => setReviews(getVisibleReviews(userId)));
    return unsub;
  }, [userId]);

  /**
   * Elimina el producto del store y emite una notificación de éxito.
   * @param product - Producto a eliminar.
   */
  function handleDelete(product: Product) {
    removeProduct(product.id);
    notify.success(
      t("notifications.productDeleted.title"),
      t("notifications.productDeleted.message"),
    );
  }

  /**
   * Marca el producto como vendido: lo elimina del store e incrementa el contador de ventas del usuario.
   * @param product - Producto vendido.
   */
  function handleSell(product: Product) {
    removeProduct(product.id);
    const user = getCurrentUser();
    if (user) updateUser({ sales: (user.sales ?? 0) + 1 });
    notify.success(
      t("notifications.productSold.title"),
      t("notifications.productSold.message"),
    );
  }

  return { userProducts, reviews, handleDelete, handleSell };
}
