import { notify, dismissNotification } from "../components/data/NotificationStore";

/**
 * Hook para acceder al sistema de notificaciones desde cualquier componente.
 *
 * Consume el `NotificationContext` y expone métodos tipados por nivel de severidad.
 *
 * @returns `showSuccess`, `showError`, `showWarning`, `showInfo` — muestran un toast del tipo indicado,
 * `dismiss` — cierra la notificación activa.
 */
export function useNotification() {
  return {
    showSuccess: (title: string, message: string) => notify.success(title, message),
    showError: (title: string, message: string) => notify.error(title, message),
    showWarning: (title: string, message: string) => notify.warning(title, message),
    showInfo: (title: string, message: string) => notify.info(title, message),
    // Dismiss requires an id; provide a helper that accepts an id when needed.
    dismiss: (id?: number) => { if (typeof id === "number") dismissNotification(id); },
  };
}
