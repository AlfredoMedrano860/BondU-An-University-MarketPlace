import { useState } from "react";
import { Contrast, LogOut, CircleUserRound, Package, Bell, Globe } from "lucide-react";
import ProfileHeader from "../templates/ProfileHeader";
import BottomNav from "../templates/BottomNav";
import AboutAccordion from "../templates/AboutAccordion";
import FaqAccordion from "../templates/FaqAccordion";
import TermsAccordion from "../templates/TermsAccordion";
import { SettingRow, Toggle, SectionTitle } from "../templates/SettingRow"; 
import { logout } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
  currentUser: UserProfile;
  onLogout: () => void;
}

function SettingsScreen({ onNavigate, currentUser, onLogout }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(currentUser.notifications ?? true);
  const [language, setLanguage] = useState(currentUser.language ?? "es");

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="h-screen bg-beige flex flex-col">

      <ProfileHeader name={currentUser.username} email={currentUser.email} avatar={currentUser.avatar}/>

      <div className="flex flex-col gap-3 px-5 pt-4 flex-1 overflow-y-auto no-scrollbar pb-32">

        <SectionTitle title="Mi Perfil" />
        <div className="bg-white-app rounded-3xl">
          <SettingRow icon={CircleUserRound} label="Cuenta" onClick={() => onNavigate("account")} />
          <SettingRow icon={Package} label="Mis Productos" onClick={() => onNavigate("myproducts")} border={false} />
        </div>

        <SectionTitle title="Preferencias" />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <SettingRow icon={Contrast} label="Tema oscuro" right={<Toggle value={darkMode} onToggle={() => setDarkMode(!darkMode)} />} border={false} />
          <SettingRow icon={Bell} label="Notificaciones" right={<Toggle value={notifications} onToggle={() => setNotifications(!notifications)} />} border={false} />
          <SettingRow icon={Globe} label="Idioma" border={false}
            right={
              <button onClick={() => setLanguage(language === "es" ? "en" : "es")} className="text-sm font-bold color-primary">
                {language === "es" ? "Español" : "English"}
              </button>
            }
          />
        </div>

        <SectionTitle title="Información" />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <FaqAccordion />
          <AboutAccordion />
          <TermsAccordion />
        </div>

        <SectionTitle title="Sesión" />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <SettingRow icon={LogOut} label="Cerrar Sesión" onClick={handleLogout} danger border={false} />
          <SettingRow icon={LogOut} label="Eliminar Cuenta" danger border={false} right={null} />
        </div>

      </div>

      <BottomNav onNavigate={onNavigate} currentScreen="settings" />
    </div>
  );
}

export default SettingsScreen;