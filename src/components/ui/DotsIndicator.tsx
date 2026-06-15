import { dots } from "../data/DotsIndicator";

/**
 * Props de DotsIndicator.
 */
interface DotsIndicatorProps {
  /** Índice del slide activo (0-based). */
  currentIndex: number;
  /** Cantidad total de slides. */
  total: number;
}

/**
 * Indicador de puntos animado para el carrusel del {@link FeaturedBanner}.
 *
 * Muestra `total` puntos y desliza una píldora de color primario
 * sobre el punto correspondiente al `currentIndex`.
 *
 * @param currentIndex - Índice del slide activo.
 * @param total - Cantidad total de slides.
 */
function DotsIndicator({ currentIndex, total }: DotsIndicatorProps) {
  const { pill, height, gap } = dots;
  return (
    <div className="relative flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className="w-6 h-3 rounded-full bg-soft shrink-0" />
      ))}
      <span
        className="absolute top-0 rounded-full bg-primary pointer-events-none"
        style={{
          width: pill,
          height,
          left: 0,
          transform: `translateX(${currentIndex * (pill + gap)}px)`,
          transition: "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}

export default DotsIndicator;