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
 */
function IconButton({ label, icon: Icon, onClick, iconPosition = "right" }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 bg-primary text-white text-xs font-bold tracking-wide rounded-full px-4 py-2 hover:opacity-90 active:scale-[0.98] transition-all duration-150"
    >
      {iconPosition === "left" && <Icon size={13} strokeWidth={2.5} />}
      {label}
      {iconPosition === "right" && <Icon size={13} strokeWidth={2.5} />}
    </button>
  );
}

export default IconButton;
