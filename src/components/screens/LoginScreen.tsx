import { useState } from "react";
import { useTranslation } from "react-i18next";
import iconoPerfil from "../../assets/imgs/IconoPerfil.png";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { login } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";
import { notify } from "../data/NotificationStore";
import googleImg from "../../assets/imgs/google.png";
import appleImg from "../../assets/imgs/apple.png";
import facebookImg from "../../assets/imgs/facebook.png";
import AuthLayout from "../layout/AuthLayout";

/**
 * Props de LoginScreen.
 */
interface LoginScreenProps {
  /** Navega hacia atrás a {@link WelcomeScreen}. */
  onBack: () => void;
  /** Se ejecuta al autenticar exitosamente con el perfil del usuario. */
  onLogin: (user: UserProfile) => void;
  /** Navega a {@link SignUpScreen}. */
  onSignUp: () => void;
  /** Navega a {@link ForgotPasswordScreen}. */
  onForgotPassword: () => void;
}

/**
 * Pantalla de inicio de sesión con campos de correo y contraseña.
 *
 * Llama a `login` del {@link AuthStore} y emite notificación de error si falla.
 * Los botones de redes sociales son decorativos; pendiente de integrar OAuth.
 *
 * @param onBack - Navega hacia atrás.
 * @param onLogin - Callback con el usuario autenticado.
 * @param onSignUp - Navega al registro.
 * @param onForgotPassword - Navega a recuperación de contraseña.
 */
function LoginScreen({ onBack, onLogin, onSignUp, onForgotPassword }: LoginScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const result = login(email, password);
    if (result.ok) {
      onLogin(result.user);
    } else {
      notify.error(t("notifications.loginError.title"), t("notifications.loginError.message"));
    }
  }

  return (
    <AuthLayout onBack={onBack}>
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 py-10">
      <div className="max-w-sm w-full mx-auto flex flex-col gap-5">

      {/* Avatar */}
      <div className="flex justify-center mb-2">
        <div className="w-24 h-24 rounded-full bg-soft flex items-center justify-center overflow-hidden">
          <img src={iconoPerfil} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Title + description */}
      <div>
        <h1 className="color-primary text-2xl font-bold">{t("login.title")}</h1>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{t("login.description")}</p>
      </div>

      {/* Email */}
      <InputSpace type="text" placeholder={t("login.email")} hint="ejemplo@gmail.com" value={email} onChange={setEmail} />

      {/* Password */}
      <InputSpace type="password" placeholder={t("login.password")} hint="Mínimo 8 caracteres" value={password} onChange={setPassword} />

      <div className="flex justify-end -mt-2">
        <button onClick={onForgotPassword} className="text-sm text-gray-400">
          {t("login.forgot")}
        </button>
      </div>

      <PrimaryButton text={t("login.submit")} onClick={handleLogin} />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">{t("login.orContinueWith")}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="flex justify-center gap-4">
        <button className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
          <img src={googleImg} alt="Google" className="w-6 h-6 object-contain" />
        </button>
        <button className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
          <img src={appleImg} alt="Apple" className="w-6 h-6 object-contain" />
        </button>
        <button className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
          <img src={facebookImg} alt="Facebook" className="w-6 h-6 object-contain" />
        </button>
      </div>

      <p className="text-center text-sm text-gray-400">
        {t("login.noAccount")}{" "}
        <button onClick={onSignUp} className="color-primary font-bold">{t("login.signUp")}</button>
      </p>

      </div>
      </div>
    </AuthLayout>
  );
}

export default LoginScreen;
