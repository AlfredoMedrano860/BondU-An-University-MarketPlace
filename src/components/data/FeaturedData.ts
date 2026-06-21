import banner1 from "../../assets/imgs/Banner1.png";
import banner2 from "../../assets/imgs/Banner2.png";
import banner3 from "../../assets/imgs/Banner3.png";

/**
 * Item del banner destacado en la pantalla principal.
 * Textos (`alt`, `title`, `description`) viven en `home.featured[i]` en i18n.
 * Usado en {@link FeaturedBanner}.
 */
export interface FeaturedItem {
  /** Identificador único del item. */
  id: number;
  /** URL de la imagen del banner. */
  image: string;
}

/** Listado de items para el banner rotativo de {@link FeaturedBanner}. */
export const featuredItems: FeaturedItem[] = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 },
];
