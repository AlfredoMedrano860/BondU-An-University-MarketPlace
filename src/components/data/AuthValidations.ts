import type { UserProfile } from "./UserProfile";

/**
 * Valida los datos de registro de un nuevo usuario.
 *
 * Verifica que todos los campos estén completos y que el correo
 * no esté registrado previamente en el store.
 *
 * @param username - Nombre de usuario ingresado.
 * @param email - Correo electrónico ingresado.
 * @param password - Contraseña ingresada.
 * @param users - Lista de usuarios registrados para verificar duplicados.
 * @returns Mensaje de error si la validación falla, `null` si es válido.
 */
export function validateRegister(username: string, email: string, password: string, users: UserProfile[]): string | null {
  if (!username.trim() || !email.trim() || !password.trim())
    return "Todos los campos son obligatorios.";
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
    return "Ya existe una cuenta con ese correo.";
  return null;
}

/**
 * Valida las credenciales de inicio de sesión.
 *
 * Solo verifica que los campos no estén vacíos.
 * La verificación de credenciales se hace en {@link login}.
 *
 * @param email - Correo electrónico ingresado.
 * @param password - Contraseña ingresada.
 * @returns Mensaje de error si los campos están vacíos, `null` si son válidos.
 */
export function validateLogin(email: string, password: string): string | null {
  if (!email.trim() || !password.trim())
    return "Ingresá tu correo y contraseña.";
  return null;
}