/**
 * Props de PrimaryButton.
 */
interface PrimaryButtonProps {
  /** Texto del botón. */
  text: string;
  /** Se ejecuta al presionar el botón. */
  onClick?: () => void;
}

/**
 * Botón principal de color verde primario.
 *
 * Usado como acción principal en formularios y pantallas de autenticación.
 * El color se define en la clase `bg-primary` de `_colors.css`.
 *
 * @param text - Texto del botón.
 * @param onClick - Se ejecuta al presionar el botón.
 */
function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <button onClick={onClick} className="w-full h-12 bg-primary text-white font-bold text-sm rounded-full cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all duration-150">
      {text}
    </button>
  );
}

export default PrimaryButton;