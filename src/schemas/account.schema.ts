import { z } from 'zod';

/**
 * Valida el formulario de edición de perfil (Account).
 * El cambio de contraseña es opcional; si se ingresa una nueva, exige la
 * actual, un mínimo de 6 caracteres y que coincida con la confirmación.
 * Usado en {@link useAccountForm}.
 */
export const accountSchema = z
  .object({
    username: z.string().min(3, 'account.errors.usernameTooShort'),
    email: z.email(),
    phone: z.string().optional(),
    university: z.string().optional(),
    career: z.string().optional(),
    currentPassword: z.string().optional(),
    password: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine(
    // Si ingresó contraseña nueva, debe tener al menos 6 caracteres
    (d) => !d.password || d.password.length >= 6,
    { message: 'account.errors.passwordTooShort', path: ['password'] }
  )
  .refine(
    // Si ingresó contraseña nueva, debe coincidir con la confirmación
    (d) => !d.password || d.password === d.confirm,
    { message: 'account.errors.passwordMismatch', path: ['confirm'] }
  )
  .refine(
    // Si ingresó contraseña nueva, debe indicar la contraseña actual
    (d) => !d.password || !!d.currentPassword,
    { message: 'account.errors.currentPasswordRequired', path: ['currentPassword'] }
  );
