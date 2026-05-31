import { useState, useEffect } from "react";
import BackButton from "../ui/BackButton";
import MyProductCard from "../templates/MyProductCard";
import EmptyState from "../ui/EmptyState";
import type { Product } from "../data/Product";
import { getProductsByUser, removeProduct, subscribeProducts } from "../data/ProductStore";

/**
 * Props de MyProductsScreen.
 */
interface MyProductsScreenProps {
  /** ID del usuario autenticado para filtrar sus productos. */
  userId: number;
  /** Navega a la pantalla anterior. */
  onBack: () => void;
}

/**
 * Pantalla de gestión de productos publicados por el usuario.
 *
 * Muestra los productos del usuario en una grilla usando {@link MyProductCard}.
 * Permite eliminar productos individualmente.
 * Si no tiene productos publicados muestra {@link EmptyState}.
 *
 * @param userId - ID del usuario autenticado para filtrar sus productos.
 * @param onBack - Navega a la pantalla anterior.
 */
function MyProductsScreen({ userId, onBack }: MyProductsScreenProps) {
  const [userProducts, setUserProducts] = useState<Product[]>(getProductsByUser(userId));

  useEffect(() => {
    const unsub = subscribeProducts(() => setUserProducts(getProductsByUser(userId)));
    return unsub;
  }, [userId]);

  /**
   * Elimina un producto del store; suscripciones actualizarán la lista.
   * @param productId - ID del producto a eliminar.
   */
  const handleRemove = (productId: number) => {
    removeProduct(productId);
  };

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">

      {/* ── HEADER ── */}
      <div className="absolute top-10 left-3">
        <BackButton onClick={onBack} />
      </div>
      <div className="bg-primary px-6 pt-15 pb-16 text-center">
        <h1 className="text-white text-xl font-bold">Mis Productos</h1>
      </div>

      {/* ── CONTENIDO ── grilla de productos o estado vacío */}
      <div className="px-5 -mt-8 pb-10">
        {userProducts.length === 0
          ? <EmptyState message="No tenés productos publicados" />
          : <div className="grid grid-cols-2 gap-4 mt-4">
              {userProducts.map((product) => (
                <MyProductCard key={product.id} product={product} onRemove={handleRemove} />
              ))}
            </div>
        }
      </div>

    </div>
  );
}

export default MyProductsScreen;