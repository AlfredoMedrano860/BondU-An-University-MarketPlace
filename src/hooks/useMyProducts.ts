import { useState, useEffect, useCallback } from "react";
import type { Product } from "../components/data/Product";
import { usersService } from "../services/users";
import { apiProductToProduct } from "../utils/adapters";
import { useProductActions } from "./useProductActions";

// ANTES: useMyProducts(userId: number)
// AHORA:  useMyProducts(userId: string)
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