import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { ChangeEvent } from "react";
import { Camera, User, AtSign, Lock } from "lucide-react";
import BackButton from "../ui/BackButton";
import InputSpace from "../ui/InputSpace";
import AppButton from "../ui/AppButton";
import SectionHeader from "../ui/SectionHeader";
import { useAccountForm } from "../../hooks/useAccountForm";
import type { UserProfile } from "../data/UserProfile";

/** Props del componente {@link AccountScreen}. */
interface AccountScreenProps {
  /** Perfil actual del usuario autenticado. */
  currentUser: UserProfile;
  /** Navega hacia atrás (a la pantalla de perfil). */
  onBack: () => void;
  /** Se ejecuta con el perfil actualizado tras guardar exitosamente. */
  onUpdate: (user: UserProfile) => void;
}


/**
 * Pantalla de edición de perfil del usuario autenticado.
 *
 * Muestra un banner con el título, avatar con botón de cámara, y secciones
 * para información personal, contacto y seguridad (cambio de contraseña).
 * La nueva contraseña solo puede guardarse si se proporciona la contraseña actual.
 */
function AccountScreen({ currentUser, onBack, onUpdate }: AccountScreenProps) {
  const { t } = useTranslation();
  const { fields, setters, handleSave } = useAccountForm(currentUser, onUpdate);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const prevBlobRef    = useRef<string | null>(null);

  useEffect(() => {
    return () => { if (prevBlobRef.current) URL.revokeObjectURL(prevBlobRef.current); };
  }, []);

  /**
   * Crea una blob URL para previsualizar la imagen seleccionada.
   * Revoca la URL anterior para evitar memory leaks.
   */
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (prevBlobRef.current) URL.revokeObjectURL(prevBlobRef.current);
    const url = URL.createObjectURL(file);
    prevBlobRef.current = url;
    setters.setAvatar(url);
  };

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">

      {/* ── BANNER ── */}
      <div className="relative bg-primary h-36 flex items-center justify-center">
        <div className="absolute top-6 left-0 z-10">
          <BackButton onClick={onBack} />
        </div>
        <h1 className="text-white text-xl font-bold">{t("account.title")}</h1>
      </div>

      {/* ── AVATAR ── */}
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
      <div className="flex flex-col items-center -mt-12 mb-2 relative z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-beige shadow-lg">
            <img src={fields.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <button
            onClick={() => avatarInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-aux rounded-full flex items-center justify-center shadow hover:opacity-80 active:scale-95 transition-all duration-150"
          >
            <Camera size={15} color="white" />
          </button>
        </div>
        <h2 className="mt-3 text-xl font-bold color-secondary">{fields.username || currentUser.username}</h2>
        <p className="text-sm text-gray-400 mt-0.5">{currentUser.email}</p>
      </div>

      {/* ── FORMULARIO ── */}
<<<<<<< HEAD
      <div className="px-5 flex flex-col gap-6 pb-10">
        {/* Información Personal */}
        <div className="bg-white-app rounded-3xl p-5 flex flex-col gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Información Personal
          </p>
          <InputSpace
            placeholder="Usuario"
            value={fields.username}
            onChange={setters.setUsername}
          />
          <InputSpace
            placeholder="Correo"
            value={fields.email}
            onChange={setters.setEmail}
          />
          <InputSpace
            placeholder="Teléfono"
            value={fields.phone}
            onChange={setters.setPhone}
          />
          <InputSpace
            placeholder="Universidad"
            value={fields.university}
            onChange={setters.setUniversity}
          />
          <InputSpace
            placeholder="Carrera"
            value={fields.career}
            onChange={setters.setCareer}
          />
        </div>
.
        {/* Cambiar Contraseña */}
        <div className="bg-white-app rounded-3xl p-5 flex flex-col gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Cambiar Contraseña
          </p>
          <InputSpace
            type="password"
            placeholder="Nueva contraseña"
            value={fields.password}
            onChange={setters.setPassword}
          />
          <InputSpace
            type="password"
            placeholder="Confirmar contraseña"
            value={fields.confirm}
            onChange={setters.setConfirm}
          />
=======
      <div className="px-5 sm:px-10 md:max-w-2xl md:mx-auto flex flex-col gap-4 py-6 pb-12">

        {/* Información personal */}
        <div className="bg-white-app rounded-3xl overflow-hidden">
          <SectionHeader icon={User} label={t("account.personalInfo")} />
          <div className="px-5 pb-5 flex flex-col gap-4">
            <InputSpace placeholder={t("account.username")}   hint="Tu nombre completo"       value={fields.username}   onChange={setters.setUsername} />
            <InputSpace placeholder={t("account.email")}      hint="ejemplo@gmail.com"         value={fields.email}      onChange={setters.setEmail} />
            <InputSpace placeholder={t("account.university")} hint="Universidad de Costa Rica" value={fields.university} onChange={setters.setUniversity} />
            <InputSpace placeholder={t("account.career")}     hint="Ingeniería en Sistemas"    value={fields.career}     onChange={setters.setCareer} />
          </div>
>>>>>>> 16c1f102ab07997139a3469741c299c2c95291d4
        </div>

        {/* Información de contacto */}
        <div className="bg-white-app rounded-3xl overflow-hidden">
          <SectionHeader icon={AtSign} label={t("account.contactInfo")} />
          <div className="px-5 pb-5 flex flex-col gap-4">
            <InputSpace placeholder={t("account.bio")}       hint="Cuéntale algo a los compradores..." value={fields.bio}       onChange={setters.setBio}       multiline />
            <InputSpace placeholder={t("account.phone")}     hint="+506 8888-8888"                     value={fields.phone}     onChange={setters.setPhone} />
            <InputSpace placeholder={t("account.instagram")} hint="@tu_usuario"                        value={fields.instagram} onChange={setters.setInstagram} />
            <InputSpace placeholder={t("account.telegram")}  hint="@tu_usuario"                        value={fields.telegram}  onChange={setters.setTelegram} />
          </div>
        </div>

        {/* Seguridad */}
        <div className="bg-white-app rounded-3xl overflow-hidden">
          <SectionHeader icon={Lock} label={t("account.security")} />
          <div className="px-5 pb-5 flex flex-col gap-4">
            <InputSpace type="password" placeholder={t("account.currentPassword")} hint="Tu contraseña actual"  value={fields.currentPassword} onChange={setters.setCurrentPassword} />
            <InputSpace type="password" placeholder={t("account.newPassword")}     hint="Mínimo 8 caracteres"   value={fields.password}        onChange={setters.setPassword} />
            {fields.password.length > 0 && (
              <InputSpace type="password" placeholder={t("account.confirmPassword")} hint="Repetí tu nueva contraseña" value={fields.confirm} onChange={setters.setConfirm} />
            )}
          </div>
        </div>

        <AppButton text={t("account.save")} onClick={handleSave} />
      </div>

    </div>
  );
}

export default AccountScreen;
