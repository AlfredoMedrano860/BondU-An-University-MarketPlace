import type { LucideIcon } from "lucide-react";

/**
 * Props de ContactRow.
 */
interface ContactRowProps {
  /** Ícono de Lucide que representa el canal de contacto. */
  icon: LucideIcon;
  /** Valor a mostrar (teléfono, correo, usuario de red social). */
  value: string;
}

/**
 * Fila de contacto con ícono y valor.
 *
 * Usada en {@link ProfileContact} para mostrar teléfono, correo,
 * Instagram y Telegram del usuario.
 *
 * @param icon - Ícono de Lucide que representa el canal.
 * @param value - Valor a mostrar.
 */
export default function ContactRow({ icon: Icon, value }: ContactRowProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={18} className="color-primary shrink-0" />
      <span className="text-gray-700 text-sm">{value}</span>
    </div>
  );
}
