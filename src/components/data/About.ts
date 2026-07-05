import alfredoAvatar from "../../assets/imgs/Alfredo.webp";

/**
 * Información de un miembro del equipo de desarrollo.
 */
export interface Developer {
  /** Identificador único del desarrollador. */
  id: number;
  /** Nombre completo del desarrollador. */
  name: string;
  /** URL del avatar. Vacío si aún no se ha asignado. */
  avatar: string;
}

/** Equipo de desarrollo del proyecto ── completar avatares cuando estén disponibles. */
export const developers: Developer[] = [
  { id: 1, name: "Alfredo Medrano", avatar: alfredoAvatar },
  { id: 2, name: "Sophia Kane",     avatar: "" },
  { id: 3, name: "Aarón Mayorga",   avatar: "" },
];
