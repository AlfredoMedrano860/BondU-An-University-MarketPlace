import type { LucideIcon } from "lucide-react";
import { CircleUserRound, Package, Contrast, Info, LogOut } from "lucide-react";

export enum SettingsGroup {
  Account = 1,
  Preferences = 2,
}

export interface SettingsItem {
  icon: LucideIcon;
  label: string;
  group: SettingsGroup;
  toggle?: boolean;
  onPress?: () => void;
}

export const settingsItems: SettingsItem[] = [
  {
    icon: CircleUserRound,
    label: "Cuenta",
    group: SettingsGroup.Account,
  },
  {
    icon: Package,
    label: "Productos",
    group: SettingsGroup.Account,
  },
  {
    icon: Contrast,
    label: "Tema",
    group: SettingsGroup.Preferences,
    toggle: true,
  },
  {
    icon: Info,
    label: "Sobre Nosotros",
    group: SettingsGroup.Preferences,
  },
  {
    icon: LogOut,
    label: "Log Out",
    group: SettingsGroup.Preferences,
  },
];