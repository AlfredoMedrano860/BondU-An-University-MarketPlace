/**
 * Props de SecondaryButton.
 */
interface SecondaryButtonProps {
  /** Texto del botón. */
  text: string;
  /** Se ejecuta al presionar el botón. */
  onClick?: () => void;
}

/**
 * Botón secundario con borde y texto en color primario.
 *
 * Usado como acción secundaria junto a {@link PrimaryButton}.
 * A diferencia del primario, tiene fondo transparente con borde.
 * El color se define en `border-primary` y `color-primary` de `_colors.css`.
 *
 * @param text - Texto del botón.
 * @param onClick - Se ejecuta al presionar el botón.
 */
function SecondaryButton({ text, onClick }: SecondaryButtonProps) {
  return (
    <button onClick={onClick} className="w-full h-12 border-2 border-primary color-primary rounded-full font-bold cursor-pointer">
      {text}
    </button>
  );
}

export default SecondaryButton;