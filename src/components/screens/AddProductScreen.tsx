import ProductImagePicker from "../templates/ProductImagePicker";
import ProductForm from "../templates/ProductForm";
import { useAddProductForm } from "../../hooks/useAddProductForm";
import type { UserProfile } from "../data/UserProfile";

interface AddProductScreenProps {
  onBack: () => void;
  currentUser: UserProfile;
}

function AddProductScreen({ onBack, currentUser }: AddProductScreenProps) {
  const { fields, setters, error, handleSave } = useAddProductForm(currentUser, onBack);

  return (
    <div className="h-screen bg-[#eee7dd] overflow-y-auto no-scrollbar">
      <ProductImagePicker gallery={fields.gallery} onGalleryChange={setters.setGallery} onBack={onBack} />
      <ProductForm name={fields.name} price={fields.price} state={fields.state} description={fields.description} error={error} onNameChange={setters.setName} onPriceChange={setters.setPrice} onStateChange={setters.setState} onDescriptionChange={setters.setDescription} onSave={handleSave}/>
    </div>
  );
}

export default AddProductScreen;