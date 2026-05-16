import IntercambiaCard from "../../assets/imgs/IntercambiaCard.png";
import ConectaCard from "../../assets/imgs/ConectaCard.png";
import AhorraCard from "../../assets/imgs/AhorraCard.png";

export interface InfoItem {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
}

export const infoItems: InfoItem[] = [
  {
    image: IntercambiaCard,
    title: "Intercambia",
    description: "Compra, vende e intercambia productos fácilmente con otros estudiantes de tu universidad."
  },
  {
    image: ConectaCard,
    title: "Conecta",
    description: "Encuentra estudiantes cerca de ti y descubre productos útiles dentro de tu comunidad."
  },
  {
    image: AhorraCard,
    title: "Ahorra",
    description: "Encuentra lo que necesitas al mejor precio dentro de tu comunidad universitaria de confianza.",
    buttonText: "EMPEZAR"
  }
];