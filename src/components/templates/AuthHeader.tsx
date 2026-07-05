import iconoPerfil from "../../assets/imgs/IconoPerfil.webp";
import BackButton from "../ui/BackButton";

/**
 * Props de AuthHeader.
 */
interface AuthHeaderProps {
  /** Navega hacia atrás. */
  onBack: () => void;
  /** Título principal de la pantalla. */
  title: string;
  /** Descripción o subtítulo. */
  description: string;
}

/**
 * Cabecera compartida de las pantallas de autenticación.
 *
 * Incluye el botón de retroceso, el avatar de perfil, el título y la descripción.
 * Usado en {@link Login} y {@link SignUp}.
 *
 * @param onBack - Navega a la pantalla anterior.
 * @param title - Título principal de la pantalla.
 * @param description - Subtítulo o instrucción debajo del título.
 */
function AuthHeader({ onBack, title, description }: AuthHeaderProps) {
  return (
    <>
      <div className="absolute left-0 top-10 z-10">
        <BackButton onClick={onBack} />
      </div>

      <div className="flex justify-center mb-2">
        <div className="w-24 h-24 rounded-full bg-soft flex items-center justify-center overflow-hidden">
          <img src={iconoPerfil} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      <div>
        <h1 className="color-primary text-2xl font-bold">{title}</h1>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{description}</p>
      </div>
    </>
  );
}

export default AuthHeader;
