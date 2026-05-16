interface AuxiliaryButtonProps {
  text?: string;
  onClick?: () => void;
}

function AuxiliaryButton({ text = "COMPRAR", onClick }: AuxiliaryButtonProps) {
  return (
    <button onClick={onClick} className="btn-aux w-full h-10 rounded-full text-white text-sm m">
      {text}
    </button>
  );
}

export default AuxiliaryButton;