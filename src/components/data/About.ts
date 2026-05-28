/**
 * Información de un miembro del equipo de desarrollo.
 */
export interface Developer {
  /** Nombre completo del desarrollador. */
  name: string;
  /** Rol en el proyecto. */
  role: string;
  /** Descripción de su experiencia en el proyecto. */
  description: string;
  /** URL del avatar. Vacío si aún no se ha asignado. */
  avatar: string;
}

/** Equipo de desarrollo del proyecto ── completar avatares cuando estén disponibles. */
export const developers: Developer[] = [
  {
    name: "Alfredo Medrano",
    role: "Developer",
    description: "Descripción de su experiencia en el proyecto.",
    avatar: "",
  },
  {
    name: "Sophia Kane",
    role: "Developer",
    description: "Descripción de su experiencia en el proyecto.",
    avatar: "",
  },
  {
    name: "Aarón Mayorga",
    role: "Developer",
    description: "Descripción de su experiencia en el proyecto.",
    avatar: "",
  },
];

/** Misión de BondU mostrada en {@link AboutAccordion}. */
export const mision = "Conectar a estudiantes universitarios para que puedan comprar, vender e intercambiar productos de forma fácil, segura y dentro de su propia comunidad.";

/** Visión de BondU mostrada en {@link AboutAccordion}. */
export const vision = "Ser el marketplace universitario de referencia en Latinoamérica, fomentando la economía circular y el sentido de comunidad entre estudiantes.";