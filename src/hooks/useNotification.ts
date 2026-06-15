import { useContext } from "react";
import { NotificationContext } from "../components/layout/NotificationProvider";

/**
 * Hook para acceder al sistema de notificaciones desde cualquier componente.
 *
 * Consume el `NotificationContext` y expone métodos tipados por nivel de severidad.
 *
 * @returns `showSuccess`, `showError`, `showWarning`, `showInfo` — muestran un toast del tipo indicado,
 * `dismiss` — cierra la notificación activa.
 */
export function useNotification() {
  const { show, dismiss } = useContext(NotificationContext);
  return {
    showSuccess: (title: string, message: string) => show("success", title, message),
    showError:   (title: string, message: string) => show("error",   title, message),
    showWarning: (title: string, message: string) => show("warning", title, message),
    showInfo:    (title: string, message: string) => show("info",    title, message),
    dismiss,
  };
}
