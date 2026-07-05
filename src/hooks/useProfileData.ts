import { useState, useEffect, useCallback } from "react";
import type { Product } from "../components/data/Product";
import type { Review } from "../components/data/Review";
import { usersService } from "../services/users";
import { favoritesService } from "../services/favorites";
import { apiProductToProduct, apiReviewToReview } from "../utils/adapters";
import { useProductActions } from "./useProductActions";
import { useFavoriteToggle } from "./useFavoriteToggle";

/**
 * Hook que gestiona los datos del perfil de un usuario: productos, reseñas y ventas.
 *
 * Usado en {@link Profile}.
 *
 * @param userId - ID del usuario cuyo perfil se muestra.
 * @param viewerId - ID del usuario autenticado que navega el perfil. Si se pasa
 * y es distinto de `userId`, se calcula cuáles de esos productos ya tiene en
 * favoritos y se habilita `handleToggleFavorite` para marcarlos/desmarcarlos.
 * @returns `userProducts` — productos del usuario, `reviews` — reseñas recibidas,
 * `salesCount` — total de ventas, `handleDelete` — elimina un producto,
 * `handleSell` — lo marca como vendido (permanece en la lista) y actualiza el conteo de ventas,
 * `handleToggleFavorite` — alterna favorito (solo si se pasó `viewerId`),
 * `reload` — vuelve a cargar todos los datos.
 */
export function useProfileData(userId: string, viewerId?: string) {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [reviews,      setReviews]      = useState<Review[]>([]);
  const [salesCount,   setSalesCount]   = useState<number>(0);
  const { handleDelete, handleSell } = useProductActions(setUserProducts);

  const reload = useCallback(async () => {
    try {
      // Los requests en PARALELO: más rápido que uno a la vez
      const [apiProducts, apiReviews, stats, favorites] = await Promise.all([
        usersService.getProducts(userId),
        usersService.getReviews(userId),
        usersService.getStats(userId).catch(() => null),  // no crítico si falla
        viewerId ? favoritesService.getByUser(viewerId).catch(() => []) : Promise.resolve([]),
      ]);
      const favoriteIds = new Set(favorites.map(f => f.product_id));
      setUserProducts(apiProducts.map(p => apiProductToProduct(p, favoriteIds)));
      setReviews(apiReviews.map(r => apiReviewToReview(r)));
      if (stats) setSalesCount(stats.sales_count ?? 0);
    } catch {
      setUserProducts([]);
      setReviews([]);
    }
  }, [userId, viewerId]);

  useEffect(() => { reload(); }, [reload]);

  // Al vender, además de actualizar su status, refresca el conteo de ventas
  async function handleSellAndRefresh(product: Product) {
    await handleSell(product);
    usersService.getStats(userId)
      .then(s => setSalesCount(s.sales_count ?? 0))
      .catch(() => {});
  }

  const handleToggleFavorite = useFavoriteToggle(viewerId ?? "", reload);

  return {
    userProducts,
    reviews,
    salesCount,
    handleDelete,
    handleSell: handleSellAndRefresh,
    handleToggleFavorite,
    reload,
  };
}