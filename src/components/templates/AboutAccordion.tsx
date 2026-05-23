import * as React from "react";
import { Accordion } from "radix-ui";
import { Info, ChevronDown } from "lucide-react";
import { developers, mision, vision } from "../data/About";

// https://www.radix-ui.com/primitives/docs/components/accordion

const AboutTrigger = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children }, ref) => (
  <Accordion.Header>
    <Accordion.Trigger ref={ref} className="accordion-trigger w-full flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        <Info size={22} className="text-black" />
        <span className="text-sm font-medium text-black">{children}</span>
      </div>
      <ChevronDown size={18} className="accordion-chevron text-gray-400" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

function AboutAccordion() {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="about">
        <AboutTrigger>Sobre Nosotros</AboutTrigger>

        <Accordion.Content className="accordion-content border-t border-beige">
          <div className="px-5 pb-5 flex flex-col gap-5 pt-4">

          
            <div>
              <h3 className="text-sm font-bold color-primary mb-1">Misión</h3>
              <p className="text-xs text-gray-500 leading-5"> {mision}</p>
            </div>


            <div className="border-t border-beige pt-4">
              <h3 className="text-sm font-bold color-primary mb-1">Visión</h3>
              <p className="text-xs text-gray-500 leading-5"> {vision}</p>
            </div>

           
            <div className="border-t border-beige pt-4">
              <h3 className="text-sm font-bold color-primary mb-3">El Equipo</h3>
              <div className="flex flex-col gap-4">
                {developers.map((dev, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-beige overflow-hidden shrink-0">
                      {dev.avatar ? <img src={dev.avatar} alt={dev.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-soft" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">{dev.name}</p>
                      <p className="text-xs color-primary">{dev.role}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-4">{dev.description}</p>
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