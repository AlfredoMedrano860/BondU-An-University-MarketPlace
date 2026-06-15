import { useEffect, useState } from "react";
import { subscribeNotifications, dismissNotification, type AppNotification } from "../data/NotificationStore";
import NotificationToast from "./NotificationToast";

/**
 * Contenedor global de toasts de notificación.
 *
 * Se suscribe al {@link NotificationStore} y renderiza un {@link NotificationToast}
 * por cada notificación activa. Se monta una sola vez en {@link AppLayout}.
 */
export function NotificationContainer() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => subscribeNotifications(setNotifications), []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-200 flex flex-col gap-2 pointer-events-none">
      {notifications.map(n => (
        <div key={n.id} className="pointer-events-auto">
          <NotificationToast notification={n} onDismiss={dismissNotification} />
        </div>
      ))}
    </div>
  );
}
