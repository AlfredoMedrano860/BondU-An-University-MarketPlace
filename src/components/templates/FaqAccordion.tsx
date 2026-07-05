import { useTranslation } from "react-i18next";
import { Accordion } from "radix-ui";
import { HelpCircle, ChevronDown } from "lucide-react";
import AccordionTrigger from "../ui/AccordionTrigger";

/**
 * Acordeón de preguntas frecuentes anidado dentro de un acordeón exterior.
 *
 * Las preguntas y respuestas se leen de i18n bajo la clave `faq.items`.
 * Usado en {@link Settings}.
 */
function FaqAccordion() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="faq">
        <AccordionTrigger icon={HelpCircle}>{t("faq.title")}</AccordionTrigger>

        <Accordion.Content className="accordion-content border-t border-gray-200">
          <Accordion.Root type="single" collapsible>
            {items.map((faqItem) => (
              <Accordion.Item key={faqItem.question} value={faqItem.question} className="border-b border-gray-200 last:border-b-0">
                <Accordion.Header>
                  <Accordion.Trigger className="accordion-trigger w-full flex items-center justify-between px-5 py-3 text-xs font-medium text-black text-left hover:bg-gray-50 transition-colors duration-150">
                    {faqItem.question}
                    <ChevronDown size={15} className="accordion-chevron text-gray-400 shrink-0 ml-2" aria-hidden />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="accordion-content">
                  <p className="px-5 pb-3 text-xs text-gray-500 leading-5">{faqItem.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default FaqAccordion;
