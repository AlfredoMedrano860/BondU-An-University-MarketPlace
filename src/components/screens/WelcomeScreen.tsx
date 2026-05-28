import logo from "../../assets/imgs/logo.png";
import cara from "../../assets/imgs/CaraMascota.png";
import brazos from "../../assets/imgs/BrazosMascota.png";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

/**
 * Props de WelcomeScreen.
 */
interface WelcomeScreenProps {
  /** Navega a la pantalla de inicio de sesión. */
  onLogin: () => void;
}

/**
 * Pantalla de bienvenida de la aplicación.
 *
 * Es la primera pantalla que ve el usuario al abrir la app.
 * Muestra el logo, la mascota y los botones para iniciar sesión o salir.
 *
 * @param onLogin - Navega a la pantalla de inicio de sesión.
 */
function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center">

      {/* ── LOGO ── */}
      <div className="flex flex-col items-center pt-12 gap-4">
        <h1 className="color-primary text-2xl font-bold">welcome to</h1>
        <img src={logo} alt="logo" className="w-52 mt-3.5" />
        <p className="text-black text-sm tracking-[0.2em]">A University Marketplace</p>
      </div>

      {/* ── MASCOTA ── cara y brazos en capas separadas para efecto de profundidad */}
      <div className="relative w-full h-72 mt-8">
        <img src={cara} alt="Cara mascota" className="w-72 absolute bottom-0 left-1/2 -translate-x-1/2 z-0"/>
        <img src={brazos} alt="Brazos mascota" className="w-90 absolute bottom-0 left-1/2 -translate-x-[51%] z-20"/>
      </div>

      {/* ── ACCIONES ── botón salir sin funcionalidad aún */}
      <div className="info-card bg-white-app w-full -mt-10 px-8 pt-20 pb-12 flex flex-col gap-4 relative z-10">
        <PrimaryButton text="INICIAR SESIÓN" onClick={onLogin} />
        <SecondaryButton text="SALIR" onClick={() => {}} />
      </div>

    </div>
  );
}

export default WelcomeScreen;