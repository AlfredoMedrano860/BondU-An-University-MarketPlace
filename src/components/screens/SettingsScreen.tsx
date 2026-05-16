import { useState } from "react";
import { settingsItems, SettingsGroup as Group } from "../data/SettingsItem";
import SettingsGroup from "../templates/SettingsGroup";
import ProfileHeader from "../templates/ProfileHeader";
import BottomNav from "../templates/BottomNav";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(false);

  const group1 = settingsItems.filter(item => item.group === Group.Account);
  const group2 = settingsItems.filter(item => item.group === Group.Preferences);
  // No hay usuarios.ts creados, hay que usar herencia para integrarlo con seller.ts
  return (
    <div className="h-screen bg-beige flex flex-col">
      
      <ProfileHeader name="Alfredo" email="mc.alfredomedra@gmail.com" />

      <div className="flex flex-col gap-4 px-5 -mt-8 flex-1 overflow-y-auto no-scrollbar pb-32">
        <SettingsGroup items={group1} />
        <SettingsGroup items={group2} darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)}/>
      </div>

      <BottomNav onNavigate={onNavigate} currentScreen="settings" />
    </div>
  );
}

export default SettingsScreen;