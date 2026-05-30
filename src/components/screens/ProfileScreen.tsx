//pantalla del perfil del vendendor
import SellerHeader from "../templates/SellerHeader";
import SellerStats from "../templates/SellerStats";


import { sellers } from "../data/Seller";
import { useState } from "react";
import type { UserProfile } from "../data/UserProfile";
import Profile from "../templates/ProfileInfo";

interface ProfileScreenProps {
    currentUser: UserProfile;
}

export default function ProfileScreen({ currentUser }: ProfileScreenProps) {
    const [seller] = useState(sellers[0])

    return (

        <div className="min-h-screen bg-neutral-100">
        {/* Sección superior verde */}
        <section className="bg-primary flex flex-col items-center pt-8 pb-12">
            <SellerHeader seller={seller} />
            <div className="mt-8">
            <SellerStats seller={seller} />
            </div>
        </section>
        
        <Profile currentUser={currentUser} />

        </div>
    )
}