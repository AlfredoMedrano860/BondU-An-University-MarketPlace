/** Define una variante visual de {@link AppButton} con su nombre y clases CSS. */
export interface AppButtonVariant {
  /** Identificador de la variante usado como prop. */
  name: "primary" | "secondary" | "aux";
  /** Clases de Tailwind que aplican el estilo visual de la variante. */
  className: string;
}

/**
 * Lista de variantes disponibles para {@link AppButton}.
 * Usar `.find()` por `name` en el componente evita los `Record<>` y mantiene
 * el arreglo como fuente única de verdad para las clases CSS.
 */
export const appButtonVariants: AppButtonVariant[] = [
  { name: "primary",   className: "bg-primary text-white font-bold text-sm h-12 hover:opacity-90 active:scale-[0.98] transition-all duration-150" },
  { name: "secondary", className: "border-2 border-primary color-primary h-12 font-bold hover:opacity-90 active:scale-[0.98] transition-all duration-150" },
  { name: "aux",       className: "btn-aux text-white text-sm h-10 hover:opacity-90 active:scale-[0.98] transition-all duration-150" },
];
