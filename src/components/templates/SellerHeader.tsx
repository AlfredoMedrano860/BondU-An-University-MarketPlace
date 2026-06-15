import type { Seller } from "../data/Seller";
import StarRating from "../ui/StarRating";

/**
 * Props de SellerHeader.
 */
interface SellerHeaderProps {
  /** Vendedor cuyo encabezado se muestra. */
  seller: Seller;
}

/**
 * Encabezado del perfil de vendedor con avatar, nombre, ubicación y puntuación.
 * Usado en {@link ProductScreen} dentro de la pestaña de vendedor.
 *
 * @param seller - Datos del vendedor a mostrar.
 */
export default function SellerHeader({ seller }: SellerHeaderProps) {
  return (
    <div className="flex flex-col items-center z-20 relative">
      <img
        src={seller.avatar}
        alt={seller.username}
        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow"
      />
      <h1 className="mt-4 text-4xl font-bold text-lime-600">
        {seller.username}
      </h1>
      <p className="text-lg text-gray-800">{seller.location}</p>

      <div className="mt-3">
        <StarRating rating={seller.rating} reviews={seller.reviews} />
      </div>
    </div>
  );
}
