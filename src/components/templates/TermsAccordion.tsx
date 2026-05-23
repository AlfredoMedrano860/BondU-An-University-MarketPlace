import * as React from "react";
import { Accordion } from "radix-ui";
import { ScrollText, ChevronDown } from "lucide-react";
import { terminos, privacidad, appVersion } from "../data/Terms"; 

//https://www.radix-ui.com/primitives/docs/components/accordion

const TermsTrigger = React.forwardRef<HTMLButtonElement,{ children: React.ReactNode }>(({ children }, ref) => (
  <Accordion.Header>
    <Accordion.Trigger ref={ref} className="accordion-trigger w-full flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        <ScrollText size={22} className="text-black" />
        <span className="text-sm font-medium text-black">{children}</span>
      </div>
      <ChevronDown size={18} className="accordion-chevron text-gray-400" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

function TermsAccordion() {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="terms">
        <TermsTrigger>Términos y Privacidad</TermsTrigger>

        <Accordion.Content className="accordion-content border-t border-beige">
          <div className="px-5 pb-5 flex flex-col gap-5 pt-4">

            <div>
              <h3 className="text-sm font-bold color-primary mb-2">Términos y Condiciones</h3>
              <p className="text-xs text-gray-500 leading-5"> {terminos} </p>
            </div>

            <div className="border-t border-beige pt-4">
              <h3 className="text-sm font-bold color-primary mb-2">Política de Privacidad</h3>
              <p className="text-xs text-gray-500 leading-5"> {privacidad} </p>
            </div>

            <div className="border-t border-beige pt-4">
              <p className="text-xs text-gray-400 text-center">Versión {appVersion}</p>
            </div>

          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default TermsAccordion;