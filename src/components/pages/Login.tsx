import { useTranslation } from "react-i18next";
import AppButton from "../ui/AppButton";
import InputSpace from "../ui/InputSpace";
import AuthLayout from "../layout/AuthLayout";
import AuthHeader from "../templates/AuthHeader";
import { socialMedias } from "../data/SocialMedia";
import { useLogin } from "../../hooks/useLogin";

/**
 * Props de Login.
 */
interface LoginProps {
  /** Navega hacia atrás a {@link Welcome}. */
  onBack: () => void;
  /** Se ejecuta al autenticar exitosamente. */
  onLogin: () => void;
  /** Navega a {@link SignUp}. */
  onSignUp: () => void;
  /** Navega a {@link ForgotPassword}. */
  onForgotPassword: () => void;
}

/**
 * Pantalla de inicio de sesión con campos de correo y contraseña.
 *
 * Delega el estado y la validación a {@link useLogin}.
 *
 * @param onBack - Navega hacia atrás.
 * @param onLogin - Se ejecuta al autenticar exitosamente.
 * @param onSignUp - Navega a la pantalla de registro.
 * @param onForgotPassword - Navega a la pantalla de recuperación de contraseña.
 */
function Login({ onBack, onLogin, onSignUp, onForgotPassword }: LoginProps) {
  const { t } = useTranslation();
  const { fields, setters, handleLogin } = useLogin(onLogin);

  return (
    <AuthLayout>
      <AuthHeader onBack={onBack} title={t("login.title")} description={t("login.description")} />

      <InputSpace type="text" placeholder={t("login.email")} hint="ejemplo@gmail.com" value={fields.email} onChange={setters.setEmail} />
      <InputSpace type="password" placeholder={t("login.password")} hint="Mínimo 8 caracteres" value={fields.password} onChange={setters.setPassword} />

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

export default Login;
