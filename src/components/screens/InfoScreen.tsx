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
 * Pantalla de onboarding que presenta las funcionalidades principales de la app.
 *
 * Recorre los {@link infoItems} uno a uno mostrando imagen, título y descripción.
 * Al llegar al último item o al presionar "Saltar" llama a {@link onFinish}.
 *
 * @param onFinish - Se ejecuta al completar o saltar el onboarding.
 */
function InfoScreen({ onFinish }: InfoScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = infoItems[currentIndex];

  /**
   * Avanza al siguiente item del onboarding.
   * Si es el último, llama a {@link onFinish}.
   */
  function handleNext() {
    if (currentIndex < infoItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  }

  return (
    <div className="min-h-screen grid grid-rows-[90px_300px_auto] info-grid">

      {/* ── CONTENIDO ── imagen, título, descripción, botón siguiente y botón saltar */}
      <InfoContent
        item={currentItem}
        currentIndex={currentIndex}
        total={infoItems.length}
        onNext={handleNext}
        onSkip={onFinish}
      />

    </div>
  );
}

export default InfoScreen;