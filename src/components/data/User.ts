/**
 * Usuario base de la aplicación.
 * Extendido por {@link Seller} y {@link UserProfile}.
 */
export interface User {
  /** Identificador único del usuario. */
  id: number;
  /** Nombre de usuario visible en la app. */
  username: string;
  /** Correo electrónico del usuario. */
  email: string;
  /** Contraseña del usuario ── reemplazar por hash cuando se integre el backend. */
  password: string;
  /** URL del avatar del usuario. */
  avatar: string;
  /** Fecha de creación de la cuenta. */
  createdAt: Date;

  //ubicacion
  location: string
}