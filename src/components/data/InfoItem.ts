import IntercambiaCard from "../../assets/imgs/IntercambiaCard.webp";
import ConectaCard from "../../assets/imgs/ConectaCard.webp";
import AhorraCard from "../../assets/imgs/AhorraCard.webp";

/**
 * Item de una slide del onboarding.
 * El título, descripción y texto del botón se leen de i18n según el índice
 * del slide (`onboarding.slides.*`), no de este objeto.
 */
export interface InfoItem {
  /** URL de la imagen ilustrativa. */
  image: string;
}

/** Slides del onboarding mostradas en {@link Info} e {@link InfoContent}. */
export const infoItems: InfoItem[] = [
  { image: IntercambiaCard },
  { image: ConectaCard },
  { image: AhorraCard },
];
