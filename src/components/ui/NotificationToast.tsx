import { useEffect } from "react";
import { X } from "lucide-react";
import type { AppNotification } from "../data/NotificationStore";
import { notificationColors } from "../data/NotificationStore";

/**
 * Props de NotificationToast.
 */
interface NotificationToastProps {
  /** Notificación a mostrar. */
  notification: AppNotification;
  /** Se ejecuta al cerrar el toast, ya sea manual o automáticamente. */
  onDismiss: (id: number) => void;
}

/**
 * Toast individual de notificación con cierre automático a los 5 segundos.
 *
 * El color de la barra lateral izquierda refleja el tipo de notificación
 * según {@link notificationColors}. Usado en {@link NotificationContainer}.
 *
 * @param notification - Datos de la notificación a mostrar.
 * @param onDismiss - Callback para cerrar el toast por ID.
 */
function NotificationToast({ notification, onDismiss }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div className="flex bg-white-app rounded-2xl shadow-md overflow-hidden w-80">
      <div className="w-1.5 shrink-0 rounded-l-2xl" style={{ backgroundColor: notificationColors[notification.type] }} />
      <div className="flex flex-col gap-1 px-4 py-3 flex-1 min-w-0">
        <p className="font-bold text-sm color-secondary">{notification.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{notification.message}</p>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="p-3 text-gray-400 hover:text-gray-600 self-start transition-colors shrink-0"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default NotificationToast;
