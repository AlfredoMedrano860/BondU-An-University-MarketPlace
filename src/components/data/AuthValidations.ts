import type { UserProfile } from "./UserProfile";

export function validateRegister(username: string, email: string, password: string, users: UserProfile[]): string | null {
  if (!username.trim() || !email.trim() || !password.trim())
    return "Todos los campos son obligatorios.";
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
    return "Ya existe una cuenta con ese correo.";
  return null;
}

export function validateLogin(email: string, password: string): string | null {
  if (!email.trim() || !password.trim())
    return "Ingresá tu correo y contraseña.";
  return null;
}