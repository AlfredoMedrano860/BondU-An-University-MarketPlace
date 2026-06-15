import type { UserProfile } from "../data/UserProfile";
import type { Product } from "../data/Product";
import type { ProfileChoice } from "../data/Navigation";
import { useProfileData } from "../../hooks/useProfileData";
import ProfileContact from "./ProfileContact";
import ProfileProducts from "./ProfileProducts";
import ProfileReviews from "./ProfileReviews";

export type { ProfileChoice as Choice };

/**
 * Props de ProfileInfo.
 */
interface ProfileInfoProps {
  /** Pestaña activa: `"contacto"`, `"productos"` o `"reseñas"`. */
  choice: ProfileChoice;
  /** Usuario cuyo perfil se está mostrando. */
  currentUser: UserProfile;
  /** Indica si el perfil es del usuario autenticado. Por defecto `true`. */
  isOwnProfile?: boolean;
  /** Usuario que puede escribir una reseña. Solo aplica en perfiles ajenos. */
  reviewer?: UserProfile;
  /** Se ejecuta al editar un producto (perfil propio). */
  onEdit: (product: Product) => void;
  /** Se ejecuta al comprar un producto (perfil ajeno). */
  onBuyProduct?: (product: Product) => void;
  /** Se ejecuta al hacer clic en el avatar de un reseñador. */
  onViewReviewer?: (reviewerId: number) => void;
}

/**
 * Coordinador de las pestañas del perfil de usuario.
 *
 * Delega la carga de datos a {@link useProfileData} y renderiza
 * el sub-componente correspondiente a la pestaña activa.
 * Usado en {@link ProfileScreen}.
 *
 * @param currentUser - Usuario cuyo perfil se muestra.
 * @param choice - Pestaña activa.
 * @param isOwnProfile - Si `true`, habilita acciones de edición y eliminación.
 * @param reviewer - Usuario autenticado para el formulario de reseña.
 * @param onEdit - Handler de edición de producto.
 * @param onBuyProduct - Handler de compra de producto.
 * @param onViewReviewer - Navega al perfil de un reseñador.
 */
export function ProfileInfo({ currentUser, choice, isOwnProfile = true, reviewer, onEdit, onBuyProduct, onViewReviewer }: ProfileInfoProps) {
  const { userProducts, reviews, handleDelete } = useProfileData(currentUser.id);

  return (
    <div>
      {choice === "contacto" && (
        <ProfileContact currentUser={currentUser} />
      )}
      {choice === "productos" && (
        <ProfileProducts
          userProducts={userProducts}
          isOwnProfile={isOwnProfile}
          onEdit={onEdit}
          onBuyProduct={onBuyProduct ?? (() => {})}
          onDelete={handleDelete}
        />
      )}
      {choice === "reseñas" && (
        <ProfileReviews
          reviews={reviews}
          isOwnProfile={isOwnProfile}
          reviewer={reviewer}
          sellerId={currentUser.id}
          onViewReviewer={onViewReviewer}
        />
      )}
    </div>
  );
}

export default ProfileInfo;
