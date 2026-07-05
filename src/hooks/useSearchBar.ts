import { useEffect, useState } from "react";
import type { Product } from "../components/data/Product";
import { productsService } from "../services/products";
import { apiProductToProduct } from "../utils/adapters";
import { normalize } from "../utils/string";

/**
 * Hook para gestionar el estado y el autocompletado de la barra de búsqueda.
 *
 * Carga los productos del backend cada vez que el término cambia (para no mostrar
 * resultados desactualizados si se publicó un producto nuevo), y filtra por nombre
 * normalizando tildes y mayúsculas. Usado en {@link SearchBar}.
 *
 * @param onSearch - Callback que se ejecuta al confirmar la búsqueda con el término ingresado.
 * @returns `inputValue` — texto actual del campo,
 * `setInputValue` — actualiza el texto,
 * `suggestions` — productos filtrados según el término actual,
 * `triggerSearch` — confirma la búsqueda con el término actual.
 */
export function useSearchBar(onSearch?: (term: string) => void) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    const term = normalize(inputValue.trim());
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    productsService.getAll()
      .then(apiProducts => {
        if (cancelled) return;
        const products = apiProducts.map(p => apiProductToProduct(p));
        setSuggestions(products.filter(p => normalize(p.name).includes(term)));
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [inputValue]);

  function triggerSearch() {
    const term = inputValue.trim();
    if (term) onSearch?.(term);
  }

  return { inputValue, setInputValue, suggestions, triggerSearch };
}
