import ProductImagePicker from "../templates/ProductImagePicker";
import ProductForm from "../templates/ProductForm";
import { useAddProductForm } from "../../hooks/useAddProductForm";
import type { UserProfile } from "../data/UserProfile";

/**
 * Props de AddProductScreen.
 * @see UserProfile
 */
interface AddProductScreenProps {
  /** Navega a la pantalla anterior y descarta los cambios. */
  onBack: () => void;
  /** Usuario autenticado que publica el producto. */
  currentUser: UserProfile;
}

/**
 * Pantalla para publicar un nuevo producto en el marketplace.
 *
 * Combina la selección de imágenes y el formulario de datos del producto.
 * Usa {@link useAddProductForm} para manejar el estado y la validación,
 * y llama a {@link onBack} al guardar exitosamente.
 *
 * @param onBack - Navega a la pantalla anterior y descarta los cambios.
 * @param currentUser - Usuario autenticado que publica el producto.
 */
function AddProductScreen({ onBack, currentUser }: AddProductScreenProps) {
  const { fields, setters, error, handleSave } = useAddProductForm(currentUser, onBack);

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">

      {/* ── SELECTOR DE IMÁGENES ── máximo de imágenes definido en MAX_PRODUCT_IMAGES */}
      <ProductImagePicker
        gallery={fields.gallery}
        onGalleryChange={setters.setGallery}
        onBack={onBack}
      />

      {/* ── FORMULARIO ── nombre, precio, estado, descripción y mensaje de error */}
      <ProductForm
        name={fields.name}
        price={fields.price}
        state={fields.state}
        description={fields.description}
        error={error}
        onNameChange={setters.setName}
        onPriceChange={setters.setPrice}
        onStateChange={setters.setState}
        onDescriptionChange={setters.setDescription}
        onSave={handleSave}
      />

    </div>
  );
}

export default AddProductScreen;