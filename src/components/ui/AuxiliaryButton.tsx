/**
 * Props de AuxiliaryButton.
 */
interface AuxiliaryButtonProps {
  /** Texto del botón. Por defecto "COMPRAR". */
  text?: string;
  /** Se ejecuta al presionar el botón. */
  onClick?: () => void;
}

/**
 * Botón auxiliar de color amarillo.
 *
 * Usado como acción secundaria en {@link ProductCard} y {@link ProductForm}.
 * El estilo se define en la clase `btn-aux` de `_colors.css`.
 *
 * @param text - Texto del botón. Por defecto "COMPRAR".
 * @param onClick - Se ejecuta al presionar el botón.
 */
function AuxiliaryButton({ text = "COMPRAR", onClick }: AuxiliaryButtonProps) {
  return (
    <button onClick={onClick} className="btn-aux w-full h-10 rounded-full text-white text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150">
      {text}
    </button>
  );
}

export default AuxiliaryButton;