/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva } from "class-variance-authority";
import { useEffect } from "react";
import { X } from "lucide-react";
import { dismissNotification, type AppNotification } from "../data/NotificationStore";

const toastAccent = cva("w-1.5 shrink-0 rounded-l-2xl", {
  variants: {
    type: {
      error:   "bg-red-600",
      warning: "bg-amber-600",
      success: "bg-primary",
      info:    "bg-blue-600",
    },
  },
});

/**
 * Props de NotificationToast.
 */
interface NotificationToastProps {
  /** Notificación a mostrar. */
  notification: AppNotification;
}

/**
 * Toast individual de notificación con cierre automático a los 5 segundos.
 *
 * El color de la barra lateral izquierda refleja el tipo de notificación.
 * Usado en {@link NotificationStack}.
 *
 * @param notification - Datos de la notificación a mostrar.
 */
function NotificationToast({ notification }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => dismissNotification(notification.id), 5000);
    return () => clearTimeout(timer);
  }, [notification.id]);

  return (
    <div className="pointer-events-auto flex bg-white-app rounded-2xl shadow-md overflow-hidden w-80">
      <div className={toastAccent({ type: notification.type })} />
      <div className="flex flex-col gap-1 px-4 py-3 flex-1 min-w-0">
        <p className="font-bold text-sm color-secondary">{notification.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{notification.message}</p>
      </div>
      <button
        onClick={() => dismissNotification(notification.id)}
        className="p-3 text-gray-400 hover:text-gray-600 self-start transition-colors shrink-0"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default NotificationToast;
