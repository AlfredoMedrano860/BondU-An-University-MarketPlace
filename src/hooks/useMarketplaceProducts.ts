import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import { productsService } from "../services/products";
import { favoritesService } from "../services/favorites";
import { apiProductToProduct } from "../utils/adapters";
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
export function useMarketplaceProducts(currentUserId: string, searchTerm: string, stateFilter = "", priceFilter = 500) {
  const { t } = useTranslation();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const load = useCallback(async () => {
    try {
      const [apiProducts, apiFavorites] = await Promise.all([
        productsService.getAll(),
        favoritesService.getByUser(currentUserId),
      ]);

      const favIds = new Set(apiFavorites.map(f => f.product_id));
      setAllProducts(apiProducts.map(p => apiProductToProduct(p, favIds)));
    } catch {
      // silently fail so UI can show empty state
    }
  }, [currentUserId]);

  useEffect(() => { load(); }, [load]);

  async function handleToggleFavorite(product: Product) {
    const adding = !product.isFavorite;
    try {
      if (adding) await favoritesService.add(currentUserId, product.id);
      else        await favoritesService.remove(currentUserId, product.id);

      setAllProducts(prev =>
        prev.map(p => p.id === product.id ? { ...p, isFavorite: adding } : p)
      );

      if (adding) {
        notify.success(t("notifications.favoriteAdded.title"), t("notifications.favoriteAdded.message"));
      } else {
        notify.info(t("notifications.favoriteRemoved.title"), t("notifications.favoriteRemoved.message"));
      }
    } catch {
      notify.error(t("notifications.favoriteError.title"), t("notifications.favoriteError.message"));
    }
  }

  const otherUsersProducts = allProducts.filter(p => p.seller.id !== currentUserId);

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
