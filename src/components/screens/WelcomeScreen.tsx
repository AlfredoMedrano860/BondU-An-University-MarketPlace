import { useTranslation } from "react-i18next";
import logo from "../../assets/imgs/logo.png";
import cara from "../../assets/imgs/CaraMascota.png";
import brazos from "../../assets/imgs/BrazosMascota.png";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

interface WelcomeScreenProps {
  onLogin: () => void;
}

function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center">

      <div className="flex flex-col items-center pt-12 gap-4">
        <h1 className="color-primary text-2xl font-bold">{t("welcome.title")}</h1>
        <img src={logo} alt="logo" className="w-52 mt-3.5" />
        <p className="text-black text-sm tracking-[0.2em]">{t("welcome.subtitle")}</p>
      </div>

      <div className="relative w-full h-72 mt-8">
        <img src={cara} alt="Cara mascota" className="w-72 absolute bottom-0 left-1/2 -translate-x-1/2 z-0" />
        <img src={brazos} alt="Brazos mascota" className="w-90 absolute bottom-0 left-1/2 -translate-x-[51%] z-20" />
      </div>

      <div className="info-card bg-white-app w-full -mt-10 px-6 sm:px-10 md:px-16 lg:px-20 pt-20 pb-12 flex flex-col gap-4 relative z-10">
        <PrimaryButton text={t("welcome.login")} onClick={onLogin} />
        <SecondaryButton text={t("welcome.exit")} onClick={() => {}} />
      </div>

    </div>
  );
}

export default WelcomeScreen;
