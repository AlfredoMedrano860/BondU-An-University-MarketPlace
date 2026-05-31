/* 
100          100
Ventas     Reseñas*/

import type { Seller } from "../data/Seller";


interface SellerStatsProps{ 
    seller: Seller
}

export default function SellerStats({seller}: SellerStatsProps) {
    return (
        <div className="flex justify-center gap-16 text-center text-white">
            <div>
                <p className="text-3xl font-bold">{seller.sales}</p>
                <p>Ventas</p>
            </div>
            <div>
                <p className="text-3xl font-bold">{seller.reviews}</p>
                <p>Reseñas</p>
            </div>
        </div>
    )
}