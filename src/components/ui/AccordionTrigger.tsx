import { forwardRef, type ReactNode } from "react";
import { Accordion } from "radix-ui";
import { ChevronDown, type LucideIcon } from "lucide-react";

/**
 * Props de AccordionTrigger.
 */
interface AccordionTriggerProps {
  /** Ícono de Lucide que aparece a la izquierda del texto. */
  icon: LucideIcon;
  /** Texto o nodo del encabezado del acordeón. */
  children: ReactNode;
}

/**
 * Botón de encabezado para los acordeones de la app.
 *
 * Envuelve `Accordion.Trigger` de Radix UI con ícono de Lucide a la izquierda
 * y chevron animado a la derecha. Usado en {@link AboutAccordion},
 * {@link FaqAccordion} y {@link TermsAccordion}.
 *
 * @param icon - Ícono de Lucide a mostrar.
 * @param children - Contenido del encabezado.
 */
const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ icon: Icon, children }, ref) => (
    <Accordion.Header>
      <Accordion.Trigger ref={ref} className="accordion-trigger w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors duration-150">
        <div className="flex items-center gap-3">
          <Icon size={22} className="text-black" />
          <span className="text-sm font-medium text-black">{children}</span>
        </div>
        <ChevronDown size={18} className="accordion-chevron text-gray-400" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

export default AccordionTrigger;
