import StarRating from "../ui/StarRating";
import type { Seller } from "../data/Seller";
import { clickableRowProps } from "../../utils/accessibility";

/**
 * Props de SellerTab.
 */
interface SellerTabProps {
  /** Vendedor cuya información se muestra. */
  seller: Seller;
  /** Se ejecuta al hacer clic para navegar al perfil del vendedor. */
  onViewProfile?: () => void;
}

/**
 * Pestaña del vendedor en el detalle de un producto.
 *
 * Muestra avatar, nombre y calificación del vendedor. El clic navega al perfil
 * si se provee `onViewProfile`. Usado en {@link ProductTabs}.
 *
 * @param seller - Vendedor a mostrar.
 * @param onViewProfile - Navega al perfil del vendedor al hacer clic.
 */
function SellerTab({ seller, onViewProfile }: SellerTabProps) {
  const rowProps = clickableRowProps(onViewProfile);
  return (
    <div
      className={`flex items-center gap-4 mt-2 transition-opacity ${onViewProfile ? "cursor-pointer hover:opacity-80" : ""}`}
      onClick={onViewProfile}
      role={rowProps.role}
      tabIndex={rowProps.tabIndex}
      onKeyDown={rowProps.onKeyDown}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-[hsl(35,33%,90%)] shrink-0 border-[3px] border-primary">
        <img src={seller.avatar} alt={seller.username} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold color-primary">{seller.username}</p>
        <StarRating rating={seller.rating} reviews={seller.reviews} />
      </div>
    </div>
  );
}

export default SellerTab;
