/**
 * Props de NavigationTabs.
 */
interface NavigationTabsProps {
  /** Etiquetas de las pestañas. */
  labels: string[];
  /** Índice de la pestaña activa. */
  selected: number;
  /** Se ejecuta al cambiar de pestaña. */
  onSelect: (index: number) => void;
  /** Clases adicionales del contenedor. */
  className?: string;
}

/**
 * Barra de pestañas reutilizable con indicador de pestaña activa.
 *
 * Usado en {@link ProfileTabs} y {@link ProductTabs}.
 *
 * @param labels - Etiquetas de las pestañas.
 * @param selected - Índice activo.
 * @param onSelect - Handler de cambio de pestaña.
 * @param className - Clases adicionales del contenedor.
 */
function NavigationTabs({ labels, selected, onSelect, className = "" }: NavigationTabsProps) {
  return (
    <div className={`flex ${className}`}>
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(index)}
          className={`relative px-5 py-3 text-sm font-semibold transition-colors rounded-t-sm ${
            selected === index
              ? "color-primary"
              : "text-gray-500 hover:bg-neutral-100 hover:text-gray-700"
          }`}
        >
          {label}
          {selected === index && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}

export default NavigationTabs;
