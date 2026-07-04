import { useState, useEffect, useCallback } from "react";
import type { Product } from "../components/data/Product";
import type { Review } from "../components/data/Review";
import { usersService } from "../services/users";
import { apiProductToProduct, apiReviewToReview } from "../utils/adapters";
import { useProductActions } from "./useProductActions";

// ANTES: useProfileData(userId: number)
// AHORA:  useProfileData(userId: string)
export function useProfileData(userId: string) {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [reviews,      setReviews]      = useState<Review[]>([]);
  const [salesCount,   setSalesCount]   = useState<number>(0);
  const { handleDelete, handleSell } = useProductActions(setUserProducts);

  const reload = useCallback(async () => {
    try {
      // Los 3 requests en PARALELO: más rápido que uno a la vez
      const [apiProducts, apiReviews, stats] = await Promise.all([
        usersService.getProducts(userId),
        usersService.getReviews(userId),
        usersService.getStats(userId).catch(() => null),  // no crítico si falla
      ]);
      setUserProducts(apiProducts.map(p => apiProductToProduct(p)));
      setReviews(apiReviews.map(r => apiReviewToReview(r)));
      if (stats) setSalesCount(stats.sales_count ?? 0);
    } catch {
      setUserProducts([]);
      setReviews([]);
    }
  }, [userId]);

  useEffect(() => { reload(); }, [reload]);

  // Al vender, actualiza el conteo de ventas además de quitar el producto
  async function handleSellAndRefresh(product: Product) {
    await handleSell(product);
    usersService.getStats(userId)
      .then(s => setSalesCount(s.sales_count ?? 0))
      .catch(() => {});
  }

  return {
    userProducts,
    reviews,
    salesCount,
    handleDelete,
    handleSell: handleSellAndRefresh,
    reload,
  };
}