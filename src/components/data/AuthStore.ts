import type { UserProfile } from "./UserProfile";
import { validateRegister, validateLogin } from "./AuthValidations";
import avatarImg from "../../assets/imgs/IconoPerfil.png";
import { sellers } from "./Seller";

// Reemplazable con backend

/** Lista de usuarios registrados en memoria. Incluye sellers mock con password "123456". */
const users: UserProfile[] = sellers.map(s => ({ ...s, password: "123456" }));
// Los IDs 1–9 están reservados para vendedores mock (Seller.ts). Los usuarios reales arrancan en 100.
let nextId = 100;
let currentUser: UserProfile | null = null;

/**
 * Resultado de una operación de autenticación.
 * Retorna el usuario si fue exitosa o un mensaje de error si falló.
 */
export type AuthResult = | { ok: true; user: UserProfile } | { ok: false; error: string };

/**
 * Registra un nuevo usuario en el store.
 *
 * Valida los datos con {@link validateRegister} antes de crear el usuario.
 * Asigna el avatar por defecto y establece al usuario como sesión activa.
 *
 * @param username - Nombre de usuario.
 * @param email - Correo electrónico.
 * @param password - Contraseña.
 * @returns {@link AuthResult} con el usuario creado o un mensaje de error.
 */
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

/**
 * Autentica a un usuario con sus credenciales.
 *
 * Valida el formato con {@link validateLogin} y luego busca el usuario
 * por correo y contraseña. Establece la sesión activa si es exitoso.
 *
 * @param email - Correo electrónico del usuario.
 * @param password - Contraseña del usuario.
 * @returns {@link AuthResult} con el usuario autenticado o un mensaje de error.
 */
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

/**
 * Actualiza los datos del usuario actualmente autenticado.
 *
 * @param fields - Campos parciales de {@link UserProfile} a actualizar.
 * @returns El perfil actualizado o `null` si no hay sesión activa.
 */
export function updateUser(fields: Partial<UserProfile>): UserProfile | null {
  if (!currentUser) return null;
  const updated = Object.assign({}, currentUser, fields);
  const index = users.findIndex(u => u.id === currentUser!.id);
  if (index !== -1) users[index] = updated;
  currentUser = updated;
  return updated;
}

/**
 * Elimina al usuario actualmente autenticado del store y cierra su sesión.
 */
export function deleteUser(): void {
  if (!currentUser) return;
  const index = users.findIndex(u => u.id === currentUser!.id);
  if (index !== -1) users.splice(index, 1);
  currentUser = null;
}

/** Retorna el usuario actualmente autenticado o `null` si no hay sesión activa. */
export const getCurrentUser = (): UserProfile | null => currentUser;

/** Cierra la sesión del usuario actual. */
export const logout = (): void => { currentUser = null; };