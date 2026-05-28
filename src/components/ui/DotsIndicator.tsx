/**
 * Props de DotsIndicator.
 */
interface DotsIndicatorProps {
  /** Índice del punto actualmente activo. */
  currentIndex: number;
  /** Total de puntos a mostrar. */
  total: number;
}

/**
 * Indicador de puntos para carruseles y onboarding.
 *
 * El punto activo se muestra más ancho y en color primario.
 * Los puntos inactivos son circulares y en color suave.
 * Usado en {@link FeaturedBanner} e {@link InfoContent}.
 *
 * @param currentIndex - Índice del punto actualmente activo.
 * @param total - Total de puntos a mostrar.
 */
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