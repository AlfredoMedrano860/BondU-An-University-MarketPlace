/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva } from "class-variance-authority";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { XIcon } from "@phosphor-icons/react";
import CircleButton from "./CircleButton";
import AppButton from "./AppButton";
import { stateValues, maxPrice } from "../data/Filters";
import type { FilterValues } from "../data/Filters";

const chip = cva(
  "px-3 py-2 rounded-full text-sm font-semibold transition-all duration-150 flex-1",
  {
    variants: {
      selected: {
        true:  "bg-primary text-white shadow-sm",
        false: "bg-beige color-inactive border border-gray-200",
      },
    },
    defaultVariants: { selected: false },
  }
);

/**
 * Props de Filters.
 */
interface FiltersProps {
  /** Estado seleccionado al abrir el panel. Por defecto sin filtro. */
  initialState?: string;
  /** Precio máximo seleccionado al abrir el panel. Por defecto sin límite. */
  initialPrice?: number;
  /** Se ejecuta al presionar "Aplicar" con los filtros seleccionados. */
  onApply: (filters: FilterValues) => void;
  /** Se ejecuta al cerrar el panel (botón X). */
  onClose?: () => void;
  /** Clases extra de Tailwind, típicamente para el radio de los bordes. */
  className?: string;
}

/**
 * Formulario de filtros de producto: estado (Nuevo/Usado/Detalle) y precio máximo.
 * Usado en {@link FilterPanel}.
 *
 * @param initialState - Estado con el que se abre el panel.
 * @param initialPrice - Precio máximo con el que se abre el panel.
 * @param onApply - Se ejecuta al aplicar los filtros.
 * @param onClose - Se ejecuta al cerrar el panel.
 * @param className - Clases extra de Tailwind.
 */
function Filters({ initialState = "", initialPrice = maxPrice, onApply, onClose, className = "rounded-3xl" }: FiltersProps) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState(initialState);
  const [price, setPrice] = useState(initialPrice);

  function toggleState(value: string) {
    setSelectedState(prev => prev === value ? "" : value);
  }

  const noLimit = price >= maxPrice;

  return (
    <div className={`w-full bg-white-app overflow-hidden shadow-xl ${className}`}>

      {/* Header */}
      <div className="bg-primary px-6 pt-6 pb-5 flex items-center justify-between">
        <div className="w-8" />
        <h2 className="text-xl font-bold text-white tracking-wide">
          {t("filters.title")}
        </h2>
        <CircleButton size="md" variant="ghost" onClick={onClose}>
          <XIcon size={20} color="white" weight="bold" />
        </CircleButton>
      </div>

      {/* Body */}
      <div className="px-6 pt-5 pb-6 flex flex-col gap-5">

        {/* State */}
        <div>
          <p className="text-xs font-bold color-secondary uppercase tracking-widest mb-3">
            {t("filters.state")}
          </p>
          <div className="flex gap-2">
            {stateValues.map((value) => (
              <button
                key={value}
                onClick={() => toggleState(value)}
                className={chip({ selected: selectedState === value })}
              >
                {t(`filters.states.${value}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Price */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold color-secondary uppercase tracking-widest">
              {t("filters.maxPrice")}
            </p>
            <span className={`text-sm font-bold ${noLimit ? "color-inactive" : "color-primary"}`}>
              {noLimit ? t("filters.noLimit") : `$${price}`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-(--color-primary) cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs color-inactive">$0</span>
            <span className="text-xs color-inactive">${maxPrice}</span>
          </div>
        </div>

        <AppButton
          text={t("filters.apply")}
          onClick={() => onApply({ state: selectedState, price })}
        />

      </div>
    </div>
  );
}

export default Filters;
