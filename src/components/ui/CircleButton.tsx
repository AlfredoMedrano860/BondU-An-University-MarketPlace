import type { ReactNode, MouseEvent } from "react";
import { circleButtonSizes, circleButtonVariants } from "../data/CircleButtonData";
import type { CircleButtonSize, CircleButtonVariant } from "../data/CircleButtonData";

type Size    = CircleButtonSize["name"];
type Variant = CircleButtonVariant["name"];

/** Props del componente {@link CircleButton}. */
interface CircleButtonProps {
  /** Ícono u otro contenido a mostrar centrado dentro del botón. */
  children: ReactNode;
  /** Tamaño del botón. Por defecto `"lg"` (48px). */
  size?: Size;
  /** Variante de color. Por defecto `"primary"`. */
  variant?: Variant;
  /** Si es `true`, agrega `shrink-0` para evitar que flex comprima el botón. */
  shrink?: boolean;
  /** Clases extra de Tailwind para sobrescribir o extender estilos. */
  className?: string;
  /** Tipo HTML del botón. Por defecto `"button"`. */
  type?: "button" | "submit" | "reset";
  /** Handler de clic. */
  onClick?: () => void;
  /**
   * Handler de mousedown. Necesario en {@link SearchBar} para evitar que el
   * input pierda el foco antes de ejecutar la acción del botón.
   */
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Botón circular con ícono, variantes de color y tamaños predefinidos.
 * Los estilos se leen de {@link circleButtonSizes} y {@link circleButtonVariants}
 * para mantener una sola fuente de verdad para las clases CSS.
 */
function CircleButton({
  children,
  size = "lg",
  variant = "primary",
  shrink = false,
  className = "",
  type = "button",
  onClick,
  onMouseDown,
}: CircleButtonProps) {
  const sizeClass    = circleButtonSizes.find(s => s.name === size)?.className ?? "";
  const variantClass = circleButtonVariants.find(v => v.name === variant)?.className ?? "";
  return (
    <button
      type={type}
      className={`${sizeClass} ${variantClass} ${shrink ? "shrink-0" : ""} rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-150 ${className}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  );
}

export default CircleButton;
