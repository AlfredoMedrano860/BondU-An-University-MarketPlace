import { useState } from "react";
import register from "../../assets/imgs/RegisterCard.png";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { login } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";

/**
 * Props de LoginScreen.
 * @see UserProfile
 */
interface LoginScreenProps {
  /** Navega a la pantalla anterior. */
  onBack: () => void;
  /** Se ejecuta al autenticarse exitosamente con el usuario autenticado. */
  onLogin: (user: UserProfile) => void;
  /** Navega a la pantalla de registro. */
  onSignUp: () => void;
  /** Navega a la pantalla de recuperación de contraseña. */
  onForgotPassword: () => void;
}

/**
 * Pantalla de inicio de sesión.
 *
 * Valida las credenciales contra {@link login} del AuthStore.
 * En caso de error muestra un mensaje debajo del formulario.
 *
 * @param onBack - Navega a la pantalla anterior.
 * @param onLogin - Se ejecuta al autenticarse exitosamente con el usuario autenticado.
 * @param onSignUp - Navega a la pantalla de registro.
 * @param onForgotPassword - Navega a la pantalla de recuperación de contraseña.
 */
function LoginScreen({ onBack, onLogin, onSignUp, onForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Intenta autenticar al usuario con las credenciales ingresadas.
   * Llama a {@link onLogin} si es exitoso, o muestra el error si falla.
   */
  function handleLogin() {
    const result = login(email, password);
    if (result.ok) {
      setError("");
      onLogin(result.user);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-beige">

      {/* ── HEADER ── */}
      <div className="pt-10">
        <BackButton onClick={onBack} />
      </div>

      {/* ── ILUSTRACIÓN ── */}
      <div className="relative w-full h-52 mt-10">
        <img src={register} alt="Cara mascota" className="w-50 absolute bottom-0 left-1/2 -translate-x-1/2 z-0"/>
      </div>

      {/* ── FORMULARIO ── */}
      <div className="info-card bg-white-app w-full mt-5 px-8 pt-20 pb-12 flex flex-col gap-5 relative z-10">

        <h1 className="color-primary text-3xl font-bold text-center mb-2">Login</h1>

        <InputSpace type="text" placeholder="Correo" value={email} onChange={setEmail} />
        <InputSpace type="password" placeholder="Contraseña" value={password} onChange={setPassword} />

        {/* Mensaje de error ── reemplazar con sistema de notificaciones */}
        {error && (
          <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
        )}

        {/* Recuperar contraseña */}
        <div className="flex justify-end -mt-2">
          <button onClick={onForgotPassword} className="text-sm text-gray-500">
            ¿Olvidaste la contraseña?
          </button>
        </div>

        <PrimaryButton text="INICIAR SESIÓN" onClick={handleLogin} />

        {/* Ir a registro */}
        <p className="text-center text-sm text-gray-500 mt-1">
          ¿No tienes una cuenta?{" "}
          <button onClick={onSignUp} className="color-primary font-bold">Regístrate</button>
        </p>

      </div>
    </div>
  );
}

export default LoginScreen;