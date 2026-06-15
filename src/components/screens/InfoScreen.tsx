import { useState } from "react";
import { infoItems } from "../data/InfoItem";
import InfoContent from "../templates/InfoContent";

/**
 * Props de InfoScreen.
 */
interface InfoScreenProps {
  /** Se ejecuta al completar o saltar el onboarding. */
  onFinish: () => void;
}

/**
 * Pantalla de onboarding que presenta los slides de introducción a la app.
 *
 * Gestiona el índice activo y delega el renderizado de cada slide a {@link InfoContent}.
 *
 * @param onFinish - Navega fuera del onboarding al completar o saltar.
 */
function InfoScreen({ onFinish }: InfoScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    if (currentIndex < infoItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  }

  return (
    <InfoContent
      item={infoItems[currentIndex]}
      currentIndex={currentIndex}
      total={infoItems.length}
      onNext={handleNext}
      onSkip={onFinish}
    />
  );
}

export default InfoScreen;
