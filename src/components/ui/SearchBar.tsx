import { useTranslation } from "react-i18next";
import { Combobox } from "@ark-ui/react/combobox";
import { MagnifyingGlassIcon, SlidersIcon } from "@phosphor-icons/react";
import { useSearchBar } from "../../hooks/useSearchBar";
import type { Product } from "../data/Product";

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
 * Usa el Combobox de Ark UI para mostrar sugerencias mientras el usuario escribe.
 * La lógica de estado y filtrado está en {@link useSearchBar}.
 * Usado en {@link AppHeader}.
 *
 * @param onSearch - Callback con el término de búsqueda confirmado.
 */
export default function SearchBar({ onSearch }: SearchBarProps) {
  const { t } = useTranslation();
  const { inputValue, setInputValue, collection, triggerSearch } = useSearchBar(onSearch);

  return (
    <div className="flex items-center gap-3 mt-4 md:mt-0 md:flex-1">

      <div className="flex-1">
        <Combobox.Root<Product>
          collection={collection}
          inputValue={inputValue}
          onInputValueChange={({ inputValue: v }) => setInputValue(v)}
          onValueChange={({ items }) => {
            if (items[0]) setInputValue(items[0].name);
          }}
          selectionBehavior="preserve"
          openOnChange={({ inputValue: v }) => v.trim().length > 0}
        >
          <Combobox.Context>
            {(api) => (
              <>
                <Combobox.Control className="relative">
                  <Combobox.Input
                    placeholder={t("search.placeholder")}
                    className="w-full h-12 rounded-full pl-5 pr-14 bg-search text-black outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Tab" && api.highlightedValue) {
                        e.preventDefault();
                        api.selectValue(api.highlightedValue);
                      }
                      if (e.key === "Enter") {
                        api.setOpen(false);
                        triggerSearch();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      api.setOpen(false);
                      triggerSearch();
                    }}
                    className="absolute right-0 top-0 h-12 w-12 bg-secondary rounded-full flex items-center justify-center"
                  >
                    <MagnifyingGlassIcon size={20} color="white" weight="bold" />
                  </button>
                </Combobox.Control>

                <Combobox.Positioner style={{ zIndex: 50, width: "var(--reference-width)" }}>
                  <Combobox.Content className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-2">
                    <Combobox.Empty className="px-4 py-4 text-sm text-gray-400 text-center">
                      {t("search.noResults")}
                    </Combobox.Empty>
                    <Combobox.ItemGroup>
                      {collection.items.map((item) => (
                        <Combobox.Item
                          key={item.id}
                          item={item}
                          className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors data-highlighted:bg-gray-50"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <Combobox.ItemText className="text-sm font-semibold text-gray-800 block truncate">
                              {item.name}
                            </Combobox.ItemText>
                            <p className="text-xs color-primary font-bold">${item.price}</p>
                          </div>
                        </Combobox.Item>
                      ))}
                    </Combobox.ItemGroup>
                  </Combobox.Content>
                </Combobox.Positioner>
              </>
            )}
          </Combobox.Context>
        </Combobox.Root>
      </div>

      <div className="w-12 h-12 bg-aux rounded-full flex items-center justify-center cursor-pointer shrink-0">
        <SlidersIcon size={25} color="white" weight="bold" />
      </div>

    </div>
  );
}
