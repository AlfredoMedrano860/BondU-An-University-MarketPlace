import { MagnifyingGlassIcon, SlidersIcon } from "@phosphor-icons/react";

/**
 * Barra de búsqueda con botón de filtros.
 *
 * Muestra un input de texto con ícono de lupa y un botón de filtros.
 * Actualmente sin funcionalidad — pendiente de implementar búsqueda y filtros.
 * Usada en {@link AppHeader}.
 *
 * @deprecated Reemplazar el input por un componente reutilizable con lógica de búsqueda.
 */
function SearchBar() {
  return (
    <div className="flex items-center gap-3 mt-4">

      {/* Input de búsqueda ── reemplazar por componente con lógica */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-12 rounded-full pl-5 pr-14 bg-search text-black"
        />
        <div className="cursor-pointer absolute right-0 top-0 h-12 w-12 bg-secondary rounded-full flex items-center justify-center">
          <MagnifyingGlassIcon size={20} color="white" weight="bold" />
        </div>
      </div>

      {/* Botón de filtros ── funcionalidad pendiente */}
      <div className="w-12 h-12 bg-aux rounded-full flex items-center justify-center cursor-pointer">
        <SlidersIcon size={25} color="white" weight="bold" />
      </div>

    </div>
  );
}

export default SearchBar;