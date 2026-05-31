//pantalla del perfil del vendendor
import SellerHeader from "../templates/SellerHeader";
import SellerStats from "../templates/SellerStats";
import BackButton from "../ui/BackButton";
import type { UserProfile } from "../data/UserProfile";
import Profile from "../templates/ProfileInfo";

interface ProfileScreenProps {
    currentUser: UserProfile;
    onBack: () => void;
}

export default function ProfileScreen({ currentUser, onBack }: ProfileScreenProps) {
    const sellerData = {
        ...currentUser,
        rating: currentUser.rating ?? 0,
        reviews: currentUser.reviews ?? 0,
        sales: currentUser.sales ?? 0,
    };

    return (

        <div className="min-h-screen bg-neutral-100">
        {/* Sección superior verde */}
        <section
        // circulo
            className="
                relative
                overflow-hidden
                bg-primary
                flex
                flex-col
                items-center
                pt-8
                pb-15
            "
            >
                    <div
                        className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    -top-[320px]
                    w-[140%]
                    h-[650px]
                    rounded-[50%]
                    bg-neutral-100
                    "
            />

            <div className="relative z-10 flex flex-col items-center w-full">

                <div className="absolute top-2 left-3">
                <BackButton onClick={onBack} />
                </div>

                <SellerHeader seller={sellerData} />

                <div className="mt-10">
                <SellerStats seller={sellerData} />
                </div>

            </div>
            </section>
        
        <Profile currentUser={currentUser} />

        </div>
    )
}