import { useTranslation } from "react-i18next";
import { Accordion } from "radix-ui";
import { Info } from "lucide-react";
import { developers } from "../data/About";
import AccordionTrigger from "../ui/AccordionTrigger";

function AboutAccordion() {
  const { t } = useTranslation();

  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="about">
        <AccordionTrigger icon={Info}>{t("about.title")}</AccordionTrigger>

        <Accordion.Content className="accordion-content border-t border-gray-200">
          <div className="px-5 pb-5 flex flex-col gap-5 pt-4">

            <div>
              <h3 className="text-sm font-bold color-primary mb-1">{t("about.missionLabel")}</h3>
              <p className="text-xs text-gray-500 leading-5">{t("about.missionText")}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold color-primary mb-1">{t("about.visionLabel")}</h3>
              <p className="text-xs text-gray-500 leading-5">{t("about.visionText")}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold color-primary mb-3">{t("about.teamLabel")}</h3>
              <div className="flex flex-col gap-4">
                {developers.map((developer) => (
                  <div key={developer.name} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-beige overflow-hidden shrink-0">
                      {developer.avatar
                        ? <img src={developer.avatar} alt={developer.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-soft" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">{developer.name}</p>
                      <p className="text-xs color-primary">{developer.role}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-4">{developer.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default AboutAccordion;
