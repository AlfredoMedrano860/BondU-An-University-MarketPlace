import { useEffect } from "react";

/** Duración de la animación en ms. Debe coincidir con `bu-loading-fill` en Loading.css. */
const DURATION_MS = 2800;

/**
 * Props de LoadingBar.
 */
interface LoadingBarProps {
  /** Se ejecuta una vez que la barra llega al 100%. */
  onFinish?: () => void;
}

/**
 * Barra de progreso que avanza de 0 a 100% en {@link DURATION_MS} ms.
 *
 * La animación la hace el CSS (`bu-loading-fill`); este componente solo
 * temporiza el aviso de `onFinish`. Usada en {@link LoadingScreen}.
 *
 * @param onFinish - Notifica al completarse el progreso.
 */
function LoadingBar({ onFinish }: LoadingBarProps) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish?.(), DURATION_MS);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="bu-loading-progress">
      <div className="bu-loading-progress-bar" />
    </div>
  );
}

export default LoadingBar;
