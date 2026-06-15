import { ChevronRight } from "lucide-react";
import type { SettingsItem } from "../data/SettingsItem";

/**
 * Props de SettingsGroup.
 * @see SettingsItem
 */
interface SettingsGroupProps {
  /** Lista de items de configuración a mostrar. */
  items: SettingsItem[];
  /** Estado del modo oscuro para el toggle de tema. */
  darkMode?: boolean;
  /** Se ejecuta al presionar el toggle de tema. */
  onToggle?: () => void;
}

/**
 * Grupo de filas de configuración.
 *
 * Renderiza una lista de {@link SettingsItem} dentro de un card redondeado.
 * Cada item puede ser una fila navegable con ChevronRight o un toggle,
 * según el valor de `item.toggle`.
 *
 * @param items - Lista de items de configuración a mostrar.
 * @param darkMode - Estado del modo oscuro para el toggle de tema.
 * @param onToggle - Se ejecuta al presionar el toggle de tema.
 */
function SettingsGroup({ items, darkMode, onToggle }: SettingsGroupProps) {
  return (
    <div className="bg-white-app rounded-3xl overflow-hidden">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.label}
            className={`w-full flex items-center justify-between px-5 py-4 ${!isLast ? "border-b border-beige" : ""}`}
          >
            {/* Ícono y label */}
            <div className="flex items-center gap-3">
              <Icon size={22} className="text-black" />
              <span className="text-sm font-medium text-black">{item.label}</span>
            </div>

            {/* Toggle / chevron */}
            {item.toggle ? (
              <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${darkMode ? "bg-primary" : "bg-gray-300"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            ) : (
              <button onClick={item.onPress}>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SettingsGroup;