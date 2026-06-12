import { useTranslation } from "react-i18next";
import type { InfoItem } from "../data/InfoItem";
import DotsIndicator from "../ui/DotsIndicator";
import PrimaryButton from "../ui/PrimaryButton";

interface InfoContentProps {
  item: InfoItem;
  currentIndex: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
}

function InfoContent({ item, currentIndex, total, onNext, onSkip }: InfoContentProps) {
  const { t } = useTranslation();
  const slide = t(`onboarding.slides.${currentIndex}`, { returnObjects: true }) as {
    title: string;
    description: string;
    buttonText?: string;
  };
  const buttonText = slide.buttonText ?? t("onboarding.next");

  return (
    <>
      <div className="grid-area-skip flex justify-end items-start px-6 pt-8">
        <button onClick={onSkip} className="color-primary font-bold text-sm">{t("onboarding.skip")}</button>
      </div>

      <div className="grid-area-image flex justify-center items-center">
        <div className="w-52.5 h-52.5 rounded-full bg-soft flex justify-center items-center">
          <img src={item.image} alt={slide.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid-area-card info-card bg-white-app flex flex-col items-center text-center px-6 sm:px-10 md:px-16 lg:px-20 pt-25 pb-8 gap-16">
        <div>
          <h1 className="color-primary text-2xl font-bold">{slide.title}</h1>
          <p className="color-text text-sm leading-5 mt-4 max-w-67.5">{slide.description}</p>
        </div>

        <DotsIndicator currentIndex={currentIndex} total={total} />

        <PrimaryButton text={buttonText} onClick={onNext} />
      </div>
    </>
  );
}

export default InfoContent;
