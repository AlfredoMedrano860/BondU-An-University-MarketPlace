import { useState, useEffect, useCallback } from "react";
import type { Product } from "../components/data/Product";
import { productsService } from "../services/products";
import { favoritesService } from "../services/favorites";
import { apiProductToProduct } from "../utils/adapters";
import { normalize } from "../utils/string";
import { useFavoriteToggle } from "./useFavoriteToggle";

/**
 * Hook que gestiona la lista de productos del Marketplace.
 *
 * Carga todos los productos, excluye los del usuario actual y aplica
 * el término de búsqueda normalizando tildes y mayúsculas.
 * Incluye el manejador de favoritos con notificación estandarizada.
 * Usado en {@link MarketPlace}.
 *
 * @param currentUserId - ID del usuario actual; sus productos se excluyen del listado.
 * @param searchTerm - Término para filtrar productos por nombre.
 * @returns `displayProducts` — productos filtrados listos para mostrar,
 * `handleToggleFavorite` — alterna favorito y emite notificación.
 */
export function useMarketplaceProducts(currentUserId: string, searchTerm: string, stateFilter = "", priceFilter = 500) {
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
      // Falla en silencio: la UI ya muestra el estado vacío cuando `allProducts` queda sin datos
    }
  }, [currentUserId]);

  useEffect(() => { load(); }, [load]);

  const handleToggleFavorite = useFavoriteToggle(currentUserId, load);

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
