/**
 * Props de CloseOrDelete.
 */
interface CloseOrDeleteProps {
  /** Título del diálogo. */
  title: string;
  /** Mensaje descriptivo de la acción que el usuario debe confirmar. */
  message: string;
  /** Texto del botón cancelar. */
  cancelText: string;
  /** Texto del botón confirmar. */
  confirmText: string;
  /** Color CSS del acento (fondo del ícono, bordes y franja inferior). */
  color: string;
  /** Ícono o símbolo a mostrar en el círculo superior. */
  icon?: string;
  /** Se ejecuta al cancelar o cerrar el diálogo. */
  onCancel: () => void;
  /** Se ejecuta al confirmar la acción destructiva. */
  onConfirm: () => void;
}

/**
 * Diálogo modal de confirmación para acciones destructivas.
 *
 * Muestra un overlay semitransparente con un card que incluye ícono,
 * título, mensaje y dos botones (cancelar y confirmar).
 * Usado en {@link SettingsScreen} para cerrar sesión y eliminar cuenta.
 *
 * @param title - Título del diálogo.
 * @param message - Descripción de la acción a confirmar.
 * @param cancelText - Texto del botón cancelar.
 * @param confirmText - Texto del botón confirmar.
 * @param color - Color CSS del acento del diálogo.
 * @param icon - Símbolo del ícono circular.
 * @param onCancel - Cierra el diálogo sin ejecutar la acción.
 * @param onConfirm - Ejecuta la acción destructiva.
 */
function CloseOrDelete({ title, message, cancelText, confirmText, color, icon, onCancel, onConfirm }: CloseOrDeleteProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-7">

      <div className="w-full max-w-sm bg-white border-[0.5px] border-black rounded-3xl overflow-hidden">

        <div className="flex flex-col items-center p-6 gap-4">

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>

          {title && (
            <h2 className="font-bold text-lg text-center">{title}</h2>
          )}

          <p className="text-gray-500 text-center">{message}</p>

          <button
            type="button"
            onClick={onCancel}
            className="w-[calc(100%-60px)] bg-white rounded-xl py-2 border-[0.5px] hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            style={{ color, borderColor: color }}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-[calc(100%-60px)] text-white rounded-xl py-2 hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            style={{ backgroundColor: color }}
          >
            {confirmText}
          </button>

        </div>

        <div className="h-8" style={{ backgroundColor: color }} />

      </div>

    </div>
  );
}

export default CloseOrDelete;
