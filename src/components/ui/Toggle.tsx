/**
 * Props de Toggle.
 */
interface ToggleProps {
  /** Estado actual del toggle. */
  value: boolean;
  /** Se ejecuta al hacer clic para alternar el estado. */
  onToggle: () => void;
}

/**
 * Interruptor de encendido/apagado estilo iOS.
 * Usada como slot `right` de {@link SettingRow}.
 *
 * @param value - Estado actual.
 * @param onToggle - Callback al alternar.
 */
export default function Toggle({ value, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${value ? "bg-primary" : "bg-gray-300"}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}
