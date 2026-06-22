import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import { getProducts, toggleFavorite, subscribeProducts } from "../components/data/ProductStore";
import { notify } from "../components/data/NotificationStore";
import { normalize } from "../utils/string";

/**
 * Hook que gestiona la lista de productos del Marketplace.
 *
 * Se suscribe al store, filtra los productos del usuario actual y aplica
 * el término de búsqueda normalizando tildes y mayúsculas.
 * Incluye el manejador de favoritos con notificación estandarizada.
 * Usado en {@link MarketPlaceScreen}.
 *
 * @param currentUserId - ID del usuario actual; sus productos se excluyen del listado.
 * @param searchTerm - Término para filtrar productos por nombre.
 * @returns `displayProducts` — productos filtrados listos para mostrar,
 * `handleToggleFavorite` — alterna favorito y emite notificación.
 */
export function useMarketplaceProducts(currentUserId: number, searchTerm: string, stateFilter = "", priceFilter = 500) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(getProducts);

  useEffect(() => {
    const unsub = subscribeProducts(() => setProducts(getProducts()));
    return unsub;
  }, []);

  /**
   * Alterna el favorito del producto, refresca el estado local y emite notificación.
   * @param product - Producto cuyo estado de favorito se alterna.
   */
  function handleToggleFavorite(product: Product) {
    const adding = !product.isFavorite;
    toggleFavorite(product.id);
    setProducts(getProducts());
    if (adding) {
      notify.success(t("notifications.favoriteAdded.title"), t("notifications.favoriteAdded.message"));
    } else {
      notify.info(t("notifications.favoriteRemoved.title"), t("notifications.favoriteRemoved.message"));
    }
  }

  const otherUsersProducts = products.filter(p => p.seller.id !== currentUserId);
  const bySearch = searchTerm.trim()
    ? otherUsersProducts.filter(p => normalize(p.name).includes(normalize(searchTerm)))
    : otherUsersProducts;
  const byState = stateFilter
    ? bySearch.filter(p => p.state === stateFilter)
    : bySearch;
  const displayProducts = priceFilter < 500
    ? byState.filter(p => p.price <= priceFilter)
    : byState;

  return { displayProducts, handleToggleFavorite };
}
