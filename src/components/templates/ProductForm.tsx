import { useTranslation } from "react-i18next";
import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";

interface ProductFormProps {
  name: string;
  price: string;
  state: string;
  description: string;
  onNameChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
}

function ProductForm({ name, price, state, description, onNameChange, onPriceChange, onStateChange, onDescriptionChange, onSave }: ProductFormProps) {
  const { t } = useTranslation();

  return (
    <div className="px-6 sm:px-10 md:px-12 lg:px-16 pt-6 pb-10">

      <p className="text-sm font-semibold color-text mb-3">{t("addProduct.details")}</p>

      <div className="bg-white-app rounded-3xl p-6 flex flex-col gap-4">
        <InputSpace placeholder={t("addProduct.namePlaceholder")}        hint="Ej: Calculadora científica"            value={name}        onChange={onNameChange} />
        <InputSpace placeholder={t("addProduct.pricePlaceholder")}       hint="Ej: ₡5.000"                           value={price}       onChange={onPriceChange} />
        <InputSpace placeholder={t("addProduct.statePlaceholder")}       hint="Ej: Usado, buen estado"               value={state}       onChange={onStateChange} />
        <InputSpace placeholder={t("addProduct.descriptionPlaceholder")} hint="Ej: Incluye accesorios y garantía..." value={description} onChange={onDescriptionChange} multiline />
      </div>

      <div className="mt-6">
        <PrimaryButton text={t("addProduct.save")} onClick={onSave} />
      </div>
    </div>
  
  );
}

export default ProductForm;
