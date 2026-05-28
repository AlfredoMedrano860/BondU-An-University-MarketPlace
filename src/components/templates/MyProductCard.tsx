import type { Product } from "../data/Product";

/**
 * Props de MyProductCard.
 * @see Product
 */
interface MyProductCardProps {
  /** Producto a mostrar. */
  product: Product;
  /** Se ejecuta al presionar ELIMINAR con el ID del producto. */
  onRemove: (id: number) => void;
}

/**
 * Card de un producto publicado por el usuario.
 *
 * Muestra imagen, nombre, precio, estado y botón para eliminar.
 * Usado en {@link MyProductsScreen} dentro de la grilla de productos del usuario.
 *
 * @param product - Producto a mostrar.
 * @param onRemove - Se ejecuta al presionar ELIMINAR con el ID del producto.
 */
function MyProductCard({ product, onRemove }: MyProductCardProps) {
  return (
    <div className="bg-white-app rounded-3xl p-3 flex flex-col items-center gap-2">

      {/* Imagen */}
      <div className="w-full h-28 rounded-2xl overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Nombre y precio */}
      <div className="w-full flex justify-between items-center px-1">
        <p className="text-sm font-semibold text-black">{product.name}</p>
        <span className="text-xs font-bold color-aux">${product.price}</span>
      </div>

      {/* Estado del producto */}
      <p className="text-xs text-gray-400 w-full px-1">{product.state}</p>

      {/* Botón eliminar */}
      <button
        onClick={() => onRemove(product.id)}
        className="w-full h-8 rounded-full bg-aux text-white text-xs font-bold"
      >
        ELIMINAR
      </button>

    </div>
  );
}

export default MyProductCard;