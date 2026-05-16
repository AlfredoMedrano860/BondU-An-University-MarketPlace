interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
}

function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <button onClick={onClick} className="w-full h-12 bg-primary text-white font-bold text-sm rounded-full cursor-pointer">{text}</button>
  );
}

export default PrimaryButton;