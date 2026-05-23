import { useState } from "react";
import BackButton from "../ui/BackButton";
import { getProductsByUser, removeProduct } from "../data/ProductStore";

interface MyProductsScreenProps {
  userId: number;
  onBack: () => void;
}

function MyProductsScreen({ userId, onBack }: MyProductsScreenProps) {
  const [, forceUpdate] = useState(0);
  const userProducts = getProductsByUser(userId);

  const handleRemove = (productId: number) => {
    removeProduct(productId);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">
      
      <div className="absolute top-10 left-3">
        <BackButton onClick={onBack} />
      </div>
      <div className="bg-primary px-6 pt-15 pb-16  text-center ">
        <h1 className="text-white text-xl font-bold">Mis Productos</h1>
      </div>

      <div className="px-5 -mt-8 pb-10">
        {userProducts.length === 0 ? (
          <div className="bg-white-app rounded-3xl p-8 flex flex-col items-center gap-2 mt-4">
            <p className="text-sm font-medium text-gray-400">No tenés productos publicados.</p>
            <p className="text-xs text-gray-400">Tocá el + para agregar uno.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {userProducts.map((product) => (
              <div key={product.id} className="bg-white-app rounded-3xl p-3 flex flex-col items-center gap-2">
                <div className="w-full h-28 rounded-2xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                </div>

                <div className="w-full flex justify-between items-center px-1">
                  <p className="text-sm font-semibold text-black"> {product.name}</p>
                  <span className="text-xs font-bold" style={{ color: "hsl(54,80%,63%)" }}> ${product.price}</span>
                </div>

                <p className="text-xs text-gray-400 w-full px-1"> {product.state} </p>

                <button onClick={() => handleRemove(product.id)}className="w-full h-8 rounded-full bg-aux text-white text-xs font-bold">
                  ELIMINAR
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProductsScreen;
