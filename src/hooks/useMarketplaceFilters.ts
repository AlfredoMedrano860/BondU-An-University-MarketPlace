import { useState } from "react";
import type { FilterValues } from "../components/data/Filters";

/**
 * Hook que gestiona el término de búsqueda y los filtros (estado, precio)
 * aplicados en la pantalla de Marketplace, y navega a esa pantalla al buscar
 * o aplicar filtros desde cualquier otro lado de la app.
 *
 * Usado en {@link App}.
 *
 * @param screen - Pantalla actual (evita un `navigate` redundante si ya se está en marketplace).
 * @param navigate - Navega a otra pantalla.
 * @returns `marketplaceSearch`/`setMarketplaceSearch` — término de búsqueda activo,
 * `appliedState`/`setAppliedState` — filtro de estado activo,
 * `appliedPrice`/`setAppliedPrice` — filtro de precio activo,
 * `handleSearch` — confirma una búsqueda y navega a marketplace,
 * `handleFilterApply` — aplica filtros nuevos y navega a marketplace.
 */
export function useMarketplaceFilters(screen: string, navigate: (screen: string) => void) {
  const [marketplaceSearch, setMarketplaceSearch] = useState("");
  const [appliedState, setAppliedState] = useState("");
  const [appliedPrice, setAppliedPrice] = useState(500);

  function handleSearch(term: string) {
    setMarketplaceSearch(term);
    if (screen !== "marketplace") navigate("marketplace");
  }

  function handleFilterApply({ state, price }: FilterValues) {
    setAppliedState(state);
    setAppliedPrice(price);
    navigate("marketplace");
  }

  return {
    marketplaceSearch, setMarketplaceSearch,
    appliedState, setAppliedState,
    appliedPrice, setAppliedPrice,
    handleSearch,
    handleFilterApply,
  };
}
