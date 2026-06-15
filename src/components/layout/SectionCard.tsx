import type { ReactNode } from "react";

/**
 * Props de SectionCard.
 */
interface SectionCardProps {
  /** Contenido de la tarjeta. */
  children: ReactNode;
  /** Clases adicionales de Tailwind para padding, espaciado, etc. */
  className?: string;
}

/**
 * Tarjeta blanca con esquinas redondeadas para agrupar secciones de contenido.
 * Usado en {@link ProfileContact}, {@link SettingsGroup} y otras secciones.
 *
 * @param children - Contenido de la tarjeta.
 * @param className - Clases adicionales.
 */
function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}

export default SectionCard;
