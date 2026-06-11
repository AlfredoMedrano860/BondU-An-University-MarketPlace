import { useState } from "react";
import register from "../../assets/imgs/RegisterCard.png";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { register as registerUser } from "../data/AuthStore";

/**
 * Props de SignUpScreen.
 */
interface SignUpScreenProps {
  /** Navega a la pantalla anterior. */
  onBack: () => void;
  /** Se ejecuta al registrarse exitosamente. */
  onRegister: () => void;
}

/**
 * Pantalla de registro de nuevo usuario.
 *
 * Solicita usuario, correo y contraseña, y los valida contra {@link registerUser}.
 * En caso de error muestra un mensaje debajo del formulario.
 *
 * @param onBack - Navega a la pantalla anterior.
 * @param onRegister - Se ejecuta al registrarse exitosamente.
 */
function SignUpScreen({ onBack, onRegister }: SignUpScreenProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Intenta registrar al usuario con los datos ingresados.
   * Llama a {@link onRegister} si es exitoso, o muestra el error si falla.
   * Se puede llamar a ErrorLogin.tsx
   */
  function handleRegister() {
    const result = registerUser(username, email, password);
    if (result.ok) {
      setError("");
      onRegister();
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

        <h1 className="color-primary text-3xl font-bold text-center mb-2">Registrarte</h1>

        <InputSpace type="text" placeholder="Usuario" value={username} onChange={setUsername} />
        <InputSpace type="text" placeholder="Correo" value={email} onChange={setEmail} />
        <InputSpace type="password" placeholder="Contraseña" value={password} onChange={setPassword} />

        {/* Mensaje de error ── reemplazar con sistema de notificaciones */}
        {error && (
          <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
        )}

        <PrimaryButton text="REGISTRAR" onClick={handleRegister} />

      </div>
    </div>
  );
}

export default SignUpScreen;