import StarRating from "../ui/StarRating";
import type { Seller } from "../data/Seller";

/**
 * Props de SellerTab.
 * @see Seller
 */
interface SellerTabProps {
  /** Vendedor del producto a mostrar. */
  seller: Seller;
}

/**
 * Tab de información del vendedor en la pantalla de detalle de producto.
 *
 * Muestra el avatar, nombre y calificación del vendedor.
 * Usado en {@link ProductTabs} cuando el tab "Vendedor" está activo.
 *
 * @param seller - Vendedor del producto a mostrar.
 */
function SellerTab({ seller }: SellerTabProps) {
  return (
    <div className="flex items-center gap-4 mt-2">

      {/* Avatar del vendedor */}
      <div className="w-20 h-20 rounded-full overflow-hidden bg-[hsl(35,33%,90%)] shrink-0 border-[3px] border-primary">
        <img src={seller.avatar} alt={seller.username} className="w-full h-full object-cover" />
      </div>

      {/* Nombre y calificación */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold color-primary">{seller.username}</p>
        <StarRating rating={seller.rating} reviews={seller.reviews} />
      </div>

    </div>
  );
}

export default SellerTab;