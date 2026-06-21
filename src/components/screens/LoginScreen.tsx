import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppButton from "../ui/AppButton";
import InputSpace from "../ui/InputSpace";
import { login } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";
import { notify } from "../data/NotificationStore";
import AuthLayout from "../layout/AuthLayout";
import AuthHeader from "../templates/AuthHeader";
import { socialMedias } from "../data/SocialMedia";

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
    <AuthLayout>
      <AuthHeader onBack={onBack} title={t("login.title")} description={t("login.description")} />

      <InputSpace type="text" placeholder={t("login.email")} hint="ejemplo@gmail.com" value={email} onChange={setEmail} />
      <InputSpace type="password" placeholder={t("login.password")} hint="Mínimo 8 caracteres" value={password} onChange={setPassword} />

      <div className="flex justify-end -mt-2">
        <button onClick={onForgotPassword} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          {t("login.forgot")}
        </button>
      </div>

      <AppButton text={t("login.submit")} onClick={handleLogin} />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">{t("login.orContinueWith")}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="flex justify-center gap-4">
        {socialMedias.map((socialMedia) => (
          <button key={socialMedia.id} className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all duration-150">
            <img src={socialMedia.img} alt={socialMedia.alt} className="w-6 h-6 object-contain" />
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400">
        {t("login.noAccount")}{" "}
        <button onClick={onSignUp} className="color-primary font-bold hover:underline">{t("login.signUp")}</button>
      </p>

    </AuthLayout>
  );
}

export default LoginScreen;
