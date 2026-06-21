import type { ReactNode } from "react";

/**
 * Props de CardLayout.
 */
interface CardLayoutProps {
  /** Contenido de la tarjeta. */
  children: ReactNode;
  /** Clases adicionales de Tailwind. */
  className?: string;
}

/**
 * Tarjeta blanca con borde amarillo en hover.
 * Usado en {@link ProductCard}.
 *
 * @param children - Contenido de la tarjeta.
 * @param className - Clases adicionales.
 */
function CardLayout({ children, className = "" }: CardLayoutProps) {
  return (
    <div className={`bg-white rounded-3xl p-3 border border-transparent hover:border-[hsl(54,80%,63%)] transition shadow-sm flex flex-col gap-3 ${className}`}>
      {children}
    </div>
  );
}

export default CardLayout;
