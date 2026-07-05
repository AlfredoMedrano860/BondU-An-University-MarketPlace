import type { PropsWithChildren } from "react";

/**
 * Props de SectionTitle.
 */
interface SectionTitleProps {
  /** Texto del título de sección. */
  title: string;
}

/**
 * Título de sección para grupos de ajustes.
 * Usada en {@link SettingsSection}.
 *
 * @param title - Texto del encabezado.
 */
function SectionTitle({ title }: SectionTitleProps) {
  return (
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pt-2">
      {title}
    </p>
  );
}

/**
 * Props de SettingsSection.
 */
interface SettingsSectionProps {
  /** Título visible sobre el grupo de filas. */
  title: string;
}

/**
 * Agrupa filas de ajustes bajo un título común.
 * Usada en {@link Settings}.
 *
 * @param title - Título del grupo.
 * @param children - Filas de ajustes ({@link SettingRow}).
 */
export function SettingsSection({ title, children }: PropsWithChildren<SettingsSectionProps>) {
  return (
    <>
      <SectionTitle title={title} />
      <div className="bg-white-app rounded-3xl divide-y divide-gray-200">
        {children}
      </div>
    </>
  );
}
