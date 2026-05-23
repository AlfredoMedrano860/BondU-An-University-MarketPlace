import { useState } from "react";
import { infoItems } from "../data/InfoItem";
import InfoContent from "../templates/InfoContent";

interface InfoScreenProps {
  onFinish: () => void;
}

function InfoScreen({ onFinish }: InfoScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = infoItems[currentIndex];

  function handleNext() {
    if (currentIndex < infoItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  }

  return (
    <div className="min-h-screen grid grid-rows-[90px_300px_auto] info-grid">
      <InfoContent item={currentItem} currentIndex={currentIndex} total={infoItems.length} onNext={handleNext} onSkip={onFinish} />
    </div>
  );
}

export default InfoScreen;