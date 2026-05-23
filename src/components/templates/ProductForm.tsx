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
  return (
    <div className="bg-[#eee7dd] px-4 pt-6 pb-10">

      <h1 className="color-primary text-[32px] font-bold text-center mb-6">Nuevo Producto</h1>

      <div className="flex flex-col gap-4">
        <InputSpace placeholder="Nombre del producto..." value={name} onChange={onNameChange} />
        <InputSpace placeholder="Precio del producto..." value={price} onChange={onPriceChange} />
        <InputSpace placeholder="Estado (Nuevo / Usado)..." value={state} onChange={onStateChange} />
        <InputSpace placeholder="Descripción del producto..." value={description} onChange={onDescriptionChange} multiline />
      </div>
      
      {error && <p className="text-red-500 text-sm text-left mt-3">{error}</p>}

      <div className="mt-8">
        <PrimaryButton text="GUARDAR" onClick={onSave} />
      </div>

    </div>
  );
}

export default ProductForm;