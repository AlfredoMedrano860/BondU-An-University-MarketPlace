import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";

/**
 * Props de MyProductCard.
 */
interface MyProductCardProps {
  /** Producto a mostrar. */
  product: Product;
  /** Se ejecuta al hacer clic en el botón de eliminar con el ID del producto. */
  onRemove: (id: number) => void;
}

/**
 * Tarjeta compacta de producto propio con botón de eliminación.
 *
 * @param product - Producto a mostrar.
 * @param onRemove - Handler de eliminación por ID.
 */
function MyProductCard({ product, onRemove }: MyProductCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white-app rounded-3xl p-3 flex flex-col items-center gap-2">

      <div className="w-full h-28 rounded-2xl overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="w-full flex justify-between items-center px-1">
        <p className="text-sm font-semibold text-black">{product.name}</p>
        <span className="text-xs font-bold color-aux">${product.price}</span>
      </div>

      <p className="text-xs text-gray-400 w-full px-1">{product.state}</p>

      <button
        type="button"
        onClick={() => onRemove(product.id)}
        className="w-full h-8 rounded-full bg-aux text-white text-xs font-bold hover:opacity-90 active:scale-[0.98] transition-all duration-150"
      >
        {t("myProducts.delete")}
      </button>

    </div>
  );
}

export default MyProductCard;
