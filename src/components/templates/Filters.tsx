import { useState } from "react";
import { useTranslation } from "react-i18next";
import { XIcon } from "@phosphor-icons/react";
import CircleButton from "../ui/CircleButton";
import AppButton from "../ui/AppButton";

const ESTADO_VALUES = ["Nuevo", "Usado", "Detalle"] as const;
const BOTON_CHIP    = "px-3 py-2 rounded-full text-sm font-semibold transition-all duration-150 flex-1";
export const MAX_PRECIO = 500;

export interface FilterValues {
  estado: string;
  precio: number;
}

interface FiltersProps {
  initialEstado?: string;
  initialPrecio?: number;
  onApply: (filters: FilterValues) => void;
  onClose?: () => void;
  className?: string;
}

function Filtros({ initialEstado = "", initialPrecio = MAX_PRECIO, onApply, onClose, className = "rounded-3xl" }: FiltersProps) {
  const { t } = useTranslation();
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(initialEstado);
  const [precio, setPrecio] = useState(initialPrecio);

  function toggleEstado(valor: string) {
    setEstadoSeleccionado(prev => prev === valor ? "" : valor);
  }

  const sinLimite = precio >= MAX_PRECIO;

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

        {/* Estado */}
        <div>
          <p className="text-xs font-bold color-secondary uppercase tracking-widest mb-3">
            {t("filters.state")}
          </p>
          <div className="flex gap-2">
            {ESTADO_VALUES.map((valor) => (
              <button
                key={valor}
                onClick={() => toggleEstado(valor)}
                className={`${BOTON_CHIP} ${
                  estadoSeleccionado === valor
                    ? "bg-primary text-white shadow-sm"
                    : "bg-beige color-inactive border border-gray-200"
                }`}
              >
                {t(`filters.states.${valor}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Precio */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold color-secondary uppercase tracking-widest">
              {t("filters.maxPrice")}
            </p>
            <span className={`text-sm font-bold ${sinLimite ? "color-inactive" : "color-primary"}`}>
              {sinLimite ? t("filters.noLimit") : `$${precio}`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={MAX_PRECIO}
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className="w-full accent-(--color-primary) cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs color-inactive">$0</span>
            <span className="text-xs color-inactive">${MAX_PRECIO}</span>
          </div>
        </div>

        <AppButton
          text={t("filters.apply")}
          onClick={() => onApply({ estado: estadoSeleccionado, precio })}
        />

      </div>
    </div>
  );
}

export default Filtros;
