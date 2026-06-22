import { useTranslation } from "react-i18next";
import ProductImagePicker from "../templates/ProductImagePicker";
import ProductForm from "../templates/ProductForm";
import { useAddProductForm } from "../../hooks/useAddProductForm";
import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";

interface AddProductScreenProps {
  onBack: () => void;
  currentUser: UserProfile;
  initialProduct?: Product;
}

function AddProductScreen({ onBack, currentUser, initialProduct }: AddProductScreenProps) {
  const { t } = useTranslation();
  const { fields, setters, handleSave } = useAddProductForm(currentUser, onBack, initialProduct);
  const title = initialProduct ? t("addProduct.editTitle") : t("addProduct.title");
  
  return (
    <div className="h-full bg-beige overflow-hidden overflow-y-auto no-scrollbar pb-28">
      <h1 className="color-primary text-[28px] md:text-[32px] font-bold text-center pt-6 pb-1">
        {title}
      </h1>
      <div className="md:grid md:grid-cols-2">
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
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductScreen;
