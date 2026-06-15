import { useTranslation } from "react-i18next";
import type { InfoItem } from "../data/InfoItem";
import DotsIndicator from "../ui/DotsIndicator";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de InfoContent.
 */
interface InfoContentProps {
  /** Item con imagen del slide actual. */
  item: InfoItem;
  /** Índice del slide activo (0-based), usado para leer el texto de i18n. */
  currentIndex: number;
  /** Cantidad total de slides. */
  total: number;
  /** Avanza al siguiente slide o finaliza el onboarding. */
  onNext: () => void;
  /** Salta el onboarding completo. */
  onSkip: () => void;
}

/**
 * Slide individual del onboarding con imagen, texto, indicador de puntos y botón de avance.
 *
 * El texto (título, descripción y botón) se obtiene de i18n según `currentIndex`.
 * Tiene diseño responsive: apilado en móvil, centrado en tarjeta en desktop.
 * Usado en {@link InfoScreen}.
 *
 * @param item - Item con la imagen del slide.
 * @param currentIndex - Índice activo para leer el texto de i18n.
 * @param total - Total de slides para el {@link DotsIndicator}.
 * @param onNext - Avanza al siguiente slide.
 * @param onSkip - Salta el onboarding.
 */
function InfoContent({ item, currentIndex, total, onNext, onSkip }: InfoContentProps) {
  const { t } = useTranslation();
  const slide = t(`onboarding.slides.${currentIndex}`, { returnObjects: true }) as {
    title: string;
    description: string;
    buttonText?: string;
  };
  const buttonText = slide.buttonText ?? t("onboarding.next");

  return (
    <div className="min-h-screen bg-secondary flex flex-col">

      {/* Skip */}
      <div className="md:hidden flex justify-end px-6 pt-8">
        <button onClick={onSkip} className="color-primary font-bold text-sm">
          {t("onboarding.skip")}
        </button>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="w-52 h-52 rounded-full bg-white/50 flex justify-center items-center shadow-sm">
            <img src={item.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="info-card bg-white-app flex flex-col items-center text-center px-8 pt-20 pb-10 gap-10">
          <div>
            <h1 className="color-primary text-2xl font-bold">{slide.title}</h1>
            <p className="color-text text-sm leading-5 mt-4 max-w-xs mx-auto">{slide.description}</p>
          </div>
          <DotsIndicator currentIndex={currentIndex} total={total} />
          <PrimaryButton text={buttonText} onClick={onNext} />
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-1 bg-secondary items-center justify-center px-6 py-12">
        <div className="bg-white-app rounded-3xl shadow-sm w-full max-w-md flex flex-col items-center text-center px-10 py-10 gap-6">

          {/* Skip */}
          <div className="w-full flex justify-end">
            <button onClick={onSkip} className="color-primary font-bold text-sm">
              {t("onboarding.skip")}
            </button>
          </div>

          {/* Ilustración */}
          <div className="w-64 h-64 rounded-full bg-white/50 flex justify-center items-center shadow-sm">
            <img src={item.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-2">
            <h1 className="color-primary text-3xl font-bold">{slide.title}</h1>
            <p className="color-text text-base leading-relaxed max-w-xs mx-auto">{slide.description}</p>
          </div>

          <DotsIndicator currentIndex={currentIndex} total={total} />

          <div className="w-full">
            <PrimaryButton text={buttonText} onClick={onNext} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default InfoContent;
