import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import { productsService } from "../services/products";
import { notify } from "../components/data/NotificationStore";

export function useProductActions(setProducts: Dispatch<SetStateAction<Product[]>>) {
  const { t } = useTranslation();

  // Eliminar producto: llama DELETE /products/:id
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

  // Vender producto: llama PATCH /products/:id/sell
  async function handleSell(product: Product) {
    try {
      await productsService.sell(product.id);
      setProducts(prev => prev.filter(p => p.id !== product.id));
      notify.success(t("notifications.productSold.title"), t("notifications.productSold.message"));
    } catch {
      notify.error(t("notifications.productError.title"), t("notifications.productError.message"));
    }
  }

  return { handleDelete, handleSell };
}