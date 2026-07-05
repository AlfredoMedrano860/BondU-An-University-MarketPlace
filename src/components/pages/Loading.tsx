import logo from "../../assets/imgs/logo.png";
import LoadingBar from "../templates/LoadingBar";
import "../../assets/styles/components/Loading.css";

/**
 * Props de Loading.
 */
interface LoadingProps {
  /** Se ejecuta al completarse la animación de carga. */
  onFinish: () => void;
}

/**
 * Pantalla de carga con el logo de la app y una {@link LoadingBar} animada.
 *
 * Es la primera pantalla que ve el usuario al abrir la app, y también se
 * muestra al salir de {@link Welcome}.
 *
 * @param onFinish - Navega fuera de la pantalla de carga al completarse.
 */
function Loading({ onFinish }: LoadingProps) {
  return (
    <div className="bu-loading bg-secondary">
      <div className="bu-loading-inner">
        <img src={logo} alt="bondu logo" className="bu-loading-logo" />
        <div className="bu-loading-sub">An University Marketplace</div>
      </div>
      <LoadingBar onFinish={onFinish} />
    </div>
  );
}

export default Loading;
