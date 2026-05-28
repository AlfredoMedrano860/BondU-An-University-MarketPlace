import type { User } from "./User";

/**
 * Perfil completo del usuario autenticado.
 * Extiende {@link User} con información académica y preferencias de la app.
 */
export interface UserProfile extends User {
  /** Número de teléfono del usuario. */
  phone?: string;
  /** Universidad a la que pertenece el usuario. */
  university?: string;
  /** Carrera que estudia el usuario. */
  career?: string;
  /** Indica si el usuario tiene las notificaciones activadas. Por defecto `true`. */
  notifications?: boolean;
  /** Idioma preferido de la interfaz. Por defecto `"es"`. */
  language?: "es" | "en";
}