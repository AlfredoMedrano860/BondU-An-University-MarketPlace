import { useState } from "react";

export function useAccordion(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen(prev => !prev);
  return { open, toggle };
}

export function useAccordionIndex() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  return { openIndex, toggle };
}