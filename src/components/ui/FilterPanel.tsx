import type { CSSProperties } from "react";
import Filters from "./Filters";
import type { FilterValues } from "../data/Filters";

/**
 * Props de FilterPanel.
 */
interface FilterPanelProps {
  /** Controla si el panel está abierto. */
  open: boolean;
  /** Distancia desde arriba (en px) para el dropdown en desktop. Ignorado en móvil. */
  topOffset: number;
  /** Estado del filtro con el que se abre el panel. */
  initialState: string;
  /** Precio máximo del filtro con el que se abre el panel. */
  initialPrice: number;
  /** Se ejecuta al aplicar los filtros. */
  onApply: (filters: FilterValues) => void;
  /** Se ejecuta al cerrar el panel (backdrop, botón cerrar, o al aplicar). */
  onClose: () => void;
}

/**
 * Panel de filtros con animación de entrada/salida, mostrado sobre un backdrop.
 *
 * Un solo elemento que se comporta como bottom sheet en móvil y como dropdown
 * anclado bajo el botón de filtros en desktop, alternando con los prefijos
 * responsive de Tailwind (`md:`) — no hay ninguna rama de JavaScript para
 * decidir el layout. `topOffset` se pasa como variable CSS (`--top-offset`)
 * y solo se usa en el breakpoint `md:`, así que en móvil no interfiere con
 * el posicionamiento `bottom-0`.
 *
 * El panel permanece siempre en el DOM; cuando `open` es `false` queda
 * invisible y con `pointer-events-none` (no bloquea clics), y las
 * transiciones de Tailwind animan la entrada/salida solo con CSS.
 * Usado en {@link AppShellLayout}.
 *
 * @param open - Controla si el panel está abierto.
 * @param topOffset - Distancia desde arriba para el dropdown en desktop.
 * @param initialState - Estado del filtro con el que se abre el panel.
 * @param initialPrice - Precio máximo con el que se abre el panel.
 * @param onApply - Se ejecuta al aplicar los filtros.
 * @param onClose - Se ejecuta al cerrar el panel.
 */
function FilterPanel({ open, topOffset, initialState, initialPrice, onApply, onClose }: FilterPanelProps) {
  return (
    <>
      {/* Backdrop — oscuro en móvil, transparente en desktop (solo para cerrar al hacer clic afuera) */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:bg-transparent ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Móvil: bottom sheet que sube desde abajo · Desktop (md+): dropdown que baja bajo el header */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ease-out
          md:inset-x-auto md:bottom-auto md:right-16 md:top-(--top-offset) md:w-80 lg:right-20
          ${open
            ? "translate-y-0 md:opacity-100"
            : "translate-y-full md:opacity-0 md:-translate-y-3 pointer-events-none"}`}
        style={{ "--top-offset": `${topOffset}px` } as CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <Filters
          // Remonta en cada apertura para descartar cambios sin aplicar de la vez anterior.
          key={open ? "open" : "closed"}
          initialState={initialState}
          initialPrice={initialPrice}
          onApply={onApply}
          onClose={onClose}
          className="rounded-t-3xl rounded-b-none md:rounded-3xl"
        />
      </div>
    </>
  );
}

export default FilterPanel;
