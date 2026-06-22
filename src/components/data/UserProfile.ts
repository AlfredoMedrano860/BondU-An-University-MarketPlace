import type { User } from "./User";
import type { ContactInfo } from "./Seller";

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
  /** Calificación promedio del vendedor entre 0 y 5. */
  rating?: number;
  /** Número total de reseñas recibidas. */
  reviews?: number;
  /** Número de ventas realizadas. */
  sales?: number;
  /** Información de contacto personalizada del vendedor. */
  contact?: ContactInfo;
}