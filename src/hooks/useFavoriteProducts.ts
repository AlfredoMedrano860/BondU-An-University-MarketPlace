import { useState, useEffect, useCallback } from "react";
import type { Product } from "../components/data/Product";
import { favoritesService } from "../services/favorites";
import { productsService } from "../services/products";
import { apiProductToProduct } from "../utils/adapters";
import { useFavoriteToggle } from "./useFavoriteToggle";

/**
 * Hook que gestiona la lista de productos favoritos del usuario.
 *
 * Carga los IDs favoritos del usuario y los cruza con el listado completo
 * de productos para obtener sus datos completos.
 * Usado en {@link Favorite}.
 *
 * @param currentUserId - ID del usuario cuyos favoritos se muestran.
 * @returns `favorites` — productos marcados como favoritos,
 * `handleToggleFavorite` — quita el favorito y recarga la lista.
 */
export function useFavoriteProducts(currentUserId: string) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const load = useCallback(async () => {
    try {
      const [apiFavorites, apiAllProducts] = await Promise.all([
        favoritesService.getByUser(currentUserId),
        productsService.getAll(),
      ]);
      const favIds = new Set(apiFavorites.map(f => f.product_id));
      const favProducts = apiAllProducts
        .filter(p => favIds.has(p.product_id))
        .map(p => apiProductToProduct(p, favIds));
      setFavorites(favProducts);
    } catch {
      setFavorites([]);
    }
  }, [currentUserId]);

  useEffect(() => { load(); }, [load]);

  const handleToggleFavorite = useFavoriteToggle(currentUserId, load);

  return { favorites, handleToggleFavorite };
}
