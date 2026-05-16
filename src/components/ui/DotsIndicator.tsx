interface DotsIndicatorProps {
  currentIndex: number;
  total: number;
}

function DotsIndicator({ currentIndex, total }: DotsIndicatorProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full ${
            i === currentIndex ? "w-6 h-3 bg-primary" : "w-3 h-3 bg-soft"
          }`}
        />
      ))}
    </div>
  );
}

export default DotsIndicator;