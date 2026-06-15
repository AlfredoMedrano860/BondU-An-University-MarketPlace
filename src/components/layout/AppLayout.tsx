/**
 * Props de AppLayout.
 */
interface AppLayoutProps {
  /** Contenido de la pantalla principal. */
  children: React.ReactNode;
}

/**
 * Contenedor centrado del área principal de la app.
 *
 * Aplica `max-w-6xl` y ocupa el alto restante disponible.
 * Usado dentro de {@link MainLayout}.
 *
 * @param children - Contenido de la pantalla.
 */
function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex-1 w-full bg-beige overflow-hidden">
      <div className="max-w-6xl mx-auto h-full">
        {children}
      </div>
    </main>
  );
}

export default AppLayout;
