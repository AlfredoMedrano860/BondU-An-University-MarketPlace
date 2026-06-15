import { useTranslation } from "react-i18next";
import SearchBar from "../ui/SearchBar";
import type { UserProfile } from "../data/UserProfile";

interface AppHeaderProps {
  currentUser: UserProfile;
  onSearch?: (term: string) => void;
}

function AppHeader({ currentUser, onSearch }: AppHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-primary px-6 sm:px-10 md:px-16 lg:px-20 pt-10 pb-6 text-white shadow-md">

      <div className="flex flex-col md:flex-row md:items-center md:gap-8">

        <div className="flex items-center gap-3 md:shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={currentUser.avatar} alt="user" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm">{t("home.welcomeBack")}</p>
            <h2 className="text-xl font-bold">{currentUser.username}</h2>
          </div>
        </div>

        <SearchBar onSearch={onSearch} />

      </div>

    </div>
  );
}

export default AppHeader;
