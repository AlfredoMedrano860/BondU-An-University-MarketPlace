import { useTranslation } from "react-i18next";
import ProductImagePicker from "../templates/ProductImagePicker";
import ProductForm from "../templates/ProductForm";
import { useAddProductForm } from "../../hooks/useAddProductForm";
import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";

/**
 * Props de AddProduct.
 */
interface AddProductProps {
  /** Navega hacia atrás. Se llama automáticamente al guardar exitosamente. */
  onBack: () => void;
  /** Usuario autenticado que será el vendedor del producto. */
  currentUser: UserProfile;
  /** Producto existente a editar. Si se omite, la pantalla opera en modo creación. */
  initialProduct?: Product;
}

/**
 * Pantalla de creación/edición de un producto, con selector de imágenes y formulario.
 *
 * El título y el comportamiento de guardado cambian según si se pasa `initialProduct`.
 * Delega el estado y la persistencia a {@link useAddProductForm}.
 *
 * @param onBack - Navega hacia atrás.
 * @param currentUser - Usuario autenticado que publica/edita el producto.
 * @param initialProduct - Producto a editar, si aplica.
 */
function AddProduct({ onBack, currentUser, initialProduct }: AddProductProps) {
  const { t } = useTranslation();
  const { fields, setters, handleSave, isSaving } = useAddProductForm(currentUser, onBack, initialProduct);
  const title = initialProduct ? t("addProduct.editTitle") : t("addProduct.title");

  return (
    <div className="h-full bg-beige overflow-y-auto no-scrollbar">
      <div className="pt-4 pb-2 text-center">
        <h1 className="text-2xl font-bold color-primary">{title}</h1>
      </div>
      <div className="pb-28 md:grid md:grid-cols-2">
        <div className="md:self-start">
          <ProductImagePicker gallery={fields.gallery} onGalleryChange={setters.setGallery} />
        </div>
        <div>
          <ProductForm
            name={fields.name}
            price={fields.price}
            state={fields.state}
            description={fields.description}
            onNameChange={setters.setName}
            onPriceChange={setters.setPrice}
            onStateChange={setters.setState}
            onDescriptionChange={setters.setDescription}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
