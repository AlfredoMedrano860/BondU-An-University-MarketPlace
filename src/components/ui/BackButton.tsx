import { ChevronLeft } from "lucide-react";

/**
 * Props de BackButton.
 */
interface BackButtonProps {
  /** Se ejecuta al presionar el botón para navegar atrás. */
  onClick: () => void;
}

/**
 * Botón de navegación hacia atrás.
 *
 * Se ancla al borde izquierdo de la pantalla con borde redondeado solo a la derecha.
 * Usado en {@link AccountScreen}, {@link ProductScreen}, {@link ProductImagePicker}
 * y {@link MyProductsScreen}.
 *
 * @param onClick - Se ejecuta al presionar el botón para navegar atrás.
 */
function BackButton({ onClick }: BackButtonProps) {
  return (
    <button onClick={onClick} className="w-10 h-10 bg-aux rounded-r-xl flex items-center justify-center hover:opacity-80 active:scale-95 transition-all duration-150">
      <ChevronLeft size={20} strokeWidth={2.5} />
    </button>
  );
}

export default BackButton;