import { useTranslation } from "react-i18next";
import { Accordion } from "radix-ui";
import { ScrollText } from "lucide-react";
import { appVersion } from "../data/Terms";
import AccordionTrigger from "../ui/AccordionTrigger";

function TermsAccordion() {
  const { t } = useTranslation();

  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="terms">
        <AccordionTrigger icon={ScrollText}>{t("terms.title")}</AccordionTrigger>

        <Accordion.Content className="accordion-content border-t border-gray-200">
          <div className="px-5 pb-5 flex flex-col gap-5 pt-4">

            <div>
              <h3 className="text-sm font-bold color-primary mb-2">{t("terms.termsLabel")}</h3>
              <p className="text-xs text-gray-500 leading-5">{t("terms.termsText")}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold color-primary mb-2">{t("terms.privacyLabel")}</h3>
              <p className="text-xs text-gray-500 leading-5">{t("terms.privacyText")}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-400 text-center">{t("terms.version", { version: appVersion })}</p>
            </div>

          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default TermsAccordion;
