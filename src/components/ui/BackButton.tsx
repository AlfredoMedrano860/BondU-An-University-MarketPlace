import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button onClick={onClick} className="w-10 h-10 bg-aux rounded-r-xl flex items-center justify-center">
      <ChevronLeft size={20} strokeWidth={2.5} />
    </button>
  );
}

export default BackButton;