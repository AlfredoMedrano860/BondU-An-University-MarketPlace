import type { InfoItem } from "../data/InfoItem";
import DotsIndicator from "../ui/DotsIndicator";
import PrimaryButton from "../ui/PrimaryButton";

interface InfoContentProps {
  item: InfoItem;
  currentIndex: number;
  total: number;
  onNext: () => void;
}

function InfoContent({ item, currentIndex, total, onNext }: InfoContentProps) {
  const buttonText = item.buttonText ?? "SIGUIENTE";

  return (
    <>
      <div className="grid-area-skip flex justify-end items-start px-6 pt-8">
        <button className="color-primary font-bold text-sm">Skip</button>
      </div>

      <div className="grid-area-image flex justify-center items-center">
        <div className="w-52.5 h-52.5 rounded-full bg-soft flex justify-center items-center">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
      </div>

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