import { ChevronRight } from "lucide-react";
// En proceso, hay que descomponer

/**
 * Props de SettingRow.
 */
interface SettingRowProps {
  /** Ícono de lucide-react a mostrar en el lado izquierdo. */
  icon: React.ElementType;
  /** Texto descriptivo de la fila. */
  label: string;
  /** Se ejecuta al presionar la fila. Opcional si se usa solo como contenedor. */
  onClick?: () => void;
  /** Muestra borde inferior. Por defecto `true`. */
  border?: boolean;
  /** Aplica color rojo al ícono y texto para acciones destructivas. Por defecto `false`. */
  danger?: boolean;
  /** Elemento a mostrar en el lado derecho. Por defecto muestra un ChevronRight. */
  right?: React.ReactNode;
}

/**
 * Fila de configuración reutilizable.
 *
 * Usada en {@link SettingsScreen} para cada opción de ajustes.
 * Soporta íconos, texto, acciones destructivas y elementos personalizados
 * en el lado derecho como {@link Toggle} o botones de texto.
 *
 * @param icon - Ícono de lucide-react a mostrar.
 * @param label - Texto descriptivo de la fila.
 * @param onClick - Se ejecuta al presionar la fila.
 * @param border - Muestra borde inferior. Por defecto `true`.
 * @param danger - Aplica color rojo para acciones destructivas. Por defecto `false`.
 * @param right - Elemento personalizado en el lado derecho.
 */
export function SettingRow({ icon: Icon, label, onClick, border = true, danger = false, right }: SettingRowProps) {
  const textClass = danger ? "text-red-400" : "text-black";
  const iconClass = danger ? "text-red-400" : "text-black";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={`w-full flex items-center justify-between px-5 py-4 transition-colors duration-150 ${border ? "border-b border-gray-200" : ""} ${onClick ? "cursor-pointer hover:bg-gray-50" : ""}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={22} className={iconClass} />
        <span className={`text-sm font-medium ${textClass}`}>{label}</span>
      </div>

      {right ?? <ChevronRight size={18} className="text-gray-400" />}
    </div>
  );
}

/**
 * Props de SectionTitle.
 */
interface SectionTitleProps {
  /** Texto del título de sección. */
  title: string;
}

/**
 * Título de sección para agrupar filas en {@link SettingsScreen}.
 *
 * @param title - Texto del título de sección.
 */
export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pt-2">
      {title}
    </p>
  );
}

/**
 * Props de Toggle.
 */
interface ToggleProps {
  /** Estado actual del toggle. */
  value: boolean;
  /** Se ejecuta al presionar el toggle para invertir su estado. */
  onToggle: () => void;
}

/**
 * Switch de activar/desactivar para preferencias en {@link SettingsScreen}.
 *
 * Muestra un toggle animado que cambia de color según su estado.
 * Usado como prop `right` en {@link SettingRow}.
 *
 * @param value - Estado actual del toggle.
 * @param onToggle - Se ejecuta al presionar el toggle.
 */
export function Toggle({ value, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${value ? "bg-primary" : "bg-gray-300"}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}