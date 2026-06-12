import { useTranslation } from "react-i18next";
import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";

interface ProductFormProps {
  name: string;
  price: string;
  state: string;
  description: string;
  error: string;
  onNameChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
}

function ProductForm({ name, price, state, description, error, onNameChange, onPriceChange, onStateChange, onDescriptionChange, onSave }: ProductFormProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-beige px-6 sm:px-10 md:px-16 lg:px-20 pt-6 pb-10">

      <h1 className="color-primary text-[32px] font-bold text-center mb-6">{t("addProduct.title")}</h1>

      <div className="flex flex-col gap-4">
        <InputSpace placeholder={t("addProduct.namePlaceholder")} value={name} onChange={onNameChange} />
        <InputSpace placeholder={t("addProduct.pricePlaceholder")} value={price} onChange={onPriceChange} />
        <InputSpace placeholder={t("addProduct.statePlaceholder")} value={state} onChange={onStateChange} />
        <InputSpace placeholder={t("addProduct.descriptionPlaceholder")} value={description} onChange={onDescriptionChange} multiline />
      </div>

      {error && <p className="text-red-500 text-sm text-left mt-3">{error}</p>}

      <div className="mt-8">
        <PrimaryButton text={t("addProduct.save")} onClick={onSave} />
      </div>

    </div>
  );
}

export default ProductForm;
