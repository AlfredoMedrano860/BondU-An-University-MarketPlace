import * as React from "react";
import { Accordion } from "radix-ui";
import { HelpCircle, ChevronDown } from "lucide-react";
import { faqItems } from "../data/Faq";

// https://www.radix-ui.com/primitives/docs/components/accordion

const FaqTrigger = React.forwardRef<HTMLButtonElement, { children: React.ReactNode } >(({ children }, ref) => (
  <Accordion.Header>
    <Accordion.Trigger ref={ref} className="accordion-trigger w-full flex items-center justify-between px-5 py-3 text-xs font-medium text-black text-left">
      {children}
      <ChevronDown size={15} className="accordion-chevron text-gray-400 shrink-0 ml-2" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));


const FaqContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <Accordion.Content ref={ref} className="accordion-content">
    <p className="px-5 pb-3 text-xs text-gray-500 leading-5">{children}</p>
  </Accordion.Content>
));


const MainTrigger = React.forwardRef<HTMLButtonElement,{ children: React.ReactNode }>(({ children }, ref) => (
  <Accordion.Header>
    <Accordion.Trigger ref={ref} className="accordion-trigger w-full flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        <HelpCircle size={22} className="text-black" />
        <span className="text-sm font-medium text-black">{children}</span>
      </div>
      <ChevronDown size={18} className="accordion-chevron text-gray-400" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

function FaqAccordion() {
  return (
    <Accordion.Root type="single" collapsible>

      
      <Accordion.Item value="faq">
        <MainTrigger>Preguntas Frecuentes</MainTrigger>

        <Accordion.Content className="accordion-content border-t border-beige">

         
          <Accordion.Root type="single" collapsible>
            {faqItems.map((item, i) => (
              <Accordion.Item key={i} value={`faq-${i}`}className="border-b border-beige last:border-b-0">
                <FaqTrigger>{item.question}</FaqTrigger>
                <FaqContent>{item.answer}</FaqContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>

        </Accordion.Content>
      </Accordion.Item>

    </Accordion.Root>
  );
}

export default FaqAccordion;