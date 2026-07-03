import { useTranslation } from "react-i18next";
import logo from "../../assets/imgs/logo.png";
import cara from "../../assets/imgs/CaraMascota.png";
import brazos from "../../assets/imgs/BrazosMascota.png";
import AppButton from "../ui/AppButton";
import AuthLayout from "../layout/AuthLayout";

/**
 * Props de WelcomeScreen.
 */
interface WelcomeScreenProps {
  /** Navega a la pantalla de inicio de sesión. */
  onLogin: () => void;
  /** Vuelve a la pantalla de carga (botón "salir"). */
  onExit: () => void;
}

/**
 * Pantalla de bienvenida con logo, mascota animada y botones de acceso.
 *
 * Es la primera pantalla que ve el usuario al abrir la app (tras el onboarding).
 * Usa {@link AuthLayout} para el panel bicolor.
 *
 * @param onLogin - Navega a {@link LoginScreen}.
 * @param onExit - Vuelve a la pantalla de carga.
 */
function WelcomeScreen({ onLogin, onExit }: WelcomeScreenProps) {
  const { t } = useTranslation();

  return (
    <AuthLayout>
      <div className="flex flex-col items-center pt-10 gap-3 px-6">
        <img src={logo} alt="logo" className="w-44 md:w-52" />
      </div>

      <div className="flex-1 relative min-h-64">
        <img src={cara} alt="Cara mascota" className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 w-64 md:w-80"/>
        <img src={brazos} alt="Brazos mascota" className="absolute bottom-0 left-1/2 translate-x-[-51%] z-20 w-80 md:w-96"
        />
      </div>

      <div className="px-8 pb-10 pt-6">
        <div className="max-w-sm w-full mx-auto flex flex-col gap-4">
          <AppButton text={t("welcome.login")} onClick={onLogin} />
          <AppButton variant="secondary" text={t("welcome.exit")} onClick={onExit} />
        </div>
      </div>
      
    </AuthLayout>
  );
}

export default WelcomeScreen;
