/**
 * Configuración de dimensiones del indicador de puntos del banner.
 * Usado en {@link DotsIndicator} y {@link FeaturedBanner}.
 */
export interface DotConfig {
  /** Ancho del punto activo (pill) en píxeles. */
  pill: number;
  /** Alto de cada punto en píxeles. */
  height: number;
  /** Separación entre puntos en píxeles. */
  gap: number;
}

/** Valores de configuración del indicador de puntos del {@link FeaturedBanner}. */
export const dots: DotConfig = {
  pill: 24,
  height: 12,
  gap: 8,
};
