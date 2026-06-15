import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import { getProductsByUser, removeProduct, subscribeProducts } from "../components/data/ProductStore";
import { notify } from "../components/data/NotificationStore";

/**
 * Hook para gestionar los productos propios de un vendedor.
 *
 * Se suscribe a los cambios del store y expone un manejador de eliminación.
 * Usado en {@link MyProductsScreen}.
 *
 * @param userId - ID del usuario cuyos productos se cargan y escuchan.
 * @returns `userProducts` — lista de productos del usuario,
 * `handleDelete` — elimina un producto y emite notificación de advertencia.
 */
export function useMyProducts(userId: number) {
  const { t } = useTranslation();
  const [userProducts, setUserProducts] = useState<Product[]>(() => getProductsByUser(userId));

  useEffect(() => {
    const unsub = subscribeProducts(() => setUserProducts(getProductsByUser(userId)));
    return unsub;
  }, [userId]);

  /**
   * Elimina el producto del store y emite una notificación de advertencia.
   * @param product - Producto a eliminar.
   */
  function handleDelete(product: Product) {
    removeProduct(product.id);
    notify.warning(t("notifications.productDeleted.title"), t("notifications.productDeleted.message"));
  }

  return { userProducts, handleDelete };
}
