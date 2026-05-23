import { HouseHeart, Store, CirclePlus, Star, Bolt } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: number;
  icon: LucideIcon;
  screen: string;
}

export const navItems: NavItem[] = [
  { id: 0, icon: HouseHeart, screen: "home" },
  { id: 1, icon: Store,      screen: "marketplace" },
  { id: 2, icon: CirclePlus, screen: "addproduct" },
  { id: 3, icon: Star,       screen: "" },
  { id: 4, icon: Bolt,       screen: "settings" },
];

export const productTabs: string[] = ["Información", "Vendedor", "Compartir"];