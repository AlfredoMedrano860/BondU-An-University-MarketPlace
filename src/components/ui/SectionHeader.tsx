import type { ElementType } from "react";

/**
 * Props de SectionHeader.
 */
interface SectionHeaderProps {
  /** Ícono de lucide-react a mostrar. */
  icon: ElementType;
  /** Etiqueta de la sección en mayúsculas. */
  label: string;
}

/**
 * Cabecera visual de una sección de formulario.
 *
 * Muestra un ícono con fondo suave y una etiqueta en mayúsculas.
 * Usado en {@link Account}.
 */
function SectionHeader({ icon: Icon, label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-5 pt-5 pb-4">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={13} className="color-primary" />
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default SectionHeader;
