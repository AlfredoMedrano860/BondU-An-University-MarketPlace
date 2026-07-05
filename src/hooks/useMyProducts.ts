import { useState, useEffect, useCallback } from "react";
import type { Product } from "../components/data/Product";
import { usersService } from "../services/users";
import { apiProductToProduct } from "../utils/adapters";
import { useProductActions } from "./useProductActions";

/**
 * Hook que gestiona los productos publicados por el usuario autenticado.
 *
 * Usado en {@link MyProducts}.
 *
 * @param userId - ID del usuario cuyos productos se muestran.
 * @returns `userProducts` — productos del usuario,
 * `handleDelete` — elimina un producto de la lista y del backend,
 * `handleSell` — lo marca como vendido (permanece en la lista con status "Vendido").
 */
export function useMyProducts(userId: string) {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const { handleDelete, handleSell } = useProductActions(setUserProducts);

  const load = useCallback(async () => {
    try {
      const apiProducts = await usersService.getProducts(userId);
      setUserProducts(apiProducts.map(p => apiProductToProduct(p)));
    } catch {
      setUserProducts([]);
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  return { userProducts, handleDelete, handleSell };
}