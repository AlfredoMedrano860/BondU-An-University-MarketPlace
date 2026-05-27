import { useState } from "react";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";

import AppHeader from "../templates/AppHeader";
import ProductGrid from "../templates/ProductGrid";
import BottomNav from "../templates/BottomNav";

interface FavoriteScreenProps{
    onNavigate: (screen: string) => void;
    currentUser: UserProfile;
}

function FavoriteScreen({onNavigate, currentUser}: FavoriteScreenProps){
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
return(
<div className="h-screen bg-beige overflow-y-auto no-scrollbar pb-55">

<AppHeader currentUser={currentUser} />
<ProductGrid onBuy={setSelectedProduct} />
<BottomNav onNavigate={onNavigate} currentScreen="favorite" />
</div>
);

}

export default FavoriteScreen;