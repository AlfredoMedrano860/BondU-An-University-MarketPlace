import { useEffect, useMemo, useState } from "react";
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
 * `suggestions` — productos filtrados según el término actual,
 * `triggerSearch` — confirma la búsqueda con el término actual.
 */
export function useSearchBar(onSearch?: (term: string) => void) {
  const [allProducts, setAllProducts] = useState<Product[]>(getProducts());
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const unsub = subscribeProducts(() => setAllProducts(getProducts()));
    return unsub;
  }, []);

  const suggestions = useMemo(() => {
    const term = normalize(inputValue.trim());
    return term.length >= 2 ? allProducts.filter((p) => normalize(p.name).includes(term)) : [];
  }, [inputValue, allProducts]);

  function triggerSearch() {
    const term = inputValue.trim();
    if (term) onSearch?.(term);
  }

  return { inputValue, setInputValue, suggestions, triggerSearch };
}
