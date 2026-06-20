/** Define un tamaño predefinido de {@link CircleButton} con su nombre y clases CSS. */
export interface CircleButtonSize {
  /** Identificador del tamaño usado como prop. */
  name: "sm" | "md" | "lg";
  /** Clases de Tailwind que definen el ancho y alto del botón. */
  className: string;
}

/** Define una variante visual de {@link CircleButton} con su nombre y clases CSS. */
export interface CircleButtonVariant {
  /** Identificador de la variante usado como prop. */
  name: "primary" | "secondary" | "aux" | "danger" | "ghost";
  /** Clases de Tailwind que aplican el color de fondo de la variante. */
  className: string;
}

/**
 * Lista de tamaños disponibles para {@link CircleButton}.
 * `sm` → 28px, `md` → 32px, `lg` → 48px.
 */
export const circleButtonSizes: CircleButtonSize[] = [
  { name: "sm", className: "w-7 h-7" },
  { name: "md", className: "w-8 h-8" },
  { name: "lg", className: "w-12 h-12" },
];

/**
 * Lista de variantes disponibles para {@link CircleButton}.
 * `ghost` no tiene fondo sólido: solo revela un blanco translúcido al hacer hover,
 * ideal para botones sobre banners de color sólido.
 */
export const circleButtonVariants: CircleButtonVariant[] = [
  { name: "primary",   className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "aux",       className: "bg-aux" },
  { name: "danger",    className: "bg-red-500" },
  { name: "ghost",     className: "hover:bg-white/20" },
];
