import type { KeyboardEvent } from "react";

/**
 * Props de accesibilidad para que un `<div>` clickeable se comporte como botón
 * navegable por teclado (rol, tabIndex, y Enter/Espacio disparan el click).
 * Si no se pasa `onClick`, devuelve todo `undefined` y el elemento queda inerte.
 * Usado en {@link SellerTab} y {@link SettingRow}.
 *
 * @param onClick - Handler de clic. Si se omite, el elemento no es interactivo.
 */
export function clickableRowProps(onClick?: () => void) {
  return {
    role: onClick ? ("button" as const) : undefined,
    tabIndex: onClick ? 0 : undefined,
    onKeyDown: onClick
      ? (e: KeyboardEvent<HTMLElement>) => { if (e.key === "Enter" || e.key === " ") onClick(); }
      : undefined,
  };
}
