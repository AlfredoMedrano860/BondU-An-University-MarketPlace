import mascotaTriste from "../../assets/imgs/MascotaTriste.webp";

/**
 * Props de EmptyState.
 */
interface EmptyStateProps {
  /** Mensaje a mostrar según el contexto de uso. */
  message: string;
}

/**
 * Estado vacío con mascota triste y mensaje personalizado.
 *
 * Se muestra cuando no hay contenido que renderizar en una pantalla.
 * Usado en {@link Home}, {@link MarketPlace}, {@link Favorite}
 * y {@link MyProducts}.
 *
 * @param message - Mensaje a mostrar según el contexto de uso.
 */
function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-6 gap-4">

      {/* Mensaje personalizado según el contexto */}
      <p className="color-secondary text-base font-semibold text-center">{message}</p>

      {/* Mascota triste */}
      <img src={mascotaTriste} alt="Sin resultados" className="w-64" />

    </div>
  );
}

export default EmptyState;