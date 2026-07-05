import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import logoHorizontal from "../../assets/imgs/LogoHorizontal.webp";
import BackButton from "../ui/BackButton";

/**
 * Props de AuthLayout.
 */
interface AuthLayoutProps {
  /** Formulario de autenticación que ocupa el panel derecho. */
  children: ReactNode;
  /** Si se pasa, muestra un {@link BackButton} sobre el panel derecho. */
  onBack?: () => void;
}

/**
 * Layout de dos paneles para las pantallas de autenticación.
 *
 * Panel izquierdo: branding con fondo verde y círculos decorativos.
 * Panel derecho: fondo blanco con el formulario pasado como `children`.
 * En móvil los paneles se apilan verticalmente.
 * Usado en {@link Welcome}, {@link Login}, {@link SignUp} y {@link ForgotPassword}.
 *
 * @param children - Contenido del panel derecho (formulario).
 * @param onBack - Muestra un botón de retroceso si se pasa.
 */
function AuthLayout({ children, onBack }: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Panel izquierdo */}
      <div className="bg-secondary md:w-1/2 md:min-h-screen flex flex-col px-8 py-10 relative overflow-hidden min-h-64">
        <div className="absolute top-[15%] left-[40%] w-72 h-72 rounded-full bg-white opacity-10" />
        <div className="absolute top-[35%] left-[10%] w-64 h-64 rounded-full bg-white opacity-10" />
        <div className="absolute top-[5%] left-[60%] w-40 h-40 rounded-full bg-white opacity-5" />

        <div className="relative z-10">
          <img src={logoHorizontal} alt="BondU" className="h-9" />
        </div>

        <div className="flex-1" />

        <div className="relative z-10">
          <p className="color-primary font-semibold text-sm mb-2 tracking-wide">
            {t("welcome.title")}
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight max-w-xs">
            {t("welcome.subtitle")}
          </h2>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="bg-white-app md:w-1/2 md:min-h-screen flex flex-col relative">
        {onBack && (
          <div className="absolute left-0 top-10 z-10">
            <BackButton onClick={onBack} />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 py-10">
          <div className="max-w-sm w-full mx-auto flex flex-col gap-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
