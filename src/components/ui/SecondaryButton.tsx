interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
}

function SecondaryButton({ text, onClick }: SecondaryButtonProps) {
  return (
    <button onClick={onClick} className="w-full h-12 border-2 border-primary color-primary rounded-full font-bold cursor-pointer">
      {text}
    </button>
  );
}

export default SecondaryButton;