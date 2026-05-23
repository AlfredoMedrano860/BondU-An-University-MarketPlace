import { useState } from "react";
import { updateUser } from "../components/data/AuthStore";
import type { UserProfile } from "../components/data/UserProfile";

export function useAccountForm(currentUser: UserProfile, onUpdate: (user: UserProfile) => void) {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone ?? "");
  const [university, setUniversity] = useState(currentUser.university ?? "");
  const [career, setCareer] = useState(currentUser.career ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (password && password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const fields: Partial<UserProfile> = { username, email, phone, university, career };
    if (password) fields.password = password;

    const updated = updateUser(fields);
    if (updated) {
      setError("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onUpdate(updated);
    }
  };

  return {
    fields: { username, email, phone, university, career, password, confirm },
    setters: { setUsername, setEmail, setPhone, setUniversity, setCareer, setPassword, setConfirm },
    status: { error, saved },
    handleSave,
  };
}