import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de ProductForm.
 */
interface ProductFormProps {
  /** Nombre del producto. */
  name: string;
  /** Precio del producto como string para permitir entrada parcial. */
  price: string;
  /** Estado del producto (Nuevo / Usado). */
  state: string;
  /** Descripción del producto. */
  description: string;
  /** Mensaje de error de validación. Vacío si no hay error. */
  error: string;
  /** Actualiza el nombre del producto. */
  onNameChange: (value: string) => void;
  /** Actualiza el precio del producto. */
  onPriceChange: (value: string) => void;
  /** Actualiza el estado del producto. */
  onStateChange: (value: string) => void;
  /** Actualiza la descripción del producto. */
  onDescriptionChange: (value: string) => void;
  /** Intenta guardar el producto con los datos actuales. */
  onSave: () => void;
}

/**
 * Formulario para publicar un nuevo producto.
 *
 * Contiene los campos de nombre, precio, estado y descripción.
 * Muestra un mensaje de error si la validación falla.
 * El estado y la lógica de guardado se manejan en {@link useAddProductForm}.
 *
 * @param name - Nombre del producto.
 * @param price - Precio del producto.
 * @param state - Estado del producto (Nuevo / Usado).
 * @param description - Descripción del producto.
 * @param error - Mensaje de error de validación.
 * @param onNameChange - Actualiza el nombre del producto.
 * @param onPriceChange - Actualiza el precio del producto.
 * @param onStateChange - Actualiza el estado del producto.
 * @param onDescriptionChange - Actualiza la descripción del producto.
 * @param onSave - Intenta guardar el producto con los datos actuales.
 */
function ProductForm({ name, price, state, description, error, onNameChange, onPriceChange, onStateChange, onDescriptionChange, onSave }: ProductFormProps) {
  return (
    <div className="bg-[#eee7dd] px-4 pt-6 pb-10">

      {/* ── TÍTULO ── */}
      <h1 className="color-primary text-[32px] font-bold text-center mb-6">Nuevo Producto</h1>

      {/* ── CAMPOS ── */}
      <div className="flex flex-col gap-4">
        <InputSpace placeholder="Nombre del producto..." value={name} onChange={onNameChange} />
        <InputSpace placeholder="Precio del producto..." value={price} onChange={onPriceChange} />
        <InputSpace placeholder="Estado (Nuevo / Usado)..." value={state} onChange={onStateChange} />
        <InputSpace placeholder="Descripción del producto..." value={description} onChange={onDescriptionChange} multiline />
      </div>

      {/* Mensaje de error ── reemplazar con sistema de notificaciones */}
      {error && <p className="text-red-500 text-sm text-left mt-3">{error}</p>}

      {/* ── GUARDAR ── */}
      <div className="mt-8">
        <PrimaryButton text="GUARDAR" onClick={onSave} />
      </div>

    </div>
  );
}

export default ProductForm;