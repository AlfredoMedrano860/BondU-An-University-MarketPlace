import type { ReactNode } from "react";
import BackButton from "../ui/BackButton";

/**
 * Props de ScreenLayout.
 */
interface ScreenLayoutProps {
  /** Título que se muestra en el encabezado. */
  title: string;
  /** Navega hacia atrás al hacer clic en el botón de retroceso. */
  onBack: () => void;
  /** Contenido de la pantalla. */
  children: ReactNode;
}

/**
 * Layout de pantalla secundaria con encabezado de color primario y botón de retroceso.
 *
 * Usado en {@link MyProductsScreen}, {@link AccountScreen} y otras pantallas de detalle.
 *
 * @param title - Texto del encabezado.
 * @param onBack - Handler del botón de retroceso.
 * @param children - Contenido de la pantalla.
 */
function ScreenLayout({ title, onBack, children }: ScreenLayoutProps) {
  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">
      <div className="relative bg-primary px-6 pt-15 pb-16 text-center shadow-md">
        <div className="absolute top-4 left-0 z-10">
          <BackButton onClick={onBack} />
        </div>
        <h1 className="text-white text-xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export default ScreenLayout;
