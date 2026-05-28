import { useState } from "react";

/**
 * Hook para manejar el estado abierto/cerrado de un acordeón individual.
 *
 * @param defaultOpen - Estado inicial del acordeón. Por defecto `false`.
 * @returns `open` — estado actual, `toggle` — función para invertirlo.
 */
export function useAccordion(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen(prev => !prev);
  return { open, toggle };
}

/**
 * Hook para manejar el estado de un grupo de acordeones donde solo
 * uno puede estar abierto a la vez.
 *
 * @returns `openIndex` — índice del acordeón abierto o `null` si ninguno lo está,
 * `toggle` — función que abre el acordeón en el índice dado o lo cierra si ya estaba abierto.
 */
export function useAccordionIndex() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  return { openIndex, toggle };
}