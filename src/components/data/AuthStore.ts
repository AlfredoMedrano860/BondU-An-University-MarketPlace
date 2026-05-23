import type { UserProfile } from "./UserProfile";
import { validateRegister, validateLogin } from "./AuthValidations"; 
import avatarImg from "../../assets/imgs/IconoPerfil.png";
//Reemplazable con backend
const users: UserProfile[] = [];
let nextId = 1;
let currentUser: UserProfile | null = null;

export type AuthResult = | { ok: true; user: UserProfile } | { ok: false; error: string };

export function register(username: string, email: string, password: string): AuthResult {
  const error = validateRegister(username, email, password, users);
  if (error) return { ok: false, error };

  const user: UserProfile = {
    id: nextId++,
    username,
    email,
    password,
    avatar: avatarImg,
    createdAt: new Date(),
  };

  users.push(user);
  currentUser = user;
  return { ok: true, user };
}

export function login(email: string, password: string): AuthResult {
  const error = validateLogin(email, password);
  if (error) return { ok: false, error };

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return { ok: false, error: "Correo o contraseña incorrectos." };

  currentUser = user;
  return { ok: true, user };
}

export function updateUser(fields: Partial<UserProfile>): UserProfile | null {
  if (!currentUser) return null;
  const updated = Object.assign({}, currentUser, fields);
  const index = users.findIndex(u => u.id === currentUser!.id);
  if (index !== -1) users[index] = updated;
  currentUser = updated;
  return updated;
}

export function deleteUser(): void {
  if (!currentUser) return;
  const index = users.findIndex(u => u.id === currentUser!.id);
  if (index !== -1) users.splice(index, 1);
  currentUser = null;
}

export const getCurrentUser = (): UserProfile | null => currentUser;
export const logout = (): void => { currentUser = null; };