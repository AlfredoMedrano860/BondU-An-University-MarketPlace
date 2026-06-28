import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppButton from "../ui/AppButton";
import InputSpace from "../ui/InputSpace";
import { useAuthContext } from "../../contexts/AuthContext";
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
  /** Se ejecuta al autenticar exitosamente. */
  onLogin: () => void;
  /** Navega a {@link SignUpScreen}. */
  onSignUp: () => void;
  /** Navega a {@link ForgotPasswordScreen}. */
  onForgotPassword: () => void;
}

/**
 * Pantalla de inicio de sesión con campos de correo y contraseña.
 * Llama al backend vía AuthContext.login y navega a home si el login es exitoso.
 */
function LoginScreen({ onBack, onLogin, onSignUp, onForgotPassword }: LoginScreenProps) {
  const { t } = useTranslation();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await login({ email, password });
      onLogin();
    } catch {
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
