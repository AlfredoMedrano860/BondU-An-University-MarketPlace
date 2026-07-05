import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import { productsService } from "../services/products";
import { notify } from "../components/data/NotificationStore";

/**
 * Hook con las acciones de eliminar y vender un producto, actualizando la
 * lista local y mostrando la notificación correspondiente.
 *
 * Usado en {@link useMyProducts} y {@link useProfileData}.
 *
 * @param setProducts - Setter de la lista de productos a actualizar tras cada acción.
 * @returns `handleDelete` — elimina el producto (DELETE /products/:id),
 * `handleSell` — lo marca como vendido (PATCH /products/:id/sell); el producto
 * permanece en la lista con `status: "Vendido"` en vez de desaparecer.
 */
export function useProductActions(setProducts: Dispatch<SetStateAction<Product[]>>) {
  const { t } = useTranslation();

  async function handleDelete(product: Product) {
    try {
      await productsService.remove(product.id);
      // Actualiza la UI quitando el producto de la lista local
      setProducts(prev => prev.filter(p => p.id !== product.id));
      notify.warning(t("notifications.productDeleted.title"), t("notifications.productDeleted.message"));
    } catch {
      notify.error(t("notifications.productError.title"), t("notifications.productError.message"));
    }
  }

  async function handleSell(product: Product) {
    try {
      await productsService.sell(product.id);
      // Se mantiene en la lista, solo cambia su status a "Vendido"
      setProducts(prev => prev.map(p => p.id === product.id ? Object.assign({}, p, { status: "Vendido" }) : p));
      notify.success(t("notifications.productSold.title"), t("notifications.productSold.message"));
    } catch {
      notify.error(t("notifications.productError.title"), t("notifications.productError.message"));
    }
  }

  return { handleDelete, handleSell };
}