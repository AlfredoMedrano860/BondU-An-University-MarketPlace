import { Phone, AtSign, Send, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../data/UserProfile";
import SectionCard from "../layout/SectionCard";

/**
 * Props de ProfileContact.
 */
interface ProfileContactProps {
  /** Usuario cuya información de contacto se muestra. */
  currentUser: UserProfile;
}

/**
 * Muestra la pestaña de contacto del perfil de un usuario.
 *
 * Si el usuario no tiene datos de contacto registrados, muestra un mensaje informativo.
 * Renderiza bio, teléfono, correo, Instagram y Telegram según los campos disponibles.
 * Usado en {@link ProfileInfo}.
 *
 * @param currentUser - Usuario cuya información de contacto se muestra.
 */
export default function ProfileContact({ currentUser }: ProfileContactProps) {
  const { t } = useTranslation();

  if (!currentUser.contact) {
    return (
      <SectionCard className="px-6 py-4 flex items-center justify-center">
        <p className="text-gray-600 text-[15px]">{t("profile.contactMessage")}</p>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-4">
      <SectionCard className="px-6 py-5">
        <p className="text-gray-600 text-[15px] leading-relaxed">{currentUser.contact.bio}</p>
      </SectionCard>
      <SectionCard className="px-6 py-4 space-y-3">
        {currentUser.contact.phone && (
          <div className="flex items-center gap-3">
            <Phone size={18} className="color-primary shrink-0" />
            <span className="text-gray-700 text-sm">{currentUser.contact.phone}</span>
          </div>
        )}
        {currentUser.email && (
          <div className="flex items-center gap-3">
            <Mail size={18} className="color-primary shrink-0" />
            <span className="text-gray-700 text-sm">{currentUser.email}</span>
          </div>
        )}
        {currentUser.contact.instagram && (
          <div className="flex items-center gap-3">
            <AtSign size={18} className="color-primary shrink-0" />
            <span className="text-gray-700 text-sm">@{currentUser.contact.instagram}</span>
          </div>
        )}
        {currentUser.contact.telegram && (
          <div className="flex items-center gap-3">
            <Send size={18} className="color-primary shrink-0" />
            <span className="text-gray-700 text-sm">@{currentUser.contact.telegram}</span>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
