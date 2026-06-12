import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";

interface MyProductCardProps {
  product: Product;
  onRemove: (id: number) => void;
}

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
        onClick={() => onRemove(product.id)}
        className="w-full h-8 rounded-full bg-aux text-white text-xs font-bold"
      >
        {t("myProducts.delete")}
      </button>

    </div>
  );
}

export default MyProductCard;
