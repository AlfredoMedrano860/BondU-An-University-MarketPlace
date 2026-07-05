import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Command } from "cmdk";
import { ChevronDown } from "lucide-react";
import InputSpace from "../ui/InputSpace";
import AppButton from "../ui/AppButton";
import ComboboxList from "../ui/ComboboxList";
import { stateValues } from "../data/Filters";

/**
 * Props de ProductForm.
 */
interface ProductFormProps {
  /** Nombre del producto. */
  name: string;
  /** Precio del producto, como string (viene directo del input). */
  price: string;
  /** Estado del producto (Nuevo/Usado/Detalle). */
  state: string;
  /** Descripción del producto. */
  description: string;
  /** Se ejecuta al cambiar el nombre. */
  onNameChange: (value: string) => void;
  /** Se ejecuta al cambiar el precio. */
  onPriceChange: (value: string) => void;
  /** Se ejecuta al seleccionar un estado. */
  onStateChange: (value: string) => void;
  /** Se ejecuta al cambiar la descripción. */
  onDescriptionChange: (value: string) => void;
  /** Se ejecuta al presionar Guardar. */
  onSave: () => void;
  /** Deshabilita el botón de guardar mientras se procesa. Por defecto `false`. */
  isSaving?: boolean;
}

/**
 * Formulario de datos de un producto: nombre, precio, estado y descripción.
 *
 * El selector de estado es un combobox propio construido sobre `cmdk`
 * (mismo patrón que {@link SearchBar}), con cierre al hacer clic afuera.
 * Usado en {@link AddProduct}.
 *
 * @param name - Nombre del producto.
 * @param price - Precio del producto.
 * @param state - Estado seleccionado.
 * @param description - Descripción del producto.
 * @param onNameChange - Se ejecuta al cambiar el nombre.
 * @param onPriceChange - Se ejecuta al cambiar el precio.
 * @param onStateChange - Se ejecuta al seleccionar un estado.
 * @param onDescriptionChange - Se ejecuta al cambiar la descripción.
 * @param onSave - Se ejecuta al presionar Guardar.
 * @param isSaving - Deshabilita el botón de guardar mientras se procesa.
 */
function ProductForm({ name, price, state, description, onNameChange, onPriceChange, onStateChange, onDescriptionChange, onSave, isSaving = false }: ProductFormProps) {
  const { t } = useTranslation();
  const [stateOpen, setStateOpen] = useState(false);
  const stateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stateOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (stateRef.current && !stateRef.current.contains(e.target as Node)) {
        setStateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [stateOpen]);

  function selectState(value: string) {
    onStateChange(value);
    setStateOpen(false);
  }

  return (
    <div className="px-6 sm:px-10 md:px-12 lg:px-16 pt-6 pb-10">

      <p className="text-sm font-semibold color-text mb-3">{t("addProduct.details")}</p>

      <div className="bg-white-app rounded-3xl p-6 flex flex-col gap-4">
        <InputSpace placeholder={t("addProduct.namePlaceholder")} hint="Ej: Calculadora científica"           value={name}        onChange={onNameChange} />
        <InputSpace placeholder={t("addProduct.pricePlaceholder")} hint="Ej: ₡5.000"                           value={price}       onChange={onPriceChange} />

        <div className="w-full space-y-1.5" ref={stateRef}>
          <label className="block text-sm font-medium text-gray-700 px-1">{t("addProduct.statePlaceholder")}</label>
          <Command shouldFilter={false} className="relative">
            <button
              type="button"
              onClick={() => setStateOpen((open) => !open)}
              className={`w-full h-14 rounded-full pl-5 pr-11 bg-input text-sm text-left transition-colors ${state ? "text-black" : "text-gray-400"}`}
            >
              {state ? t(`filters.states.${state}`) : t("addProduct.statePlaceholder")}
            </button>
            <ChevronDown
              size={18}
              className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${stateOpen ? "rotate-180" : ""}`}
            />

            {stateOpen && (
              <ComboboxList
                items={stateValues}
                getKey={(value) => value}
                getValue={(value) => value}
                onSelect={selectState}
              >
                {(value) => (
                  <div className={`px-5 py-3 text-sm ${state === value ? "bg-primary text-white font-semibold" : "text-black"}`}>
                    {t(`filters.states.${value}`)}
                  </div>
                )}
              </ComboboxList>
            )}
          </Command>
        </div>

        <InputSpace placeholder={t("addProduct.descriptionPlaceholder")} hint="Ej: Incluye accesorios y garantía..." value={description} onChange={onDescriptionChange} multiline />
      </div>

      <div className="mt-6">
        <AppButton text={t("addProduct.save")} onClick={onSave} disabled={isSaving} />
      </div>
    </div>
  
  );
}

export default ProductForm;
