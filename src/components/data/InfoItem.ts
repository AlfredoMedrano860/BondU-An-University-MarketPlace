import IntercambiaCard from "../../assets/imgs/IntercambiaCard.png";
import ConectaCard from "../../assets/imgs/ConectaCard.png";
import AhorraCard from "../../assets/imgs/AhorraCard.png";

/**
 * Item de una slide del onboarding.
 */
export interface InfoItem {
  /** URL de la imagen ilustrativa. */
  image: string;
  /** Título de la slide. */
  title: string;
  /** Descripción de la funcionalidad. */
  description: string;
  /** Texto del botón de avance. Si no se define usa "SIGUIENTE" por defecto. */
  buttonText?: string;
}

/** Slides del onboarding mostradas en {@link InfoScreen} e {@link InfoContent}. */
export const infoItems: InfoItem[] = [
  {
    image: IntercambiaCard,
    title: "Intercambia",
    description: "Compra, vende e intercambia productos fácilmente con otros estudiantes de tu universidad.",
  },
  {
    image: ConectaCard,
    title: "Conecta",
    description: "Encuentra estudiantes cerca de ti y descubre productos útiles dentro de tu comunidad.",
  },
  {
    image: AhorraCard,
    title: "Ahorra",
    description: "Encuentra lo que necesitas al mejor precio dentro de tu comunidad universitaria de confianza.",
    buttonText: "EMPEZAR",
  },
];