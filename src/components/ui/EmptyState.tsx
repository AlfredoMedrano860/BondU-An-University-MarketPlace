import mascotaTriste from "../../assets/imgs/MascotaTriste.png";

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
 * Usado en {@link HomeScreen}, {@link MarketPlaceScreen}, {@link FavoriteScreen}
 * y {@link MyProductsScreen}.
 *
 * @param message - Mensaje a mostrar según el contexto de uso.
 */
function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-6 gap-4">

      {/* Mensaje personalizado según el contexto */}
      <p className="color-secondary text-base font-semibold text-center">{message}</p>

      {/* Mascota triste ── imagen en src/assets/imgs/MascotaTriste.png */}
      <img src={mascotaTriste} alt="Sin resultados" className="w-64" />

    </div>
  );
}

export default EmptyState;