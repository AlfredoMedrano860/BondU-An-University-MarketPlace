import googleImg from "../../assets/imgs/google.png";
import appleImg from "../../assets/imgs/apple.png";
import facebookImg from "../../assets/imgs/facebook.png";

/**
 * Proveedor de inicio de sesión social mostrado en {@link Login}.
 * Los botones son actualmente decorativos — no hay integración OAuth conectada.
 */
export interface SocialMedia {
  /** Identificador único del proveedor. */
  id: number;
  /** Logo del proveedor. */
  img: string;
  /** Nombre visible del proveedor. */
  text: string;
  /** Texto alternativo del logo. */
  alt: string;
}

/** Proveedores de login social mostrados en {@link Login}. */
export const socialMedias: SocialMedia[] = [
  { id: 1, img: googleImg,   text: "Google",   alt: "Google logo" },
  { id: 2, img: appleImg,    text: "Apple",    alt: "Apple logo" },
  { id: 3, img: facebookImg, text: "Facebook", alt: "Facebook logo" },
];
