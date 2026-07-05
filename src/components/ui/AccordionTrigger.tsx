import type { ReactNode } from "react";
import { Accordion } from "radix-ui";
import { ChevronDown, type LucideIcon } from "lucide-react";

/**
 * Props de AccordionTrigger.
 */
interface AccordionTriggerProps {
  /** Ícono de Lucide a mostrar antes del texto. */
  icon: LucideIcon;
  /** Texto del encabezado del acordeón. */
  children: ReactNode;
}

/**
 * Encabezado clickeable de un item de acordeón de Radix, con ícono y chevron
 * que rota al expandirse (vía la clase `accordion-chevron`).
 * Usado en {@link FaqAccordion}, {@link AboutAccordion} y {@link TermsAccordion}.
 *
 * @param icon - Ícono de Lucide a mostrar.
 * @param children - Texto del encabezado.
 */
function AccordionTrigger({ icon: Icon, children }: AccordionTriggerProps) {
  return (
    <Accordion.Header>
      <Accordion.Trigger className="accordion-trigger w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors duration-150">
        <div className="flex items-center gap-3">
          <Icon size={22} className="text-black" />
          <span className="text-sm font-medium text-black">{children}</span>
        </div>
        <ChevronDown size={18} className="accordion-chevron text-gray-400" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

export default AccordionTrigger;
