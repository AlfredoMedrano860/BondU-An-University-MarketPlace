import type { ReactNode } from "react";

/**
 * Props de CardLayout.
 */
interface CardLayoutProps {
  /** Contenido de la tarjeta. */
  children: ReactNode;
  /** Clases adicionales de Tailwind. */
  className?: string;
  /** Si se pasa, la tarjeta se renderiza como `<button>` en lugar de `<div>`. */
  onClick?: () => void;
}

/**
 * Tarjeta blanca con borde amarillo en hover para ítems clicables o estáticos.
 *
 * Si se pasa `onClick`, renderiza un `<button>` accesible; de lo contrario un `<div>`.
 * Usado en {@link ProductCard} y {@link MyProductCard}.
 *
 * @param children - Contenido de la tarjeta.
 * @param className - Clases adicionales.
 * @param onClick - Handler del clic (convierte la tarjeta en botón).
 */
function CardLayout({ children, className = "", onClick }: CardLayoutProps) {
  const base = "bg-white rounded-3xl p-3 border border-transparent hover:border-[hsl(54,80%,63%)] transition shadow-sm";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${base} flex flex-col gap-3 w-full text-left ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <div className={`${base} flex flex-col gap-3 ${className}`}>
      {children}
    </div>
  );
}

export default CardLayout;
