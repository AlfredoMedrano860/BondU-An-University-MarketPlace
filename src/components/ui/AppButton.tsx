import { appButtonVariants } from "../data/AppButtonData";
import type { AppButtonVariant } from "../data/AppButtonData";

type Variant = AppButtonVariant["name"];

/** Props del componente {@link AppButton}. */
interface AppButtonProps {
  /** Texto visible en el botón. */
  text: string;
  /** Variante visual. Por defecto `"primary"`. */
  variant?: Variant;
  /** Clases extra de Tailwind para sobrescribir o extender estilos. */
  className?: string;
  /** Tipo HTML del botón. Por defecto `"button"`. */
  type?: "button" | "submit" | "reset";
  /** Handler de clic. */
  onClick?: () => void;
}

/**
 * Botón de ancho completo y bordes redondeados con variantes de color.
 * Los estilos de cada variante se leen de {@link appButtonVariants} para
 * mantener una sola fuente de verdad para las clases CSS.
 */
function AppButton({ text, variant = "primary", className = "", type = "button", onClick }: AppButtonProps) {
  const variantClass = appButtonVariants.find(v => v.name === variant)?.className ?? "";
  return (
    <button
      type={type}
      className={`w-full rounded-full cursor-pointer ${variantClass} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default AppButton;
