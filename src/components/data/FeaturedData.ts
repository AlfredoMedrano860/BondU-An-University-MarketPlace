import banner1 from "../../assets/imgs/Banner1.png";
import banner2 from "../../assets/imgs/Banner2.png";
import banner3 from "../../assets/imgs/Banner3.png";

/**
 * Item del banner destacado en la pantalla principal.
 * Usado en {@link FeaturedBanner}.
 */
export interface FeaturedItem {
  /** Identificador único del item. */
  id: number;
  /** URL de la imagen del banner. */
  image: string;
  /** Texto alternativo de la imagen. */
  alt: string;
  /** Título principal del banner. */
  title: string;
  /** Descripción breve del banner. */
  description: string;
}

/** Listado de items para el banner rotativo de {@link FeaturedBanner}. */
export const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    image: banner1,
    alt: "Especial para ti 1",
    title: "Comprá y vendé en tu campus",
    description: "Encontrá lo que necesitás entre estudiantes de tu universidad.",
  },
  {
    id: 2,
    image: banner2,
    alt: "Especial para ti 2",
    title: "Conectate con tu comunidad",
    description: "Miles de estudiantes cerca tuyo comprando y vendiendo.",
  },
  {
    id: 3,
    image: banner3,
    alt: "Especial para ti 3",
    title: "Ahorrá comprando entre pares",
    description: "Los mejores precios dentro de tu comunidad universitaria.",
  },
];