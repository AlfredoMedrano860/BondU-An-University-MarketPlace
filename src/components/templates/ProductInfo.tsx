/**
 * Props de ProductInfo.
 */
interface ProductInfoProps {
  /** Nombre del producto. */
  name: string;
  /** Precio del producto. */
  price: number;
  /** Estado del producto (Nuevo / Usado). */
  state: string;
}

/**
 * Información principal de un producto en la pantalla de detalle.
 *
 * Muestra el estado como badge, el nombre y el precio.
 * Usada en {@link ProductScreen} debajo de la galería de imágenes.
 *
 * @param name - Nombre del producto.
 * @param price - Precio del producto.
 * @param state - Estado del producto (Nuevo / Usado).
 */
function ProductInfo({ name, price, state }: ProductInfoProps) {
  return (
    <div>

      {/* Badge de estado */}
      <div className="flex justify-center mb-4">
        <span className="bg-primary text-white text-[11px] px-5 py-1 rounded-md font-medium">
          {state.toUpperCase()}
        </span>
      </div>

      {/* Nombre y precio */}
      <div className="text-center mb-6">
        <h1 className="color-primary text-[38px] font-bold leading-none">{name}</h1>
        <p className="text-black text-[28px] mt-2">${price}</p>
      </div>

    </div>
  );
}

export default ProductInfo;