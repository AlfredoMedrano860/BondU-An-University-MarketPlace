import ProductCard from "./ProductCard";
import { products} from "../data/Product";
import type { Product } from "../data/Product";
 
interface ProductGridProps {
  onBuy: (product: Product) => void;
}
 

function ProductGrid({ onBuy }: ProductGridProps) {
  return (
    <div className="px-6 mt-6">
      
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={onBuy} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
