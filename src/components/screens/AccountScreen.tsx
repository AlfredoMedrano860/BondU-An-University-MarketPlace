import { Camera } from "lucide-react";
import BackButton from "../ui/BackButton";
import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";
import { useAccountForm } from "../../hooks/useAccountForm";
import type { UserProfile } from "../data/UserProfile";

interface AccountScreenProps {
  currentUser: UserProfile;
  onBack: () => void;
  onUpdate: (user: UserProfile) => void;
}

function AccountScreen({ currentUser, onBack, onUpdate }: AccountScreenProps) {
  const { fields, setters, status, handleSave } = useAccountForm(currentUser, onUpdate);

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">

      <div className="bg-primary px-6 pt-10 pb-16 flex items-center gap-4">
        <BackButton onClick={onBack} />
        <h1 className="text-white text-xl font-bold">Mi Cuenta</h1>
      </div>

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

        <div className="bg-white-app rounded-3xl p-5 flex flex-col gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Información Personal</p>
          <InputSpace placeholder="Usuario"     value={fields.username}   onChange={setters.setUsername} />
          <InputSpace placeholder="Correo"      value={fields.email}      onChange={setters.setEmail} />
          <InputSpace placeholder="Teléfono"    value={fields.phone}      onChange={setters.setPhone} />
          <InputSpace placeholder="Universidad" value={fields.university} onChange={setters.setUniversity} />
          <InputSpace placeholder="Carrera"     value={fields.career}     onChange={setters.setCareer} />
        </div>

        <div className="bg-white-app rounded-3xl p-5 flex flex-col gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cambiar Contraseña</p>
          <InputSpace type="password" placeholder="Nueva contraseña"     value={fields.password} onChange={setters.setPassword} />
          <InputSpace type="password" placeholder="Confirmar contraseña" value={fields.confirm}  onChange={setters.setConfirm} />
        </div>
        {/* Momentaneo, se ocupa reemplazar con notificaciones */}
        {status.error && <p className="text-red-500 text-sm text-center">{status.error}</p>}
        {status.saved && <p className="text-green-500 text-sm text-center">¡Cambios guardados!</p>}

        <PrimaryButton text="GUARDAR CAMBIOS" onClick={handleSave} />

      </div>
    </div>
  );
}

export default AccountScreen;