import { Home, ShoppingBag, CirclePlus, Heart, Cog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Item de navegación del {@link BottomNav}.
 */
export interface NavItem {
  /** Identificador único del item. */
  id: number;
  /** Ícono de lucide-react a mostrar. */
  icon: LucideIcon;
  /** Nombre de la pantalla a la que navega. Vacío si no tiene pantalla asignada. */
  screen: string;
}

/** Items de la barra de navegación inferior usados en {@link BottomNav}. */
export const navItems: NavItem[] = [
  { 
    id: 0, 
    icon: Home,        
    screen: "home"        
  },
  { 
    id: 1, 
    icon: ShoppingBag, 
    screen: "marketplace" 
  },
  { 
    id: 2, 
    icon: CirclePlus,
    screen: "addproduct"
  },
  {
    id: 3,
    icon: Heart,
    screen: "favorite"    
  },
  { 
    id: 4, 
    icon: Cog,         
    screen: "settings"    
  },
];

/** Tabs del detalle de producto usados en {@link ProductTabs}. */
export const productTabs: string[] = ["Información", "Vendedor", "Compartir"];

/** Tabs del perfil de usuario usados en {@link ProfileScreen}. */
export type ProfileChoice = "contacto" | "productos" | "reseñas";

