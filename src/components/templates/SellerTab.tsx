import StarRating from "../ui/StarRating";
import type { Seller } from "../data/Seller";

interface SellerTabProps {
  seller: Seller;
}

function SellerTab({ seller }: SellerTabProps) {
  return (
    <div className="flex items-center gap-4 mt-2">

     
      <div className="w-20 h-20 rounded-full overflow-hidden bg-[hsl(35,33%,90%)] shrink-0 border-[3px] border-primary" >
        <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover"/>
      </div>

  
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold color-primary" > {seller.name}</p>
        <StarRating rating={seller.rating} reviews={seller.reviews} />
      </div>

    </div>
  );
}

export default SellerTab;