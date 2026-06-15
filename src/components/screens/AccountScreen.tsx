import { useTranslation } from "react-i18next";
import { Camera } from "lucide-react";
import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";
import ScreenLayout from "../layout/ScreenLayout";
import SectionCard from "../layout/SectionCard";
import { useAccountForm } from "../../hooks/useAccountForm";
import type { UserProfile } from "../data/UserProfile";

interface AccountScreenProps {
  currentUser: UserProfile;
  onBack: () => void;
  onUpdate: (user: UserProfile) => void;
}

function AccountScreen({ currentUser, onBack, onUpdate }: AccountScreenProps) {
  const { t } = useTranslation();
  const { fields, setters, handleSave } = useAccountForm(currentUser, onUpdate);

  return (
    <ScreenLayout title={t("account.title")} onBack={onBack}>

      <div className="flex justify-center -mt-10 mb-6 relative z-10">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-beige">
            <img src={currentUser.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-aux rounded-full flex items-center justify-center">
            <Camera size={14} color="white" />
          </button>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-6 pb-10">
        <SectionCard className="bg-white-app rounded-3xl p-5 flex flex-col gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {t("account.personalInfo")}
          </p>
          <InputSpace placeholder={t("account.username")} hint="Tu nombre completo" value={fields.username} onChange={setters.setUsername} />
          <InputSpace placeholder={t("account.email")} hint="ejemplo@gmail.com" value={fields.email} onChange={setters.setEmail} />
          <InputSpace placeholder={t("account.phone")} hint="+506 8888-8888" value={fields.phone} onChange={setters.setPhone} />
          <InputSpace placeholder={t("account.university")} hint="Universidad de Costa Rica" value={fields.university} onChange={setters.setUniversity} />
          <InputSpace placeholder={t("account.career")} hint="Ingeniería en Sistemas" value={fields.career} onChange={setters.setCareer} />
        </SectionCard>

        <SectionCard className="bg-white-app rounded-3xl p-5 flex flex-col gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {t("account.changePassword")}
          </p>
          <InputSpace type="password" placeholder={t("account.newPassword")} hint="Mínimo 8 caracteres" value={fields.password} onChange={setters.setPassword} />
          <InputSpace type="password" placeholder={t("account.confirmPassword")} hint="Repetí tu contraseña" value={fields.confirm} onChange={setters.setConfirm} />
        </SectionCard>

        <PrimaryButton text={t("account.save")} onClick={handleSave} />
      </div>

    </ScreenLayout>
  );
}

export default AccountScreen;
