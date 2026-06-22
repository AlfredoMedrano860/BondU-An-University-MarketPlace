/** Nivel de severidad de una notificación. */
export type NotificationType = "error" | "warning" | "success" | "info";

/**
 * Notificación activa en la aplicación.
 */
export interface AppNotification {
  /** Identificador único de la notificación. */
  id: number;
  /** Nivel de severidad. */
  type: NotificationType;
  /** Título breve visible en el toast. */
  title: string;
  /** Mensaje descriptivo visible en el toast. */
  message: string;
}


let _items: AppNotification[] = [];
let _nextId = 1;
let _listener: ((items: AppNotification[]) => void) | null = null;

/** Emite el estado actual de notificaciones al listener registrado. */
function _emit() { _listener?.([..._items]); }

/**
 * Agrega una nueva notificación al store y emite el cambio.
 * @param type - Nivel de severidad.
 * @param title - Título del toast.
 * @param message - Mensaje descriptivo del toast.
 */
function _add(type: NotificationType, title: string, message: string) {
  _items = [..._items, { id: _nextId++, type, title, message }];
  _emit();
}

/**
 * API pública para emitir notificaciones por tipo.
 * Usado en hooks y stores que necesiten mostrar toasts.
 */
export const notify = {
  success: (title: string, message: string) => _add("success", title, message),
  error:   (title: string, message: string) => _add("error",   title, message),
  warning: (title: string, message: string) => _add("warning", title, message),
  info:    (title: string, message: string) => _add("info",    title, message),
};

/**
 * Elimina una notificación del store por ID.
 * @param id - ID de la notificación a eliminar.
 */
export function dismissNotification(id: number) {
  _items = _items.filter(n => n.id !== id);
  _emit();
}

/**
 * Registra un listener que se llama cada vez que cambia la lista de notificaciones.
 * Solo puede haber un listener activo a la vez.
 * Usado en {@link NotificationProvider}.
 *
 * @param fn - Función que recibe la lista actualizada de notificaciones.
 * @returns Función para cancelar la suscripción.
 */
export function subscribeNotifications(fn: (items: AppNotification[]) => void): () => void {
  _listener = fn;
  return () => { _listener = null; };
}
