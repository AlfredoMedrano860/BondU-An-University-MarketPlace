//va a tener los datos de arriba, solo nombre, avatar, y ubicacion

import type { Seller } from "../data/Seller"
import StarRating from "../ui/StarRating"

interface SellerHeaderProps{
    seller: Seller
}

export default function SellerHeader({seller} :SellerHeaderProps){
    return(
        <div className="flex flex-col items-center">
            <img src={seller.avatar} alt={seller.username} className="h-28 w-28 rounded-full object-cover" />
            <h1 className="mt-4 text-4xl font-bold text-lime-600">{seller.username}</h1>
            <p className="text-lg text-gray-800">
                {seller.location}
            </p>

            <div className="mt-3">
                <StarRating
                rating={seller.rating}
                reviews={seller.reviews}
                />
            </div>
        </div>
)
}