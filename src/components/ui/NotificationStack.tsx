import { useEffect, useState } from "react";
import { subscribeNotifications, type AppNotification } from "../data/NotificationStore";
import NotificationToast from "./NotificationToast";

/**
 * Pila global de toasts de notificación.
 *
 * Se suscribe al {@link NotificationStore} y renderiza un {@link Toast}
 * por cada notificación activa. Se monta una sola vez en {@link AppLayout}.
 */
export function NotificationStack() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => subscribeNotifications(setNotifications), []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-200 flex flex-col gap-2 pointer-events-none">
      {notifications.map(notification => (
        <NotificationToast key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
