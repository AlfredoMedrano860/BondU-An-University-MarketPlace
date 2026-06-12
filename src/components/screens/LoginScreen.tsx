import { useState } from "react";
import { useTranslation } from "react-i18next";
import logoHorizontal from "../../assets/imgs/LogoHorizontal.png";
import iconoPerfil from "../../assets/imgs/IconoPerfil.png";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { login } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";
import ErrorMessage from "../ui/ErrorMessage";
import googleImg from "../../assets/imgs/google.png";
import appleImg from "../../assets/imgs/apple.png";
import facebookImg from "../../assets/imgs/facebook.png";

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (user: UserProfile) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

function LoginScreen({ onBack, onLogin, onSignUp, onForgotPassword }: LoginScreenProps) {
  const { t } = useTranslation();
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
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Branding panel */}
      <div className="bg-secondary md:w-1/2 md:min-h-screen flex flex-col px-8 py-10 relative overflow-hidden min-h-64">
        <div className="absolute top-[15%] left-[40%] w-72 h-72 rounded-full bg-white opacity-10" />
        <div className="absolute top-[35%] left-[10%] w-64 h-64 rounded-full bg-white opacity-10" />
        <div className="absolute top-[5%] left-[60%] w-40 h-40 rounded-full bg-white opacity-5" />

        <div className="relative z-10">
          <img src={logoHorizontal} alt="BondU" className="h-9" />
        </div>

        <div className="flex-1" />

        <div className="relative z-10">
          <p className="color-primary font-semibold text-sm mb-2 tracking-wide">
            {t("welcome.title")}
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight max-w-xs">
            {t("welcome.subtitle")}
          </h2>
        </div>
      </div>

      {/* Form panel */}
      <div className="bg-white-app md:w-1/2 md:min-h-screen flex flex-col px-8 sm:px-12 md:px-16 lg:px-20 py-10 relative">

        <div className="absolute left-0 top-10">
          <BackButton onClick={onBack} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
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
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium color-text px-1">{t("login.email")}</span>
              <InputSpace type="text" placeholder={t("login.email")} value={email} onChange={setEmail} />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium color-text px-1">{t("login.password")}</span>
              <InputSpace type="password" placeholder={t("login.password")} value={password} onChange={setPassword} />
            </div>

            <ErrorMessage message={error} />

            <div className="flex justify-end -mt-2">
              <button onClick={onForgotPassword} className="text-sm text-gray-400">
                {t("login.forgot")}
              </button>
            </div>

            <PrimaryButton text={t("login.submit")} onClick={handleLogin} />

            {/* Or continue with */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">{t("login.orContinueWith")}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social icons */}
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
      </div>

    </div>
  );
}

export default LoginScreen;
