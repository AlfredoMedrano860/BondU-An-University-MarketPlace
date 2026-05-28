import type { InfoItem } from "../data/InfoItem";
import DotsIndicator from "../ui/DotsIndicator";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de InfoContent.
 * @see InfoItem
 */
interface InfoContentProps {
  /** Item de onboarding a mostrar. */
  item: InfoItem;
  /** Índice del item actual para el {@link DotsIndicator}. */
  currentIndex: number;
  /** Total de items para el {@link DotsIndicator}. */
  total: number;
  /** Avanza al siguiente item o finaliza el onboarding. */
  onNext: () => void;
  /** Salta el onboarding y va directo al login. */
  onSkip: () => void;
}

/**
 * Contenido de una slide del onboarding.
 *
 * Muestra la imagen, título y descripción del item actual, junto con
 * el indicador de puntos y el botón para avanzar.
 * El texto del botón se toma de {@link InfoItem.buttonText} o usa "SIGUIENTE" por defecto.
 *
 * @param item - Item de onboarding a mostrar.
 * @param currentIndex - Índice del item actual.
 * @param total - Total de items.
 * @param onNext - Avanza al siguiente item o finaliza el onboarding.
 * @param onSkip - Salta el onboarding y va directo al login.
 */
function InfoContent({ item, currentIndex, total, onNext, onSkip }: InfoContentProps) {
  const buttonText = item.buttonText ?? "SIGUIENTE";

  return (
    <>
      {/* ── SKIP ── */}
      <div className="grid-area-skip flex justify-end items-start px-6 pt-8">
        <button onClick={onSkip} className="color-primary font-bold text-sm">Skip</button>
      </div>

      {/* ── IMAGEN ── */}
      <div className="grid-area-image flex justify-center items-center">
        <div className="w-52.5 h-52.5 rounded-full bg-soft flex justify-center items-center">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ── CARD ── título, descripción, indicador y botón */}
      <div className="grid-area-card info-card bg-white-app flex flex-col items-center text-center px-8 pt-25 pb-8 gap-16">
        <div>
          <h1 className="color-primary text-2xl font-bold">{item.title}</h1>
          <p className="color-text text-sm leading-5 mt-4 max-w-67.5">{item.description}</p>
        </div>

        <DotsIndicator currentIndex={currentIndex} total={total} />

        <PrimaryButton text={buttonText} onClick={onNext} />
      </div>
    </>
  );
}

export default InfoContent;