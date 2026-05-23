import { useState } from "react";
import { addProduct } from "../components/data/ProductStore";
import type { UserProfile } from "../components/data/UserProfile";

export function useAddProductForm(currentUser: UserProfile, onBack: () => void) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSave = () => {
    const result = addProduct({
      name,
      price: parseFloat(price),
      state,
      image: gallery[0] ?? "",
      gallery,
      description,
      seller: {
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        password: "",
        avatar: currentUser.avatar,
        createdAt: currentUser.createdAt,
        rating: 0,
        reviews: 0,
      },
    });

    if (result.ok) {
      onBack();
    } else {
      setError(result.error);
    }
  };

  return {
    fields: { name, price, state, description, gallery },
    setters: { setName, setPrice, setState, setDescription, setGallery },
    error,
    handleSave,
  };
}