import banner1 from "../../assets/imgs/Banner1.png";
import banner2 from "../../assets/imgs/Banner2.png";
import banner3 from "../../assets/imgs/Banner3.png";

/**
 * Item del banner destacado en la pantalla principal.
 */
export interface FeaturedItem {
  /** Identificador único del item. */
  id: number;
  /** URL de la imagen del banner. */
  image: string;
  /** Texto alternativo de la imagen. */
  alt: string;
}

/** Banners del carrusel mostrado en {@link FeaturedBanner}. */
export const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    image: banner1,
    alt: "Especial para ti 1",
  },
  {
    id: 2,
    image: banner2,
    alt: "Especial para ti 2",
  },
  {
    id: 3,
    image: banner3,
    alt: "Especial para ti 3",
  },
];