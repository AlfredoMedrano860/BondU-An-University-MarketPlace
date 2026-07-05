import type { LucideIcon } from "lucide-react";

/**
 * Props de IconButton.
 */
interface IconButtonProps {
  /** Texto visible del botón. */
  label: string;
  /** Ícono de Lucide que acompaña al texto. */
  icon: LucideIcon;
  /** Función ejecutada al hacer clic. */
  onClick?: () => void;
  /** Posición del ícono respecto al texto. Por defecto `"right"`. */
  iconPosition?: "left" | "right";
  /** Deshabilita el botón (p. ej. mientras se envía). Por defecto `false`. */
  disabled?: boolean;
}

/**
 * Botón compacto con ícono de Lucide para acciones en línea.
 *
 * El ícono puede posicionarse a la izquierda o derecha del texto.
 * Usado en {@link ReviewForm}.
 *
 * @param label - Texto visible del botón.
 * @param icon - Ícono de Lucide a renderizar.
 * @param onClick - Handler del clic.
 * @param iconPosition - Posición del ícono respecto al texto. Por defecto `"right"`.
 * @param disabled - Deshabilita el botón. Por defecto `false`.
 */
function IconButton({ label, icon: Icon, onClick, iconPosition = "right", disabled = false }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 bg-primary text-white text-xs font-bold tracking-wide rounded-full px-4 py-2 transition-all duration-150 ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 active:scale-[0.98]"}`}
    >
      {iconPosition === "left" && <Icon size={13} strokeWidth={2.5} />}
      {label}
      {iconPosition === "right" && <Icon size={13} strokeWidth={2.5} />}
    </button>
  );
}

export default IconButton;
