import * as React from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "radix-ui";
import { HelpCircle, ChevronDown } from "lucide-react";

const FaqTrigger = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children }, ref) => (
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

const MainTrigger = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children }, ref) => (
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
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="faq">
        <MainTrigger>{t("faq.title")}</MainTrigger>

        <Accordion.Content className="accordion-content border-t border-beige">
          <Accordion.Root type="single" collapsible>
            {items.map((faqItem) => (
              <Accordion.Item key={faqItem.question} value={faqItem.question} className="border-b border-beige last:border-b-0">
                <FaqTrigger>{faqItem.question}</FaqTrigger>
                <FaqContent>{faqItem.answer}</FaqContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default FaqAccordion;
