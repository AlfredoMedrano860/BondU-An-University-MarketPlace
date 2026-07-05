/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode, MouseEvent } from "react";

const circleButton = cva(
  "rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-150",
  {
    variants: {
      variant: {
        primary:   "bg-primary",
        secondary: "bg-secondary",
        aux:       "bg-aux",
        danger:    "bg-red-500",
        ghost:     "hover:bg-white/20",
      },
      size: {
        sm: "w-7 h-7",
        md: "w-8 h-8",
        lg: "w-12 h-12",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  }
);

/**
 * Props de CircleButton.
 */
interface CircleButtonProps extends VariantProps<typeof circleButton> {
  /** Contenido del botón, típicamente un ícono. */
  children: ReactNode;
  /** Si `true`, agrega `shrink-0` para que no se comprima en un contenedor flex. Por defecto `false`. */
  shrink?: boolean;
  /** Clases extra de Tailwind. */
  className?: string;
  /** Tipo HTML del botón. Por defecto `"button"`. */
  type?: "button" | "submit" | "reset";
  /** Handler de clic. */
  onClick?: () => void;
  /** Handler de `mousedown`, útil para prevenir el default (p. ej. evitar que un input pierda el foco). */
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Botón circular con variantes de color y tamaño.
 * Usado en {@link SearchBar}, {@link Filters}, {@link ShareTab}, {@link ProductCard},
 * {@link AppHeader} y {@link Profile}.
 *
 * @param children - Contenido del botón, típicamente un ícono.
 * @param variant - Variante de color. Por defecto `"primary"`.
 * @param size - Tamaño del botón. Por defecto `"lg"`.
 * @param shrink - Evita que se comprima en un contenedor flex.
 * @param className - Clases extra de Tailwind.
 * @param type - Tipo HTML del botón. Por defecto `"button"`.
 * @param onClick - Handler de clic.
 * @param onMouseDown - Handler de `mousedown`.
 */
function CircleButton({
  children,
  variant,
  size,
  shrink = false,
  className,
  type = "button",
  onClick,
  onMouseDown,
}: CircleButtonProps) {
  return (
    <button
      type={type}
      className={circleButton({ variant, size, className: `${shrink ? "shrink-0" : ""} ${className ?? ""}` })}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  );
}

export default CircleButton;
