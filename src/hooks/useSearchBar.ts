import { useEffect, useMemo, useState } from "react";
import { createListCollection } from "@ark-ui/react";
import { getProducts, subscribeProducts } from "../components/data/ProductStore";
import type { Product } from "../components/data/Product";
import { normalize } from "../utils/string";

/**
 * Hook para gestionar el estado y el autocompletado de la barra de búsqueda.
 *
 * Se suscribe al store de productos para mantener las sugerencias actualizadas
 * y filtra por nombre normalizando tildes y mayúsculas.
 * Usado en {@link SearchBar}.
 *
 * @param onSearch - Callback que se ejecuta al confirmar la búsqueda con el término ingresado.
 * @returns `inputValue` — texto actual del campo,
 * `setInputValue` — actualiza el texto,
 * `collection` — colección de sugerencias para el Combobox de Ark UI,
 * `triggerSearch` — confirma la búsqueda con el término actual.
 */
export function useSearchBar(onSearch?: (term: string) => void) {
  const [allProducts, setAllProducts] = useState<Product[]>(getProducts());
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const unsub = subscribeProducts(() => setAllProducts(getProducts()));
    return unsub;
  }, []);

  const collection = useMemo(() => {
    const term = normalize(inputValue.trim());
    const items: Product[] = term
      ? allProducts.filter((p) => normalize(p.name).includes(term))
      : [];
    return createListCollection<Product>({
      items,
      itemToString: (item) => item.name,
      itemToValue: (item) => String(item.id),
    });
  }, [inputValue, allProducts]);

  /**
   * Confirma la búsqueda con el término actual si no está vacío.
   */
  function triggerSearch() {
    const term = inputValue.trim();
    if (term) onSearch?.(term);
  }

  return { inputValue, setInputValue, collection, triggerSearch };
}
