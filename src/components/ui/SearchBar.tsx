import { Command } from "cmdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useSearchBar } from "../../hooks/useSearchBar";
import CircleButton from "./CircleButton";
import ComboboxList from "./ComboboxList";

/**
 * Props de SearchBar.
 */
interface SearchBarProps {
  /** Callback que recibe el término confirmado al buscar. */
  onSearch?: (term: string) => void;
}

/**
 * Barra de búsqueda con autocompletado de productos.
 *
 * Usa cmdk para mostrar sugerencias mientras el usuario escribe.
 * La lógica de estado y filtrado está en {@link useSearchBar}.
 * Usado en {@link AppHeader}.
 *
 * @param onSearch - Callback con el término de búsqueda confirmado.
 */
export default function SearchBar({ onSearch }: SearchBarProps) {
  const { t } = useTranslation();
  const { inputValue, setInputValue, suggestions, triggerSearch } = useSearchBar(onSearch);
  const [open, setOpen] = useState(false);

  function handleInputChange(value: string) {
    setInputValue(value);
    setOpen(value.trim().length >= 2);
  }

  function confirmSearch() {
    triggerSearch();
    setOpen(false);
  }

  function selectSuggestion(name: string) {
    setInputValue(name);
    setOpen(false);
  }

  return (
    <div className="flex-1 relative">
        <Command shouldFilter={false}>

          <div className="relative">
            <Command.Input
              value={inputValue}
              onValueChange={handleInputChange}
              placeholder={t("search.placeholder")}
              className="w-full h-12 rounded-full pl-5 pr-14 bg-search text-black outline-none"
              onKeyDown={(e) => { if (e.key === "Enter") confirmSearch(); }}
            />
            <CircleButton
              variant="secondary"
              onMouseDown={(e) => e.preventDefault()}
              onClick={confirmSearch}
              className="absolute right-0 top-0"
            >
              <MagnifyingGlassIcon size={20} color="white" weight="bold" />
            </CircleButton>
          </div>

          {open && (
            <ComboboxList
              items={suggestions}
              getKey={(item) => item.id}
              getValue={(item) => item.name}
              onSelect={(item) => selectSuggestion(item.name)}
              emptyMessage={t("search.noResults")}
            >
              {(item) => (
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs color-primary font-bold">${item.price}</p>
                  </div>
                </div>
              )}
            </ComboboxList>
          )}

        </Command>
    </div>
  );
}
