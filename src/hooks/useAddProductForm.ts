import { useState } from "react";
import { addProduct } from "../components/data/ProductStore";
import type { UserProfile } from "../components/data/UserProfile";

/**
 * Hook para manejar el estado y lógica del formulario de publicación de producto.
 *
 * Construye el objeto {@link Seller} a partir del {@link UserProfile} del usuario
 * autenticado antes de llamar a {@link addProduct}.
 * Al guardar exitosamente llama a {@link onBack} para volver a la pantalla anterior.
 * Usado en {@link AddProductScreen}.
 *
 * @param currentUser - Usuario autenticado que publica el producto.
 * @param onBack - Se ejecuta al guardar exitosamente para volver a la pantalla anterior.
 * @returns `fields` — valores actuales de los campos,
 * `setters` — funciones para actualizar cada campo,
 * `error` — mensaje de error de validación o vacío si no hay error,
 * `handleSave` — función que valida y publica el producto.
 */
export function useAddProductForm(currentUser: UserProfile, onBack: () => void) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [error, setError] = useState("");

  /**
   * Valida y publica el producto en el store.
   * Llama a {@link onBack} si es exitoso, o actualiza el error si falla.
   */
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