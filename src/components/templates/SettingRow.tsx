/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";
import { ChevronRight } from "lucide-react";

const settingRow = cva(
  "w-full flex items-center justify-between px-5 py-4 transition-colors duration-150",
  {
    variants: {
      border:      { true: "border-b border-gray-200", false: "" },
      interactive: { true: "cursor-pointer hover:bg-gray-50", false: "" },
    },
    defaultVariants: { border: true, interactive: false },
  }
);

/**
 * Props de SettingRow.
 */
interface SettingRowProps {
  /** Ícono que se muestra a la izquierda de la fila. */
  icon: ElementType;
  /** Texto principal de la fila. */
  label: string;
  /** Si se provee, la fila se vuelve interactiva y llama a este callback al hacer clic. */
  onClick?: () => void;
  /** Si `true`, muestra un borde inferior. Por defecto `true`. */
  border?: boolean;
  /** Si `true`, colorea el ícono y el label en rojo. Por defecto `false`. */
  danger?: boolean;
  /** Elemento personalizado a la derecha. Si se omite, muestra un `ChevronRight`. */
  right?: ReactNode;
}

/**
 * Fila reutilizable para listas de ajustes.
 *
 * Si recibe `onClick`, actúa como botón con hover y soporte de teclado.
 * El slot `right` permite pasar un `Toggle`, un badge u otro elemento.
 * Usada en {@link SettingsScreen}.
 *
 * @param icon - Ícono de la fila.
 * @param label - Texto principal.
 * @param onClick - Handler opcional que activa el modo interactivo.
 * @param border - Muestra borde inferior. Por defecto `true`.
 * @param danger - Activa el color rojo. Por defecto `false`.
 * @param right - Elemento derecho personalizado.
 */
export function SettingRow({ icon: Icon, label, onClick, border = true, danger = false, right }: SettingRowProps) {
  const colorClass = danger ? "text-red-400" : "text-black";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={settingRow({ border, interactive: !!onClick })}
    >
      <div className="flex items-center gap-3">
        <Icon size={22} className={colorClass} />
        <span className={`text-sm font-medium ${colorClass}`}>{label}</span>
      </div>

      {right ?? <ChevronRight size={18} className="text-gray-400" />}
    </div>
  );
}
