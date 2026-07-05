import { useState, useEffect, useCallback } from "react";
import type { Product } from "../components/data/Product";
import { productsService } from "../services/products";
import { favoritesService } from "../services/favorites";
import { apiProductToProduct } from "../utils/adapters";
import { useFavoriteToggle } from "./useFavoriteToggle";

/**
 * Hook que gestiona los productos destacados de Home.
 *
 * Carga todos los productos y los favoritos del usuario en paralelo,
 * excluyendo los productos publicados por el propio usuario.
 * Usado en {@link Home}.
 *
 * @param currentUserId - ID del usuario actual; sus productos se excluyen del listado.
 * @returns `products` — productos de otros usuarios listos para mostrar,
 * `handleToggleFavorite` — alterna favorito y recarga la lista.
 */
export function useHomeProducts(currentUserId: string) {
  const [products, setProducts] = useState<Product[]>([]);

  const load = useCallback(async () => {
    try {
      const [apiProducts, apiFavorites] = await Promise.all([
        productsService.getAll(),
        favoritesService.getByUser(currentUserId),
      ]);

      const favIds = new Set(apiFavorites.map(f => f.product_id));
      const others = apiProducts
        .filter(p => p.seller_id !== currentUserId)
        .map(p => apiProductToProduct(p, favIds));

      setProducts(others);
    } catch {
      // Falla en silencio: la UI ya muestra el estado vacío cuando `products` queda sin datos
    }
  }, [currentUserId]);

  useEffect(() => { load(); }, [load]);

  const handleToggleFavorite = useFavoriteToggle(currentUserId, load);

  return { products, handleToggleFavorite };
}
