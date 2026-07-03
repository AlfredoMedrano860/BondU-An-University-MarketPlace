import { Command } from "cmdk";
import type { ReactNode } from "react";

/**
 * Props de ComboboxList.
 */
interface ComboboxListProps<T> {
  /** Items a mostrar en la lista. */
  items: readonly T[];
  /** Extrae la key de React de cada item. */
  getKey: (item: T) => string;
  /** Extrae el valor de texto que usa cmdk para el resaltado por teclado. */
  getValue: (item: T) => string;
  /** Se ejecuta al seleccionar un item (clic o Enter). */
  onSelect: (item: T) => void;
  /** Mensaje a mostrar cuando `items` está vacío. Si se omite, no se renderiza nada en ese caso. */
  emptyMessage?: string;
  /** Renderiza el contenido de cada item (debe incluir su propio padding). */
  children: (item: T) => ReactNode;
}

/**
 * Panel desplegable de opciones sobre `cmdk`, con el estilo de tarjeta blanca
 * redondeada usado en toda la app (fondo, sombra, borde, resaltado al pasar el mouse).
 *
 * Debe renderizarse dentro de un `<Command>` de cmdk (junto al trigger, ya sea
 * un `Command.Input` de búsqueda o un botón simple). Usado en {@link SearchBar}
 * y en el selector de estado de {@link ProductForm}.
 *
 * @param items - Items a listar.
 * @param getKey - Key de React por item.
 * @param getValue - Valor de texto para el resaltado de cmdk.
 * @param onSelect - Callback al seleccionar un item.
 * @param emptyMessage - Mensaje para lista vacía.
 * @param children - Render del contenido de cada item.
 */
export default function ComboboxList<T>({ items, getKey, getValue, onSelect, emptyMessage, children }: ComboboxListProps<T>) {
  return (
    <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white-app rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <Command.List>
        {emptyMessage && (
          <Command.Empty className="px-4 py-4 text-sm text-gray-400 text-center">
            {emptyMessage}
          </Command.Empty>
        )}
        {items.map((item) => (
          <Command.Item
            key={getKey(item)}
            value={getValue(item)}
            onSelect={() => onSelect(item)}
            className="cursor-pointer transition-colors aria-selected:bg-black/5"
          >
            {children(item)}
          </Command.Item>
        ))}
      </Command.List>
    </div>
  );
}
