/**
 * Usuario base de la aplicación.
 * Extendido por {@link Seller} y {@link UserProfile}.
 */
export interface User {
  /** Identificador único del usuario (UUID del backend). */
  id: string;
  /** Nombre de usuario visible en la app. */
  username: string;
  /** Correo electrónico del usuario. */
  email: string;
  /** URL del avatar del usuario. */
  avatar: string;
  /** Fecha de creación de la cuenta. */
  createdAt: Date;
  /** Ubicación del usuario (ciudad o campus). */
  location: string;
}

