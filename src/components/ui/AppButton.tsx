/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "w-full rounded-full transition-all duration-150",
  {
    variants: {
      variant: {
        primary:   "bg-primary text-white font-bold text-sm h-12",
        secondary: "border-2 border-primary color-primary h-12 font-bold",
        aux:       "btn-aux text-white text-sm h-10",
      },
      disabled: {
        true:  "opacity-50 cursor-not-allowed",
        false: "cursor-pointer hover:opacity-90 active:scale-[0.98]",
      },
    },
    defaultVariants: { variant: "primary", disabled: false },
  }
);

/**
 * Props de AppButton.
 */
interface AppButtonProps extends VariantProps<typeof button> {
  /** Texto visible en el botón. */
  text: string;
  /** Clases extra de Tailwind para sobrescribir o extender estilos. */
  className?: string;
  /** Tipo HTML del botón. Por defecto `"button"`. */
  type?: "button" | "submit" | "reset";
  /** Handler de clic. */
  onClick?: () => void;
  /** Deshabilita el botón (p. ej. mientras se guarda). Por defecto `false`. */
  disabled?: boolean;
}

/**
 * Botón de ancho completo y bordes redondeados con variantes de color.
 *
 * @param text - Texto visible en el botón.
 * @param variant - Variante visual. Por defecto `"primary"`.
 * @param className - Clases extra de Tailwind.
 * @param type - Tipo HTML del botón. Por defecto `"button"`.
 * @param onClick - Handler de clic.
 * @param disabled - Deshabilita el botón. Por defecto `false`.
 */
function AppButton({ text, variant, className, type = "button", onClick, disabled = false }: AppButtonProps) {
  return (
    <button
      type={type}
      className={button({ variant, disabled, className })}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default AppButton;
