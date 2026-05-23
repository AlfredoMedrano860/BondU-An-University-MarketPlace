import { useState } from "react";
import register from "../../assets/imgs/RegisterCard.png";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { login } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (user: UserProfile) => void;
  onSignUp: () => void;
}

function LoginScreen({ onBack, onLogin, onSignUp }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

      <div className="pt-10">
        <BackButton onClick={onBack} />
      </div>

      <div className="relative w-full h-52 mt-10">
        <img src={register} alt="Cara mascota" className="w-50 absolute bottom-0 left-1/2 -translate-x-1/2 z-0"/>
      </div>

      <div className="info-card bg-white-app w-full mt-5 px-8 pt-20 pb-12 flex flex-col gap-5 relative z-10">

        <h1 className="color-primary text-3xl font-bold text-center mb-2">Login</h1>

        <InputSpace type="text" placeholder="Correo" value={email} onChange={setEmail} />
        <InputSpace type="password" placeholder="Contraseña" value={password} onChange={setPassword} />
        {/* Momentaneo, se ocupa reemplazar con notificaciones */}
        {error && (
          <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
        )}

        <div className="flex justify-end -mt-2">
          <button className="text-sm text-gray-500">¿Olvidaste la contraseña?</button>
        </div>

        <PrimaryButton text="INICIAR SESIÓN" onClick={handleLogin} />

        <p className="text-center text-sm text-gray-500 mt-1">
          ¿No tienes una cuenta?{" "}
          <button onClick={onSignUp} className="color-primary font-bold">Regístrate</button>
        </p>

      </div>
    </div>
  );
}

export default LoginScreen;