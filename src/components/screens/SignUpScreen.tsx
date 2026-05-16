import { useState } from "react";
import register from "../../assets/imgs/RegisterCard.png";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";

interface SignUpScreenProps {
  onBack: () => void;
  onRegister: () => void;
}

function SignUpScreen({ onBack, onRegister }: SignUpScreenProps) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-beige">

      <div className="pt-10">
        <BackButton onClick={onBack} />
      </div>

      <div className="relative w-full h-52 mt-10">
        <img src={register} alt="Cara mascota" className="w-50 absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
        />
      </div>

      <div className="info-card bg-white-app w-full mt-5 px-8 pt-20 pb-12 flex flex-col gap-5 relative z-10">

        <h1 className="color-primary text-3xl font-bold text-center mb-2">Registrarte</h1>

        <InputSpace type="text" placeholder="User" value={user} onChange={setUser} />
        <InputSpace type="text" placeholder="Correo" value={email} onChange={setEmail} />
        <InputSpace type="password" placeholder="Contraseña" value={password} onChange={setPassword} />

        <PrimaryButton text="REGISTRAR" onClick={onRegister} />

      </div>
    </div>
  );
}

export default SignUpScreen;