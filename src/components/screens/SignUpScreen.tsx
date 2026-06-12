import { useState } from "react";
import { useTranslation } from "react-i18next";
import logoHorizontal from "../../assets/imgs/LogoHorizontal.png";
import iconoPerfil from "../../assets/imgs/IconoPerfil.png";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { register as registerUser } from "../data/AuthStore";
import ErrorMessage from "../ui/ErrorMessage";

interface SignUpScreenProps {
  onBack: () => void;
  onRegister: () => void;
}

function SignUpScreen({ onBack, onRegister }: SignUpScreenProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
              <h1 className="color-primary text-2xl font-bold">{t("signup.title")}</h1>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{t("signup.description")}</p>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium color-text px-1">{t("signup.username")}</span>
              <InputSpace type="text" placeholder={t("signup.username")} value={username} onChange={setUsername} />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium color-text px-1">{t("signup.email")}</span>
              <InputSpace type="text" placeholder={t("signup.email")} value={email} onChange={setEmail} />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium color-text px-1">{t("signup.password")}</span>
              <InputSpace type="password" placeholder={t("signup.password")} value={password} onChange={setPassword} />
            </div>

            <ErrorMessage message={error} />

            <PrimaryButton text={t("signup.submit")} onClick={handleRegister} />

            <p className="text-center text-sm text-gray-400">
              {t("signup.alreadyHaveAccount")}{" "}
              <button onClick={onBack} className="color-primary font-bold">{t("signup.loginLink")}</button>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}

export default SignUpScreen;
