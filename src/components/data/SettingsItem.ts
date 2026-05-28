import type { LucideIcon } from "lucide-react";
import { CircleUserRound, Package, Contrast, Info, LogOut } from "lucide-react";

/**
 * Agrupa los items de configuración por sección.
 * Renombrado de `SettingsGroup` para evitar conflicto con el componente {@link SettingsGroup}.
 */
export enum SettingsGroupEnum {
  Account = 1,
  Preferences = 2,
}

/**
 * Item individual de la pantalla de ajustes.
 * @see SettingsGroupEnum
 */
export interface SettingsItem {
  /** Ícono de lucide-react a mostrar. */
  icon: LucideIcon;
  /** Texto descriptivo del item. */
  label: string;
  /** Sección a la que pertenece el item. */
  group: SettingsGroupEnum;
  /** Si es `true` renderiza un toggle en lugar de un chevron. */
  toggle?: boolean;
  /** Se ejecuta al presionar el item. */
  onPress?: () => void;
}

/**
 * Items de configuración usados en {@link SettingsGroup}.
 * Actualmente no se usan directamente — {@link SettingsScreen} define
 * sus propias filas con {@link SettingRow}. Pendiente de unificar.
 */
export const settingsItems: SettingsItem[] = [
  {
    icon: CircleUserRound,
    label: "Cuenta",
    group: SettingsGroupEnum.Account,
  },
  {
    icon: Package,
    label: "Productos",
    group: SettingsGroupEnum.Account,
  },
  {
    icon: Contrast,
    label: "Tema",
    group: SettingsGroupEnum.Preferences,
    toggle: true,
  },
  {
    icon: Info,
    label: "Sobre Nosotros",
    group: SettingsGroupEnum.Preferences,
  },
  {
    icon: LogOut,
    label: "Log Out",
    group: SettingsGroupEnum.Preferences,
  },
];